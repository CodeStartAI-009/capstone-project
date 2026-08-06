import ContactForm from "../components/ContactForm.jsx";

export default function Contact() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-cyan-500">Contact</p>
        <h1 className="mt-2 text-4xl font-black">Send a security question</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Use this form for demo feedback, integration questions, or cybersecurity awareness requests.
        </p>
      </div>
      <ContactForm />
    </main>
  );
}

