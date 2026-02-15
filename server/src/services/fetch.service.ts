import axios from "axios";

export async function fetchHtml(url: string): Promise<string> {
  const res = await axios.get(url, {
    timeout: 8000,
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  return res.data;
}
