import { NextRequest, NextResponse } from "next/server";
import type { SubmitLeadPayload, ApiResponse, GHLWebhookPayload } from "@/lib/types";
import { sendSms } from "@/lib/twilio";
import { SMS_SEQUENCE, interpolateMessage } from "@/lib/sms-sequences";

export async function POST(req: NextRequest) {
  try {
    const body: SubmitLeadPayload = await req.json();

    const required: (keyof SubmitLeadPayload)[] = ["firstName", "lastName", "phone", "email", "state", "vertical"];
    for (const field of required) {
      if (!body[field] && body[field] !== false) {
        return NextResponse.json<ApiResponse>({ success: false, error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(body.email)) {
      return NextResponse.json<ApiResponse>({ success: false, error: "Invalid email address" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseServiceKey) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const adminClient = createClient(supabaseUrl, supabaseServiceKey, { auth: { autoRefreshToken: false, persistSession: false } });

        const now = new Date();
        const touch2 = SMS_SEQUENCE.find((t) => t.touchNumber === 2);
        const nextTouchAt = touch2 ? new Date(now.getTime() + touch2.delayHours * 60 * 60 * 1000).toISOString() : null;

        await adminClient.from("leads").insert({
          first_name: body.firstName, last_name: body.lastName,
          phone: body.phone, email: body.email,
          state: body.state, vertical: body.vertical,
          has_experience: body.hasExperience,
          status: "active", touch_number: 1,
          next_touch_at: nextTouchAt,
          sms_sequence_started_at: now.toISOString(),
          call_attempts: 0, call_status: 'calling',
          last_call_at: now.toISOString(),
        });

        try {
          const touch1 = SMS_SEQUENCE.find((t) => t.touchNumber === 1);
          if (touch1) {
            const message = interpolateMessage(touch1.message, { firstName: body.firstName });
            await sendSms(body.phone, message);
          }
        } catch (smsErr) {
          console.error("[submit-lead] Failed to send Touch 1 SMS:", smsErr);
        }
      } catch (err) {
        console.error("[submit-lead] Supabase client error:", err);
      }
    }

    // Fire Vapi AI interview call
    const vapiKey = process.env.VAPI_API_KEY;
    if (vapiKey) {
      try {
        await sendSms(body.phone, `Hey ${body.firstName} — you're about to receive an automated AI screening call. Pick up — it's a quick 5-min qualifier!`);
        await new Promise((r) => setTimeout(r, 3000));

        const vapiRes = await fetch('https://api.vapi.ai/call', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${vapiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assistantId: process.env.VAPI_ASSISTANT_ID!,
            customer: { number: body.phone, name: `${body.firstName} ${body.lastName}` },
            assistantOverrides: {
              variableValues: {
                first_name: body.firstName, vertical: body.vertical,
                can_travel: body.canTravel ? 'yes' : 'no',
              },
            },
          }),
          signal: AbortSignal.timeout(10000),
        });

        if (!vapiRes.ok) console.error(`[submit-lead] Vapi call failed: ${vapiRes.status}`);
      } catch (vapiErr) {
        console.error('[submit-lead] Vapi trigger error:', vapiErr);
      }
    }

    const ghlWebhookUrl = process.env.GHL_WEBHOOK_URL;
    if (ghlWebhookUrl) {
      try {
        const tags: string[] = [body.vertical];
        if (body.hasExperience) tags.push("Has D2D Experience");
        const ghlPayload: GHLWebhookPayload = {
          firstName: body.firstName, lastName: body.lastName,
          phone: body.phone, email: body.email, tags,
          customFields: { state: body.state, has_experience: body.hasExperience },
        };
        await fetch(ghlWebhookUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(ghlPayload), signal: AbortSignal.timeout(8000) });
      } catch (err) {
        console.error("[submit-lead] GHL webhook error:", err);
      }
    }

    return NextResponse.json<ApiResponse>({ success: true });
  } catch (err) {
    console.error("[submit-lead] Unhandled error:", err);
    return NextResponse.json<ApiResponse>({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, route: "submit-lead" });
}
