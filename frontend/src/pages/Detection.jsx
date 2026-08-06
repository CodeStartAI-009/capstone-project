import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Charts from "../components/Charts.jsx";
import HistoryPanel from "../components/HistoryPanel.jsx";
import Loader from "../components/Loader.jsx";
import ResultCard from "../components/ResultCard.jsx";
import URLInput from "../components/URLInput.jsx";
import useLocalHistory from "../hooks/useLocalHistory.js";
import { predictUrl } from "../services/api.js";
import { isLikelyUrl } from "../utils/url.js";

export default function Detection() {
  const [params] = useSearchParams();
  const [url, setUrl] = useState(params.get("url") || "");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const history = useLocalHistory();
  const inFlightUrl = useRef("");

  const selectedResult = useMemo(() => result, [result]);

  async function analyze(event) {
    event?.preventDefault();
    if (!isLikelyUrl(url)) {
      setError("Enter a valid URL such as https://example.com.");
      return;
    }
    if (loading || inFlightUrl.current === url.trim()) return;
    const controller = new AbortController();
    setLoading(true);
    setError("");
    inFlightUrl.current = url.trim();
    try {
      const data = await predictUrl(url, controller.signal);
      history.add(data);
      setResult(data);
    } catch (err) {
      const message = err.response?.data?.detail || "Network or analysis error. Check that the Django backend is running.";
      setError(message);
    } finally {
      setLoading(false);
      inFlightUrl.current = "";
    }
  }

  useEffect(() => {
    if (params.get("url")) {
      analyze();
    }
  }, []);

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
      <section className="space-y-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-cyan-500">Detection Console</p>
          <h1 className="mt-2 text-4xl font-black">Analyze suspicious URLs</h1>
        </div>
        <URLInput value={url} setValue={setUrl} onSubmit={analyze} loading={loading} error={error} compact />
        {loading && <Loader />}
        {!loading && selectedResult && <ResultCard result={selectedResult} />}
        {!loading && !selectedResult && (
          <div className="glass rounded-lg p-8 text-center">
            <p className="text-lg font-extrabold">No analysis yet</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Paste a URL or choose a sample to start.</p>
          </div>
        )}
        {history.items.length > 0 && <Charts history={history.items} />}
      </section>
      <HistoryPanel
        items={history.items}
        search={search}
        setSearch={setSearch}
        onSelect={(item) => {
          setResult(item);
          setUrl(item.url);
        }}
        onClear={history.clear}
      />
    </main>
  );
}

