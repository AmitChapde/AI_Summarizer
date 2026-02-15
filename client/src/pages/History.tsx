import { useEffect, useState } from "react";
import { getHistory } from "../api/client";
import type { ResearchBrief } from "../types/research";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [data, setData] = useState<ResearchBrief[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const res = await getHistory();

  
        if (res.status === "success") {
          setData(res.data);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error("History load failed", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p>Loading history...</p>;

  if (!data.length) {
    return <p>No research briefs yet. Generate one from the home page.</p>;
  }

  return (
    <div>
      <h2>Last 5 Briefs</h2>
      {data.map((b, i) => (
        <div
          key={i}
          style={{ cursor: "pointer", marginBottom: 20 }}
          onClick={() => navigate("/result", { state: b })}
        >
          <strong>Summary:</strong>
          <p>{b.summary.slice(0, 150)}...</p>
        </div>
      ))}
    </div>
  );
}
