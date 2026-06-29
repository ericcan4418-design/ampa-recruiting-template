-- Retry Queue Migration
-- Adds call tracking columns to leads table

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS call_attempts      integer   NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_call_at       timestamptz,
  ADD COLUMN IF NOT EXISTS next_retry_at      timestamptz,
  ADD COLUMN IF NOT EXISTS call_status        text;

CREATE INDEX IF NOT EXISTS leads_retry_idx ON leads (next_retry_at)
  WHERE call_status IN ('no_answer', 'voicemail', 'busy') AND call_attempts < 4;
