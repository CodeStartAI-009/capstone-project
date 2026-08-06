import {
  BoltIcon,
  ChartPieIcon,
  CpuChipIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "../animations/motion.js";

const features = [
  ["AI Detection", "Transformer-backed URL classification with graceful heuristic fallback.", CpuChipIcon],
  ["Gemini AI", "Plain-language risk explanation, safety tips, and immediate actions.", SparklesIcon],
  ["Fast Prediction", "A single API flow returns confidence, risk, and technical indicators.", BoltIcon],
  ["Privacy", "API keys stay server-side and local browser history remains on your device.", LockClosedIcon],
  ["Cyber Awareness", "Security advice designed for everyday decisions, not vague alerts.", ShieldCheckIcon],
  ["Threat Charts", "History visualizations for risk distribution and categories.", ChartPieIcon],
];

export default function FeatureCards() {
  return (
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {features.map(([title, text, Icon]) => (
        <motion.article key={title} variants={fadeUp} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <Icon className="mb-4 h-8 w-8 text-cyan-500" />
          <h3 className="text-lg font-extrabold">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
        </motion.article>
      ))}
    </motion.div>
  );
}
