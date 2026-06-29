export default function TermsOfService() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-slate-700">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-slate-500 mb-10">Last updated: May 2026</p>

      <section className="space-y-6 text-sm leading-relaxed">
        <div>
          <p>These Terms of Service govern your use of our recruiting platform. By submitting your information, you agree to these terms.</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">1. Acceptance of Terms</h2>
          <p>By submitting your information through this website, you agree to these Terms of Service. If you do not agree, do not submit your information.</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">2. SMS Consent</h2>
          <p>By checking the SMS consent box and submitting our form, you consent to receive recurring automated SMS messages regarding sales career opportunities. Consent is not a condition of employment or any purchase.</p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>Reply <strong>STOP</strong> to unsubscribe at any time.</li>
            <li><strong>For help:</strong> Reply <strong>HELP</strong> or email <a href="mailto:YOUR_EMAIL@yourdomain.com" className="underline">YOUR_EMAIL@yourdomain.com</a>.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">3. Contact</h2>
          <p>Email: <a href="mailto:YOUR_EMAIL@yourdomain.com" className="underline">YOUR_EMAIL@yourdomain.com</a></p>
        </div>
      </section>
    </main>
  );
}
