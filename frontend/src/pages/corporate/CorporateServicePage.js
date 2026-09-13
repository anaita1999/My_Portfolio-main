import React from "react";
import { useParams, Link } from "react-router-dom";
import { SERVICES_DATA } from "../../data/corporatePagesData";
import CorporatePageLayout from "../../components/arisetek/Layout/CorporatePageLayout";
import { useTheme } from "../../context/ThemeContext";
import { LiveShimmerText } from "../../components/ui/LiveTypography";

export default function CorporateServicePage() {
  const { slug } = useParams();
  const { isDark } = useTheme();

  const service = SERVICES_DATA[slug] || {
    title: "Enterprise Digital Service",
    tagline: "Autonomous Agentic Systems and Scalable Software Architecture",
    badge: "SERVICES ARCHITECTURE",
    overview: "Arisetek IT Solutions architects and delivers production-grade enterprise software systems, artificial intelligence workflows, and high-performance digital applications.",
    accent: "#FF6B00",
    stats: [
      { label: "Uptime SLA", value: "99.9%" },
      { label: "Deployment", value: "Continuous" },
      { label: "Architecture", value: "Microservices" },
      { label: "Security", value: "Zero Trust" }
    ],
    capabilities: [
      {
        title: "Bespoke System Architecture",
        desc: "Custom-engineered software components designed for optimal throughput and long-term business scalability."
      },
      {
        title: "Autonomous Intelligence Pipelines",
        desc: "Integrating state-of-the-art AI models with structured data retrieval and automated tool calling."
      }
    ],
    deliverables: [
      "Production-ready codebase with comprehensive test suites",
      "Full API contract specifications and interactive documentation",
      "Automated CI/CD build scripts and deployment manifests"
    ],
    techStack: ["React 19", "FastAPI", "Python", "Docker", "Cloudflare"]
  };

  const breadcrumbs = [
    { label: "Services", path: "/#services" },
    { label: service.title }
  ];

  return (
    <CorporatePageLayout
      breadcrumbs={breadcrumbs}
      badge={service.badge}
      title={service.title}
      tagline={service.tagline}
      accent={service.accent}
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
                color: service.accent,
                margin: "0 0 12px 0",
              }}
            >
              // Architecture Overview
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
              {service.overview}
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
            {service.stats.map((st, i) => (
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
                    color: service.accent,
                  }}
                >
                  {st.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. CORE CAPABILITIES (Bento Grid) */}
        <section>
          <div style={{ marginBottom: "32px" }}>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: service.accent,
                margin: "0 0 8px 0",
              }}
            >
              // Core Capabilities
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
              Engineered for <LiveShimmerText theme="flame">Precision & Scale</LiveShimmerText>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {service.capabilities.map((cap, i) => (
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
                    color: service.accent,
                    marginBottom: "12px",
                    letterSpacing: "0.1em",
                  }}
                >
                  0{i + 1} // CAPABILITY
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
                  {cap.title}
                </h3>
                <p
                  style={{
                    fontSize: "14.5px",
                    lineHeight: 1.65,
                    color: isDark ? "#94a3b8" : "#475569",
                    margin: 0,
                  }}
                >
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. DELIVERABLES & TECH STACK DUAL BENTO */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "32px",
          }}
        >
          {/* Deliverables Checklist */}
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
              Enterprise Deliverables
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              {service.deliverables.map((del, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "rgba(52, 211, 153, 0.15)",
                      color: "#34d399",
                      fontSize: "12px",
                      fontWeight: "bold",
                      shrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    ✓
                  </span>
                  <span style={{ fontSize: "15px", color: isDark ? "#e2e8f0" : "#334155", lineHeight: 1.5 }}>
                    {del}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Technology Stack */}
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
              Verified Tooling & Stack
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {service.techStack.map((tech, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background: isDark ? "rgba(255, 255, 255, 0.05)" : "#f1f5f9",
                    border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #cbd5e1",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "13px",
                    color: isDark ? "#ffffff" : "#0f172a",
                    fontWeight: 600,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "13.5px",
                color: isDark ? "#94a3b8" : "#64748b",
                marginTop: "24px",
                lineHeight: 1.6,
              }}
            >
              Every stack component is tested against our automated test matrix to guarantee zero regressions and optimal runtime latency.
            </p>
          </div>
        </section>

        {/* 4. INBOUND CALL TO ACTION */}
        <section
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(255, 107, 0, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)"
              : "linear-gradient(135deg, rgba(255, 107, 0, 0.08) 0%, #ffffff 100%)",
            border: isDark ? "1px solid rgba(255, 107, 0, 0.3)" : "1px solid rgba(255, 107, 0, 0.2)",
            borderRadius: "24px",
            padding: "clamp(40px, 5vw, 64px) 32px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: "clamp(24px, 3.2vw, 44px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              margin: 0,
              color: isDark ? "#ffffff" : "#0f172a",
            }}
          >
            Ready to deploy {service.title}?
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: isDark ? "#94a3b8" : "#475569",
              margin: 0,
              maxWidth: "600px",
              lineHeight: 1.6,
            }}
          >
            Schedule a direct technical consultation with Founder Anaita Pal and our engineering team to review requirements and project feasibility.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link
              to="/about/contact"
              className="hover:scale-105 active:scale-95 transition-transform"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 32px",
                borderRadius: "9999px",
                background: "#FF6B00",
                color: "#ffffff",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "15px",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(255, 107, 0, 0.35)",
              }}
            >
              Start Project Inquiry →
            </Link>
            <Link
              to="/portfolio"
              className="hover:scale-105 active:scale-95 transition-transform"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                borderRadius: "9999px",
                background: isDark ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0",
                color: isDark ? "#ffffff" : "#0f172a",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "15px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Explore Founder Sanctuary ⛩️
            </Link>
          </div>
        </section>

      </div>
    </CorporatePageLayout>
  );
}
