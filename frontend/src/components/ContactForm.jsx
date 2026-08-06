import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="glass mx-auto max-w-2xl rounded-lg p-5"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" />
        <Field label="Email" name="email" type="email" />
      </div>
      <label className="mt-4 block text-sm font-bold">
        Message
        <textarea className="focus-ring mt-2 min-h-32 w-full rounded-lg border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-slate-950" required />
      </label>
      <button className="focus-ring mt-4 rounded-lg bg-cyan-400 px-5 py-3 font-extrabold text-slate-950">Send Message</button>
      {sent && <p className="mt-3 text-sm text-green-400">Message captured locally for this demo.</p>}
    </form>
  );
}

function Field({ label, name, type = "text" }) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <input name={name} type={type} className="focus-ring mt-2 w-full rounded-lg border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-slate-950" required />
    </label>
  );
}

