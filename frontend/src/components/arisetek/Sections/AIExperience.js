import { useState } from "react";
import Magnetic from "../Magnetic";
import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import { LiveBadge, LiveShimmerText, LiveScrambleText } from "../../ui/LiveTypography";

const STAGES = [
  {
    id: "inbound",
    step: "01",
    title: "Inbound Lead Scored by AI",
    agent: "AGENT_01 · RECON",
    glyph: "◉",
    desc: "A prospective client submits project requirements. The agent instantly parses the brief, checks tech compatibility, and qualifies the scope in 200ms.",
    telemetry: "Lead ID #8920 · Scope: Fintech App · Score: 98/100 · Auto-Qualified",
    speed: "0.2s",
    accuracy: "99.8%"
  },
  {
    id: "synthesis",
    step: "02",
    title: "Architecture & Code Synthesis",
    agent: "AGENT_02 & AGENT_03",
    glyph: "▤",
    desc: "Autonomous agents generate database schemas, API specs, React 19 / Flutter scaffolds, and containerized Docker manifests.",
    telemetry: "Generated: 32 DB Models · 14 API Endpoints · 18 UI Shaders · 0 Syntax Errors",
    speed: "1.4s",
    accuracy: "99.4%"
  },
  {
    id: "verification",
    step: "03",
    title: "Continuous Automated QA",
    agent: "AGENT_04 · SECURITY AUDIT",
    glyph: "⛨",
    desc: "SAST vulnerability scanners run path traversal probes, unit test matrices, and Core Web Vitals checks ensuring 100% security compliance.",
    telemetry: "Assertions: 64/64 Passed · CWE-22 Checked · LCP: 0.6s · OWASP: Clean",
    speed: "0.8s",
    accuracy: "100.0%"
  },
  {
    id: "delivery",
    step: "04",
    title: "Client Delivery & Settlement",
    agent: "AGENT_05 · DISPATCH & FINANCE",
    glyph: "◎",
    desc: "Production edge CDN propagation is executed, automated invoices are settled, and the client receives live dashboard credentials.",
    telemetry: "SSL Provisioned · Client Portal Active · Invoice Settled · Handover Complete",
    speed: "Instant",
    accuracy: "100.0%"
  }
];

export default function AIExperience() {
  const { isDark } = useTheme();
  const [activeStage, setActiveStage] = useState(STAGES[0]);

  return (
    <section id="pipeline" style={{ position: "relative", padding: "112px 24px", width: "100%", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "80px", textAlign: "center", maxWidth: "768px", marginLeft: "auto", marginRight: "auto" }}
        >
          <LiveBadge theme="flame" className="mb-4">
            ✦ <LiveScrambleText text="Autonomous Execution Pipeline" speed={45} />
          </LiveBadge>
          
          <h2
            className="live-glow-flame"
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: "clamp(34px, 4.2vw, 72px)",
              fontWeight: 900,
              letterSpacing: "-.04em",
              lineHeight: 1.05,
              color: isDark ? "#fff" : "#090d16",
              margin: "0 0 24px"
            }}
          >
            From Inbound Lead <br />
            <LiveShimmerText theme="flame">
              to Finished Software.
            </LiveShimmerText>
          </h2>
          <p style={{ color: isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.7)", fontSize: "18px", fontWeight: 300, lineHeight: 1.7, margin: 0 }}>
            Experience how Arisetek’s autonomous multi-agent swarm transforms a project brief into secure, production-grade digital software in real time.
          </p>
        </motion.div>

        {/* 4-Stage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {STAGES.map((st, i) => {
            const isActive = activeStage.id === st.id;
            return (
              <motion.div
                key={st.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full w-full"
              >
                <Magnetic className="h-full w-full">
                  <div
                    onClick={() => setActiveStage(st)}
                    style={{
                      borderRadius: "24px",
                      padding: "32px",
                      position: "relative",
                      border: isActive
                        ? "1px solid #FF6B00"
                        : (isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.1)"),
                      background: isActive
                        ? (isDark ? "rgba(255,255,255,.08)" : "#ffffff")
                        : (isDark ? "rgba(8,9,12,.6)" : "rgba(255,255,255,0.75)"),
                      boxShadow: isActive
                        ? "0 0 30px rgba(255,107,0,.25)"
                        : (isDark ? "none" : "0 4px 20px rgba(0,0,0,0.03)"),
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      height: "100%"
                    }}
                    className="magnetic-glow hover:border-[#FF6B00]/50 hover:scale-[1.03]"
                  >
                {/* Active Top Bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: isActive ? "#FF6B00" : "transparent"
                  }}
                />

                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "30px", fontWeight: 900, color: isDark ? "rgba(255,255,255,.2)" : "rgba(15,23,42,.15)" }}>
                      {st.step}
                    </span>
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: isActive ? "rgba(255,107,0,.2)" : (isDark ? "rgba(255,255,255,.05)" : "rgba(15,23,42,.04)"),
                        color: isActive ? "#FF6B00" : (isDark ? "#ffffff" : "#090d16"),
                        border: isActive ? "1px solid rgba(255,107,0,.4)" : (isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.08)"),
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "18px"
                      }}
                    >
                      {st.glyph}
                    </div>
                  </div>

                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: ".18em", color: isDark ? "rgba(255,255,255,.4)" : "rgba(15,23,42,.5)", display: "block", marginBottom: "8px" }}>
                    {st.agent}
                  </span>
                  
                  <h3 style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-.02em", margin: "0 0 12px", color: isDark ? "#fff" : "#090d16" }}>
                    {st.title}
                  </h3>

                  <p style={{ color: isDark ? "rgba(255,255,255,.7)" : "rgba(15,23,42,.7)", fontSize: "12px", lineHeight: 1.7, fontWeight: 300, margin: "0 0 24px" }}>
                    {st.desc}
                  </p>
                </div>

                <div style={{ paddingTop: "16px", borderTop: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.08)", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px" }}>
                  <span style={{ color: isDark ? "rgba(255,255,255,.4)" : "rgba(15,23,42,.55)" }}>
                    Latency: <strong style={{ color: isDark ? "#fff" : "#090d16" }}>{st.speed}</strong>
                  </span>
                  <span style={{ color: "#FF6B00" }}>{st.accuracy} verified</span>
                </div>
                  </div>
                </Magnetic>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Stage Live Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          style={{
            background: isDark ? "rgba(8,9,12,.8)" : "#ffffff",
            backdropFilter: "blur(24px)",
            border: isDark ? "1px solid rgba(255,255,255,.15)" : "1px solid rgba(15,23,42,.1)",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: isDark ? "0 25px 50px rgba(0,0,0,.5)" : "0 20px 40px rgba(0,0,0,.04)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              filter: "blur(100px)",
              opacity: isDark ? 0.15 : 0.08,
              background: "#FF6B00",
              pointerEvents: "none"
            }}
          />

          <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b ${isDark ? 'border-white/10' : 'border-slate-900/10'} mb-6`}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  background: "rgba(255,107,0,.2)",
                  color: "#FF6B00",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "18px"
                }}
              >
                {activeStage.glyph}
              </div>
              <div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: ".18em", color: isDark ? "rgba(255,255,255,.4)" : "rgba(15,23,42,.5)" }}>
                  Active Execution Node: Stage {activeStage.step}
                </span>
                <h4 style={{ fontSize: "24px", fontWeight: 900, letterSpacing: "-.02em", margin: "2px 0 0", color: isDark ? "#fff" : "#090d16" }}>
                  {activeStage.title}
                </h4>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF6B00", animation: "pulse-slow 2s infinite" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: isDark ? "rgba(255,255,255,.7)" : "rgba(15,23,42,.7)" }}>
                PIPELINE STATUS: SYNCHRONIZED
              </span>
            </div>
          </div>

          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              padding: "16px",
              borderRadius: "12px",
              background: "#050608",
              border: "1px solid rgba(255,255,255,.1)",
              color: "#FF8500",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", overflowX: "auto" }}>
              <span style={{ color: "rgba(255,255,255,.4)" }}>▮</span>
              <span>{activeStage.telemetry}</span>
            </div>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,.4)", textTransform: "uppercase", flexShrink: 0 }}>
              Verified by Core
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
