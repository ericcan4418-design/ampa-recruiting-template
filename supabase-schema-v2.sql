-- Schema v2 - SMS Automation additions

alter table public.leads
  add column if not exists status text not null default 'active',
  add column if not exists touch_number integer not null default 0,
  add column if not exists next_touch_at timestamptz,
  add column if not exists sms_sequence_started_at timestamptz,
  add column if not exists opted_out boolean not null default false,
  add column if not exists replied boolean not null default false,
  add column if not exists zoom_booked boolean not null default false;

create index if not exists idx_leads_sms_cron
  on public.leads (status, opted_out, replied, next_touch_at)
  where status = 'active' and opted_out = false and replied = false;

create table if not exists public.sms_replies (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id),
  from_number text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.sms_replies enable row level security;

create policy "service_role_all_sms_replies"
  on public.sms_replies for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
