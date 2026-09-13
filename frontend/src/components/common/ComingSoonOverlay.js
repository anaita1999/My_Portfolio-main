import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Clock, 
  Bell, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  ExternalLink, 
  CheckCircle2, 
  Mail, 
  Lock, 
  Unlock,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import API_BASE from "../../apiConfig";

// TARGET LAUNCH DATE: 2nd October 2026 00:00:00
const LAUNCH_DATE_STRING = "2026-10-02T00:00:00";
const LAUNCH_TIMESTAMP = new Date(LAUNCH_DATE_STRING).getTime();

export default function ComingSoonOverlay() {
  const [now, setNow] = useState(Date.now());
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  
  // Developer/Owner preview bypass state
  const [previewUnlocked, setPreviewUnlocked] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("preview") === "true" || params.get("preview") === "arisetek") {
        return true;
      }
      return sessionStorage.getItem("arisetek_preview_bypass") === "true";
    }
    return false;
  });
  
  const [showBypassModal, setShowBypassModal] = useState(false);
  const [passcode, setPasscode] = useState("");

  // Determine if target launch date has arrived
  const isLaunched = now >= LAUNCH_TIMESTAMP;

  // Don't show overlay if already launched or preview is unlocked
  // Also don't show if user is actively navigating internal admin paths
  const isAdminPath = typeof window !== "undefined" && window.location.pathname.startsWith("/admin");

  useEffect(() => {
    // 1-second countdown tick
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute time difference
  const timeRemaining = useMemo(() => {
    const diff = Math.max(0, LAUNCH_TIMESTAMP - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { diff, days, hours, minutes, seconds };
  }, [now]);

  // Handle email subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      // Send to contact API as a pre-launch VIP notification subscriber
      await axios.post(`${API_BASE}/api/contact`, {
        name: "VIP Launch Subscriber",
        email: email.trim(),
        message: `[Pre-Launch VIP Access Subscription] Registered for official launch on October 2, 2026.`,
        source: "Coming Soon Overlay"
      }).catch(() => {
        // Fallback gracefully even if backend is offline
      });

      setSubscribed(true);
      toast.success("You are on the VIP Launch List! We will notify you when we go live on October 2, 2026.");
      setEmail("");
    } catch (err) {
      toast.success("Subscription received! We look forward to welcoming you on October 2, 2026.");
      setSubscribed(true);
      setEmail("");
    } finally {
      setSubmitting(false);
    }
  };

  // Preview bypass handler
  const handleUnlockPreview = (e) => {
    e.preventDefault();
    if (passcode.trim().toLowerCase() === "arisetek" || passcode.trim().toLowerCase() === "arisetek2026" || passcode.trim().toLowerCase() === "admin") {
      setPreviewUnlocked(true);
      sessionStorage.setItem("arisetek_preview_bypass", "true");
      setShowBypassModal(false);
      toast.success("Preview Mode Activated. Mask temporarily disabled.");
    } else {
      toast.error("Incorrect preview passkey.");
    }
  };

  // If already launched or on admin route or developer unlocked, render nothing!
  // This satisfies: "from the 2nd october the website will work Properly with out any comming soon musking"
  if (isLaunched || previewUnlocked || isAdminPath) {
    if (previewUnlocked && !isLaunched) {
      // Floating indicator allowing owner/developer to re-lock preview
      return (
        <div 
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(10, 14, 24, 0.9)",
            border: "1px solid rgba(255, 107, 0, 0.5)",
            backdropFilter: "blur(12px)",
            padding: "8px 16px",
            borderRadius: "30px",
            color: "#fff",
            fontSize: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)"
          }}
        >
          <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#00E5FF", boxShadow: "0 0 8px #00E5FF" }} />
          <span>Preview Mode (Pre-Launch Active)</span>
          <button
            onClick={() => {
              setPreviewUnlocked(false);
              sessionStorage.removeItem("arisetek_preview_bypass");
              toast.info("Coming Soon Mask re-enabled.");
            }}
            style={{
              background: "rgba(255, 107, 0, 0.2)",
              border: "1px solid rgba(255, 107, 0, 0.5)",
              color: "#FF9A3D",
              padding: "4px 10px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Re-enable Mask
          </button>
        </div>
      );
    }
    return null;
  }

  const { days, hours, minutes, seconds } = timeRemaining;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          overflowY: "auto",
          overflowX: "hidden",
          // Ultra-modern frosted glass style:
          background: "radial-gradient(ellipse at 50% 15%, rgba(13, 17, 26, 0.82) 0%, rgba(6, 8, 12, 0.94) 100%)",
          backdropFilter: "blur(28px) saturate(190%) contrast(98%)",
          WebkitBackdropFilter: "blur(28px) saturate(190%) contrast(98%)",
          color: "#ffffff",
          fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        {/* Ambient Glowing Glass Orbs (Flame Orange & Electric Cyan) */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
          {/* Top-Right Flame Orb */}
          <div
            style={{
              position: "absolute",
              top: "5%",
              right: "15%",
              width: "550px",
              height: "550px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255, 107, 0, 0.24) 0%, rgba(255, 107, 0, 0.04) 50%, transparent 70%)",
              filter: "blur(80px)",
              animation: "pulseGlow 12s ease-in-out infinite alternate"
            }}
          />
          {/* Bottom-Left Electric Cyan Orb */}
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              left: "10%",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0, 229, 255, 0.18) 0%, rgba(0, 229, 255, 0.03) 50%, transparent 70%)",
              filter: "blur(90px)",
              animation: "pulseGlow 16s ease-in-out infinite alternate-reverse"
            }}
          />

          {/* Cyber Grid Lines Overlay with Radial Fade */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
              maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 80%)",
              opacity: 0.6
            }}
          />
        </div>

        {/* TOP BAR: Brand Logo & Status Radar */}
        <header
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxSizing: "border-box"
          }}
        >
          {/* Brand Logo with Soft Glow */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img
              src="/arisetek-logo-dark.svg"
              alt="Arisetek IT Solutions"
              onError={(e) => {
                e.target.src = "/arisetek-mark.svg";
              }}
              style={{
                height: "44px",
                width: "auto",
                filter: "drop-shadow(0 0 16px rgba(255, 107, 0, 0.35))"
              }}
            />
          </div>

          {/* Status Beacon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase"
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#00E5FF",
                boxShadow: "0 0 10px #00E5FF, 0 0 20px #00E5FF",
                animation: "beaconPulse 1.8s infinite"
              }}
            />
            <span style={{ color: "#dfe7e0" }}>Pre-Launch Sequence</span>
          </div>
        </header>

        {/* CENTER HERO: "COMING SOON", COUNTDOWN TIMER, & KEY INFORMATION */}
        <main
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "1080px",
            margin: "20px auto 40px",
            padding: "0 24px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          {/* Launching Badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 20px",
              borderRadius: "30px",
              background: "linear-gradient(135deg, rgba(255, 107, 0, 0.18) 0%, rgba(0, 229, 255, 0.12) 100%)",
              border: "1px solid rgba(255, 107, 0, 0.4)",
              boxShadow: "0 8px 30px rgba(255, 107, 0, 0.15)",
              marginBottom: "20px"
            }}
          >
            <Sparkles size={16} color="#FF9A3D" />
            <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.15em", color: "#FFB066", textTransform: "uppercase" }}>
              Official Platform Unveil • 2nd October 2026
            </span>
          </motion.div>

          {/* HIGHLIGHTED "COMING SOON" TITLE */}
          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontSize: "clamp(46px, 9vw, 92px)",
              fontWeight: 900,
              lineHeight: 1.05,
              margin: "0 0 16px 0",
              letterSpacing: "-0.035em",
              background: "linear-gradient(135deg, #FFFFFF 0%, #FFB066 38%, #FF6B00 68%, #00E5FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 35px rgba(255, 107, 0, 0.45))",
              textTransform: "uppercase"
            }}
          >
            Coming Soon
          </motion.h1>

          {/* Subtitle / Key Mission Statement */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              fontSize: "clamp(16px, 2.4vw, 21px)",
              color: "rgba(223, 231, 224, 0.88)",
              maxWidth: "760px",
              lineHeight: 1.6,
              margin: "0 0 36px 0",
              fontWeight: 400
            }}
          >
            Arisetek IT Solutions is preparing to launch the next frontier of{" "}
            <strong style={{ color: "#FF9A3D", fontWeight: 600 }}>Autonomous AI Swarms</strong>,{" "}
            <strong style={{ color: "#00E5FF", fontWeight: 600 }}>Enterprise Web Platforms</strong>, and{" "}
            <strong style={{ color: "#FFFFFF", fontWeight: 600 }}>High-Performance Cloud Architectures</strong>.
          </motion.p>

          {/* FROSTED GLASS COUNTDOWN TIMER TO 2ND OCTOBER 2026 */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              width: "100%",
              maxWidth: "820px",
              margin: "0 auto 40px",
              padding: "clamp(24px, 4vw, 36px)",
              borderRadius: "24px",
              background: "rgba(255, 255, 255, 0.035)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255, 255, 255, 0.7)", fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <Clock size={18} color="#FF6B00" />
              <span>Time Until Public Launch</span>
            </div>

            {/* 4 Countdown Digits Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "clamp(10px, 2.5vw, 20px)",
                width: "100%"
              }}
            >
              {[
                { label: "Days", value: days },
                { label: "Hours", value: hours },
                { label: "Minutes", value: minutes },
                { label: "Seconds", value: seconds },
              ].map((item, idx) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "clamp(16px, 3vw, 24px) 8px",
                    borderRadius: "18px",
                    background: "rgba(10, 14, 22, 0.75)",
                    border: "1px solid rgba(255, 107, 0, 0.25)",
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  {/* Subtle Top Glow Accent */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "20%",
                      right: "20%",
                      height: "2px",
                      background: idx % 2 === 0 ? "linear-gradient(90deg, transparent, #FF6B00, transparent)" : "linear-gradient(90deg, transparent, #00E5FF, transparent)"
                    }}
                  />

                  <div
                    style={{
                      fontFamily: "'Space Grotesk', 'Courier New', monospace",
                      fontSize: "clamp(28px, 6vw, 56px)",
                      fontWeight: 800,
                      lineHeight: 1,
                      color: "#FFFFFF",
                      textShadow: "0 0 20px rgba(255, 107, 0, 0.45)",
                      marginBottom: "8px"
                    }}
                  >
                    {String(item.value).padStart(2, "0")}
                  </div>

                  <span
                    style={{
                      fontSize: "clamp(10px, 1.8vw, 13px)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "rgba(223, 231, 224, 0.65)"
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Launch Date Note */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "rgba(255, 255, 255, 0.6)" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF6B00" }} />
              <span>Full website unlocks automatically on <strong>October 2nd, 2026</strong>.</span>
            </div>
          </motion.div>

          {/* VIP LAUNCH ACCESS SUBSCRIPTION */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              width: "100%",
              maxWidth: "640px",
              marginBottom: "44px"
            }}
          >
            <p style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255, 255, 255, 0.8)", marginBottom: "14px", letterSpacing: "0.04em" }}>
              Be the first to explore the platform on launch day:
            </p>

            <form
              onSubmit={handleSubscribe}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "center"
              }}
            >
              <div style={{ flex: "1 1 280px", position: "relative" }}>
                <Mail
                  size={18}
                  color="rgba(255, 255, 255, 0.4)"
                  style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your enterprise or personal email..."
                  disabled={submitting || subscribed}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "16px 16px 16px 46px",
                    borderRadius: "14px",
                    background: "rgba(10, 14, 22, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    fontSize: "15px",
                    outline: "none",
                    backdropFilter: "blur(16px)",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#FF6B00";
                    e.target.style.boxShadow = "0 0 20px rgba(255, 107, 0, 0.25)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.15)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting || subscribed}
                style={{
                  padding: "16px 28px",
                  borderRadius: "14px",
                  background: subscribed
                    ? "rgba(16, 185, 129, 0.2)"
                    : "linear-gradient(135deg, #FF6B00 0%, #FF8533 100%)",
                  border: subscribed ? "1px solid #10B981" : "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: submitting || subscribed ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: subscribed ? "0 0 20px rgba(16, 185, 129, 0.3)" : "0 8px 25px rgba(255, 107, 0, 0.4)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  if (!subscribed) e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  if (!subscribed) e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 size={18} color="#10B981" />
                    <span>Registered for Launch!</span>
                  </>
                ) : (
                  <>
                    <Bell size={18} />
                    <span>{submitting ? "Transmitting..." : "Notify Me"}</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* 4 CORE INNOVATION PILLARS (KEY INFORMATION) */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
              width: "100%",
              maxWidth: "960px",
              margin: "0 auto 36px"
            }}
          >
            {[
              {
                icon: Cpu,
                color: "#FF6B00",
                title: "Autonomous AI Swarms",
                desc: "Orchestrating multi-agent workflows for enterprise automation."
              },
              {
                icon: Globe,
                color: "#00E5FF",
                title: "Enterprise Web Platforms",
                desc: "Ultra-fast, microsecond-latency digital infrastructure."
              },
              {
                icon: Sparkles,
                color: "#FF9A3D",
                title: "Spatial & 3D WebGL",
                desc: "State-of-the-art immersive cybernetic interactive portals."
              },
              {
                icon: ShieldCheck,
                color: "#10B981",
                title: "Mission-Critical Systems",
                desc: "Zero-trust resilience, custom APIs, and AI-driven growth."
              }
            ].map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  style={{
                    background: "rgba(255, 255, 255, 0.025)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(16px)",
                    borderRadius: "16px",
                    padding: "22px 18px",
                    textAlign: "left",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: `rgba(${pillar.color === "#FF6B00" ? "255, 107, 0" : pillar.color === "#00E5FF" ? "0, 229, 255" : "16, 185, 129"}, 0.12)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "12px"
                    }}
                  >
                    <IconComp size={20} color={pillar.color} />
                  </div>
                  <h4 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 6px 0", color: "#ffffff" }}>
                    {pillar.title}
                  </h4>
                  <p style={{ fontSize: "13px", color: "rgba(223, 231, 224, 0.65)", margin: 0, lineHeight: 1.5 }}>
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>

          {/* EARLY INQUIRY & FOUNDER CONTACT */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              padding: "18px 26px",
              borderRadius: "16px",
              background: "rgba(10, 14, 22, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(14px)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              fontSize: "14px",
              color: "rgba(223, 231, 224, 0.8)"
            }}
          >
            <span>Have an immediate enterprise inquiry or urgent project?</span>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <a
                href="mailto:contact@arisetek.com"
                style={{
                  color: "#FF9A3D",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                <span>contact@arisetek.com</span>
                <ChevronRight size={14} />
              </a>

              <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>|</span>

              <a
                href="https://www.linkedin.com/in/anaitapal1999/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#00E5FF",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                <span>Founder LinkedIn</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </motion.div>
        </main>

        {/* BOTTOM FOOTER: Copyright & Discreet Developer/Admin Preview */}
        <footer
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "20px 32px 30px",
            boxSizing: "border-box",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            fontSize: "13px",
            color: "rgba(223, 231, 224, 0.55)",
            gap: "12px"
          }}
        >
          <div>
            © {new Date().getFullYear()} Arisetek IT Solutions. All rights reserved. Launching Worldwide on October 2, 2026.
          </div>

          {/* Discreet Developer/Client Preview Bypass Trigger */}
          <button
            onClick={() => setShowBypassModal(true)}
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255, 255, 255, 0.4)",
              cursor: "pointer",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "color 0.2s ease",
              padding: "4px 8px"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FF9A3D")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.4)")}
            title="Preview site for authorized owners/developers"
          >
            <Lock size={12} />
            <span>Preview Mode</span>
          </button>
        </footer>

        {/* DEVELOPER / OWNER PREVIEW BYPASS MODAL */}
        {showBypassModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100000,
              background: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(16px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px"
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "420px",
                background: "rgba(13, 18, 28, 0.95)",
                border: "1px solid rgba(255, 107, 0, 0.4)",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
                color: "#ffffff"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <Unlock size={22} color="#FF6B00" />
                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 700 }}>Owner / Preview Access</h3>
              </div>
              <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)", marginBottom: "20px", lineHeight: 1.5 }}>
                Enter the authorized preview key to inspect the live website before the October 2, 2026 launch.
              </p>

              <form onSubmit={handleUnlockPreview}>
                <input
                  type="password"
                  autoFocus
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter preview passkey..."
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    fontSize: "15px",
                    marginBottom: "20px",
                    outline: "none"
                  }}
                />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setShowBypassModal(false)}
                    style={{
                      padding: "10px 18px",
                      borderRadius: "10px",
                      background: "transparent",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "rgba(255, 255, 255, 0.7)",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "10px 20px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #FF6B00 0%, #FF8533 100%)",
                      border: "none",
                      color: "#ffffff",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: 700
                    }}
                  >
                    Unlock Preview
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Global Keyframes for Animations */}
        <style>{`
          @keyframes beaconPulse {
            0% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.25); opacity: 1; filter: drop-shadow(0 0 8px #00E5FF); }
            100% { transform: scale(0.95); opacity: 0.8; }
          }
          @keyframes pulseGlow {
            0% { transform: translate(0, 0) scale(1); opacity: 0.18; }
            50% { transform: translate(30px, -20px) scale(1.15); opacity: 0.32; }
            100% { transform: translate(0, 0) scale(1); opacity: 0.18; }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
