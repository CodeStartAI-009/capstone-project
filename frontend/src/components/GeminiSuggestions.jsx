import { SparklesIcon } from "@heroicons/react/24/solid";

function List({ title, items }) {
  return (
    <div>
      <h4 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-cyan-500">{title}</h4>
      <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
        {(items || []).map((item) => (
          <li key={item} className="rounded-lg bg-slate-100 px-3 py-2 dark:bg-white/5">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function GeminiSuggestions({ gemini }) {
  return (
    <section className="glass rounded-lg p-5">
      <div className="mb-4 flex items-center gap-2">
        <SparklesIcon className="h-5 w-5 text-cyan-400" />
        <h3 className="text-lg font-extrabold">Gemini Recommendation</h3>
      </div>
      <p className="mb-5 text-sm leading-6 text-slate-700 dark:text-slate-300">{gemini?.summary}</p>
      <div className="grid gap-4 md:grid-cols-3">
        <List title="Actions" items={gemini?.recommendations} />
        <List title="Precautions" items={gemini?.precautions} />
        <List title="Safety Tips" items={gemini?.safety_tips} />
      </div>
    </section>
  );
}

