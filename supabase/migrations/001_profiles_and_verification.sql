-- Run this in the Supabase SQL editor (or via `supabase db push`)

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  whatsapp_number text not null,               -- E.164 format e.g. +2348012345678, contact info only (not OTP-verified)
  role text not null default 'customer',       -- customer | admin | agent
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- users can read/update only their own profile
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- auto-create a profile row whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, whatsapp_number)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'whatsapp_number', '')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- convenience view: is this user fully verified (email only — no WhatsApp OTP provider used)?
create or replace view public.user_verification_status as
select
  u.id,
  u.email_confirmed_at is not null as email_verified,
  (u.email_confirmed_at is not null) as fully_verified
from auth.users u
join public.profiles p on p.id = u.id;
