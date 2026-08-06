import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api",
  timeout: 30000,
});

export async function predictUrl(url, signal) {
  const { data } = await api.post("/predict/", { url }, { signal });
  return data;
}

