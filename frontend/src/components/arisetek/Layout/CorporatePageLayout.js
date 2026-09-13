import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import CorporateFooter from "./CorporateFooter";
import ArisetekCursor from "../ArisetekCursor";

export default function CorporatePageLayout({
  breadcrumbs = [],
  children,
  badge = "ENTERPRISE SPECIFICATION",
  title = "Corporate Architecture",
  tagline = "Autonomous Intelligence & Full-Stack Systems",
  accent = "#FF6B00",
}) {
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [title]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: isDark ? "#05070a" : "#f8fafc",
        color: isDark ? "#dfe7e0" : "#090d16",
        fontFamily: "'Outfit', sans-serif",
        position: "relative",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      <ArisetekCursor />

      {/* Ambient Noise Filter */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          opacity: isDark ? 0.04 : 0.02,
          pointerEvents: "none",
          zIndex: 1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* TOP HEADER / NAVBAR */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 80,
          background: isDark ? "rgba(5, 7, 10, 0.85)" : "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
          borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(15, 23, 42, 0.08)",
          padding: "16px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Official Arisetek Brand SVG Logo */}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <img
              src={isDark ? "/arisetek-logo-dark.svg" : "/arisetek-logo.svg"}
              alt="Arisetek IT Solutions"
              style={{ height: "38px", width: "auto", display: "block" }}
            />
          </Link>

          {/* Quick Nav Links */}
          <nav style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link
              to="/"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: isDark ? "rgba(255, 255, 255, 0.7)" : "#475569",
                textDecoration: "none",
                letterSpacing: "0.08em",
              }}
              className="hover:!text-[#FF6B00] transition-colors"
            >
              // Home
            </Link>
            <Link
              to="/#services"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: isDark ? "rgba(255, 255, 255, 0.7)" : "#475569",
                textDecoration: "none",
                letterSpacing: "0.08em",
              }}
              className="hover:!text-[#FF6B00] transition-colors"
            >
              // Services
            </Link>
            <Link
              to="/portfolio"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: "#E0231C",
                textDecoration: "none",
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
              className="hover:scale-105 transition-transform"
            >
              Founder ⛩️
            </Link>

            {/* Dark / Light Mode Switcher */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              style={{
                background: isDark ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0",
                border: "none",
                borderRadius: "9999px",
                width: "36px",
                height: "36px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "16px",
                transition: "all 0.2s ease",
              }}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </nav>
        </div>
      </header>

      {/* PAGE HERO HEADER */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          padding: "clamp(48px, 6vw, 80px) 24px clamp(32px, 4vw, 56px)",
          borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid rgba(15, 23, 42, 0.06)",
          background: isDark
            ? `radial-gradient(900px 450px at 50% 0%, rgba(${accent === "#FF6B00" ? "255, 107, 0, 0.12" : accent === "#00E5FF" ? "0, 229, 255, 0.12" : "224, 35, 28, 0.12"}), transparent 70%), #05070a`
            : `radial-gradient(900px 450px at 50% 0%, rgba(255, 107, 0, 0.08), transparent 70%), #f8fafc`,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Breadcrumbs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: isDark ? "rgba(255, 255, 255, 0.5)" : "#64748b",
            }}
          >
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }} className="hover:!text-[#FF6B00]">
              Home
            </Link>
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                <span style={{ opacity: 0.4 }}>/</span>
                {b.path ? (
                  <Link to={b.path} style={{ color: "inherit", textDecoration: "none" }} className="hover:!text-[#FF6B00]">
                    {b.label}
                  </Link>
                ) : (
                  <span style={{ color: accent, fontWeight: 600 }}>{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: accent,
                animation: "ping 1.6s cubic-bezier(0,0,.2,1) infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: accent,
                fontWeight: 700,
              }}
            >
              // {badge}
            </span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: "clamp(32px, 4.5vw, 64px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              margin: "0 0 16px 0",
              color: isDark ? "#ffffff" : "#090d16",
            }}
          >
            {title}
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(16px, 1.4vw, 22px)",
              color: isDark ? "rgba(255, 255, 255, 0.75)" : "#475569",
              lineHeight: 1.5,
              margin: 0,
              maxWidth: "800px",
              fontWeight: 300,
            }}
          >
            {tagline}
          </p>
        </div>
      </section>

      {/* PAGE BODY CONTENT */}
      <main
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          padding: "clamp(48px, 6vw, 80px) 24px",
          boxSizing: "border-box",
          flex: "1 0 auto",
        }}
      >
        {children}
      </main>

      {/* CORPORATE FOOTER */}
      <CorporateFooter />
    </div>
  );
}
