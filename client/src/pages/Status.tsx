import { useEffect, useState } from "react";
import { getStatus } from "../api/client";

export default function Status() {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    getStatus().then((res) => setStatus(res));
  }, []);

  if (!status) return <p>Loading...</p>;

  return (
    <div>
      <h2>System Status</h2>
      <p>Backend: {status.backend === "ok" ? "✅ Operational" : "❌ Down"}</p>
      <p>Database: {status.database === "ok" ? "✅ Connected" : "❌ Down"}</p>
      <p>LLM: {status.llm === "ok" ? "✅ Ready" : "❌ Unavailable"}</p>
    </div>
  );
}
