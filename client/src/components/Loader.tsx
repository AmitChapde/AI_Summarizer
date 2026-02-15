

import { useEffect, useState } from "react";

const steps = [
  "🔍 Fetching sources...",
  "🧠 Analyzing content...",
  "✨ Generating research brief..."
];

export default function Loader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(s => (s + 1) % steps.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return <p>{steps[step]}</p>;
}
