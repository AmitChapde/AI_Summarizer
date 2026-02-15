import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postBrief } from "../api/client";
import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox";

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const urls = input
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    if (!urls.length) {
      setError({ message: "Please enter at least one URL." });
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await postBrief(urls);

      if (res.status === "success") {
        navigate("/result", { state: res.data });
      } else {
        setError(res);
      }
    } catch (err: any) {
      setError({
        message: err.response?.data?.message || "Failed to generate brief.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Research Brief Generator</h2>
      <p style={{ fontSize: 12, color: "#666" }}>
        Works best with Wikipedia, blogs, and documentation sites.
      </p>
      <textarea
        rows={8}
        style={{ width: "100%" }}
        placeholder="Paste 5–10 URLs (one per line)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        Generate
      </button>
      {loading && <Loader />}
      {error && <ErrorBox error={error} />}
    </div>
  );
}
