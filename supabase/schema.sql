-- =====================================================
-- GoodLoop Supabase Schema v2.2 / v0.5
-- Deutsch / Englisch, MVP-ready
-- Im Supabase SQL Editor komplett ausführen.
-- =====================================================

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  display_name text,
  language text not null default 'de',
  visibility text not null default 'private',
  onboarding_completed boolean not null default false,
  reminder_enabled boolean not null default false,
  reminder_time text not null default '09:00',
  share_milestones_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_language_check check (language in ('de', 'en')),
  constraint profiles_visibility_check check (visibility in ('private', 'friends', 'public')),
  constraint profiles_reminder_time_check check (reminder_time ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$')
);

create table if not exists public.goal_templates (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_de text not null,
  title_en text not null,
  category text not null,
  description_de text,
  description_en text,
  default_duration_days integer not null default 7,
  icon text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint goal_templates_category_check check (category in ('healthy', 'move', 'balance')),
  constraint goal_templates_duration_check check (default_duration_days > 0 and default_duration_days <= 365)
);

create table if not exists public.user_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  template_id uuid references public.goal_templates(id) on delete set null,
  title text not null,
  category text not null,
  duration_days integer not null default 7,
  start_date date not null default current_date,
  end_date date not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_goals_category_check check (category in ('healthy', 'move', 'balance')),
  constraint user_goals_status_check check (status in ('active', 'paused', 'completed', 'cancelled')),
  constraint user_goals_duration_check check (duration_days > 0 and duration_days <= 365),
  constraint user_goals_dates_check check (end_date >= start_date)
);

create table if not exists public.goal_logs (
  id uuid primary key default gen_random_uuid(),
  user_goal_id uuid not null references public.user_goals(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null default current_date,
  status text not null default 'done',
  created_at timestamptz not null default now(),
  constraint goal_logs_status_check check (status in ('done', 'skipped')),
  constraint goal_logs_unique_day unique (user_goal_id, log_date)
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  quote_text text not null,
  author text,
  category text not null default 'motivation',
  language text not null default 'de',
  source_note text,
  is_active boolean not null default true,
  display_week integer,
  created_at timestamptz not null default now(),
  constraint quotes_language_check check (language in ('de', 'en')),
  constraint quotes_category_check check (category in ('motivation','health','movement','balance','discipline','restart','patience')),
  constraint quotes_display_week_check check (display_week is null or (display_week >= 1 and display_week <= 53))
);


create table if not exists public.friend_connections (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references auth.users(id) on delete cascade,
  addressee_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint friend_connections_no_self check (requester_id <> addressee_id),
  constraint friend_connections_status_check check (status in ('pending', 'accepted', 'declined', 'blocked')),
  constraint friend_connections_unique_pair unique (requester_id, addressee_id)
);

create table if not exists public.milestone_shares (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  user_goal_id uuid references public.user_goals(id) on delete set null,
  title text not null,
  category text not null default 'balance',
  visibility text not null default 'friends',
  created_at timestamptz not null default now(),
  constraint milestone_shares_category_check check (category in ('healthy', 'move', 'balance')),
  constraint milestone_shares_visibility_check check (visibility in ('friends', 'public'))
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();

drop trigger if exists set_user_goals_updated_at on public.user_goals;
create trigger set_user_goals_updated_at before update on public.user_goals for each row execute function public.set_updated_at();

drop trigger if exists set_friend_connections_updated_at on public.friend_connections;
create trigger set_friend_connections_updated_at before update on public.friend_connections for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, display_name, language)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'language', 'de')
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.goal_templates enable row level security;
alter table public.user_goals enable row level security;
alter table public.goal_logs enable row level security;
alter table public.quotes enable row level security;
alter table public.friend_connections enable row level security;
alter table public.milestone_shares enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile" on public.profiles for select to authenticated using (user_id = auth.uid());
drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile" on public.profiles for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "Authenticated users can view active goal templates" on public.goal_templates;
create policy "Authenticated users can view active goal templates" on public.goal_templates for select to authenticated using (is_active = true);

drop policy if exists "Users can view own goals" on public.user_goals;
create policy "Users can view own goals" on public.user_goals for select to authenticated using (user_id = auth.uid());
drop policy if exists "Users can insert own goals" on public.user_goals;
create policy "Users can insert own goals" on public.user_goals for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "Users can update own goals" on public.user_goals;
create policy "Users can update own goals" on public.user_goals for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "Users can delete own goals" on public.user_goals;
create policy "Users can delete own goals" on public.user_goals for delete to authenticated using (user_id = auth.uid());

drop policy if exists "Users can view own goal logs" on public.goal_logs;
create policy "Users can view own goal logs" on public.goal_logs for select to authenticated using (user_id = auth.uid());
drop policy if exists "Users can insert own goal logs" on public.goal_logs;
create policy "Users can insert own goal logs" on public.goal_logs for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "Users can update own goal logs" on public.goal_logs;
create policy "Users can update own goal logs" on public.goal_logs for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "Users can delete own goal logs" on public.goal_logs;
create policy "Users can delete own goal logs" on public.goal_logs for delete to authenticated using (user_id = auth.uid());

drop policy if exists "Authenticated users can view active quotes" on public.quotes;
create policy "Authenticated users can view active quotes" on public.quotes for select to authenticated using (is_active = true);

drop policy if exists "Users can view own friend connections" on public.friend_connections;
create policy "Users can view own friend connections" on public.friend_connections for select to authenticated using (requester_id = auth.uid() or addressee_id = auth.uid());
drop policy if exists "Users can create own friend requests" on public.friend_connections;
create policy "Users can create own friend requests" on public.friend_connections for insert to authenticated with check (requester_id = auth.uid());
drop policy if exists "Users can update involved friend connections" on public.friend_connections;
create policy "Users can update involved friend connections" on public.friend_connections for update to authenticated using (requester_id = auth.uid() or addressee_id = auth.uid()) with check (requester_id = auth.uid() or addressee_id = auth.uid());
drop policy if exists "Users can delete own friend connections" on public.friend_connections;
create policy "Users can delete own friend connections" on public.friend_connections for delete to authenticated using (requester_id = auth.uid() or addressee_id = auth.uid());

drop policy if exists "Users can view own milestone shares" on public.milestone_shares;
create policy "Users can view own milestone shares" on public.milestone_shares for select to authenticated using (user_id = auth.uid());
drop policy if exists "Users can create own milestone shares" on public.milestone_shares;
create policy "Users can create own milestone shares" on public.milestone_shares for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "Users can update own milestone shares" on public.milestone_shares;
create policy "Users can update own milestone shares" on public.milestone_shares for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "Users can delete own milestone shares" on public.milestone_shares;
create policy "Users can delete own milestone shares" on public.milestone_shares for delete to authenticated using (user_id = auth.uid());


create index if not exists idx_profiles_user_id on public.profiles(user_id);
create index if not exists idx_profiles_language on public.profiles(language);
create index if not exists idx_goal_templates_category on public.goal_templates(category);
create index if not exists idx_goal_templates_active_sort on public.goal_templates(is_active, sort_order);
create index if not exists idx_user_goals_user_id on public.user_goals(user_id);
create index if not exists idx_user_goals_user_id_status on public.user_goals(user_id, status);
create index if not exists idx_user_goals_dates on public.user_goals(start_date, end_date);
create index if not exists idx_goal_logs_user_id on public.goal_logs(user_id);
create index if not exists idx_goal_logs_user_goal_id on public.goal_logs(user_goal_id);
create index if not exists idx_goal_logs_user_id_log_date on public.goal_logs(user_id, log_date);
create index if not exists idx_quotes_language_week on public.quotes(language, display_week);
create index if not exists idx_quotes_language_active on public.quotes(language, is_active);
create index if not exists idx_friend_connections_requester on public.friend_connections(requester_id);
create index if not exists idx_friend_connections_addressee on public.friend_connections(addressee_id);
create index if not exists idx_friend_connections_status on public.friend_connections(status);
create index if not exists idx_milestone_shares_user_id on public.milestone_shares(user_id);
create index if not exists idx_milestone_shares_visibility on public.milestone_shares(visibility);

insert into public.goal_templates (slug,title_de,title_en,category,description_de,description_en,default_duration_days,icon,sort_order) values
('one_apple_per_day','1 Apfel pro Tag','1 apple per day','healthy','Iss jeden Tag einen Apfel oder ein anderes Stück Obst.','Eat one apple or another piece of fruit every day.',7,'apple',10),
('one_serving_vegetables','1 Portion Gemüse','1 serving of vegetables','healthy','Baue jeden Tag mindestens eine Portion Gemüse ein.','Add at least one serving of vegetables to your day.',7,'salad',20),
('two_liters_water','2 Liter Wasser','2 liters of water','healthy','Trinke über den Tag verteilt ausreichend Wasser.','Drink enough water throughout the day.',7,'droplet',30),
('no_fast_food_today','Kein Fast Food heute','No fast food today','healthy','Verzichte heute bewusst auf Fast Food.','Avoid fast food today.',1,'utensils',40),
('less_sweets','Weniger Süßigkeiten','Less sweets','healthy','Reduziere Süßigkeiten für ein paar Tage bewusst.','Cut down on sweets for a few days.',3,'cookie',50),
('eight_thousand_steps','8000 Schritte','8000 steps','move','Bewege dich heute bewusst und sammle 8000 Schritte.','Move intentionally today and reach 8000 steps.',7,'footprints',110),
('ten_pushups','10 Liegestütze','10 push-ups','move','Mache heute 10 Liegestütze in deinem Tempo.','Do 10 push-ups today at your own pace.',7,'activity',120),
('fifteen_minute_walk','15 Minuten Spaziergang','15-minute walk','move','Gehe heute mindestens 15 Minuten spazieren.','Take a walk for at least 15 minutes today.',7,'walk',130),
('five_minutes_stretching','5 Minuten Stretching','5 minutes of stretching','move','Nimm dir heute 5 Minuten für Beweglichkeit.','Take 5 minutes today to stretch.',7,'stretch',140),
('stairs_instead_elevator','Treppen statt Aufzug','Stairs instead of elevator','move','Nimm heute bewusst die Treppe, wenn es passt.','Take the stairs today when it makes sense.',5,'stairs',150),
('three_days_no_energy','3 Tage kein Energy','3 days without energy drinks','balance','Verzichte drei Tage bewusst auf Energy Drinks.','Avoid energy drinks for three days.',3,'zap-off',210),
('five_days_no_alcohol','5 Tage kein Alkohol','5 days without alcohol','balance','Verzichte fünf Tage bewusst auf Alkohol.','Avoid alcohol for five days.',5,'wine-off',220),
('no_sugary_drink_today','Kein Süßgetränk heute','No sugary drink today','balance','Verzichte heute auf Cola, Limo oder andere Süßgetränke.','Avoid soda, lemonade or other sugary drinks today.',1,'cup-soda',230),
('one_hour_less_screen_time','1 Stunde weniger Bildschirmzeit','1 hour less screen time','balance','Reduziere deine Bildschirmzeit heute bewusst.','Reduce your screen time by one hour today.',7,'smartphone',240),
('go_to_bed_earlier','Früher schlafen','Go to bed earlier','balance','Gehe heute etwas früher schlafen als sonst.','Go to bed a little earlier than usual today.',5,'moon',250)
on conflict (slug) do update set
  title_de = excluded.title_de,
  title_en = excluded.title_en,
  category = excluded.category,
  description_de = excluded.description_de,
  description_en = excluded.description_en,
  default_duration_days = excluded.default_duration_days,
  icon = excluded.icon,
  sort_order = excluded.sort_order,
  is_active = true;

insert into public.quotes (quote_text,author,category,language,source_note,display_week) values
('Auch der längste Weg beginnt mit dem ersten Schritt.','Laozi zugeschrieben','motivation','de','Zuschreibung prüfen',1),
('Es ist nicht wenig Zeit, die wir haben, sondern viel Zeit, die wir nicht nutzen.','Seneca zugeschrieben','discipline','de','Zuschreibung prüfen',2),
('Der Weg entsteht dadurch, dass man ihn geht.','Franz Kafka zugeschrieben','motivation','de','Zuschreibung prüfen',3),
('Nicht weil es schwer ist, wagen wir es nicht, sondern weil wir es nicht wagen, ist es schwer.','Seneca zugeschrieben','restart','de','Zuschreibung prüfen',4),
('Handle so, als ob das, was du tust, einen Unterschied macht. Es tut es.','William James zugeschrieben','motivation','de','Zuschreibung prüfen',5),
('The journey of a thousand miles begins with a single step.','Attributed to Laozi','motivation','en','Attribution should be verified',1),
('It is not that we have a short time to live, but that we waste much of it.','Attributed to Seneca','discipline','en','Attribution should be verified',2),
('Paths are made by walking.','Attributed to Franz Kafka','motivation','en','Attribution should be verified',3),
('It is not because things are difficult that we do not dare, but because we do not dare that they are difficult.','Attributed to Seneca','restart','en','Attribution should be verified',4),
('Act as if what you do makes a difference. It does.','Attributed to William James','motivation','en','Attribution should be verified',5);

create or replace function public.start_goal_from_template(template_uuid uuid, selected_language text default 'de')
returns uuid
language plpgsql
security invoker
as $$
declare
  template_record public.goal_templates%rowtype;
  new_goal_id uuid;
  selected_title text;
begin
  if selected_language not in ('de', 'en') then selected_language := 'de'; end if;
  select * into template_record from public.goal_templates where id = template_uuid and is_active = true;
  if not found then raise exception 'Goal template not found or inactive'; end if;
  selected_title := case when selected_language = 'en' then template_record.title_en else template_record.title_de end;
  insert into public.user_goals (user_id,template_id,title,category,duration_days,start_date,end_date,status)
  values (auth.uid(),template_record.id,selected_title,template_record.category,template_record.default_duration_days,current_date,current_date + (template_record.default_duration_days - 1),'active')
  returning id into new_goal_id;
  return new_goal_id;
end;
$$;

create or replace function public.create_custom_goal(goal_title text, goal_category text, goal_duration_days integer default 7)
returns uuid
language plpgsql
security invoker
as $$
declare new_goal_id uuid;
begin
  if goal_title is null or length(trim(goal_title)) < 2 then raise exception 'Goal title is too short'; end if;
  if goal_category not in ('healthy','move','balance') then raise exception 'Invalid goal category'; end if;
  if goal_duration_days < 1 or goal_duration_days > 365 then raise exception 'Invalid goal duration'; end if;
  insert into public.user_goals (user_id,template_id,title,category,duration_days,start_date,end_date,status)
  values (auth.uid(),null,trim(goal_title),goal_category,goal_duration_days,current_date,current_date + (goal_duration_days - 1),'active')
  returning id into new_goal_id;
  return new_goal_id;
end;
$$;

create or replace function public.mark_goal_done_today(goal_uuid uuid)
returns uuid
language plpgsql
security invoker
as $$
declare
  new_log_id uuid;
  goal_owner uuid;
  goal_status text;
begin
  select user_id, status into goal_owner, goal_status from public.user_goals where id = goal_uuid;
  if goal_owner is null or goal_owner <> auth.uid() then raise exception 'Goal not found or not owned by current user'; end if;
  if goal_status <> 'active' then raise exception 'Goal is not active'; end if;
  insert into public.goal_logs (user_goal_id,user_id,log_date,status)
  values (goal_uuid,auth.uid(),current_date,'done')
  on conflict (user_goal_id, log_date) do update set status = 'done'
  returning id into new_log_id;
  return new_log_id;
end;
$$;

create or replace function public.unmark_goal_done_today(goal_uuid uuid)
returns void
language plpgsql
security invoker
as $$
declare goal_owner uuid;
begin
  select user_id into goal_owner from public.user_goals where id = goal_uuid;
  if goal_owner is null or goal_owner <> auth.uid() then raise exception 'Goal not found or not owned by current user'; end if;
  delete from public.goal_logs where user_goal_id = goal_uuid and user_id = auth.uid() and log_date = current_date;
end;
$$;

create or replace function public.complete_expired_goals()
returns integer
language plpgsql
security invoker
as $$
declare updated_count integer;
begin
  update public.user_goals set status = 'completed' where user_id = auth.uid() and status = 'active' and end_date < current_date;
  get diagnostics updated_count = row_count;
  return updated_count;
end;
$$;

create or replace view public.active_goals_today as
select
  ug.id as user_goal_id,
  ug.user_id,
  ug.template_id,
  ug.title,
  ug.category,
  ug.duration_days,
  ug.start_date,
  ug.end_date,
  ug.status,
  gl.id as today_log_id,
  case when gl.id is not null and gl.status = 'done' then true else false end as done_today
from public.user_goals ug
left join public.goal_logs gl on gl.user_goal_id = ug.id and gl.log_date = current_date
where ug.status = 'active';
