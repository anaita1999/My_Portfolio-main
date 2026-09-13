import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { LiveShimmerText, LiveScrambleText } from "../../ui/LiveTypography";

const INDUSTRIES = [
  {
    id: "healthcare",
    name: "Healthcare",
    sub: "Clinics & Tech",
    glyph: "✚",
    grad: "rgba(37,99,235,.4)",
    features: ["Patient Portal", "AI Appointment Booking", "Telemedicine"],
    route: "/demos/clinics"
  },
  {
    id: "dining",
    name: "Dining",
    sub: "Restaurants",
    glyph: "✦",
    grad: "rgba(234,88,12,.4)",
    features: ["Online Ordering", "Table Reservations", "Menu Management"],
    route: "/demos/restaurants"
  },
  {
    id: "education",
    name: "Education",
    sub: "Schools & LMS",
    glyph: "▲",
    grad: "rgba(22,163,74,.4)",
    features: ["Student Dashboard", "Course Catalogs", "Event Calendar"],
    route: "/demos/coaching"
  },
  {
    id: "real-estate",
    name: "Real Estate",
    sub: "Agencies",
    glyph: "▢",
    grad: "rgba(147,51,234,.4)",
    features: ["Property Listings", "Virtual Tours", "Lead CRM"],
    route: "/demos/real-estate"
  },
  {
    id: "fitness",
    name: "Fitness",
    sub: "Gyms & Trainers",
    glyph: "◒",
    grad: "rgba(220,38,38,.4)",
    features: ["Class Scheduling", "Member Portals", "Trainer Bios"],
    route: "/demos/gyms"
  },
  {
    id: "salons",
    name: "Salons",
    sub: "Spas & Beauty",
    glyph: "✂",
    grad: "rgba(219,39,119,.4)",
    features: ["Service Menus", "Stylist Portfolios", "Booking Integration"],
    route: "/demos/salons"
  }
];

export default function IndustryShowcase() {
  const { isDark } = useTheme();
  const [activeIdx, setActiveIdx] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % INDUSTRIES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section id="industries" style={{ position: "relative", padding: "112px 0", width: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      
      {/* Header */}
      <div style={{ maxWidth: "1400px", margin: "0 auto 48px", padding: "0 24px", width: "100%", boxSizing: "border-box" }}>
        <p style={{ color: "#00E5FF", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: ".3em", textTransform: "uppercase", margin: "0 0 16px 8px" }}>
          // <LiveScrambleText text="Industry Architecture" speed={40} />
        </p>
        <h2 className="live-glow-aurora" style={{ fontSize: "clamp(36px, 4vw, 72px)", fontWeight: 900, letterSpacing: "-.04em", margin: 0, fontFamily: "'Unbounded', sans-serif", color: isDark ? "#fff" : "#090d16" }}>
          Engineered for <br />
          <LiveShimmerText theme="aurora">
            specific sectors.
          </LiveShimmerText>
        </h2>
      </div>

      {/* Horizontal Accordion */}
      <div
        className="flex flex-col lg:flex-row gap-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px",
          minHeight: "520px",
          boxSizing: "border-box"
        }}
      >
        {INDUSTRIES.map((ind, i) => {
          const isExpanded = activeIdx === i;
          return (
            <div
              key={ind.id}
              onClick={() => setActiveIdx(i)}
              onMouseEnter={() => setActiveIdx(i)}
              style={{
                position: "relative",
                height: "520px",
                borderRadius: "32px",
                overflow: "hidden",
                border: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.1)",
                display: "flex",
                alignItems: "flex-end",
                flex: isExpanded ? 3.5 : 1,
                cursor: "pointer",
                transition: "flex 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s"
              }}
            >
              {/* Gradient Background */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isDark
                    ? `linear-gradient(0deg, ${ind.grad}, #000)`
                    : `linear-gradient(0deg, ${ind.grad.replace('.4', '.2')}, #ffffff)`,
                  opacity: isExpanded ? 1 : 0.4,
                  transition: "opacity 0.5s"
                }}
              />

              {/* Collapsed State (Vertical Text) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px",
                  pointerEvents: "none",
                  opacity: isExpanded ? 0 : 1,
                  transition: "opacity 0.3s"
                }}
              >
                <div style={{ color: isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.6)", fontSize: "26px", fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>
                  {ind.glyph}
                </div>
                <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", overflow: "hidden" }}>
                  <h3 style={{ color: isDark ? "#fff" : "#090d16", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", fontSize: "12px", whiteSpace: "nowrap", transform: "rotate(-90deg)", fontFamily: "'JetBrains Mono', monospace", margin: 0 }}>
                    {ind.name}
                  </h3>
                </div>
              </div>

              {/* Expanded Content View */}
              <div
                style={{
                  position: "relative",
                  zIndex: 10,
                  padding: "40px",
                  width: "100%",
                  minWidth: "280px",
                  opacity: isExpanded ? 1 : 0,
                  pointerEvents: isExpanded ? "auto" : "none",
                  transition: "opacity 0.4s ease 0.1s"
                }}
              >
                <div style={{ color: isDark ? "#fff" : "#090d16", marginBottom: "12px", fontSize: "26px", fontFamily: "'JetBrains Mono', monospace" }}>
                  {ind.glyph}
                </div>
                <h3 style={{ fontSize: "38px", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1, margin: "0 0 4px", color: isDark ? "#fff" : "#090d16", fontFamily: "'Unbounded', sans-serif" }}>
                  {ind.name}
                </h3>
                <p style={{ color: isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.6)", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: ".15em", textTransform: "uppercase", margin: "0 0 16px" }}>
                  {ind.sub}
                </p>
                <p style={{ fontSize: "10px", color: isDark ? "rgba(255,255,255,.4)" : "rgba(15,23,42,.4)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", borderBottom: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.1)", paddingBottom: "6px", fontFamily: "'JetBrains Mono', monospace", margin: "0 0 8px" }}>
                  Capabilities
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                  {ind.features.map((feat, fi) => (
                    <div key={fi} style={{ display: "flex", alignItems: "center", color: isDark ? "rgba(255,255,255,.8)" : "rgba(15,23,42,.8)" }}>
                      <span style={{ color: "#00E5FF", marginRight: "10px" }}>→</span>
                      <span style={{ fontSize: "14px", fontWeight: 400 }}>{feat}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to={ind.route}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    borderRadius: "12px",
                    background: isDark ? "rgba(255,255,255,.1)" : "rgba(15,23,42,.06)",
                    border: isDark ? "1px solid rgba(255,255,255,.2)" : "1px solid rgba(15,23,42,.12)",
                    color: isDark ? "#fff" : "#090d16",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    textDecoration: "none",
                    transition: "all 0.2s"
                  }}
                  className="hover:!bg-[#00E5FF] hover:!text-black"
                >
                  Launch Live Demo →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
