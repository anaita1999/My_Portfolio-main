import { Link } from "react-router-dom";
import Magnetic from "../Magnetic";
import { useTheme } from "../../../context/ThemeContext";
import { LiveBadge, LiveShimmerText, LiveScrambleText } from "../../ui/LiveTypography";

export default function Founder() {
  const { isDark } = useTheme();
  return (
    <section id="founder" style={{ padding: "112px 24px", width: "100%", position: "relative", overflow: "hidden", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "64px", textAlign: "center", maxWidth: "768px", marginLeft: "auto", marginRight: "auto" }}>
          <LiveBadge theme="flame" className="mb-4">
            ✦ <LiveScrambleText text="Leadership & Vision" speed={45} />
          </LiveBadge>

          <h2
            className="live-glow-flame"
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: "clamp(34px, 4vw, 58px)",
              fontWeight: 900,
              letterSpacing: "-.04em",
              lineHeight: 1.05,
              color: isDark ? "#fff" : "#090d16",
              margin: "0 0 24px"
            }}
          >
            Architected by <br />
            <LiveShimmerText theme="flame">
              Founder Anaita Pal.
            </LiveShimmerText>
          </h2>

          <p style={{ color: isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.7)", fontSize: "18px", fontWeight: 300, lineHeight: 1.7, margin: 0 }}>
            Honest engineering, zero bloated overhead, and direct partnership. Building software with autonomous AI intelligence that actively grows your business.
          </p>
        </div>

        {/* Founder Card */}
        <div
          style={{
            background: isDark ? "rgba(8,9,12,.85)" : "#ffffff",
            backdropFilter: "blur(24px)",
            border: isDark ? "1px solid rgba(255,255,255,.15)" : "1px solid rgba(15,23,42,.1)",
            borderRadius: "24px",
            padding: "48px",
            boxShadow: isDark ? "0 25px 50px rgba(0,0,0,.5)" : "0 20px 40px rgba(0,0,0,.04)",
            position: "relative",
            overflow: "hidden",
            maxWidth: "1024px",
            margin: "0 auto"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "384px",
              height: "384px",
              background: "rgba(255,107,0,.1)",
              filter: "blur(120px)",
              borderRadius: "50%",
              pointerEvents: "none"
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Column: Avatar & Bio */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <Magnetic>
                <div
                  className="magnetic-glow"
                  style={{
                    width: "192px",
                    height: "192px",
                    borderRadius: "24px",
                    overflow: "hidden",
                    border: "2px solid rgba(255,107,0,.4)",
                    boxShadow: "0 0 40px rgba(255,107,0,.25)",
                    marginBottom: "24px"
                  }}
                >
                  <img
                    src="/founder.jpg"
                    alt="Anaita Pal — Founder &amp; Agentic AI Architect"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              </Magnetic>

              <h3 style={{ fontSize: "24px", fontWeight: 900, letterSpacing: "-.02em", margin: 0, color: isDark ? "#fff" : "#090d16" }}>
                Anaita Pal
              </h3>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#FF6B00", textTransform: "uppercase", letterSpacing: ".18em", margin: "4px 0 16px" }}>
                Founder · Agentic AI Architect
              </p>

              <Magnetic>
                <Link
                  to="/portfolio"
                  style={{
                    padding: "12px 24px",
                    borderRadius: "999px",
                    background: isDark ? "rgba(255,255,255,.06)" : "rgba(15,23,42,.05)",
                    border: isDark ? "1px solid rgba(255,255,255,.2)" : "1px solid rgba(15,23,42,.15)",
                    color: isDark ? "#fff" : "#090d16",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                    transition: "all 0.2s"
                  }}
                  className="magnetic-glow hover:!bg-[#FF6B00] hover:!text-black hover:!border-[#FF6B00]"
                >
                  Founder Sanctuary ⛩️ →
                </Link>
              </Magnetic>
            </div>

            {/* Right Column: Mission & Vision */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <Magnetic>
                  <span className="magnetic-glow" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: ".18em", padding: "4px 12px", borderRadius: "999px", background: isDark ? "rgba(255,255,255,.04)" : "rgba(15,23,42,.04)", border: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.1)", color: isDark ? "rgba(255,255,255,.7)" : "rgba(15,23,42,.75)" }}>
                    B.Tech CSE Graduate
                  </span>
                </Magnetic>
                <Magnetic>
                  <span className="magnetic-glow" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: ".18em", padding: "4px 12px", borderRadius: "999px", background: "rgba(255,107,0,.1)", border: "1px solid rgba(255,107,0,.3)", color: "#FF6B00" }}>
                    Multi-Agent Swarm Creator
                  </span>
                </Magnetic>
                <Magnetic>
                  <span className="magnetic-glow" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: ".18em", padding: "4px 12px", borderRadius: "999px", background: isDark ? "rgba(255,255,255,.06)" : "rgba(15,23,42,.06)", border: isDark ? "1px solid rgba(255,255,255,.2)" : "1px solid rgba(15,23,42,.15)", color: isDark ? "#fff" : "#090d16" }}>
                    Direct Client Partnership
                  </span>
                </Magnetic>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", color: isDark ? "rgba(255,255,255,.8)" : "#334155", lineHeight: 1.7, fontWeight: 300, fontSize: "17px" }}>
                <p style={{ margin: 0 }}>
                  "I founded <strong>Arisetek IT Solutions</strong> with a singular mission: to eliminate traditional agency friction through autonomous AI orchestration. Instead of human bureaucratic delays, our autonomous agent swarm executes lead scoring, architectural design, code synthesis, and automated QA in seconds."
                </p>
                <p style={{ margin: 0 }}>
                  "Every digital platform we build—from cross-platform Flutter applications to 3D WebGL portals and automated agent workflows—is engineered with obsessive craft, sub-millisecond responsiveness, and bulletproof security."
                </p>
              </div>

              <div style={{ paddingTop: "24px", borderTop: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.08)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: isDark ? "rgba(255,255,255,.5)" : "rgba(15,23,42,.6)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#FF6B00" }}>▮</span>
                  <span>Stack: Python · React 19 · Three.js · Flutter · FastAPI</span>
                </div>
                <Magnetic>
                  <a href="mailto:founder@arisetek.in" style={{ color: "#FF6B00", textDecoration: "none", display: "inline-block" }} className="magnetic-glow hover:underline">
                    founder@arisetek.in ↗
                  </a>
                </Magnetic>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
