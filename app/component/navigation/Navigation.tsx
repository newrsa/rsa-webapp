import Link from "next/link";

export default function Navigation() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "rgba(247, 250, 252, 0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <nav
        className="app-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "72px",
        }}
      >
        <Link href="/" style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>
          RSA
        </Link>

        <ul
          style={{
            display: "flex",
            gap: "1.1rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
            alignItems: "center",
          }}
        >
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/component/student">Programs</Link>
          </li>
          <li>
            <a
              href="#how-it-works"
              style={{
                background: "#0e7a4b",
                color: "#fff",
                padding: "0.5rem 0.9rem",
                borderRadius: "999px",
                fontWeight: 600,
              }}
            >
              How It Works
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}