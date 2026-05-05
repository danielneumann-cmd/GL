-- =====================================================
-- GoodLoop Migration v0.5: sanfte Social-Vorbereitung
-- Im Supabase SQL Editor ausführen, wenn du von v0.4 kommst.
-- =====================================================

alter table public.profiles
add column if not exists share_milestones_enabled boolean not null default false;

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

alter table public.friend_connections enable row level security;
alter table public.milestone_shares enable row level security;

drop policy if exists "Users can view own friend connections" on public.friend_connections;
create policy "Users can view own friend connections"
on public.friend_connections
for select
to authenticated
using (requester_id = auth.uid() or addressee_id = auth.uid());

drop policy if exists "Users can create own friend requests" on public.friend_connections;
create policy "Users can create own friend requests"
on public.friend_connections
for insert
to authenticated
with check (requester_id = auth.uid());

drop policy if exists "Users can update involved friend connections" on public.friend_connections;
create policy "Users can update involved friend connections"
on public.friend_connections
for update
to authenticated
using (requester_id = auth.uid() or addressee_id = auth.uid())
with check (requester_id = auth.uid() or addressee_id = auth.uid());

drop policy if exists "Users can delete own friend connections" on public.friend_connections;
create policy "Users can delete own friend connections"
on public.friend_connections
for delete
to authenticated
using (requester_id = auth.uid() or addressee_id = auth.uid());

drop policy if exists "Users can view own milestone shares" on public.milestone_shares;
create policy "Users can view own milestone shares"
on public.milestone_shares
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Users can create own milestone shares" on public.milestone_shares;
create policy "Users can create own milestone shares"
on public.milestone_shares
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "Users can update own milestone shares" on public.milestone_shares;
create policy "Users can update own milestone shares"
on public.milestone_shares
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "Users can delete own milestone shares" on public.milestone_shares;
create policy "Users can delete own milestone shares"
on public.milestone_shares
for delete
to authenticated
using (user_id = auth.uid());

create index if not exists idx_friend_connections_requester on public.friend_connections(requester_id);
create index if not exists idx_friend_connections_addressee on public.friend_connections(addressee_id);
create index if not exists idx_friend_connections_status on public.friend_connections(status);
create index if not exists idx_milestone_shares_user_id on public.milestone_shares(user_id);
create index if not exists idx_milestone_shares_visibility on public.milestone_shares(visibility);

drop trigger if exists set_friend_connections_updated_at on public.friend_connections;
create trigger set_friend_connections_updated_at
before update on public.friend_connections
for each row
execute function public.set_updated_at();
