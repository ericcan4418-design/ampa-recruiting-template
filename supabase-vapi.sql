-- Vapi calls log table
CREATE TABLE IF NOT EXISTS vapi_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id text UNIQUE,
  candidate_phone text,
  assistant_id text,
  duration_seconds integer,
  ended_reason text,
  outcome text,
  commission_confirmed boolean,
  hours_confirmed boolean,
  travel_confirmed boolean,
  insurance_confirmed boolean,
  why_sales text,
  goal text,
  start_date text,
  disqualify_reason text,
  notes text,
  ai_summary text,
  full_transcript text,
  recording_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS vapi_outcome text,
  ADD COLUMN IF NOT EXISTS vapi_notes text,
  ADD COLUMN IF NOT EXISTS vapi_called_at timestamptz;

CREATE INDEX IF NOT EXISTS vapi_calls_phone_idx ON vapi_calls(candidate_phone);
