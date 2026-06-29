# ampa-recruiting-template

A Next.js 14 recruiting funnel with automated SMS drip and AI voice screening.

## What Happens When Someone Submits the Form

1. Lead is inserted into Supabase (`leads` table)
2. Touch 1 SMS fires immediately (Twilio)
3. Pre-call SMS fires 10 seconds later
4. AI voice agent calls them within 60 seconds (Vapi)
5. 10-touch SMS drip sequence starts running in the background

## Setup

1. Clone this repo
2. Copy `.env.example` to `.env.local` and fill in your credentials
3. Run `npm install`
4. Run the SQL migrations in Supabase (see `supabase-schema.sql`, `supabase-schema-v2.sql`, `supabase-vapi.sql`, `supabase-retry.sql`)
5. Run `npm run dev`

## Key Files

```
app/
  page.tsx                    — Main landing page
  dashboard/page.tsx          — Lead CRM dashboard
  api/
    submit-lead/route.ts      — Form submission handler
    sms-cron/route.ts         — Hourly cron: fires next SMS drip touch
    sms-reply/route.ts        — Handles STOP/HELP/YES inbound SMS
    vapi-webhook/route.ts     — Vapi call events → logs to DB
    vapi-tools/route.ts       — AI mid-call tool calls
    vapi-retry-cron/route.ts  — Auto-retries no-answer leads
    signed-rep/route.ts       — GHL webhook → signed rep CRM
lib/
  sms-sequences.ts            — All 10 SMS messages
  supabase.ts                 — Supabase client
```

## Stack

- **Framework:** Next.js 14, TypeScript, Tailwind CSS
- **Hosting:** Vercel
- **Database:** Supabase
- **SMS:** Twilio
- **AI Voice:** Vapi.ai
