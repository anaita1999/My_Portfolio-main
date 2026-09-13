import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Magnetic from "../Magnetic";
import axios from "axios";
import { toast } from "sonner";
import { useTheme } from "../../../context/ThemeContext";
import API_BASE from "../../../apiConfig";

export default function Contact() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "App & Web Development",
    budget: "₹1L – ₹3L ($1.5k – $3.5k)",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(Math.max(textareaRef.current.scrollHeight, 120), 240)}px`;
    }
  }, [formData.message]);

  useEffect(() => {
    const handlePricingSelect = (e) => {
      if (e.detail) {
        const { service, budget, brief } = e.detail;
        setFormData(prev => ({
          ...prev,
          service,
          budget,
          message: brief
        }));
      }
    };
    window.addEventListener('arisetek-pricing-select', handlePricingSelect);
    return () => window.removeEventListener('arisetek-pricing-select', handlePricingSelect);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in your name, email, and project brief.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE}/api/contact`, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: `[Service: ${formData.service}] [Budget: ${formData.budget}] ${formData.message.trim()}`,
        source: "Arisetek IT Solutions (Agency Portal)"
      });
      toast.success("Project brief transmitted! Founder Anaita Pal & our AI agent will connect within 24 hours.");
      setFormData({
        name: "",
        email: "",
        service: "App & Web Development",
        budget: "₹1L – ₹3L ($1.5k – $3.5k)",
        message: ""
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to transmit brief. Please email contact@arisetek.in or founder@arisetek.in directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ position: "relative", padding: "112px 24px", width: "100%", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Direct Coordinates */}
        <motion.div
          className="lg:col-span-5 flex flex-col gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 14px",
                borderRadius: "999px",
                background: "rgba(255,107,0,.1)",
                border: "1px solid rgba(255,107,0,.3)",
                color: "#FF6B00",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: ".2em",
                marginBottom: "16px"
              }}
            >
              ✦ Initialize Project
            </div>

            <h2
              style={{
                fontSize: "clamp(34px, 4vw, 60px)",
                fontWeight: 900,
                letterSpacing: "-.04em",
                lineHeight: 1,
                margin: "0 0 24px",
                fontFamily: "'Unbounded', sans-serif",
                color: isDark ? "#fff" : "#090d16"
              }}
            >
              Let’s engineer <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #FF6B00, #FFA000, #FF6B00)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent"
                }}
              >
                your digital future.
              </span>
            </h2>

            <p style={{ color: isDark ? "rgba(255,255,255,.7)" : "rgba(15,23,42,.7)", fontSize: "18px", fontWeight: 300, lineHeight: 1.7, margin: 0 }}>
              Ready to deploy autonomous AI automations, an award-winning 3D web platform, or a native cross-platform mobile application? Submit your brief or connect directly.
            </p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingTop: "16px", borderTop: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.08)" }}>
            
            {/* Primary & Sales Email */}
            <Magnetic className="w-full">
              <a
                href="mailto:contact@arisetek.in"
                style={{
                  padding: "16px",
                  borderRadius: "16px",
                  background: isDark ? "rgba(8,9,12,.8)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.08)",
                  boxShadow: isDark ? "none" : "0 4px 15px rgba(0,0,0,0.03)",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  color: isDark ? "#fff" : "#090d16",
                  textDecoration: "none",
                  transition: "border-color 0.2s"
                }}
                className="magnetic-glow hover:!border-[#FF6B00]/50 group"
              >
                <span style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(255,107,0,.15)", color: "#FF6B00", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                  ✉
                </span>
                <span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: ".18em", color: isDark ? "rgba(255,255,255,.4)" : "rgba(15,23,42,.5)", display: "block" }}>General &amp; Proposals</span>
                  <span style={{ fontWeight: 700, fontSize: "14px" }}>contact@arisetek.in</span>
                </span>
              </a>
            </Magnetic>

            {/* Founder Direct Email */}
            <Magnetic className="w-full">
              <a
                href="mailto:founder@arisetek.in"
                style={{
                  padding: "16px",
                  borderRadius: "16px",
                  background: isDark ? "rgba(8,9,12,.8)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.08)",
                  boxShadow: isDark ? "none" : "0 4px 15px rgba(0,0,0,0.03)",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  color: isDark ? "#fff" : "#090d16",
                  textDecoration: "none",
                  transition: "border-color 0.2s"
                }}
                className="magnetic-glow hover:!border-[#E0231C]/50 group"
              >
                <span style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(224,35,28,.15)", color: "#E0231C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                  ⛩️
                </span>
                <span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: ".18em", color: isDark ? "rgba(255,255,255,.4)" : "rgba(15,23,42,.5)", display: "block" }}>Founder Direct</span>
                  <span style={{ fontWeight: 700, fontSize: "14px" }}>founder@arisetek.in</span>
                </span>
              </a>
            </Magnetic>

            {/* WhatsApp */}
            <Magnetic className="w-full">
              <a
                href="https://wa.me/917980958364"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "16px",
                  borderRadius: "16px",
                  background: isDark ? "rgba(8,9,12,.8)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.08)",
                  boxShadow: isDark ? "none" : "0 4px 15px rgba(0,0,0,0.03)",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  color: isDark ? "#fff" : "#090d16",
                  textDecoration: "none",
                  transition: "border-color 0.2s"
                }}
                className="magnetic-glow hover:!border-emerald-400/50 group"
              >
                <span style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(16,185,129,.15)", color: "#34d399", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.13-.42-2.15-1.33-.8-.71-1.33-1.59-1.48-1.89-.15-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.09 3.19 5.06 4.36 2.47.97 2.97.78 3.51.73.54-.05 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.57-.35Z" /><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.33 4.97L2 22l5.26-1.38a9.87 9.87 0 0 0 4.78 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.13h-.01c-1.53 0-3.03-.41-4.34-1.19l-.31-.18-3.23.85.86-3.15-.2-.32a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Z" /></svg>
                </span>
                <span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: ".18em", color: isDark ? "rgba(255,255,255,.4)" : "rgba(15,23,42,.5)", display: "block" }}>WhatsApp / Direct Line</span>
                  <span style={{ fontWeight: 700, fontSize: "14px" }}>Tap to Connect</span>
                </span>
              </a>
            </Magnetic>

            {/* Headquarters */}
            <div style={{ padding: "16px", borderRadius: "16px", background: isDark ? "rgba(8,9,12,.8)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.08)", boxShadow: isDark ? "none" : "0 4px 15px rgba(0,0,0,0.03)", display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ width: "44px", height: "44px", borderRadius: "12px", background: isDark ? "rgba(255,255,255,.05)" : "rgba(15,23,42,.05)", color: isDark ? "#fff" : "#090d16", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                ◉
              </span>
              <span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: ".18em", color: isDark ? "rgba(255,255,255,.4)" : "rgba(15,23,42,.5)", display: "block" }}>Headquarters</span>
                <span style={{ fontWeight: 700, fontSize: "14px", color: isDark ? "#fff" : "#090d16" }}>Howrah, West Bengal, India · Global Remote</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Project Specification Brief Form */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          style={{
            background: isDark ? "rgba(8,9,12,.85)" : "#ffffff",
            backdropFilter: "blur(24px)",
            border: isDark ? "1px solid rgba(255,255,255,.15)" : "1px solid rgba(15,23,42,.1)",
            borderRadius: "24px",
            padding: "48px",
            boxShadow: isDark ? "0 25px 50px rgba(0,0,0,.5)" : "0 20px 40px rgba(0,0,0,.04)"
          }}
        >
          <h3 style={{ fontSize: "24px", fontWeight: 900, letterSpacing: "-.02em", margin: "0 0 8px", color: isDark ? "#fff" : "#090d16" }}>
            Project Specification Brief
          </h3>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: isDark ? "rgba(255,255,255,.5)" : "rgba(15,23,42,.55)", margin: "0 0 32px" }}>
            Autonomous AI Android Overseer will qualify and schedule technical discovery.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: ".18em", color: isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.7)", marginBottom: "8px" }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Elena Rostova"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    background: isDark ? "rgba(255,255,255,.04)" : "rgba(15,23,42,.03)",
                    border: isDark ? "1px solid rgba(255,255,255,.15)" : "1px solid rgba(15,23,42,.12)",
                    color: isDark ? "#fff" : "#090d16",
                    fontSize: "14px",
                    fontFamily: "'Outfit', sans-serif",
                    boxSizing: "border-box"
                  }}
                  className="magnetic-glow focus:outline-none focus:!border-[#FF6B00]"
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: ".18em", color: isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.7)", marginBottom: "8px" }}>
                  Corporate Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="elena@enterprise.com"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    background: isDark ? "rgba(255,255,255,.04)" : "rgba(15,23,42,.03)",
                    border: isDark ? "1px solid rgba(255,255,255,.15)" : "1px solid rgba(15,23,42,.12)",
                    color: isDark ? "#fff" : "#090d16",
                    fontSize: "14px",
                    fontFamily: "'Outfit', sans-serif",
                    boxSizing: "border-box"
                  }}
                  className="magnetic-glow focus:outline-none focus:!border-[#FF6B00]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: ".18em", color: isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.7)", marginBottom: "8px" }}>
                  Service Pillar Needed
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    background: isDark ? "#08090c" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,.15)" : "1px solid rgba(15,23,42,.15)",
                    color: isDark ? "#fff" : "#090d16",
                    fontSize: "14px",
                    fontFamily: "'Outfit', sans-serif",
                    boxSizing: "border-box"
                  }}
                  className="magnetic-glow focus:outline-none focus:!border-[#FF6B00]"
                >
                  <option value="App & Web Development">App &amp; Web Development</option>
                  <option value="AI Automations & Agentic Swarm">AI Automations &amp; Agentic Swarm</option>
                  <option value="3D WebGL / Interactive Portal">3D WebGL / Interactive Portal</option>
                  <option value="Enterprise Architecture & Custom CRM">Enterprise Architecture &amp; Custom CRM</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: ".18em", color: isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.7)", marginBottom: "8px" }}>
                  Estimated Budget Tier
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    background: isDark ? "#08090c" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,.15)" : "1px solid rgba(15,23,42,.15)",
                    color: isDark ? "#fff" : "#090d16",
                    fontSize: "14px",
                    fontFamily: "'Outfit', sans-serif",
                    boxSizing: "border-box"
                  }}
                  className="magnetic-glow focus:outline-none focus:!border-[#FF6B00]"
                >
                  <option value="< ₹1L (< $1.2k)">&lt; ₹1L (&lt; $1.2k)</option>
                  <option value="₹1L – ₹3L ($1.5k – $3.5k)">₹1L – ₹3L ($1.5k – $3.5k)</option>
                  <option value="₹3L – ₹6L ($3.5k – $7k)">₹3L – ₹6L ($3.5k – $7k)</option>
                  <option value="₹6L+ ($7k+ Enterprise)">₹6L+ ($7k+ Enterprise)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: ".18em", color: isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.7)", marginBottom: "8px" }}>
                Project Brief &amp; Objectives *
              </label>
              <textarea
                ref={textareaRef}
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Outline your vision, timeline, target features, and any autonomous AI requirements..."
                style={{ 
                  width: "100%", padding: "14px 16px", borderRadius: "12px",
                  background: isDark ? "rgba(255,255,255,.04)" : "rgba(15,23,42,.03)", 
                  border: isDark ? "1px solid rgba(255,255,255,.15)" : "1px solid rgba(15,23,42,.12)",
                  color: isDark ? "#fff" : "#090d16", fontSize: "14px", fontFamily: "'Outfit', sans-serif", 
                  resize: "none", boxSizing: "border-box", minHeight: "120px", overflowY: "auto"
                }}
                className="magnetic-glow focus:outline-none focus:!border-[#FF6B00]"
              />
            </div>

            <Magnetic className="w-full">
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  background: "linear-gradient(90deg, #FF6B00, #FF8500)",
                  color: "#000",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".18em",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.2s"
                }}
                className="magnetic-glow hover:scale-[1.01] hover:!shadow-[0_0_30px_rgba(255,107,0,.6)]"
              >
                {loading ? "Transmitting to Swarm..." : "Transmit Project Brief →"}
              </button>
            </Magnetic>

          </form>
        </motion.div>

      </div>
    </section>
  );
}
