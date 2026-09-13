import { useState } from "react";
import { motion } from "framer-motion";
import Magnetic from "../Magnetic";
import { useTheme } from "../../../context/ThemeContext";
import { LiveShimmerText, LiveScrambleText } from "../../ui/LiveTypography";

const AGENTS = [
  {
    id: "lead-gen",
    name: "Lead Generation & Intelligence",
    code: "AGENT_01_RECON",
    role: "Autonomous Inbound Triage & RFP Scoring",
    glyph: "((•))",
    efficiency: "99.4%",
    status: "ACTIVE · SCOUTING",
    capabilities: [
      "24/7 Automated Inbound Scoring",
      "Dynamic Budget & Scope Qualification",
      "Autonomous Competitor & Market Analysis",
      "Instant Smart Routing & Calendar Dispatch"
    ],
    telemetry: [
      "[05:14:02] [AGENT_01] Scanning inbound RFP matrix...",
      "[05:14:03] [AGENT_01] Lead qualified: Enterprise Fintech scope detected (Score: 98/100)",
      "[05:14:04] [AGENT_01] Handing off requirement payload to Architecture Agent [AGENT_02]..."
    ]
  },
  {
    id: "architecture",
    name: "Solution Architecture & Flow",
    code: "AGENT_02_ARCHITECT",
    role: "System Specifications & Blueprint Synthesis",
    glyph: "≡",
    efficiency: "98.7%",
    status: "ACTIVE · SYNTHESIZING",
    capabilities: [
      "Automated DB Schema & Entity Generation",
      "API Contract & REST/GraphQL Spec Design",
      "Cloud Infrastructure & Docker Blueprinting",
      "Cross-Platform Flutter & Web Scaffolding"
    ],
    telemetry: [
      "[05:14:05] [AGENT_02] Ingested project requirements from AGENT_01",
      "[05:14:06] [AGENT_02] Generated 32 DB entity models & 14 API endpoint contracts",
      "[05:14:07] [AGENT_02] Transmitting architectural package to Engineering Agent [AGENT_03]..."
    ]
  },
  {
    id: "engineering",
    name: "Autonomous Engineering & Dev",
    code: "AGENT_03_DEV",
    role: "Code Synthesis & Multi-Platform Assembly",
    glyph: "</>",
    efficiency: "99.8%",
    status: "ACTIVE · COMPILING",
    capabilities: [
      "Full-Stack React 19 & Next.js Synthesis",
      "Flutter Cross-Platform Mobile Engine",
      "FastAPI & Asynchronous Python Services",
      "Self-Healing Code Assembly & Scaffolding"
    ],
    telemetry: [
      "[05:14:08] [AGENT_03] Building React 19 components & Three.js WebGL shaders...",
      "[05:14:10] [AGENT_03] Scaffolding Flutter 120 FPS mobile client...",
      "[05:14:12] [AGENT_03] Build completed in 2.4s. Passing to Security Audit [AGENT_04]..."
    ]
  },
  {
    id: "qa-security",
    name: "QA & Security Verification",
    code: "AGENT_04_AUDIT",
    role: "Continuous Automated Testing & Audit",
    glyph: "⛨",
    efficiency: "100.0%",
    status: "ACTIVE · VERIFYING",
    capabilities: [
      "SAST Vulnerability & Path Traversal Scanning",
      "64/64 Automated Pytest & Vitest Suites",
      "Core Web Vitals & Sub-second LCP Testing",
      "OWASP Hardened Security Assertions"
    ],
    telemetry: [
      "[05:14:13] [AGENT_04] Probing CWE-22 directory traversal boundaries: Clean",
      "[05:14:14] [AGENT_04] Running 64/64 automated test assertions: 100% Passed",
      "[05:14:15] [AGENT_04] Security clearance granted. Handoff to Dispatch [AGENT_05]..."
    ]
  },
  {
    id: "finance-delivery",
    name: "Finance, Ops & Client Delivery",
    code: "AGENT_05_DISPATCH",
    role: "Milestone Settlement & Project Handoff",
    glyph: "◎",
    efficiency: "99.1%",
    status: "ACTIVE · SETTLING",
    capabilities: [
      "Instant Automated Invoicing & Stripe Sync",
      "Cloudflare CDN & Edge SSL Provisioning",
      "Client Dashboard & Credential Handover",
      "Post-Launch Autonomous Health Telemetry"
    ],
    telemetry: [
      "[05:14:16] [AGENT_05] Edge SSL certificates provisioned on Cloudflare",
      "[05:14:17] [AGENT_05] Client portal credentials issued to stakeholder inbox",
      "[05:14:18] [AGENT_05] Project delivery verified. Enterprise node live."
    ]
  }
];

export default function AgentSwarm() {
  const { isDark } = useTheme();
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0]);

  return (
    <section id="swarm" style={{ position: "relative", padding: "112px 24px", width: "100%", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        
        {/* Section Header */}
        <div
          className={`flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b ${isDark ? 'border-white/10' : 'border-slate-900/10'} pb-8 mb-20`}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#FF6B00",
                  animation: "ping 1.4s cubic-bezier(0,0,.2,1) infinite"
                }}
              />
              <p style={{ color: "#FF6B00", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: ".3em", textTransform: "uppercase", margin: 0 }}>
                // <LiveScrambleText text="Autonomous Multi-Agent Mesh" speed={40} />
              </p>
            </div>
            <h2
              className="live-glow-flame"
              style={{
                fontFamily: "'Unbounded', sans-serif",
                fontSize: "clamp(34px, 4.2vw, 68px)",
                fontWeight: 900,
                letterSpacing: "-.04em",
                lineHeight: 1.05,
                color: isDark ? "#fff" : "#090d16",
                margin: 0
              }}
            >
              The Autonomous <br />
              <LiveShimmerText theme="flame">
                Department Swarm.
              </LiveShimmerText>
            </h2>
          </div>
          
          <p style={{ maxWidth: "448px", color: isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.7)", fontSize: "16px", fontWeight: 300, lineHeight: 1.7, margin: 0 }}>
            Arisetek IT Solutions operates as a unified multi-agent intelligence. Every department—from initial lead qualification to full-stack code synthesis and financial delivery—is run by autonomous AI agents engineered by Founder Anaita Pal.
          </p>
        </div>

        {/* 5-Agent Horizontal Cards Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-10"
        >
          {AGENTS.map((agent, i) => {
            const isSelected = selectedAgent.id === agent.id;
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full w-full"
              >
                <Magnetic className="h-full w-full">
                <div
                  onClick={() => setSelectedAgent(agent)}
                  className="magnetic-glow h-full w-full flex flex-col"
                  style={{
                    padding: "20px",
                    borderRadius: "16px",
                    textAlign: "left",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    background: isSelected
                      ? (isDark ? "rgba(255,255,255,.08)" : "#ffffff")
                      : (isDark ? "rgba(8,9,12,.6)" : "rgba(255,255,255,0.7)"),
                    border: isSelected
                      ? "1px solid #FF6B00"
                      : (isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.08)"),
                    boxShadow: isSelected
                      ? "0 0 25px rgba(255,107,0,.25)"
                      : (isDark ? "none" : "0 4px 20px rgba(0,0,0,0.03)"),
                    transition: "all 0.3s"
                  }}
                >
                {/* Active Top Bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: isSelected ? "#FF6B00" : "transparent"
                  }}
                />

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: isSelected
                        ? "rgba(255,107,0,.2)"
                        : (isDark ? "rgba(255,255,255,.05)" : "rgba(15,23,42,.05)"),
                      color: isSelected ? "#FF6B00" : (isDark ? "#ffffff" : "#090d16"),
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "15px",
                      fontWeight: 700
                    }}
                  >
                    {agent.glyph}
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: isDark ? "rgba(255,255,255,.5)" : "rgba(15,23,42,.55)", textTransform: "uppercase", letterSpacing: ".1em" }}>
                    {agent.efficiency}
                  </span>
                </div>

                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: ".18em", color: isDark ? "rgba(255,255,255,.4)" : "rgba(15,23,42,.45)", marginBottom: "4px" }}>
                  {agent.code}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "14px", letterSpacing: "-.01em", lineHeight: 1.35, margin: 0, color: isDark ? "#ffffff" : "#090d16" }}>
                  {agent.name}
                </h3>
                </div>
                </Magnetic>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Agent Detail & Telemetry Console Split */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left Detail Panel */}
          <div
            className="lg:col-span-7"
            style={{
              background: isDark ? "rgba(8,9,12,.8)" : "#ffffff",
              backdropFilter: "blur(24px)",
              border: isDark ? "1px solid rgba(255,255,255,.15)" : "1px solid rgba(15,23,42,.1)",
              borderRadius: "24px",
              padding: "40px",
              boxShadow: isDark ? "0 25px 50px rgba(0,0,0,.5)" : "0 20px 40px rgba(0,0,0,.04)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-128px",
                right: "-128px",
                width: "320px",
                height: "320px",
                borderRadius: "50%",
                filter: "blur(100px)",
                opacity: isDark ? 0.2 : 0.1,
                background: "#FF6B00",
                pointerEvents: "none"
              }}
            />

            <div>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", marginBottom: "24px", paddingBottom: "16px", borderBottom: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.08)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "12px",
                      background: "rgba(255,107,0,.2)",
                      color: "#FF6B00",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 700
                    }}
                  >
                    {selectedAgent.glyph}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "24px", fontWeight: 900, letterSpacing: "-.02em", margin: 0, color: isDark ? "#fff" : "#090d16" }}>
                      {selectedAgent.name}
                    </h3>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: isDark ? "rgba(255,255,255,.5)" : "rgba(15,23,42,.6)", letterSpacing: ".05em", margin: "2px 0 0" }}>
                      {selectedAgent.role}
                    </p>
                  </div>
                </div>

                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    letterSpacing: ".18em",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,107,0,.4)",
                    color: "#FF6B00",
                    background: "rgba(255,107,0,.1)"
                  }}
                >
                  {selectedAgent.status}
                </span>
              </div>

              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: ".2em", color: isDark ? "rgba(255,255,255,.4)" : "rgba(15,23,42,.5)", margin: "0 0 16px" }}>
                // Autonomous Core Capabilities
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {selectedAgent.capabilities.map((cap, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "14px",
                      borderRadius: "12px",
                      background: isDark ? "rgba(255,255,255,.03)" : "rgba(15,23,42,.03)",
                      border: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.08)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px"
                    }}
                  >
                    <span style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid #FF6B00", marginTop: "2px", flexShrink: 0 }} />
                    <span style={{ fontSize: "12px", color: isDark ? "rgba(255,255,255,.8)" : "#334155", lineHeight: 1.6, fontWeight: 500 }}>
                      {cap}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ paddingTop: "24px", marginTop: "24px", borderTop: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: isDark ? "rgba(255,255,255,.5)" : "rgba(15,23,42,.6)" }}>
                Autonomous Reliability: <strong style={{ color: isDark ? "#fff" : "#090d16" }}>{selectedAgent.efficiency}</strong>
              </span>
              <Magnetic>
                <a
                  href="#contact"
                  className="magnetic-glow"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "12px",
                    fontFamily: "'JetBrains Mono', monospace",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    fontWeight: 700,
                    color: "#FF6B00",
                    textDecoration: "none"
                  }}
                >
                  Deploy with this Agent →
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right Live Telemetry Terminal */}
          <div
            className="lg:col-span-5"
            style={{
              background: "#050608",
              border: "1px solid rgba(255,255,255,.15)",
              borderRadius: "24px",
              padding: "32px",
              boxShadow: "0 25px 50px rgba(0,0,0,.5)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              fontFamily: "'JetBrains Mono', monospace"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#FF6B00", fontSize: "14px" }}>▮</span>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,.7)", textTransform: "uppercase", letterSpacing: ".18em", fontWeight: 700 }}>
                    Swarm Telemetry Console
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(239,68,68,.8)" }} />
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(234,179,8,.8)" }} />
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF6B00" }} />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "12px", lineHeight: 1.6, padding: "8px 0" }}>
                <p style={{ color: "rgba(255,255,255,.4)", margin: 0 }}>
                  // Establishing secure neural link to {selectedAgent.code}...
                </p>
                <p style={{ color: "#34d399", margin: 0 }}>
                  ✓ Mesh node online · Encryption: Ed25519 · Latency: 0.2ms
                </p>
                {selectedAgent.telemetry.map((log, i) => (
                  <p key={i} style={{ color: "#FF8500", fontSize: "11px", margin: 0, wordBreak: "break-word" }}>
                    {log}
                  </p>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "10px", color: "rgba(255,255,255,.4)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#FF6B00",
                    animation: "pulse-slow 2s infinite"
                  }}
                />
                AUTONOMOUS FEED: 100% OPERATIONAL
              </span>
              <span>NODE: ARIS-NX-01</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
