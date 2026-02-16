import { Link } from "react-router-dom";

export default function Layout({ children }: any) {
  return (
    <div style={{ maxWidth: 900, margin: "40px auto", fontFamily: "sans-serif" }}>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/history">History</Link>
        <Link to="/status">Status</Link>
      </nav>
      {children}
    </div>
  );
}
