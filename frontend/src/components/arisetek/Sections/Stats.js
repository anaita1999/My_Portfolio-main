const WHYS = [
  { glyph: "⚡", label: "Lightning Speed", desc: "<100ms average interaction latency" },
  { glyph: "⛨", label: "Secure by Design", desc: "Hardened 2FA and edge protected" },
  { glyph: "↗", label: "Conversion Focused", desc: "Architecture designed to generate revenue" },
  { glyph: "◕", label: "Fast Delivery", desc: "Rapid sprints without bloated bureaucracy" },
  { glyph: "✦", label: "AI Integrated", desc: "Autonomous workflows and smart chatbots" },
  { glyph: "◎", label: "Direct Founder Access", desc: "Engineering direct with zero middle-management" }
];

import { motion } from "framer-motion";
import Magnetic from "../Magnetic";
import { useTheme } from "../../../context/ThemeContext";
import { LiveShimmerText, LiveScrambleText } from "../../ui/LiveTypography";

export default function Stats() {
  const { isDark } = useTheme();

  return (
    <section style={{ padding: "112px 24px", position: "relative", width: "100%", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ color: "#FF6B00", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: ".18em", textTransform: "uppercase", margin: "0 0 12px" }}>
          // <LiveScrambleText text="Why Arisetek" speed={40} />
        </p>
        <h2 className="live-glow-flame" style={{ fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 700, letterSpacing: "-.02em", margin: "0 0 56px", color: isDark ? "#fff" : "#090d16", fontFamily: "'Outfit', sans-serif" }}>
          Performance isn't an <LiveShimmerText theme="flame">afterthought.</LiveShimmerText>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHYS.map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Magnetic className="h-full w-full">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "24px",
                      background: isDark ? "rgba(8,9,12,.7)" : "#ffffff",
                      backdropFilter: "blur(12px)",
                      borderRadius: "16px",
                      border: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.08)",
                      boxShadow: isDark ? "0 20px 25px rgba(0,0,0,.4)" : "0 4px 20px rgba(0,0,0,.04)",
                      transition: "all 0.3s",
                      height: "100%"
                    }}
                    className="magnetic-glow hover:border-[#FF6B00]/50 hover:scale-105"
                  >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  background: isDark ? "rgba(0,0,0,.6)" : "rgba(15,23,42,.04)",
                  border: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.1)",
                  borderRadius: "50%",
                  color: "#FF6B00",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  fontFamily: "'JetBrains Mono', monospace",
                  boxShadow: isDark ? "0 0 15px rgba(255,107,0,.2)" : "none"
                }}
              >
                {w.glyph}
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 6px", color: isDark ? "#fff" : "#090d16" }}>
                {w.label}
              </h3>
              <p style={{ fontSize: "14px", color: isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.65)", margin: 0, fontWeight: 300 }}>
                {w.desc}
              </p>
                  </div>
                </Magnetic>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
