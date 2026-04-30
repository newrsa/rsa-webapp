export default function Home() {
  return (
    <main style={{ minHeight: "100vh", margin: 0 }}>
      <iframe
        src="/talentindex.html"
        title="TalentIndex Demo"
        style={{
          border: "none",
          width: "100%",
          height: "100vh",
          display: "block",
        }}
      />
    </main>
  );
}
