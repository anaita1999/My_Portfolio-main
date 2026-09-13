import React from "react";
import { useParams, Link } from "react-router-dom";
import { ABOUT_DATA } from "../../data/corporatePagesData";
import CorporatePageLayout from "../../components/arisetek/Layout/CorporatePageLayout";
import { useTheme } from "../../context/ThemeContext";
import { LiveShimmerText } from "../../components/ui/LiveTypography";

export default function CorporateAboutPage() {
  const { slug } = useParams();
  const { isDark } = useTheme();

  const item = ABOUT_DATA[slug] || {
    title: "About Arisetek IT Solutions",
    tagline: "Autonomous Agentic AI Systems, Cloud Architecture, and Software Engineering",
    badge: "COMPANY & LEADERSHIP",
    overview: "Arisetek IT Solutions is an autonomous digital enterprise founded by Anaita Pal, specializing in bespoke multi-agent AI orchestration, full-stack React 19/FastAPI engineering, and enterprise digital transformation.",
    accent: "#FF6B00",
    stats: [
      { label: "Founded", value: "2024" },
      { label: "Headquarters", value: "Kolkata, IN" },
      { label: "Focus", value: "AI + Full-Stack" },
      { label: "Delivery Model", value: "Remote First" }
    ],
    pillars: [
      {
        title: "Engineering Excellence",
        desc: "Building systems with high-throughput backend services and fluid, high-performance user interfaces."
      },
      {
        title: "Ethical AI Stewardship",
        desc: "Developing autonomous tools with human-in-the-loop oversight, guardrails, and data privacy guarantees."
      }
    ],
    highlights: [
      "100% transparent milestone delivery",
      "Direct technical leadership and founder engagement",
      "Global client reach across India, US, and Europe"
    ]
  };

  const breadcrumbs = [
    { label: "About us", path: "/#founder" },
    { label: item.title }
  ];

  return (
    <CorporatePageLayout
      breadcrumbs={breadcrumbs}
      badge={item.badge}
      title={item.title}
      tagline={item.tagline}
      accent={item.accent}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
        
        {/* 1. EXECUTIVE OVERVIEW & KEY STATS */}
        <section
          style={{
            background: isDark ? "rgba(15, 23, 42, 0.55)" : "#ffffff",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
            borderRadius: "20px",
            padding: "clamp(32px, 4vw, 48px)",
            boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.3)" : "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ maxWidth: "880px", marginBottom: "40px" }}>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: item.accent,
                margin: "0 0 12px 0",
              }}
            >
              // Mission & Perspective
            </p>
            <p
              style={{
                fontSize: "clamp(16px, 1.2vw, 20px)",
                lineHeight: 1.7,
                color: isDark ? "#e2e8f0" : "#1e293b",
                margin: 0,
                fontWeight: 300,
              }}
            >
              {item.overview}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "20px",
              paddingTop: "32px",
              borderTop: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
            }}
          >
            {item.stats.map((st, i) => (
              <div
                key={i}
                style={{
                  background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                  borderRadius: "12px",
                  padding: "20px",
                  border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: isDark ? "#94a3b8" : "#64748b",
                    marginBottom: "6px",
                  }}
                >
                  {st.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Unbounded', sans-serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: item.accent,
                  }}
                >
                  {st.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. STRATEGIC PILLARS (Bento Grid) */}
        <section>
          <div style={{ marginBottom: "32px" }}>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: item.accent,
                margin: "0 0 8px 0",
              }}
            >
              // Strategic Pillars
            </p>
            <h2
              style={{
                fontFamily: "'Unbounded', sans-serif",
                fontSize: "clamp(24px, 2.5vw, 36px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                margin: 0,
                color: isDark ? "#ffffff" : "#0f172a",
              }}
            >
              Building with <LiveShimmerText theme="flame">Integrity & Velocity</LiveShimmerText>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {item.pillars.map((pil, i) => (
              <div
                key={i}
                className="hover:translate-y-[-4px] transition-transform duration-300"
                style={{
                  background: isDark ? "rgba(15, 23, 42, 0.45)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
                  borderRadius: "16px",
                  padding: "32px",
                  boxShadow: isDark ? "0 10px 25px rgba(0,0,0,0.2)" : "0 4px 16px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    color: item.accent,
                    marginBottom: "12px",
                    letterSpacing: "0.1em",
                  }}
                >
                  0{i + 1} // PILLAR
                </div>
                <h3
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    margin: "0 0 12px 0",
                    color: isDark ? "#ffffff" : "#0f172a",
                  }}
                >
                  {pil.title}
                </h3>
                <p
                  style={{
                    fontSize: "14.5px",
                    lineHeight: 1.65,
                    color: isDark ? "#94a3b8" : "#475569",
                    margin: 0,
                  }}
                >
                  {pil.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. HIGHLIGHTS & FOUNDER SANCTUARY CONNECTION */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "32px",
          }}
        >
          {/* Key Commitments */}
          <div
            style={{
              background: isDark ? "rgba(15, 23, 42, 0.55)" : "#ffffff",
              border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "36px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "22px",
                fontWeight: 700,
                margin: "0 0 24px 0",
                color: isDark ? "#ffffff" : "#0f172a",
              }}
            >
              Key Commitments
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              {item.highlights.map((h, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "rgba(255, 107, 0, 0.15)",
                      color: "#FF6B00",
                      fontSize: "12px",
                      fontWeight: "bold",
                      shrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    ★
                  </span>
                  <span style={{ fontSize: "15px", color: isDark ? "#e2e8f0" : "#334155", lineHeight: 1.5 }}>
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Founder Leadership Card */}
          <div
            style={{
              background: isDark
                ? "linear-gradient(135deg, rgba(224, 35, 28, 0.12) 0%, rgba(15, 23, 42, 0.7) 100%)"
                : "linear-gradient(135deg, rgba(224, 35, 28, 0.06) 0%, #ffffff 100%)",
              border: isDark ? "1px solid rgba(224, 35, 28, 0.25)" : "1px solid rgba(224, 35, 28, 0.15)",
              borderRadius: "20px",
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  color: "#E0231C",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  fontWeight: 700,
                }}
              >
                // Executive Leadership
              </div>
              <h3
                style={{
                  fontFamily: "'Unbounded', sans-serif",
                  fontSize: "24px",
                  fontWeight: 800,
                  margin: "0 0 12px 0",
                  color: isDark ? "#ffffff" : "#0f172a",
                }}
              >
                Anaita Pal
              </h3>
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "14px",
                  color: isDark ? "#94a3b8" : "#64748b",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Founder & Lead Architect at Arisetek IT Solutions. Computer Science engineer, UI/UX creator, and autonomous agentic systems specialist.
              </p>
            </div>

            <div style={{ marginTop: "24px" }}>
              <Link
                to="/portfolio"
                className="hover:scale-105 transition-transform"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  borderRadius: "9999px",
                  background: "rgba(224, 35, 28, 0.12)",
                  border: "1px solid rgba(224, 35, 28, 0.3)",
                  color: "#E0231C",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Visit Founder Sanctuary ⛩️ →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </CorporatePageLayout>
  );
}
