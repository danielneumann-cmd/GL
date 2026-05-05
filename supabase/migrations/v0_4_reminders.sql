-- =====================================================
-- GoodLoop v0.4 Reminder preparation
-- Run this if your database was created before v0.4.
-- =====================================================

alter table public.profiles
add column if not exists reminder_enabled boolean not null default false;

alter table public.profiles
add column if not exists reminder_time text not null default '09:00';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_reminder_time_check'
  ) then
    alter table public.profiles
    add constraint profiles_reminder_time_check
    check (reminder_time ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$');
  end if;
end $$;
