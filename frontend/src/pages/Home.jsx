import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import FeatureCards from "../components/FeatureCards.jsx";
import URLInput from "../components/URLInput.jsx";
import { isLikelyUrl } from "../utils/url.js";
import { posters } from "../assets/images.js";

export default function Home() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function submit(event) {
    event.preventDefault();
    if (!isLikelyUrl(url)) {
      setError("Enter a valid URL before analysis.");
      return;
    }
    navigate(`/detect?url=${encodeURIComponent(url)}`);
  }

  return (
    <main>
      <section className="hero-media relative min-h-[calc(100vh-68px)] overflow-hidden">
        <AnimatedBackground />
        <div className="relative mx-auto flex min-h-[calc(100vh-68px)] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-sm font-bold text-cyan-200">
              AI-powered phishing URL defense
            </p>
            <h1 className="text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">SentinelURL</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
              Analyze suspicious links with transformer inference, Gemini explanations, risk scoring, and practical security guidance in one professional dashboard.
            </p>
          </motion.div>
          <div className="mt-8 max-w-4xl">
            <URLInput value={url} setValue={setUrl} onSubmit={submit} loading={false} error={error} />
          </div>
          <div className="mt-10 grid max-w-3xl grid-cols-3 gap-3 text-white">
            <Stat value="60/min" label="Rate limit" />
            <Stat value="AI" label="Model assisted" />
            <Stat value="PDF" label="Reports" />
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-black">Security Intelligence Features</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Built for quick triage, clear decisions, and better cyber awareness.</p>
        </div>
        <FeatureCards />
      </section>

      <section className="bg-slate-100 py-16 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-black">Cyber Awareness</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {posters.map((poster) => (
              <article key={poster.title} className={`${poster.className} min-h-72 overflow-hidden rounded-lg bg-cover bg-center`}>
                <div className="flex h-full min-h-72 flex-col justify-end bg-gradient-to-t from-slate-950/90 to-transparent p-5 text-white">
                  <h3 className="text-xl font-black">{poster.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{poster.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
      <p className="text-2xl font-black">{value}</p>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">{label}</p>
    </div>
  );
}

