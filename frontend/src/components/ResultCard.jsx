import { motion } from "framer-motion";
import { ClipboardDocumentIcon, DocumentArrowDownIcon, ShareIcon, StarIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import RiskMeter from "./RiskMeter.jsx";
import GeminiSuggestions from "./GeminiSuggestions.jsx";
import { downloadReport, shareResult } from "../utils/report.js";

export default function ResultCard({ result, onBookmark }) {
  const phishing = result.prediction === "Phishing";
  const tone = phishing ? "text-red-400" : "text-green-400";
  const Icon = phishing ? ExclamationTriangleIcon : CheckCircleIcon;

  async function copyResult() {
    await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
  }

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <section className="glass rounded-lg p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <Icon className={`h-12 w-12 ${tone}`} />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Detection Status
              </p>
              <h2 className={`text-3xl font-black ${tone}`}>{phishing ? "Warning" : "Safe"}</h2>
              <p className="mt-1 max-w-3xl break-all text-sm text-slate-600 dark:text-slate-300">{result.url}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={copyResult} className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 dark:border-white/10" title="Copy result">
              <ClipboardDocumentIcon className="h-5 w-5" />
            </button>
            <button onClick={() => downloadReport(result)} className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 dark:border-white/10" title="Download PDF">
              <DocumentArrowDownIcon className="h-5 w-5" />
            </button>
            <button onClick={() => shareResult(result)} className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 dark:border-white/10" title="Share result">
              <ShareIcon className="h-5 w-5" />
            </button>
            {onBookmark && (
              <button onClick={() => onBookmark(result.id)} className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 dark:border-white/10" title="Bookmark">
                <StarIcon className={`h-5 w-5 ${result.bookmarked ? "fill-yellow-300 text-yellow-300" : ""}`} />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Metric label="Prediction" value={result.prediction} />
        <Metric label="Confidence" value={`${result.confidence}%`} />
        <Metric label="Threat Category" value={result.threat_category} />
        <Metric label="Model Source" value={result.model_source} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <RiskMeter score={result.risk_score} risk={result.risk} />
        <FeatureGrid features={result.features} />
      </div>
      <GeminiSuggestions gemini={result.gemini} />
    </motion.div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 break-words text-xl font-black">{value}</p>
    </div>
  );
}

function FeatureGrid({ features }) {
  const rows = [
    ["SSL Status", features?.ssl_status],
    ["Domain Length", features?.domain_length],
    ["Special Characters", features?.special_characters],
    ["URL Complexity", features?.url_complexity],
    ["Subdomains", features?.subdomain_count],
    ["Suspicious Keywords", features?.suspicious_keywords?.join(", ") || "None found"],
  ];
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
      <h3 className="mb-3 font-extrabold">URL Intelligence</h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className="rounded-lg bg-slate-100 p-3 dark:bg-slate-950/60">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
            <p className="mt-1 break-words text-sm font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

