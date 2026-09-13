const STEPS = [
  {
    num: "01",
    title: "Discovery",
    desc: "Understanding your business goals, target audience, and identifying AI integration opportunities.",
    dir: "row",
    align: "right"
  },
  {
    num: "02",
    title: "Strategy & Architecture",
    desc: "Mapping out the technical architecture, database schemas, and end-to-end user experience flow.",
    dir: "row-reverse",
    align: "left"
  },
  {
    num: "03",
    title: "Cinematic UI/UX",
    desc: "Creating a modern visual direction optimized for conversion and brand authority.",
    dir: "row",
    align: "right"
  },
  {
    num: "04",
    title: "Full-Stack Development",
    desc: "Engineering the platform with React 19, FastAPI, and high-performance libraries.",
    dir: "row-reverse",
    align: "left"
  },
  {
    num: "05",
    title: "AI Automation",
    desc: "Embedding automation, intelligent lead triage, or 24/7 assistant workflows.",
    dir: "row",
    align: "right"
  },
  {
    num: "06",
    title: "Production Deployment",
    desc: "Launching securely on edge infrastructure with 2FA security and analytics.",
    dir: "row-reverse",
    align: "left"
  }
];

import Magnetic from "../Magnetic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "../../../context/ThemeContext";

export default function Process() {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" ref={containerRef} style={{ padding: "112px 24px", position: "relative", width: "100%", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "112px" }}
        >
          <p style={{ color: "#FF6B00", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: ".3em", textTransform: "uppercase", margin: "0 0 12px" }}>
            // Execution Protocol
          </p>
          <h2 style={{ fontSize: "clamp(34px, 4.2vw, 72px)", fontWeight: 900, letterSpacing: "-.04em", margin: 0, fontFamily: "'Unbounded', sans-serif", color: isDark ? "#fff" : "#090d16" }}>
            A systematic approach <br />
            <span style={{ background: isDark ? "linear-gradient(90deg, #fff, rgba(255,255,255,.3))" : "linear-gradient(90deg, #090d16, rgba(9,13,22,.4))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              to engineering excellence.
            </span>
          </h2>
        </motion.div>

        {/* Alternating Timeline */}
        <div style={{ position: "relative" }}>
          
          {/* Central Line */}
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 0,
              bottom: 0,
              width: "1px",
              background: isDark ? "rgba(255,255,255,.1)" : "rgba(15,23,42,.1)"
            }}
          >
            <motion.div
              style={{
                width: "100%",
                height,
                background: "linear-gradient(180deg, #FF6B00, #FFA000)",
                boxShadow: "0 0 12px rgba(255,107,0,.55)",
                transformOrigin: "top"
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
            {STEPS.map((s, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex flex-col md:flex-row items-center justify-between relative w-full"
                  style={{
                    flexDirection: isEven ? "row" : "row-reverse"
                  }}
                >
                  {/* Central Node Pin */}
                  <div
                    className="hidden md:flex"
                    style={{
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: isDark ? "#000" : "#ffffff",
                      border: "2px solid #FF6B00",
                      zIndex: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 10px rgba(255,107,0,.8)"
                    }}
                  >
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF6B00" }} />
                  </div>

                  {/* Content Box */}
                  <Magnetic className="w-full md:w-[45%]">
                    <div
                      className="magnetic-glow w-full"
                      style={{
                        textAlign: isEven ? "right" : "left",
                        padding: "32px",
                        borderRadius: "16px",
                        background: isDark ? "rgba(255,255,255,.02)" : "#ffffff",
                        border: isDark ? "1px solid rgba(255,255,255,.05)" : "1px solid rgba(15,23,42,.08)",
                        boxShadow: isDark ? "none" : "0 4px 20px rgba(0,0,0,0.03)",
                        transition: "all 0.3s",
                      }}
                    >
                      <span style={{ fontSize: "72px", fontWeight: 900, color: isDark ? "rgba(255,255,255,.22)" : "rgba(15,23,42,.15)", display: "block", marginBottom: "8px", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>
                        {s.num}
                      </span>
                      <h3 style={{ fontSize: "26px", fontWeight: 700, margin: "0 0 8px", letterSpacing: "-.03em", color: isDark ? "#fff" : "#090d16" }}>
                        {s.title}
                      </h3>
                      <p style={{ color: isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.7)", fontSize: "16px", fontWeight: 300, lineHeight: 1.7, margin: 0 }}>
                        {s.desc}
                      </p>
                    </div>
                  </Magnetic>

                  {/* Empty Spacer */}
                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
