import Link from "next/link";

export default function Navigation() {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none", margin: 0, padding: 0 }}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/component/student">my Student</Link>
        </li>
        <li>
          <Link href="#">New-link</Link>
        </li>
      
      </ul>
    </nav>
  );
}