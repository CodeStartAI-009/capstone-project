import { motion } from "framer-motion";

export default function RiskMeter({ score = 0, risk = "Low" }) {
  const color = score >= 75 ? "bg-red-500" : score >= 50 ? "bg-amber-400" : score >= 25 ? "bg-yellow-300" : "bg-green-400";
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Risk Meter</span>
        <span className="text-sm font-extrabold">{risk}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <motion.div
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <div className="mt-3 text-3xl font-black">{score}<span className="text-base text-slate-500">/100</span></div>
    </div>
  );
}

