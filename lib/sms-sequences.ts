export type SmsTouch = {
  touchNumber: number;
  delayHours: number;
  message: string; // use {{firstName}} as placeholder
  sendHour: number;
};

export const SMS_SEQUENCE: SmsTouch[] = [
  { touchNumber: 1, delayHours: 0, sendHour: 0, message: "Hey {{firstName}}! This is the recruiting team. Saw you filled out our form — super excited to connect. Are you still open to hearing more about the opportunity? Reply YES or NO" },
  { touchNumber: 2, delayHours: 2, sendHour: 14, message: "Hey {{firstName}} — just following up. If you want to know more about what we're doing and how much our reps are making, reply TELL ME MORE" },
  { touchNumber: 3, delayHours: 24, sendHour: 10, message: "Real talk {{firstName}} — most people we bring on have zero sales experience. We train everything from scratch. What matters is you're coachable and hungry. Is that you?" },
  { touchNumber: 4, delayHours: 72, sendHour: 14, message: "{{firstName}} — one of our reps was working a regular 9-5 six months ago. Last month he cleared $9,400. Commission only. No ceiling. Just wanted you to see what's possible." },
  { touchNumber: 5, delayHours: 120, sendHour: 11, message: "{{firstName}} quick checklist: If you can YES to these 3, we should hop on a call:\n✅ Cool with 1099/commission\n✅ Able to travel for work\n✅ 18+\nReply YES to get the call link." },
  { touchNumber: 6, delayHours: 192, sendHour: 16, message: "{{firstName}} — I'll be honest. Most people don't reply because they think 'I'm not a salesperson.' Our top reps said the same thing before they started. What's holding you back?" },
  { touchNumber: 7, delayHours: 336, sendHour: 18, message: "{{firstName}} — gonna close out your file after today. If you're still curious, reply IN and I'll hold your spot. After this I won't bug you." },
  { touchNumber: 8, delayHours: 504, sendHour: 11, message: "Hey {{firstName}} — we're kicking off a new group next week and have a few spots open. Still open to a quick chat? Reply BACK and let's connect." },
  { touchNumber: 9, delayHours: 720, sendHour: 14, message: "{{firstName}} — summer's our biggest season and we're building out teams right now. If you've been thinking about it, now's the time. Reply YES to get more info." },
  { touchNumber: 10, delayHours: 1440, sendHour: 11, message: "Hey {{firstName}}, last check-in. If you're ever ready to explore a serious income opportunity with full training — we're here. Just reply READY whenever the timing's right." },
];

export function interpolateMessage(template: string, vars: { firstName: string }): string {
  return template.replace(/\{\{firstName\}\}/g, vars.firstName);
}
