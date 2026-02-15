export default function ErrorBox({ error }: any) {
  return (
    <div style={{ background: "#ffecec", padding: 15, marginTop: 15 }}>
      <strong>⚠️ {error.message}</strong>

      {error.skippedSources && (
        <>
          <p>Skipped sources:</p>
          <ul>
            {error.skippedSources.map((s: string, i: number) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </>
      )}

      {error.suggestion && <p>{error.suggestion}</p>}
    </div>
  );
}
