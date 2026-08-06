import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { sampleUrls } from "../utils/url.js";

export default function URLInput({ value, setValue, onSubmit, loading, error, compact = false }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-label="URL analysis form">
      <div className={`glass flex flex-col gap-3 rounded-lg p-3 shadow-glow ${compact ? "lg:flex-row" : "sm:flex-row"}`}>
        <label className="sr-only" htmlFor="url-input">
          URL to analyze
        </label>
        <input
          id="url-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="https://paypal-login-secure.com"
          className="focus-ring min-h-12 flex-1 rounded-lg border border-slate-200 bg-white px-4 text-base text-slate-950 placeholder:text-slate-400 dark:border-white/10 dark:bg-slate-950/80 dark:text-white"
          disabled={loading}
          autoComplete="url"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="focus-ring inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-400 px-5 font-extrabold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            {loading ? "Analyzing" : "Analyze URL"}
          </button>
          <button
            type="button"
            onClick={() => setValue("")}
            className="focus-ring inline-flex h-12 w-12 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-white"
            title="Clear"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      {error && <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}
      <div className="flex flex-wrap gap-2">
        {sampleUrls.map((sample) => (
          <button
            key={sample}
            type="button"
            onClick={() => setValue(sample)}
            className="focus-ring rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-cyan-400 hover:text-cyan-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          >
            {sample}
          </button>
        ))}
      </div>
    </form>
  );
}

