import React from "react";
import { useParams, Link } from "react-router-dom";
import { LEGAL_DATA } from "../../data/corporatePagesData";
import CorporatePageLayout from "../../components/arisetek/Layout/CorporatePageLayout";
import { useTheme } from "../../context/ThemeContext";

export default function CorporateLegalPage() {
  const { slug } = useParams();
  const { isDark } = useTheme();

  const doc = LEGAL_DATA[slug] || {
    title: "Legal Information & Compliance",
    lastUpdated: "August 30, 2026",
    sections: [
      {
        heading: "1. Overview",
        content: "Arisetek IT Solutions Private Limited complies with applicable international and national legal standards governing software development, data privacy, and digital services."
      }
    ]
  };

  const breadcrumbs = [
    { label: "Legal & Compliance", path: "/legal/privacy" },
    { label: doc.title }
  ];

  return (
    <CorporatePageLayout
      breadcrumbs={breadcrumbs}
      badge="LEGAL & COMPLIANCE"
      title={doc.title}
      tagline={`Official policy documentation · Effective: ${doc.lastUpdated}`}
      accent="#FF6B00"
    >
      <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
        
        {/* Document Content Card */}
        <article
          style={{
            background: isDark ? "rgba(15, 23, 42, 0.55)" : "#ffffff",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
            borderRadius: "20px",
            padding: "clamp(32px, 5vw, 56px)",
            boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.3)" : "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          {doc.sections.map((sec, i) => (
            <div
              key={i}
              style={{
                marginBottom: i === doc.sections.length - 1 ? 0 : "36px",
                paddingBottom: i === doc.sections.length - 1 ? 0 : "32px",
                borderBottom: i === doc.sections.length - 1 ? "none" : (isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid #e2e8f0"),
              }}
            >
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: isDark ? "#ffffff" : "#0f172a",
                  margin: "0 0 16px 0",
                  letterSpacing: "-0.01em",
                }}
              >
                {sec.heading}
              </h2>
              <div
                style={{
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: isDark ? "#cbd5e1" : "#334155",
                  whiteSpace: "pre-line",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {sec.content}
              </div>
            </div>
          ))}
        </article>

        {/* Legal Inquiries Contact Box */}
        <aside
          style={{
            background: isDark ? "rgba(255, 255, 255, 0.03)" : "#f8fafc",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #cbd5e1",
            borderRadius: "16px",
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <h4
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "17px",
                fontWeight: 700,
                color: isDark ? "#ffffff" : "#0f172a",
                margin: "0 0 4px 0",
              }}
            >
              Questions regarding our {doc.title}?
            </h4>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "13.5px",
                color: isDark ? "#94a3b8" : "#64748b",
                margin: 0,
              }}
            >
              Contact our compliance and legal team directly at{" "}
              <strong style={{ color: "#FF6B00" }}>
                {slug === "security"
                  ? "support@arisetek.in"
                  : slug === "accessibility"
                  ? "support@arisetek.in"
                  : slug === "privacy" || slug === "data-privacy"
                  ? "admin@arisetek.in"
                  : "contact@arisetek.in"}
              </strong>
            </p>
          </div>

          <Link
            to="/about/contact"
            className="hover:scale-105 transition-transform"
            style={{
              padding: "10px 24px",
              borderRadius: "9999px",
              background: "#FF6B00",
              color: "#ffffff",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "13.5px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Contact Legal Desk →
          </Link>
        </aside>

      </div>
    </CorporatePageLayout>
  );
}
