import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

export default function CorporateFooter() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [cookieOpen, setCookieOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("IN - EN");

  const handleConsultationClick = () => {
    if (window.location.pathname === "/") {
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    navigate("/about/contact");
  };

  const handleLearnMoreClick = () => {
    navigate("/about/careers");
  };

  const regions = [
    { code: "IN - EN", name: "India (English)" },
    { code: "US - EN", name: "United States (English)" },
    { code: "EU - EN", name: "Europe (English)" },
    { code: "GLOBAL", name: "Global / Multi-Region" },
  ];

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 20,
        width: "100%",
        boxSizing: "border-box",
        background: isDark ? "#07080b" : "#ffffff",
        color: isDark ? "#ffffff" : "#090d16",
        borderTop: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,23,42,0.08)",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      {/* 1. TOP PRE-FOOTER DUAL CTA BANNER (Arisetek Brand Cyber Carbon & Flame Gradient) */}
      <div
        style={{
          width: "100%",
          background: isDark
            ? "linear-gradient(135deg, #150c07 0%, #0d121c 50%, #07080b 100%)"
            : "linear-gradient(135deg, #fff7ed 0%, #f8fafc 50%, #f1f5f9 100%)",
          color: isDark ? "#ffffff" : "#090d16",
          padding: "clamp(48px, 6vw, 84px) 24px",
          borderBottom: isDark ? "1px solid rgba(255,107,0,0.15)" : "1px solid rgba(255,107,0,0.2)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "20%",
            width: "500px",
            height: "100%",
            background: "radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(36px, 5vw, 72px)",
            alignItems: "start",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Left CTA: Connect with us */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2
              style={{
                fontFamily: "'Unbounded', sans-serif",
                fontSize: "clamp(32px, 3.8vw, 56px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                margin: 0,
                color: isDark ? "#ffffff" : "#0f172a",
              }}
            >
              Connect with{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #FF6B00, #FFA000)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                us
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(15px, 1.2vw, 18px)",
                color: isDark ? "rgba(255, 255, 255, 0.78)" : "#475569",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: "520px",
                fontWeight: 300,
              }}
            >
              Schedule an executive consultation with Founder Anaita Pal to evaluate system architecture and transform to AI-native workflows.
            </p>
            <div>
              <button
                type="button"
                onClick={handleConsultationClick}
                className="hover:scale-105 active:scale-95"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 30px",
                  borderRadius: "9999px",
                  border: "1.5px solid #FF6B00",
                  background: "linear-gradient(90deg, #FF6B00, #FF8500)",
                  color: "#000000",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(255, 107, 0, 0.3)",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                Let&apos;s talk →
              </button>
            </div>
          </div>

          {/* Right CTA: Interested in joining us / scaling with us */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2
              style={{
                fontFamily: "'Unbounded', sans-serif",
                fontSize: "clamp(32px, 3.8vw, 56px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                margin: 0,
                color: isDark ? "#ffffff" : "#0f172a",
              }}
            >
              Interested in{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #E0231C, #FF6B00)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                joining us?
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(15px, 1.2vw, 18px)",
                color: isDark ? "rgba(255, 255, 255, 0.78)" : "#475569",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: "520px",
                fontWeight: 300,
              }}
            >
              Explore engineering opportunities and collaborate on autonomous AI agent meshes, React 19 systems, and 3D WebGL interfaces.
            </p>
            <div>
              <button
                type="button"
                onClick={handleLearnMoreClick}
                className="hover:scale-105 active:scale-95"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 30px",
                  borderRadius: "9999px",
                  border: isDark ? "1.5px solid rgba(255, 255, 255, 0.3)" : "1.5px solid #cbd5e1",
                  background: isDark ? "rgba(255, 255, 255, 0.05)" : "#ffffff",
                  color: isDark ? "#ffffff" : "#0f172a",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#FF6B00";
                  e.currentTarget.style.color = "#FF6B00";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDark ? "rgba(255, 255, 255, 0.3)" : "#cbd5e1";
                  e.currentTarget.style.color = isDark ? "#ffffff" : "#0f172a";
                }}
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER BODY */}
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "64px 24px 32px" }}>
        {/* Brand Row: Official Arisetek Brand Logo + Social Media Tiles */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "56px",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          {/* Official Arisetek Brand SVG Logo */}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img
              src={isDark ? "/arisetek-logo-dark.svg" : "/arisetek-logo.svg"}
              alt="Arisetek IT Solutions"
              style={{ height: "46px", width: "auto", display: "block" }}
            />
          </Link>

          {/* Social Media Dark Tiles (LinkedIn, X, GitHub) */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/anaitapal1999/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:scale-110 active:scale-95 transition-transform"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "8px",
                background: isDark ? "#131924" : "#f1f5f9",
                border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #cbd5e1",
                color: isDark ? "#ffffff" : "#0f172a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: 700,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.32a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63z" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className="hover:scale-110 active:scale-95 transition-transform"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "8px",
                background: isDark ? "#131924" : "#f1f5f9",
                border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #cbd5e1",
                color: isDark ? "#ffffff" : "#0f172a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/anaitapal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:scale-110 active:scale-95 transition-transform"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "8px",
                background: isDark ? "#131924" : "#f1f5f9",
                border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #cbd5e1",
                color: isDark ? "#ffffff" : "#0f172a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* 3. 4-COLUMN DIRECTORY (Categorized into Services and About us with Arisetek Brand Underlines) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(36px, 5vw, 64px)",
            paddingBottom: "56px",
            borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,23,42,0.08)",
          }}
        >
          {/* GROUP 1: SERVICES (Split into 2 Columns) */}
          <div>
            <div style={{ marginBottom: "28px" }}>
              <h3
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "26px",
                  fontWeight: 700,
                  margin: "0 0 10px 0",
                  color: isDark ? "#ffffff" : "#0f172a",
                  letterSpacing: "-0.02em",
                }}
              >
                Services
              </h3>
              {/* Arisetek Flame Accent Underline */}
              <div
                style={{
                  width: "36px",
                  height: "2.5px",
                  background: "#FF6B00",
                  borderRadius: "2px",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "24px",
              }}
            >
              {/* Services Sub-Column 1 */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                <li>
                  <Link
                    to="/services/applications"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Applications
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/cloud-infrastructure"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Cloud & Edge Mesh
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/modernization"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    System Modernization
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/security-compliance"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Cyber Resilience & 2FA
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/ai-data-systems"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Artificial Intelligence & Data
                  </Link>
                </li>
              </ul>

              {/* Services Sub-Column 2 */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                <li>
                  <Link
                    to="/services/digital-workplace"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Digital Workplace & CMS
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/autonomous-swarm"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Autonomous Agent Swarms
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/consulting"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Solution Architecture
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/bridge"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Arisetek Bridge
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/vital"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Arisetek Vital Telemetry
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* GROUP 2: ABOUT US (Split into 2 Columns) */}
          <div>
            <div style={{ marginBottom: "28px" }}>
              <h3
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "26px",
                  fontWeight: 700,
                  margin: "0 0 10px 0",
                  color: isDark ? "#ffffff" : "#0f172a",
                  letterSpacing: "-0.02em",
                }}
              >
                About us
              </h3>
              {/* Arisetek Vermilion Accent Underline */}
              <div
                style={{
                  width: "36px",
                  height: "2.5px",
                  background: "#E0231C",
                  borderRadius: "2px",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "24px",
              }}
            >
              {/* About Us Sub-Column 1 */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                <li>
                  <Link
                    to="/about/alliances"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Alliances & Cloud
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about/careers"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Careers & Talent
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about/contact"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about/citizenship"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Corporate Citizenship
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about/culture"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Kinship at Arisetek
                  </Link>
                </li>
              </ul>

              {/* About Us Sub-Column 2 */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                <li>
                  <Link
                    to="/portfolio"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: "#E0231C",
                      fontWeight: 600,
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Leadership ⛩️
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about/locations"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Global Hubs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about/news"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    News & Changelog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about/trust"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Trust & 99.9% SLA
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about/values"
                    className="hover:!text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "14.5px",
                      color: isDark ? "rgba(255,255,255,0.72)" : "#475569",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Our Core Values
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. LEGAL COMPLIANCE BAR & REGIONAL SELECTOR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "32px 0 20px",
            flexWrap: "wrap",
            gap: "18px",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "13.5px",
            color: isDark ? "rgba(255,255,255,0.6)" : "#64748b",
          }}
        >
          {/* Pipe-Separated Legal Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              lineHeight: 1.6,
            }}
          >
            <Link to="/legal/privacy" className="hover:!text-[#FF6B00] transition-colors" style={{ color: "inherit", textDecoration: "none" }}>
              Privacy Policy
            </Link>
            <span style={{ opacity: 0.35 }}>|</span>
            <Link to="/legal/terms" className="hover:!text-[#FF6B00] transition-colors" style={{ color: "inherit", textDecoration: "none" }}>
              Terms of Service
            </Link>
            <span style={{ opacity: 0.35 }}>|</span>
            <Link to="/legal/security" className="hover:!text-[#FF6B00] transition-colors" style={{ color: "inherit", textDecoration: "none" }}>
              Security Statement
            </Link>
            <span style={{ opacity: 0.35 }}>|</span>
            <Link to="/legal/certifications" className="hover:!text-[#FF6B00] transition-colors" style={{ color: "inherit", textDecoration: "none" }}>
              Certifications
            </Link>
            <span style={{ opacity: 0.35 }}>|</span>
            <Link to="/legal/sitemap" className="hover:!text-[#FF6B00] transition-colors" style={{ color: "inherit", textDecoration: "none" }}>
              Sitemap
            </Link>
            <span style={{ opacity: 0.35 }}>|</span>
            <Link to="/legal/data-privacy" className="hover:!text-[#FF6B00] transition-colors" style={{ color: "inherit", textDecoration: "none" }}>
              Do not sell or share my personal information
            </Link>
            <span style={{ opacity: 0.35 }}>|</span>
            <Link to="/legal/accessibility" className="hover:!text-[#FF6B00] transition-colors" style={{ color: "inherit", textDecoration: "none" }}>
              Accessibility (WCAG 2.1)
            </Link>
            <span style={{ opacity: 0.35 }}>|</span>
            <button
              type="button"
              onClick={() => setCookieOpen(true)}
              className="hover:!text-[#FF6B00] transition-colors"
              style={{
                background: "transparent",
                border: "none",
                padding: 0,
                color: "inherit",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "inherit",
                textDecoration: "underline",
              }}
            >
              Cookie Preferences
            </button>
            <span style={{ opacity: 0.35 }}>|</span>
            <Link
              to="/admin/login"
              className="hover:!text-[#FF6B00] transition-colors"
              style={{
                color: isDark ? "#ffffff" : "#0f172a",
                textDecoration: "none",
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "2px 8px",
                borderRadius: "4px",
                background: isDark ? "rgba(255,107,0,0.12)" : "rgba(255,107,0,0.1)",
                border: "1px solid rgba(255,107,0,0.3)",
              }}
            >
              <span>🔒</span> Admin Console
            </Link>
          </div>

          {/* Regional / Locale Selector Dropdown */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setRegionOpen(!regionOpen)}
              className="hover:scale-105 active:scale-95"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
                border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #cbd5e1",
                borderRadius: "6px",
                padding: "6px 12px",
                color: isDark ? "#ffffff" : "#0f172a",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <span>{selectedRegion}</span>
              <span style={{ fontSize: "10px", opacity: 0.7 }}>▲</span>
            </button>

            {regionOpen && (
              <div
                style={{
                  position: "absolute",
                  bottom: "100%",
                  right: 0,
                  marginBottom: "8px",
                  background: isDark ? "#0f172a" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #cbd5e1",
                  borderRadius: "8px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                  zIndex: 50,
                  minWidth: "190px",
                  overflow: "hidden",
                }}
              >
                {regions.map((reg) => (
                  <button
                    key={reg.code}
                    type="button"
                    onClick={() => {
                      setSelectedRegion(reg.code);
                      setRegionOpen(false);
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 14px",
                      background: selectedRegion === reg.code ? (isDark ? "rgba(255,107,0,0.15)" : "#fff7ed") : "transparent",
                      color: selectedRegion === reg.code ? "#FF6B00" : isDark ? "#ffffff" : "#0f172a",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "13px",
                      fontWeight: selectedRegion === reg.code ? 600 : 400,
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedRegion !== reg.code) {
                        e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.05)" : "#f8fafc";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedRegion !== reg.code) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    {reg.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 5. COPYRIGHT STATEMENT (Strictly Arisetek IT Solutions Private Limited) */}
        <div style={{ marginTop: "12px" }}>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "12.5px",
              color: isDark ? "rgba(255,255,255,0.45)" : "#94a3b8",
              margin: 0,
            }}
          >
            Copyright © {new Date().getFullYear()} Arisetek IT Solutions Private Limited. All rights reserved.
          </p>
        </div>
      </div>



      {/* 7. COOKIE PREFERENCES MODAL */}
      {cookieOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
          onClick={() => setCookieOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "500px",
              width: "100%",
              background: isDark ? "#0f172a" : "#ffffff",
              color: isDark ? "#ffffff" : "#0f172a",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
              border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #cbd5e1",
            }}
          >
            <h3 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "20px", fontWeight: 700, margin: "0 0 12px 0" }}>
              Privacy & Cookie Preferences
            </h3>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", lineHeight: 1.6, color: isDark ? "rgba(255,255,255,0.7)" : "#475569" }}>
              Arisetek IT Solutions uses strictly essential session tokens and privacy-first local telemetry to provide security, multi-factor authentication, and monitor performance. We do not sell or share personal data with external advertising networks.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setCookieOpen(false)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  background: "#FF6B00",
                  color: "#000000",
                  border: "none",
                  fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Accept Necessary ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
