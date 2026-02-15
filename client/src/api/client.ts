import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function postBrief(urls: string[]) {
  const res = await api.post("/api/brief", { urls });
  return res.data; 
}

export async function getHistory() {
  const res = await api.get("/api/brief");
  return res.data;
}

export async function getStatus() {
  const res = await api.get("/api/health");
  return res.data;
}

export default api;
