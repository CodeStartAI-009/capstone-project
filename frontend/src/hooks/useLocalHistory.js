import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "sentinel-url-history";

export default function useLocalHistory() {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 30)));
  }, [items]);

  const api = useMemo(
    () => ({
      items,
      add: (result) =>
        setItems((current) => [
          { ...result, id: crypto.randomUUID(), createdAt: new Date().toISOString(), bookmarked: false },
          ...current.filter((item) => item.url !== result.url),
        ]),
      clear: () => setItems([]),
      toggleBookmark: (id) =>
        setItems((current) =>
          current.map((item) => (item.id === id ? { ...item, bookmarked: !item.bookmarked } : item))
        ),
    }),
    [items]
  );

  return api;
}

