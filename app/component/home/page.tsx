export default function HomePage() {
  return (
    <main>
      <section className="app-container" style={{ padding: "4rem 0 3rem" }}>
        <p style={{ color: "#0e7a4b", fontWeight: 700, marginBottom: "0.8rem" }}>RSA</p>
        <h1 className="section-title">Your Career. Designed, Not Discovered.</h1>
        <p className="section-subtitle" style={{ maxWidth: "700px" }}>
          RightStepAhead is an AI-powered platform helping individuals discover, plan, and execute
          their ideal career path with structured guidance.
        </p>

        <div style={{ display: "flex", gap: "0.8rem", marginTop: "1.6rem", flexWrap: "wrap" }}>
          <a
            href="/component/student"
            style={{
              background: "#0e7a4b",
              color: "#fff",
              padding: "0.75rem 1rem",
              borderRadius: "12px",
              fontWeight: 700,
            }}
          >
            Get Your Path
          </a>
          <a
            href="#what-rsa-does"
            style={{
              background: "#ffffff",
              border: "1px solid #d9e2ec",
              color: "#0f172a",
              padding: "0.75rem 1rem",
              borderRadius: "12px",
              fontWeight: 700,
            }}
          >
            Explore RSA
          </a>
        </div>
      </section>

      <section id="what-rsa-does" className="app-container" style={{ paddingBottom: "4rem" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "18px",
            padding: "1.4rem",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: "0.6rem", fontSize: "1.4rem" }}>
            What RSA Does
          </h2>
          <p style={{ color: "#526076", marginTop: 0 }}>
            AI + Guidance + Toolkits to turn confusion into clear career paths.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "0.9rem",
              marginTop: "1rem",
            }}
          >
            {[
              ["Discover", "Find strengths, interests, and role-fit insights."],
              ["Plan", "Build realistic milestones with trackable outcomes."],
              ["Execute", "Follow curated programs with mentor support."],
            ].map(([title, body]) => (
              <article
                key={title}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e5edf5",
                  borderRadius: "12px",
                  padding: "1rem",
                }}
              >
                <h3 style={{ margin: "0 0 0.5rem" }}>{title}</h3>
                <p style={{ margin: 0, color: "#526076" }}>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}