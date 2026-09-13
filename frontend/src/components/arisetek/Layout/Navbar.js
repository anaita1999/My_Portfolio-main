import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";

export default function Navbar() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  if (location.pathname.startsWith('/demo/')) {
    return null;
  }

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "AI Swarm", href: "#swarm" },
    { name: "Sectors", href: "#industries" },
    { name: "Pipeline", href: "#pipeline" },
    { name: "Founder", href: "#founder" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: isDark
            ? (scrolled ? "rgba(8,9,12,.94)" : "rgba(8,9,12,.86)")
            : (scrolled ? "rgba(255,255,255,.95)" : "rgba(255,255,255,.88)"),
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: isDark ? "1px solid rgba(255,255,255,.10)" : "1px solid rgba(15,23,42,.08)",
          boxShadow: isDark ? "0 4px 30px rgba(0,0,0,.8)" : "0 4px 24px rgba(0,0,0,.06)",
          transition: "background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a href="#home" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <img
              src={isDark ? "/arisetek-logo-dark.svg" : "/arisetek-logo.svg"}
              alt="Arisetek"
              style={{ height: "48px", width: "auto" }}
            />
          </a>
          
          <div
            className="hidden xl:flex"
            style={{
              alignItems: "center",
              gap: "8px",
              padding: "4px 12px",
              borderRadius: "999px",
              background: isDark ? "rgba(255,255,255,.04)" : "rgba(15,23,42,.04)",
              border: isDark ? "1px solid rgba(255,255,255,.10)" : "1px solid rgba(15,23,42,.08)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              color: isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.65)"
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#FF6B00",
                animation: "pulse-slow 2s ease-in-out infinite"
              }}
            />
            <span>AI Android Overseer: Active</span>
          </div>
        </div>

        <nav
          className="hidden lg:flex"
          style={{
            alignItems: "center",
            gap: "32px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: ".2em",
            color: isDark ? "rgba(255,255,255,.8)" : "rgba(15,23,42,.75)"
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{ color: "inherit", whiteSpace: "nowrap", flexShrink: 0, transition: "color 0.2s" }}
              className="hover:!text-[#FF6B00]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>
          {/* Futuristic Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 14px",
              borderRadius: "999px",
              background: isDark ? "rgba(255,255,255,.05)" : "rgba(15,23,42,.05)",
              border: isDark ? "1px solid rgba(255,255,255,.18)" : "1px solid rgba(15,23,42,.12)",
              color: isDark ? "#fff" : "#090d16",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="hover:border-[#FF6B00] hover:shadow-[0_0_15px_rgba(255,107,0,0.25)] group"
          >
            <span style={{ fontSize: "14px", display: "inline-flex", transform: isDark ? "rotate(0deg)" : "rotate(360deg)", transition: "transform 0.5s ease" }}>
              {isDark ? "🌙" : "☀️"}
            </span>
            <span className="hidden sm:inline">
              {isDark ? "Dark" : "Light"}
            </span>
          </button>

          <Link
            to="/portfolio"
            className="hidden sm:inline-flex"
            style={{
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              background: isDark ? "rgba(255,255,255,.04)" : "rgba(15,23,42,.04)",
              border: isDark ? "1px solid rgba(255,255,255,.20)" : "1px solid rgba(15,23,42,.15)",
              color: isDark ? "#fff" : "#090d16",
              borderRadius: "999px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              textDecoration: "none",
              transition: "all 0.2s"
            }}
          >
            Founder ⛩️
          </Link>

          <a
            href="#contact"
            className="hidden md:inline-flex"
            style={{
              padding: "10px 20px",
              background: "linear-gradient(90deg, #FF6B00, #FF8500)",
              color: "#000",
              borderRadius: "999px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: ".15em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
          >
            Initialize Project
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="flex lg:hidden"
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              background: "transparent",
              border: isDark ? "1px solid rgba(255,255,255,.2)" : "1px solid rgba(15,23,42,.2)",
              borderRadius: "12px",
              color: isDark ? "#fff" : "#090d16",
              cursor: "pointer",
              flexDirection: "column",
              gap: "5px",
              padding: 0
            }}
          >
            <span style={{ display: "block", width: "20px", height: "1.5px", background: isDark ? "#fff" : "#090d16" }} />
            <span style={{ display: "block", width: "20px", height: "1.5px", background: isDark ? "#fff" : "#090d16" }} />
            <span style={{ display: "block", width: "20px", height: "1.5px", background: isDark ? "#fff" : "#090d16" }} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed",
              top: "72px",
              left: 0,
              right: 0,
              bottom: 0,
              background: isDark ? "rgba(7,8,11,0.98)" : "rgba(246,248,250,0.98)",
              backdropFilter: "blur(30px)",
              zIndex: 49,
              padding: "32px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: "'Unbounded', sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: isDark ? "#fff" : "#090d16",
                    textDecoration: "none"
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "24px", borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(15,23,42,0.1)" }}>
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  background: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)",
                  border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(15,23,42,0.15)",
                  color: isDark ? "#fff" : "#090d16",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  textTransform: "uppercase",
                  cursor: "pointer"
                }}
              >
                <span>{isDark ? "🌙 Mode: Dark" : "☀️ Mode: Light"}</span>
                <span style={{ color: "#FF6B00" }}>(Tap to Switch)</span>
              </button>

              <Link
                to="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  background: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)",
                  border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(15,23,42,0.15)",
                  color: isDark ? "#fff" : "#090d16",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  fontWeight: 700,
                  textAlign: "center",
                  textTransform: "uppercase",
                  textDecoration: "none"
                }}
              >
                Founder Sanctuary ⛩️
              </Link>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  background: "linear-gradient(90deg, #FF6B00, #FF8500)",
                  color: "#000",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  fontWeight: 700,
                  textAlign: "center",
                  textTransform: "uppercase",
                  textDecoration: "none"
                }}
              >
                Initialize Project →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
