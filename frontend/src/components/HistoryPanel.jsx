export default function HistoryPanel({ items, search, setSearch, onSelect, onClear }) {
  const filtered = items.filter((item) => item.url.toLowerCase().includes(search.toLowerCase()));
  return (
    <aside className="glass rounded-lg p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-extrabold">Recent Analyses</h3>
        <button onClick={onClear} className="focus-ring rounded-lg px-3 py-1 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10">
          Clear
        </button>
      </div>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search previous URLs"
        className="focus-ring mb-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-950"
      />
      <div className="max-h-[520px] space-y-2 overflow-auto pr-1">
        {filtered.length === 0 && <p className="text-sm text-slate-500">No history yet.</p>}
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="focus-ring w-full rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:border-cyan-400 dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex items-center justify-between gap-3">
              <span className={`text-xs font-black ${item.prediction === "Phishing" ? "text-red-400" : "text-green-400"}`}>
                {item.prediction}
              </span>
              <span className="text-xs text-slate-500">{item.risk}</span>
            </div>
            <p className="mt-1 truncate text-sm font-semibold">{item.url}</p>
          </button>
        ))}
      </div>
    </aside>
  );
}

