import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const RETRY_DELAYS_HOURS: Record<number, number> = {
  1: 1,
  2: 3,
  3: 24,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const msg = body.message;
    if (!msg) return NextResponse.json({ ok: true });

    const callId = msg.call?.id;
    const phone = msg.call?.customer?.number;

    if (msg.type === 'call-start') {
      if (phone) {
        await supabase.from('leads').update({
          call_status: 'calling',
          last_call_at: new Date().toISOString(),
          next_retry_at: null,
        }).eq('phone', phone);
      }
    }

    if (msg.type === 'end-of-call-report') {
      const endedReason = msg.endedReason || 'unknown';
      const transcript = msg.transcript || null;
      const summary = msg.analysis?.summary || null;
      const structuredData = msg.analysis?.structuredData || {};
      const duration = msg.call?.endedAt && msg.call?.startedAt
        ? Math.round((new Date(msg.call.endedAt).getTime() - new Date(msg.call.startedAt).getTime()) / 1000)
        : null;

      await supabase.from('vapi_calls').upsert({
        call_id: callId,
        candidate_phone: phone,
        assistantId: process.env.VAPI_ASSISTANT_ID!,
        duration_seconds: duration,
        ended_reason: endedReason,
        outcome: structuredData.outcome || endedReason,
        commission_confirmed: structuredData.commission_confirmed ?? null,
        hours_confirmed: structuredData.hours_confirmed ?? null,
        travel_confirmed: structuredData.travel_confirmed ?? null,
        insurance_confirmed: structuredData.insurance_confirmed ?? null,
        why_sales: structuredData.why_sales || null,
        goal: structuredData.goal || null,
        start_date: structuredData.start_date || null,
        disqualify_reason: structuredData.disqualify_reason || null,
        notes: structuredData.notes || null,
        ai_summary: summary,
        full_transcript: transcript,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'call_id' });

      if (phone) {
        const noAnswer = ['no-answer', 'voicemail', 'busy', 'no_answer'].includes(endedReason);

        if (noAnswer) {
          const { data: lead } = await supabase.from('leads').select('id, call_attempts').eq('phone', phone).single();
          if (lead) {
            const attempts = (lead.call_attempts || 0) + 1;
            const retryDelayHours = RETRY_DELAYS_HOURS[attempts];
            const nextRetryAt = retryDelayHours
              ? new Date(Date.now() + retryDelayHours * 3600 * 1000).toISOString()
              : null;

            await supabase.from('leads').update({
              call_status: attempts >= 4 ? 'failed' : endedReason,
              call_attempts: attempts,
              last_call_at: new Date().toISOString(),
              next_retry_at: nextRetryAt,
              vapi_called_at: new Date().toISOString(),
            }).eq('id', lead.id);
          }
        } else {
          const outcome = structuredData.outcome || endedReason;
          await supabase.from('leads').update({
            vapi_outcome: outcome,
            vapi_notes: summary,
            vapi_called_at: new Date().toISOString(),
            call_status: outcome,
          }).eq('phone', phone);
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('vapi-webhook error:', err);
    return NextResponse.json({ ok: true });
  }
}
