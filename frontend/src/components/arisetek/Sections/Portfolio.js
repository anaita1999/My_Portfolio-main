import { Link } from "react-router-dom";
import { usePortfolioContent } from "../../../context/PortfolioContentContext";
import { useTheme } from "../../../context/ThemeContext";

export default function Portfolio() {
  const { isDark } = useTheme();
  const { arisetekContent } = usePortfolioContent();
  const cmsProjects = arisetekContent?.projects || [];

  return (
    <section id="portfolio" style={{ position: "relative", padding: "128px 24px", width: "100%", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
        
        {/* Section Header */}
        <div
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-32"
        >
          <div>
            <p style={{ color: isDark ? "rgba(255,255,255,.4)" : "rgba(15,23,42,.5)", fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", letterSpacing: ".18em", textTransform: "uppercase", margin: "0 0 24px" }}>
              // Selected Works
            </p>
            <h2
              style={{
                fontSize: "clamp(42px, 5vw, 88px)",
                fontWeight: 900,
                letterSpacing: "-.05em",
                lineHeight: 1,
                margin: 0,
                fontFamily: "'Unbounded', sans-serif",
                color: isDark ? "#fff" : "#090d16"
              }}
            >
              Featured <br />
              <span style={{ background: isDark ? "linear-gradient(90deg, #fff, rgba(255,255,255,.2))" : "linear-gradient(90deg, #090d16, rgba(9,13,22,.4))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                Digital Products.
              </span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p style={{ color: isDark ? "rgba(255,255,255,.5)" : "rgba(15,23,42,.65)", maxWidth: "384px", fontSize: "18px", fontWeight: 300, margin: 0 }}>
              We engineer high-performance platforms that solve complex business logic while maintaining award-winning aesthetics.
            </p>
            <Link
              to="/portfolio"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: ".18em",
                color: "#00E5FF",
                textDecoration: "none"
              }}
              className="hover:underline"
            >
              Explore Founder Case Studies &amp; Sanctuary ⛩️ →
            </Link>
          </div>
        </div>

        {/* Project 01: MedSync (Healthcare Portal) */}
        <div
          className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center mb-36 w-full"
        >
          {/* Visual Showcase (Mock Dashboard) */}
          <div
            className="w-full lg:w-[62%]"
            style={{
              position: "relative",
              padding: "36px",
              borderRadius: "28px",
              border: "1px solid rgba(255,255,255,.1)",
              background: "radial-gradient(ellipse at 50% 0%, rgba(255,107,0,.16), rgba(6,7,10,.9) 62%, rgba(6,7,10,1))",
              boxShadow: "0 30px 70px rgba(0,0,0,.6)",
              boxSizing: "border-box"
            }}
          >
            {/* Grid background texture */}
            <div style={{ position: "absolute", inset: 0, borderRadius: "28px", backgroundImage: "linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />

            <div style={{ position: "relative", borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(255,255,255,.14)", background: "#0A0B0E", boxShadow: "0 24px 60px rgba(0,0,0,.7)" }}>
              
              {/* Browser Window Chrome */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 14px", background: "rgba(255,255,255,.045)", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "rgba(255,255,255,.2)" }} />
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "rgba(255,255,255,.2)" }} />
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "rgba(255,255,255,.2)" }} />
                </div>
                <div style={{ flex: 1, padding: "5px 12px", borderRadius: "8px", background: "rgba(0,0,0,.5)", border: "1px solid rgba(255,255,255,.08)", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "rgba(255,255,255,.45)", letterSpacing: ".06em" }}>
                  medsync.arisetek.in/clinic
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: ".16em", textTransform: "uppercase", color: "#FF6B00" }}>
                  Live
                </span>
              </div>

              {/* Dashboard Internal Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12">
                
                {/* Sidebar */}
                <div className="hidden md:flex md:col-span-3 border-r border-white/[0.08] p-4 flex-col gap-4 bg-white/[0.02]">
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "20px", height: "20px", borderRadius: "6px", background: "#FF6B00" }} />
                    <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "-.01em", color: "#fff" }}>MedSync</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                    {[
                      { label: "Overview", active: true },
                      { label: "Appointments", active: false },
                      { label: "Patients", active: false },
                      { label: "Triage AI", active: false },
                      { label: "Records", active: false }
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: "9px", padding: "7px 9px", borderRadius: "8px", background: item.active ? "rgba(255,107,0,.14)" : "transparent" }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: item.active ? "#FF6B00" : "rgba(255,255,255,.25)" }} />
                        <span style={{ fontSize: "11px", color: item.active ? "#ffffff" : "rgba(255,255,255,.55)", fontWeight: 500 }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: "auto", padding: "10px", borderRadius: "10px", border: "1px solid rgba(255,255,255,.08)", background: "rgba(0,0,0,.35)" }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.35)" }}>Agent</div>
                    <div style={{ fontSize: "10px", color: "rgba(255,255,255,.7)", marginTop: "3px", lineHeight: 1.4 }}>Agent 01 triages inbound symptom forms in 0.2s</div>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="col-span-1 md:col-span-9 p-4 md:p-5 flex flex-col gap-3.5">
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "12px" }}>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.35)" }}>Healthcare Portal</div>
                      <div style={{ fontSize: "17px", fontWeight: 700, letterSpacing: "-.02em", marginTop: "2px", color: "#fff" }}>Clinic overview</div>
                    </div>
                    <span style={{ padding: "5px 11px", borderRadius: "999px", fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: ".12em", textTransform: "uppercase", color: "#FF6B00", border: "1px solid rgba(255,107,0,.35)", background: "rgba(255,107,0,.12)" }}>
                      Production
                    </span>
                  </div>

                  {/* 3 KPI Cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "9px" }}>
                    {[
                      { label: "Patients", value: "2,481", delta: "+8.4%" },
                      { label: "Booked today", value: "64", delta: "+12" },
                      { label: "Avg triage", value: "0.2s", delta: "−40ms" }
                    ].map((kpi, ki) => (
                      <div key={ki} style={{ padding: "11px", borderRadius: "10px", background: "rgba(255,255,255,.035)", border: "1px solid rgba(255,255,255,.08)" }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.4)" }}>{kpi.label}</div>
                        <div style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-.02em", marginTop: "3px", color: "#fff" }}>{kpi.value}</div>
                        <div style={{ fontSize: "9px", color: "#FF6B00", marginTop: "1px", fontFamily: "'JetBrains Mono', monospace" }}>{kpi.delta}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.8)" }}>Appointment volume</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.35)" }}>Last 12 weeks</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", height: "84px" }}>
                      {[42, 58, 50, 66, 74, 61, 80, 72, 88, 79, 94, 86].map((v, bi) => (
                        <div
                          key={bi}
                          style={{
                            flex: 1,
                            borderRadius: "3px 3px 0 0",
                            height: `${Math.round((v / 94) * 100)}%`,
                            background: bi >= 9 ? "#FF6B00" : "rgba(255,107,0,.28)"
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Patient Queue Rows */}
                  <div style={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,.08)", overflow: "hidden" }}>
                    {[
                      { primary: "E. Rostova · Cardiology", meta: "09:40", tag: "Confirmed", tagFg: "#FF6B00", tagBg: "rgba(255,107,0,.14)" },
                      { primary: "M. Haldar · Follow-up", meta: "10:15", tag: "AI triaged", tagFg: "rgba(255,255,255,.6)", tagBg: "rgba(255,255,255,.06)" },
                      { primary: "S. Nair · New patient", meta: "11:00", tag: "Pending", tagFg: "rgba(255,255,255,.6)", tagBg: "rgba(255,255,255,.06)" }
                    ].map((row, ri) => (
                      <div key={ri} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr auto", gap: "10px", alignItems: "center", padding: "10px 13px", borderBottom: "1px solid rgba(255,255,255,.06)", background: "rgba(255,255,255,.015)" }}>
                        <span style={{ fontSize: "11px", color: "rgba(255,255,255,.85)", fontWeight: 500 }}>{row.primary}</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "rgba(255,255,255,.45)" }}>{row.meta}</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: ".1em", textTransform: "uppercase", padding: "3px 9px", borderRadius: "999px", color: row.tagFg, background: row.tagBg }}>{row.tag}</span>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Copy Side */}
          <div className="w-full lg:w-[38%] flex flex-col justify-center">
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <span style={{ color: "#00E5FF", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: ".18em", textTransform: "uppercase" }}>01</span>
              <div style={{ height: "1px", background: isDark ? "rgba(255,255,255,.2)" : "rgba(15,23,42,.15)", width: "48px" }} />
              <span style={{ color: isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.6)", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: ".18em", textTransform: "uppercase" }}>Healthcare Portal</span>
            </div>
            <h3 style={{ fontSize: "clamp(38px, 4vw, 72px)", fontWeight: 900, letterSpacing: "-.05em", margin: "0 0 32px", lineHeight: 1, fontFamily: "'Unbounded', sans-serif", color: isDark ? "#fff" : "#090d16" }}>
              MedSync
            </h3>
            <p style={{ fontSize: "18px", color: isDark ? "rgba(255,255,255,.7)" : "rgba(15,23,42,.7)", fontWeight: 300, lineHeight: 1.7, margin: "0 0 40px" }}>
              A secure, HIPAA-compliant patient portal featuring AI-driven symptom checking and automated appointment scheduling.
            </p>
            <p style={{ fontSize: "12px", color: isDark ? "rgba(255,255,255,.9)" : "#090d16", textTransform: "uppercase", letterSpacing: ".18em", margin: "0 0 16px", fontFamily: "'JetBrains Mono', monospace" }}>
              Tech Stack
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
              {["Next.js", "TypeScript", "Tailwind", "Supabase", "OpenAI"].map((tech) => (
                <span key={tech} style={{ fontSize: "14px", color: isDark ? "rgba(255,255,255,.8)" : "#090d16", border: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.1)", borderRadius: "999px", padding: "8px 16px", background: isDark ? "rgba(255,255,255,.05)" : "rgba(15,23,42,.04)", backdropFilter: "blur(12px)", fontFamily: "'JetBrains Mono', monospace" }}>
                  {tech}
                </span>
              ))}
            </div>
            <Link
              to="/demo/medsync"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
                color: isDark ? "#fff" : "#090d16",
                width: "max-content",
                textDecoration: "none"
              }}
              className="hover:text-[#FF6B00] group"
            >
              <span style={{ fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".18em" }}>View Live Site</span>
              <span style={{ width: "48px", height: "48px", borderRadius: "50%", border: "1px solid currentColor", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s" }} className="group-hover:translate-x-1">↗</span>
            </Link>
          </div>
        </div>

        {/* Project 02: Aura Commerce (E-Commerce Engine) */}
        <div
          className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-24 items-center w-full"
        >
          {/* Visual Showcase (Mock Storefront) */}
          <div
            className="w-full lg:w-[62%]"
            style={{
              position: "relative",
              padding: "36px",
              borderRadius: "28px",
              border: "1px solid rgba(255,255,255,.1)",
              background: "radial-gradient(ellipse at 50% 0%, rgba(0,229,255,.16), rgba(6,7,10,.9) 62%, rgba(6,7,10,1))",
              boxShadow: "0 30px 70px rgba(0,0,0,.6)",
              boxSizing: "border-box"
            }}
          >
            {/* Grid background texture */}
            <div style={{ position: "absolute", inset: 0, borderRadius: "28px", backgroundImage: "linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />

            <div style={{ position: "relative", borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(255,255,255,.14)", background: "#0A0B0E", boxShadow: "0 24px 60px rgba(0,0,0,.7)" }}>
              
              {/* Browser Window Chrome */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 14px", background: "rgba(255,255,255,.045)", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "rgba(255,255,255,.2)" }} />
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "rgba(255,255,255,.2)" }} />
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "rgba(255,255,255,.2)" }} />
                </div>
                <div style={{ flex: 1, padding: "5px 12px", borderRadius: "8px", background: "rgba(0,0,0,.5)", border: "1px solid rgba(255,255,255,.08)", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "rgba(255,255,255,.45)", letterSpacing: ".06em" }}>
                  aura.arisetek.in/store
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: ".16em", textTransform: "uppercase", color: "#00E5FF" }}>
                  Live
                </span>
              </div>

              {/* Storefront Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12">
                
                {/* Catalog Grid Area */}
                <div className="col-span-1 md:col-span-8 p-4 md:p-5 flex flex-col gap-3.5 border-r border-white/[0.08]">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ width: "22px", height: "22px", borderRadius: "7px", background: "#00E5FF", flexShrink: 0 }} />
                      <span style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-.02em", color: "#fff" }}>Aura</span>
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {["New in", "Apparel", "Objects", "Sale"].map((cat, ci) => (
                        <span
                          key={ci}
                          style={{
                            padding: "5px 11px",
                            borderRadius: "999px",
                            fontSize: "10px",
                            fontWeight: 500,
                            color: ci === 0 ? "#04070a" : "rgba(255,255,255,.6)",
                            background: ci === 0 ? "#00E5FF" : "rgba(255,255,255,.04)",
                            border: ci === 0 ? "1px solid #00E5FF" : "1px solid rgba(255,255,255,.1)"
                          }}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hero Drop Banner */}
                  <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,.08)", padding: "20px", background: "linear-gradient(115deg, rgba(0,229,255,.20), rgba(8,9,12,.9) 62%, rgba(8,9,12,1))", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", letterSpacing: ".2em", textTransform: "uppercase", color: "#00E5FF" }}>Autumn drop · 12 pieces</span>
                    <span style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.05, maxWidth: "230px", color: "#fff" }}>Built for the long season.</span>
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,.55)", maxWidth: "250px", lineHeight: 1.5 }}>Dynamic pricing tuned every six hours by the agent swarm.</span>
                    <span style={{ marginTop: "4px", alignSelf: "flex-start", padding: "7px 14px", borderRadius: "999px", background: "#00E5FF", color: "#04070a", fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" }}>Shop the drop</span>
                  </div>

                  {/* 6 Product Cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "9px" }}>
                    {[
                      { name: "Meridian wool coat", price: "₹18,400", badge: "New", tint: "linear-gradient(145deg, rgba(0,229,255,.22), rgba(255,255,255,.03))", badgeFg: "#00E5FF" },
                      { name: "Kage utility shell", price: "₹12,900", badge: "AI pick", tint: "linear-gradient(145deg, rgba(0,229,255,.14), rgba(255,255,255,.03))", badgeFg: "#00E5FF" },
                      { name: "Field trouser, slate", price: "₹6,800", badge: "−15%", tint: "linear-gradient(145deg, rgba(0,229,255,.26), rgba(255,255,255,.03))", badgeFg: "rgba(255,255,255,.7)" },
                      { name: "Ember knit crew", price: "₹5,200", badge: "Low stock", tint: "linear-gradient(145deg, rgba(0,229,255,.11), rgba(255,255,255,.03))", badgeFg: "rgba(255,255,255,.7)" },
                      { name: "Nexus leather tote", price: "₹22,600", badge: "New", tint: "linear-gradient(145deg, rgba(0,229,255,.19), rgba(255,255,255,.03))", badgeFg: "#00E5FF" },
                      { name: "Ridge trail boot", price: "₹14,750", badge: "AI pick", tint: "linear-gradient(145deg, rgba(0,229,255,.15), rgba(255,255,255,.03))", badgeFg: "#00E5FF" }
                    ].map((prod, pi) => (
                      <div key={pi} style={{ borderRadius: "10px", border: "1px solid rgba(255,255,255,.08)", overflow: "hidden", background: "rgba(255,255,255,.025)" }}>
                        <div style={{ position: "relative", aspectRatio: "1/1", background: prod.tint, display: "flex", alignItems: "flex-start", justifyContent: "flex-end", padding: "7px" }}>
                          <span style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 1px, transparent 1px 9px)" }} />
                          <span style={{ position: "relative", fontFamily: "'JetBrains Mono', monospace", fontSize: "7px", letterSpacing: ".14em", textTransform: "uppercase", padding: "3px 7px", borderRadius: "999px", background: "rgba(4,6,9,.7)", color: prod.badgeFg }}>{prod.badge}</span>
                        </div>
                        <div style={{ padding: "8px 9px 10px", display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ fontSize: "10px", color: "rgba(255,255,255,.85)", fontWeight: 500, lineHeight: 1.3 }}>{prod.name}</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#00E5FF" }}>{prod.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cart Drawer Panel */}
                <div className="hidden md:flex md:col-span-4 p-4 flex-col gap-3.5 bg-white/[0.02]">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "-.01em", color: "#fff" }}>Cart</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "rgba(255,255,255,.4)" }}>3 items</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {[
                      { name: "Meridian wool coat", qty: "Size M · ×1", price: "₹18,400", tint: "rgba(0,229,255,.22)" },
                      { name: "Ember knit crew", qty: "Size L · ×1", price: "₹5,200", tint: "rgba(0,229,255,.11)" },
                      { name: "Field trouser, slate", qty: "32 · ×1", price: "₹6,800", tint: "rgba(0,229,255,.26)" }
                    ].map((item, ci) => (
                      <div key={ci} style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                        <span style={{ width: "32px", height: "32px", borderRadius: "7px", background: item.tint, flexShrink: 0 }} />
                        <span style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ display: "block", fontSize: "10px", color: "rgba(255,255,255,.82)", lineHeight: 1.3 }}>{item.name}</span>
                          <span style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "rgba(255,255,255,.4)" }}>{item.qty}</span>
                        </span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "rgba(255,255,255,.75)" }}>{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ padding: "11px", borderRadius: "10px", border: "1px solid rgba(0,229,255,.35)", background: "rgba(0,229,255,.12)" }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", letterSpacing: ".16em", textTransform: "uppercase", color: "#00E5FF" }}>Pricing AI</div>
                    <div style={{ fontSize: "10px", color: "rgba(255,255,255,.75)", marginTop: "4px", lineHeight: 1.45 }}>Agent 03 repriced 1,204 SKUs overnight — margin held at 41%.</div>
                  </div>

                  <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "9px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,.08)" }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.4)" }}>Subtotal</span>
                      <span style={{ fontSize: "17px", fontWeight: 700, letterSpacing: "-.02em", color: "#fff" }}>₹30,400</span>
                    </div>
                    <span style={{ padding: "9px", borderRadius: "9px", background: "#00E5FF", color: "#04070a", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>Checkout</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Copy Side */}
          <div className="w-full lg:w-[38%] flex flex-col justify-center">
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <span style={{ color: "#00E5FF", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: ".18em", textTransform: "uppercase" }}>02</span>
              <div style={{ height: "1px", background: isDark ? "rgba(255,255,255,.2)" : "rgba(15,23,42,.15)", width: "48px" }} />
              <span style={{ color: isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.6)", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: ".18em", textTransform: "uppercase" }}>E-Commerce Engine</span>
            </div>
            <h3 style={{ fontSize: "clamp(38px, 4vw, 72px)", fontWeight: 900, letterSpacing: "-.05em", margin: "0 0 32px", lineHeight: 1, fontFamily: "'Unbounded', sans-serif", color: isDark ? "#fff" : "#090d16" }}>
              Aura Commerce
            </h3>
            <p style={{ fontSize: "18px", color: isDark ? "rgba(255,255,255,.7)" : "rgba(15,23,42,.7)", fontWeight: 300, lineHeight: 1.7, margin: "0 0 40px" }}>
              High-performance headless e-commerce site with an intelligent recommendation engine and dynamic pricing.
            </p>
            <p style={{ fontSize: "12px", color: isDark ? "rgba(255,255,255,.9)" : "#090d16", textTransform: "uppercase", letterSpacing: ".18em", margin: "0 0 16px", fontFamily: "'JetBrains Mono', monospace" }}>
              Tech Stack
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
              {["React", "Shopify Plus", "Framer Motion", "Stripe"].map((tech) => (
                <span key={tech} style={{ fontSize: "14px", color: isDark ? "rgba(255,255,255,.8)" : "#090d16", border: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.1)", borderRadius: "999px", padding: "8px 16px", background: isDark ? "rgba(255,255,255,.05)" : "rgba(15,23,42,.04)", backdropFilter: "blur(12px)", fontFamily: "'JetBrains Mono', monospace" }}>
                  {tech}
                </span>
              ))}
            </div>
            <Link
              to="/demo/aura-commerce"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
                color: isDark ? "#fff" : "#090d16",
                width: "max-content",
                textDecoration: "none"
              }}
              className="hover:text-[#00E5FF] group"
            >
              <span style={{ fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".18em" }}>View Live Site</span>
              <span style={{ width: "48px", height: "48px", borderRadius: "50%", border: "1px solid currentColor", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s" }} className="group-hover:translate-x-1">↗</span>
            </Link>
          </div>
        </div>

        {/* CMS Projects Section */}
        {cmsProjects.length > 0 && (
          <div className={`mt-40 border-t ${isDark ? 'border-[rgba(255,255,255,0.08)]' : 'border-[rgba(15,23,42,0.08)]'} pt-24`}>
            <div className="flex items-center gap-6 mb-16">
              <h3 style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 900, letterSpacing: "-.05em", margin: 0, lineHeight: 1, fontFamily: "'Unbounded', sans-serif", color: isDark ? "#fff" : "#090d16" }}>
                More Projects
              </h3>
              <div className={`flex-1 h-px bg-gradient-to-r ${isDark ? 'from-[rgba(255,255,255,0.1)]' : 'from-[rgba(15,23,42,0.1)]'} to-transparent`} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cmsProjects.map((project, idx) => (
                <a
                  key={idx}
                  href={project.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block p-8 rounded-2xl ${isDark ? 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.04)]' : 'bg-white border-[rgba(15,23,42,0.08)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:bg-slate-50'} border hover:border-[#FF6B00] hover:shadow-[0_0_30px_rgba(255,107,0,0.15)] transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <span style={{ color: "#00E5FF", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: ".2em", textTransform: "uppercase" }}>
                      0{idx + 3}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-[#FF6B00] font-mono text-sm">
                      ↗
                    </span>
                  </div>
                  <h4 style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-.03em", color: isDark ? "#fff" : "#090d16", marginBottom: "16px" }}>
                    {project.title}
                  </h4>
                  <p style={{ fontSize: "14px", color: isDark ? "rgba(255,255,255,.65)" : "rgba(15,23,42,.7)", fontWeight: 300, lineHeight: 1.6, margin: 0 }}>
                    {project.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
