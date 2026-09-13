import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import NexusCore from "../3D/NexusCore";
import Magnetic from "../Magnetic";
import { useTheme } from "../../../context/ThemeContext";
import { LiveShimmerText, LiveScrambleText, LiveBadge } from "../../ui/LiveTypography";

export default function Hero() {
  const { isDark } = useTheme();
  return (
    <section
      id="home"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "92vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "144px 24px 64px",
        boxSizing: "border-box"
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto", width: "100%", display: "flex", flexDirection: "column" }}>
        
        {/* Top Status Badges */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
          <LiveBadge theme="flame">
            <LiveScrambleText text="Autonomous AI Android Swarm" speed={40} />
          </LiveBadge>

          <div
            className="live-badge-glow"
            style={{
              padding: "6px 14px",
              borderRadius: "999px",
              background: isDark ? "rgba(255,255,255,.04)" : "rgba(15,23,42,.04)",
              border: isDark ? "1px solid rgba(255,255,255,.15)" : "1px solid rgba(15,23,42,.12)",
              color: isDark ? "rgba(255,255,255,.8)" : "rgba(15,23,42,.8)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: ".1em",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backdropFilter: "blur(12px)"
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399", boxShadow: "0 0 10px #34d399" }} />
            <span>Telemetry: <span style={{ color: "#34d399", fontWeight: 700 }}>100% Operational</span></span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          
          {/* Left Column: Headline & Pitch */}
          <div className="lg:col-span-7 flex flex-col">
            <div style={{ maxWidth: "1024px" }}>
              <h1
                className="live-glow-flame"
                style={{
                  fontFamily: "'Unbounded', sans-serif",
                  fontSize: "clamp(38px, 4.2vw, 64px)",
                  fontWeight: 900,
                  letterSpacing: "-.04em",
                  color: isDark ? "#fff" : "#090d16",
                  lineHeight: ".94",
                  margin: "0 0 24px",
                  textTransform: "uppercase"
                }}
              >
                Evolve With <br />
                <LiveShimmerText theme="flame">
                  Intelligence.
                </LiveShimmerText> <br />
                <span className="live-shimmer-silver">AI-Driven Future.</span>
              </h1>
              <p
                style={{
                  color: isDark ? "rgba(255,255,255,.7)" : "rgba(15,23,42,.75)",
                  fontSize: "18px",
                  fontWeight: 300,
                  lineHeight: "1.6",
                  maxWidth: "672px",
                  margin: "0 0 40px"
                }}
              >
                Arisetek IT Solutions is an autonomous digital agency where every department is powered by high-definition AI agents—from instant lead qualification to software synthesis, automated QA, and seamless client delivery.
              </p>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px" }}>
              <Magnetic>
                <a
                  href="#contact"
                  style={{
                    padding: "16px 32px",
                    borderRadius: "999px",
                    background: "linear-gradient(90deg, #FF6B00, #FF8500)",
                    color: "#000",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: ".15em",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    textDecoration: "none",
                    boxShadow: "0 0 25px rgba(255,107,0,.4)",
                    transition: "all 0.3s"
                  }}
                  className="magnetic-glow hover:scale-105 hover:!shadow-[0_0_40px_rgba(255,107,0,.7)]"
                >
                  <span>Initialize Project</span>
                  <span>→</span>
                </a>
              </Magnetic>

              <Magnetic>
                <Link
                  to="/portfolio"
                  style={{
                    padding: "14px 24px",
                    borderRadius: "999px",
                    border: isDark ? "1px solid rgba(255,255,255,.2)" : "1px solid rgba(15,23,42,.15)",
                    background: isDark ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.8)",
                    color: isDark ? "#fff" : "#090d16",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    backdropFilter: "blur(12px)",
                    textDecoration: "none",
                    boxShadow: isDark ? "none" : "0 4px 15px rgba(0,0,0,0.04)",
                    transition: "all 0.3s"
                  }}
                  className="magnetic-glow hover:border-[#FF6B00]/50"
                >
                  <span
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: isDark ? "1px solid rgba(255,255,255,.4)" : "1px solid rgba(15,23,42,.3)",
                      display: "block"
                    }}
                  >
                    <img
                      src="/founder.jpg"
                      alt="Anaita Pal"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </span>
                  <span>Founder Sanctuary ⛩️</span>
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* Right Column: 3D WebGL Nexus Core Box */}
          <div
            className="lg:col-span-5"
            style={{
              position: "relative",
              width: "100%",
              height: "520px",
              borderRadius: "24px",
              border: isDark ? "1px solid rgba(255,255,255,.12)" : "1px solid rgba(15,23,42,.10)",
              background: isDark
                ? "radial-gradient(ellipse at 50% 45%, rgba(255,107,0,.10), rgba(5,6,8,.55) 60%, rgba(5,6,8,.75))"
                : "radial-gradient(ellipse at 50% 45%, rgba(255,107,0,.08), rgba(246,248,250,.7) 60%, rgba(246,248,250,.9))",
              boxShadow: isDark ? "0 30px 70px rgba(0,0,0,.55)" : "0 20px 50px rgba(0,0,0,.06)",
              overflow: "hidden"
            }}
          >
            {/* Top HUD Overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 2,
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pointerEvents: "none",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: isDark ? "rgba(255,255,255,.55)" : "rgba(15,23,42,.65)",
                borderBottom: isDark ? "1px solid rgba(255,255,255,.08)" : "1px solid rgba(15,23,42,.06)"
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#FF6B00",
                    animation: "pulse-slow 2s infinite"
                  }}
                />
                Nexus Core · Live Swarm
              </span>
              <span style={{ color: isDark ? "rgba(255,255,255,.35)" : "rgba(15,23,42,.45)" }}>5 Nodes</span>
            </div>

            {/* 3D WebGL Interactive Nexus Canvas */}
            <NexusCore />

            {/* Bottom HUD Bar */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 2,
                padding: "12px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pointerEvents: "none",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                color: isDark ? "rgba(255,255,255,.4)" : "rgba(15,23,42,.55)",
                borderTop: isDark ? "1px solid rgba(255,255,255,.08)" : "1px solid rgba(15,23,42,.06)",
                background: isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.4)"
              }}
            >
              <span>AUTONOMOUS AGENT CORE</span>
              <span style={{ color: "#FF6B00" }}>120 FPS WEBGL</span>
            </div>
          </div>

        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          style={{
            marginTop: "56px",
            paddingTop: "32px",
            borderTop: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.1)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "24px",
            maxWidth: "768px"
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <div style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 300, fontSize: "28px", letterSpacing: "-.02em", color: isDark ? "#fff" : "#090d16" }}>
              5 <span style={{ color: "#FF6B00", fontSize: "16px", fontFamily: "'JetBrains Mono', monospace" }}>Agents</span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", textTransform: "uppercase", color: isDark ? "rgba(255,255,255,.5)" : "rgba(15,23,42,.55)", letterSpacing: ".15em", marginTop: "2px" }}>
              Autonomous Mesh
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <div style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 300, fontSize: "28px", letterSpacing: "-.02em", color: isDark ? "#fff" : "#090d16" }}>
              3 <span style={{ color: isDark ? "#fff" : "#090d16", fontSize: "16px", fontFamily: "'JetBrains Mono', monospace" }}>Pillars</span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", textTransform: "uppercase", color: isDark ? "rgba(255,255,255,.5)" : "rgba(15,23,42,.55)", letterSpacing: ".15em", marginTop: "2px" }}>
              App · Web · Automation
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <div style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 300, fontSize: "28px", letterSpacing: "-.02em", color: isDark ? "#fff" : "#090d16" }}>
              0.4s <span style={{ color: "#34d399", fontSize: "16px", fontFamily: "'JetBrains Mono', monospace" }}>SLA</span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", textTransform: "uppercase", color: isDark ? "rgba(255,255,255,.5)" : "rgba(15,23,42,.55)", letterSpacing: ".15em", marginTop: "2px" }}>
              Sub-second Execution
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <div style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 300, fontSize: "28px", letterSpacing: "-.02em", color: isDark ? "#fff" : "#090d16" }}>
              100% <span style={{ color: "#FFA000", fontSize: "16px", fontFamily: "'JetBrains Mono', monospace" }}>Bespoke</span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", textTransform: "uppercase", color: isDark ? "rgba(255,255,255,.5)" : "rgba(15,23,42,.55)", letterSpacing: ".15em", marginTop: "2px" }}>
              Direct Founder Craft
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
