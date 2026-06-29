-- Base Schema
-- Run this in your Supabase SQL editor

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  first_name  text not null,
  last_name   text not null,
  phone       text not null,
  email       text not null,
  state       text not null,
  vertical    text not null check (
                vertical in ('Pest Control', 'Solar', 'Insurance', 'Not Sure Yet')
              ),
  has_experience boolean not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
alter table public.leads enable row level security;

create policy "service_role_all_leads"
  on public.leads
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create table if not exists public.signed_reps (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  vertical    text not null,
  region      text not null,
  start_date  date not null,
  phone       text not null,
  email       text not null,
  created_at  timestamptz not null default now()
);

create index if not exists signed_reps_created_at_idx on public.signed_reps (created_at desc);
alter table public.signed_reps enable row level security;

create policy "service_role_all_signed_reps"
  on public.signed_reps
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
