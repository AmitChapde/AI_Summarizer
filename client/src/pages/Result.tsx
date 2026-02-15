import { useLocation } from "react-router-dom";
import type { ResearchBrief } from "../types/research";
import "../styles/global.css"; 

export default function Result() {
  const location = useLocation();
  const data = location.state as ResearchBrief;

  if (!data) {
    return (
      <div>
        <p>No result found. Please generate a new brief.</p>
        <button className="back-button" onClick={() => window.location.href = "/"}>
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Summary</h2>
      <p>{data.summary}</p>

      <h3>Key Points</h3>
      <ul>
        {data.keyPoints.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>

      <h3>Conflicts</h3>
      <ul>
        {data.conflicts.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>

      <h3>What to Verify</h3>
      <ul>
        {data.checklist.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>

      <h3>Sources</h3>
      {data.sources.map((s, i) => (
        <div key={i} style={{ marginBottom: 15 }}>
          <a href={s.url} target="_blank" rel="noreferrer">
            {s.url}
          </a>
          <p>{s.snippet}...</p>
        </div>
      ))}

      {(data.skippedSources?.length ?? 0) > 0 && (
        <p style={{ color: "orange" }}>
          ⚠️ Some sources could not be analyzed due to dynamic content.
        </p>
      )}

      <button className="back-button" onClick={() => window.location.href = "/"}>
        ← Back
      </button>
    </div>
  );
}
