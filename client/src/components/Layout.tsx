import { Link } from "react-router-dom";

export default function Layout({ children }: any) {
  return (
    <div style={{ maxWidth: 900, margin: "40px auto", fontFamily: "sans-serif" }}>
      <nav style={{ 
        marginBottom: 20, 
        display: "flex", 
        justifyContent: "space-around", 
        backgroundColor: "var(--color-primary)", 
        padding: "10px 0", 
        borderRadius: "5px" 
      }}>
        <Link to="/" style={{ color: "var(--color-bg)", textDecoration: "none" }}>Home</Link>
        <Link to="/history" style={{ color: "var(--color-bg)", textDecoration: "none" }}>History</Link>
        <Link to="/status" style={{ color: "var(--color-bg)", textDecoration: "none" }}>Status</Link>
      </nav>
      {children}
    </div>
  );
}
