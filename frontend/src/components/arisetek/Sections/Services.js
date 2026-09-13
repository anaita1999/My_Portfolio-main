import { useState, useEffect } from "react";
import Magnetic from "../Magnetic";
import { usePortfolioContent } from "../../../context/PortfolioContentContext";
import { useTheme } from "../../../context/ThemeContext";
import { LiveShimmerText, LiveScrambleText } from "../../ui/LiveTypography";

const CONSOLE_SCRIPT = [
  { text: "$ arisetek synth --brief=BR-8920 --targets=web,flutter", color: "#ffffff" },
  { text: "→ parsing brief · fintech scope · score 98/100", color: "rgba(255,255,255,.55)" },
  { text: "✓ schema synthesised   32 models", color: "#34d399" },
  { text: "✓ api surface          14 endpoints", color: "#34d399" },
  { text: "▸ emitting react-19 components…", color: "#FF8500" },
  { text: "  ├─ AgentConsole.tsx        1.4 kb", color: "rgba(255,255,255,.5)" },
  { text: "  ├─ NexusCore.webgl.ts      3.1 kb", color: "rgba(255,255,255,.5)" },
  { text: "  └─ pricing.agent.py        2.7 kb", color: "rgba(255,255,255,.5)" },
  { text: "✓ qa matrix            64/64 passed", color: "#34d399" },
  { text: "✓ owasp audit          clean", color: "#34d399" },
  { text: "▸ deploying to edge · ssl provisioned", color: "#FF8500" },
  { text: "◆ build complete in 2.4s — handover ready", color: "#FF6B00" }
];

const FALLBACK_PILLARS = [
  {
    number: "01",
    title: "App Development",
    badge: "Cross-Platform · Native Speed",
    glyph: "▯",
    color: "#FF6B00",
    description: "We build high-performance mobile and desktop client applications using Flutter and reactive architectures, with fluid 120 FPS animations and offline-first state synchronization.",
    stack: ["Flutter", "Dart", "iOS & Android", "Firebase", "Offline-First SQLite"],
    features: [
      "Fluid cross-platform mobile apps for iOS & Android",
      "Reactive clean architecture with BLOC / Riverpod",
      "Real-time push notifications & background sync",
      "Hardware sensor, camera & biometric integrations"
    ]
  },
  {
    number: "02",
    title: "Website Development",
    badge: "3D WebGL · React 19 · Next.js",
    glyph: "◍",
    color: "#ffffff",
    description: "Cinematic, award-winning digital experiences engineered for blistering speed, search authority, and high conversions. Built with React 19, Three.js WebGL shaders, and FastAPI backends.",
    stack: ["React 19", "Next.js", "Three.js WebGL", "Tailwind CSS", "FastAPI / Python"],
    features: [
      "Photorealistic 3D WebGL shaders & procedural worlds",
      "Sub-second Core Web Vitals & automated SEO structure",
      "Enterprise portals, dashboards, and custom client CRMs",
      "Ultra-responsive layouts across mobile, tablet & desktop"
    ]
  },
  {
    number: "03",
    title: "AI Automations & Agentic Pipelines",
    badge: "Multi-Agent Swarm · Autonomous",
    glyph: "◈",
    color: "#FFA000",
    description: "We architect and deploy autonomous AI agent swarms that execute end-to-end business operations—from 24/7 lead qualification and support triaging to self-healing workflow automations.",
    stack: ["Multi-Agent AI", "LangChain / LangGraph", "FastAPI", "Vector RAG", "Webhook Pipelines"],
    features: [
      "Multi-agent autonomous decision loops & tool calling",
      "Private enterprise RAG knowledge graphs & embeddings",
      "Autonomous lead intake, scoring & automated CRM sync",
      "Self-healing LLM pipelines with automated fallback"
    ]
  }
];

export default function Services() {
  const { isDark } = useTheme();
  const { arisetekContent } = usePortfolioContent();
  const PILLARS = arisetekContent?.services || FALLBACK_PILLARS;

  const [chars, setChars] = useState(0);

  const totalChars = CONSOLE_SCRIPT.reduce((acc, line) => acc + line.text.length, 0);

  useEffect(() => {
    const timer = setInterval(() => {
      setChars((prev) => (prev > totalChars + 50 ? 0 : prev + 3));
    }, 40);
    return () => clearInterval(timer);
  }, [totalChars]);

  // Build typing console lines
  let budget = chars;
  const consoleLines = [];
  for (let i = 0; i < CONSOLE_SCRIPT.length; i++) {
    if (budget <= 0) break;
    const l = CONSOLE_SCRIPT[i];
    const shown = l.text.slice(0, budget);
    const typing = shown.length < l.text.length;
    consoleLines.push({
      num: String(i + 1).padStart(2, "0"),
      text: shown,
      color: l.color,
      caret: typing
    });
    budget -= l.text.length;
    if (typing) break;
  }
  if (!consoleLines.length) {
    consoleLines.push({ num: "01", text: "", color: "#ffffff", caret: true });
  }
  const progressPct = Math.min(100, Math.round((chars / totalChars) * 100));

  return (
    <section id="services" style={{ position: "relative", padding: "112px 24px", width: "100%", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        
        {/* Top Split: Pitch + Live Code Synthesis Console */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-end border-b ${isDark ? 'border-white/10' : 'border-slate-900/10'} pb-8 mb-24`}
        >
          {/* Left Pitch */}
          <div className="lg:col-span-6">
            <p style={{ color: "#FF6B00", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: ".3em", textTransform: "uppercase", margin: "0 0 12px" }}>
              // <LiveScrambleText text="Core Capabilities" speed={40} />
            </p>
            <h2
              className="live-glow-flame"
              style={{
                fontFamily: "'Unbounded', sans-serif",
                fontSize: "clamp(34px, 3.2vw, 54px)",
                fontWeight: 900,
                letterSpacing: "-.04em",
                maxWidth: "820px",
                lineHeight: 1.02,
                color: isDark ? "#fff" : "#090d16",
                margin: "0 0 24px"
              }}
            >
              Everything your enterprise needs to operate <br />
              <LiveShimmerText theme="flame">
                with autonomous intelligence.
              </LiveShimmerText>
            </h2>
            <p style={{ color: isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.7)", fontSize: "16px", fontWeight: 300, maxWidth: "520px", margin: 0 }}>
              Our three core disciplines are designed to work together as a synchronized digital stack, elevating your company’s market presence and operational efficiency.
            </p>
          </div>

          {/* Right Live Typing Console */}
          <div
            className="lg:col-span-6"
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,.14)",
              background: "linear-gradient(160deg, rgba(255,107,0,.10), rgba(5,6,8,.92) 45%, rgba(5,6,8,1))",
              boxShadow: "0 30px 70px rgba(0,0,0,.6)"
            }}
          >
            {/* Animated Laser Scanline */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: "2px",
                background: "linear-gradient(90deg, transparent, rgba(255,107,0,.55), transparent)",
                animation: "scan-line 6s linear infinite",
                pointerEvents: "none",
                zIndex: 2
              }}
            />

            {/* Window Bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.03)" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "rgba(255,255,255,.18)" }} />
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "rgba(255,255,255,.18)" }} />
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FF6B00" }} />
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>
                agent_03 · code_synthesis.log
              </span>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "7px", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: ".14em", textTransform: "uppercase", color: "#FF6B00" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF6B00", animation: "pulse-slow 1.6s infinite" }} />
                Live
              </span>
            </div>

            {/* Code Lines Display */}
            <div style={{ padding: "18px 18px 14px", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", lineHeight: "1.85", height: "326px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {consoleLines.slice(-12).map((line, idx) => (
                <div key={idx} style={{ display: "grid", gridTemplateColumns: "24px 1fr", gap: "12px" }}>
                  <span style={{ color: "rgba(255,255,255,.2)", textAlign: "right" }}>{line.num}</span>
                  <span style={{ color: line.color, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {line.text}
                    {line.caret && (
                      <span style={{ display: "inline-block", width: "7px", height: "13px", background: "#FF6B00", marginLeft: "2px", verticalAlign: "-2px", animation: "blink 1s step-end infinite" }} />
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Progress Bar */}
            <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", gap: "14px", background: "rgba(255,255,255,.02)" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", whiteSpace: "nowrap" }}>
                Build {progressPct}%
              </span>
              <span style={{ flex: 1, height: "3px", borderRadius: "999px", background: "rgba(255,255,255,.1)", overflow: "hidden" }}>
                <span style={{ display: "block", height: "100%", borderRadius: "999px", background: "linear-gradient(90deg, #FF6B00, #FFA000)", width: `${progressPct}%`, transition: "width 0.1s ease-out" }} />
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.35)", whiteSpace: "nowrap" }}>
                ARIS-NX-01
              </span>
            </div>
          </div>
        </div>

        {/* 3 Core Capability Pillar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PILLARS.map((p) => (
            <Magnetic key={p.number} className="h-full w-full">
              <div
                style={{
                  background: isDark ? "rgba(8,9,12,.8)" : "#ffffff",
                  backdropFilter: "blur(24px)",
                  border: isDark ? "1px solid rgba(255,255,255,.15)" : "1px solid rgba(15,23,42,.1)",
                  borderRadius: "24px",
                  padding: "40px",
                  boxShadow: isDark ? "0 25px 50px rgba(0,0,0,.5)" : "0 20px 40px rgba(0,0,0,.04)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.3s"
                }}
                className="magnetic-glow hover:border-[#FF6B00]/50 h-full w-full"
              >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "256px",
                  height: "256px",
                  borderRadius: "50%",
                  filter: "blur(90px)",
                  opacity: isDark ? 0.1 : 0.06,
                  background: p.color,
                  pointerEvents: "none"
                }}
              />

              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", paddingBottom: "16px", borderBottom: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.08)" }}>
                  <div
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: isDark ? "rgba(255,255,255,.04)" : "rgba(15,23,42,.04)",
                      border: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.08)",
                      color: isDark ? (p.color === "#ffffff" ? "#fff" : p.color) : (p.color === "#ffffff" ? "#090d16" : p.color),
                      fontSize: "22px",
                      fontFamily: "'JetBrains Mono', monospace"
                    }}
                  >
                    {p.glyph}
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "30px", fontWeight: 900, color: isDark ? "rgba(255,255,255,.2)" : "rgba(15,23,42,.15)" }}>
                    {p.number}
                  </span>
                </div>

                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", textTransform: "uppercase", fontWeight: 700, letterSpacing: ".15em", padding: "4px 12px", borderRadius: "999px", border: isDark ? "1px solid rgba(255,255,255,.15)" : "1px solid rgba(15,23,42,.12)", background: isDark ? "rgba(255,255,255,.04)" : "rgba(15,23,42,.03)", color: isDark ? "rgba(255,255,255,.8)" : "rgba(15,23,42,.8)", display: "inline-block", marginBottom: "12px" }}>
                  {p.badge}
                </span>

                <h3 style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-.02em", margin: "0 0 16px", color: isDark ? "#fff" : "#090d16" }}>
                  {p.title}
                </h3>

                <p style={{ color: isDark ? "rgba(255,255,255,.7)" : "rgba(15,23,42,.7)", fontSize: "14px", lineHeight: "1.7", fontWeight: 300, margin: "0 0 32px" }}>
                  {p.description}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
                  {p.features.map((feat, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <span style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid #FF6B00", marginTop: "3px", flexShrink: 0 }} />
                      <span style={{ fontSize: "12px", color: isDark ? "rgba(255,255,255,.8)" : "#334155", lineHeight: "1.6", fontWeight: 500 }}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingTop: "24px", borderTop: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.08)", marginBottom: "24px" }}>
                  {p.stack.map((item) => (
                    <span
                      key={item}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "9px",
                        textTransform: "uppercase",
                        letterSpacing: ".1em",
                        color: isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.65)",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        background: isDark ? "rgba(255,255,255,.04)" : "rgba(15,23,42,.04)",
                        border: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.08)"
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <Magnetic className="w-full">
                  <a
                    href="#pricing"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("arisetek-set-pricing-tab", {
                          detail: { category: p.title === "AI Automations & Agentic Pipelines" ? "AI Automation" : p.title }
                        })
                      );
                    }}
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: "12px",
                      border: isDark ? "1px solid rgba(255,255,255,.2)" : "1px solid rgba(15,23,42,.15)",
                      background: isDark ? "rgba(255,255,255,.04)" : "rgba(15,23,42,.04)",
                      color: isDark ? "#fff" : "#090d16",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: ".1em",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      boxSizing: "border-box",
                      textDecoration: "none",
                      transition: "all 0.2s"
                    }}
                    className="magnetic-glow hover:!bg-[#FF6B00] hover:!text-black hover:!border-[#FF6B00]"
                  >
                    Request Proposal →
                  </a>
                </Magnetic>
              </div>
            </div>
            </Magnetic>
          ))}
        </div>

      </div>
    </section>
  );
}
