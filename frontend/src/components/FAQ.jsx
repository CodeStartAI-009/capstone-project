const faqs = [
  ["What is phishing?", "Phishing is a fraud technique that tricks people into revealing passwords, payment details, or personal data."],
  ["Does HTTPS mean safe?", "No. HTTPS protects the connection, but a malicious website can still use HTTPS."],
  ["How does AI help?", "AI learns patterns from malicious and benign URLs, then combines those signals with URL structure and risk rules."],
];

export default function FAQ() {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-white/5">
      {faqs.map(([question, answer]) => (
        <details key={question} className="group p-4">
          <summary className="cursor-pointer font-extrabold">{question}</summary>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{answer}</p>
        </details>
      ))}
    </div>
  );
}

