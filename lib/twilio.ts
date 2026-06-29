import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const apiKey = process.env.TWILIO_API_KEY!;
const apiSecret = process.env.TWILIO_API_SECRET!;
const fromNumber = process.env.TWILIO_PHONE_NUMBER!;

const client = twilio(apiKey, apiSecret, { accountSid });

export function toE164(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("1") && digits.length === 11) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  return `+${digits}`;
}

export async function sendSms(to: string, body: string): Promise<void> {
  await client.messages.create({ to: toE164(to), from: fromNumber, body });
}
