-- GoodLoop v0.2
-- Für bestehende Installationen mit supabase/schema.sql aus v0.1/v0.2 sind normalerweise keine neuen Tabellen nötig.
-- Diese Migration ist bewusst defensiv, damit sie nicht direkt beim zweiten Ausführen beleidigt umfällt.

alter table public.profiles
add column if not exists visibility text not null default 'private';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_visibility_check_v02'
  ) then
    alter table public.profiles
    add constraint profiles_visibility_check_v02
    check (visibility in ('private', 'friends', 'public'));
  end if;
end $$;
