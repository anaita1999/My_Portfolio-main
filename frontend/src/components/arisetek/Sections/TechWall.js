const TECHS = [
  "React 19",
  "FastAPI",
  "Python",
  "Flutter",
  "Multi-Agent AI",
  "TypeScript",
  "Three.js",
  "WebGL Shaders",
  "GSAP",
  "MongoDB",
  "Docker",
  "Tailwind CSS",
  "OpenAI",
  "Gemini",
  "Framer Motion",
  "Lenis",
  "Pytest",
  "JWT + 2FA"
];

import { motion } from "framer-motion";
import Magnetic from "../Magnetic";
import { useTheme } from "../../../context/ThemeContext";

export default function TechWall() {
  const { isDark } = useTheme();

  return (
    <section style={{ padding: "112px 24px", position: "relative", width: "100%", borderTop: isDark ? "1px solid rgba(255,255,255,.05)" : "1px solid rgba(15,23,42,.06)", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ color: "#FF6B00", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: ".3em", textTransform: "uppercase", margin: "0 0 12px" }}>
            // Technology Stack
          </p>
          <h2 style={{ fontSize: "clamp(34px, 4vw, 60px)", fontWeight: 900, letterSpacing: "-.04em", margin: 0, fontFamily: "'Unbounded', sans-serif", color: isDark ? "#fff" : "#090d16" }}>
            Powered by modern <span style={{ color: isDark ? "rgba(255,255,255,.3)" : "rgba(15,23,42,.4)", fontStyle: "italic", fontFamily: "Georgia, serif", letterSpacing: "normal" }}>engineering.</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>
          {TECHS.map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Magnetic>
                <div
                  style={{
                    padding: "12px 20px",
                    border: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.1)",
                    borderRadius: "999px",
                    color: isDark ? "rgba(255,255,255,.7)" : "rgba(15,23,42,.75)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: ".18em",
                    backdropFilter: "blur(4px)",
                    background: isDark ? "rgba(8,9,12,.6)" : "#ffffff",
                    boxShadow: isDark ? "none" : "0 2px 8px rgba(0,0,0,0.03)",
                    transition: "all 0.3s",
                    cursor: "pointer"
                  }}
                  className="magnetic-glow hover:!bg-[rgba(255,107,0,0.15)] hover:!border-[rgba(255,107,0,0.5)] hover:!text-[#FF6B00] hover:scale-105"
                >
                  {t}
                </div>
              </Magnetic>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
