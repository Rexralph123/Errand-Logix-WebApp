-- Run this in the Supabase SQL editor (or via `supabase db push`)

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  whatsapp_number text not null,               -- E.164 format e.g. +2348012345678, contact info only (not OTP-verified)
  role text not null default 'customer'
    check (role in ('customer', 'admin', 'agent')),

  -- Complete Profile step
  address text,
  area text,
  landmark text,
  avatar_url text,
  profile_complete boolean not null default false,

  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- users can read their own profile
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

-- users can update their own profile, EXCEPT the `role` column.
-- Postgres doesn't support column-level RLS directly, so we enforce
-- it with a trigger instead: any update that tries to change `role`
-- gets silently reset back to whatever was already stored.
create or replace function public.prevent_role_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role then
    new.role := old.role;
  end if;
  return new;
end;
$$;

drop trigger if exists lock_role_column on public.profiles;
create trigger lock_role_column
  before update on public.profiles
  for each row execute procedure public.prevent_role_change();

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- auto-create a profile row whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, whatsapp_number)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'whatsapp_number', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- convenience view: is this user fully verified (email only — no WhatsApp OTP provider used)?
-- Restricted to the calling user's own row so it's safe to expose via the API.
create or replace view public.user_verification_status as
select
  u.id,
  u.email_confirmed_at is not null as email_verified,
  (u.email_confirmed_at is not null) as fully_verified
from auth.users u
join public.profiles p on p.id = u.id
where u.id = auth.uid();