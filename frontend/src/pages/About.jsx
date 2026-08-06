import FAQ from "../components/FAQ.jsx";

const phishingTypes = [
  ["URL phishing", "Fake domains and lookalike login pages that steal credentials."],
  ["Email phishing", "Messages that impersonate trusted brands, coworkers, or payment providers."],
  ["SMS phishing", "Text messages that push urgent links for payments, deliveries, or account recovery."],
  ["QR phishing", "Codes that hide malicious destinations behind a quick scan."],
];

export default function About() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-cyan-500">About phishing</p>
          <h1 className="mt-2 text-4xl font-black">AI support for safer link decisions</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Phishing tries to make a malicious destination feel familiar, urgent, or trustworthy. SentinelURL combines model prediction, URL structure, and AI-generated guidance so users can understand the risk before they click or sign in.
          </p>
        </div>
        <div className="min-h-80 rounded-lg bg-cover bg-center shadow-glow" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=1200&q=80')" }} />
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-2">
        {phishingTypes.map(([title, text]) => (
          <article key={title} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <h2 className="text-xl font-black">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
          </article>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="mb-6 text-center text-3xl font-black">How AI detects phishing</h2>
        <div className="mx-auto max-w-4xl rounded-lg border border-slate-200 bg-white p-6 leading-7 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          Transformer models learn patterns from known malicious and legitimate URLs. The backend also checks interpretable signals such as domain length, suspicious keywords, HTTPS usage, special characters, subdomains, IP-based hosts, and URL complexity.
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-6 text-center text-3xl font-black">FAQ</h2>
        <FAQ />
      </section>
    </main>
  );
}

