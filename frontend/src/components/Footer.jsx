import { CodeBracketIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 dark:border-white/10 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-slate-600 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="h-5 w-5 text-cyan-500" />
          <span>SentinelURL protects awareness, not paranoia.</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Privacy-first local history</span>
          <CodeBracketIcon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}
