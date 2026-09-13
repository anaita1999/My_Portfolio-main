import { Link } from "react-router-dom";
import ArisetekCursor from "./ArisetekCursor";
import Navbar from "./Layout/Navbar";
import CorporateFooter from "./Layout/CorporateFooter";
import { useTheme } from "../../context/ThemeContext";

import Hero from "./Sections/Hero";
import AgentSwarm from "./Sections/AgentSwarm";
import Services from "./Sections/Services";
import IndustryShowcase from "./Sections/IndustryShowcase";
import AIExperience from "./Sections/AIExperience";
import Portfolio from "./Sections/Portfolio";
import Stats from "./Sections/Stats";
import TechWall from "./Sections/TechWall";
import Process from "./Sections/Process";
import Founder from "./Sections/Founder";
import Pricing from "./Sections/Pricing";
import Contact from "./Sections/Contact";

export default function CinematicLayout() {
  const { isDark } = useTheme();

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        background: isDark ? "#07080b" : "#f6f8fa",
        color: isDark ? "#fff" : "#090d16",
        minHeight: "100vh",
        overflowX: "hidden",
        transition: "background-color 0.25s ease, color 0.25s ease"
      }}
    >
      {/* Custom Cybernetic Cursor */}
      <ArisetekCursor />

      {/* Ambient 3D Nexus Atmosphere Background from Claude Design Baseline */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        {/* Glowing Orange Nexus Orb */}
        <div
          style={{
            position: "absolute",
            top: "8%",
            left: "52%",
            width: "820px",
            height: "820px",
            borderRadius: "50%",
            background: isDark
              ? "radial-gradient(circle at 40% 40%, rgba(255,107,0,.20), rgba(255,107,0,.05) 45%, transparent 70%)"
              : "radial-gradient(circle at 40% 40%, rgba(255,107,0,.12), rgba(255,107,0,.03) 45%, transparent 70%)",
            filter: "blur(20px)",
            animation: "nexus-drift 24s ease-in-out infinite"
          }}
        />

        {/* Cyan Ambient Nexus Orb */}
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-8%",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background: isDark
              ? "radial-gradient(circle, rgba(0,229,255,.10), transparent 68%)"
              : "radial-gradient(circle, rgba(0,180,216,.07), transparent 68%)",
            filter: "blur(30px)",
            animation: "nexus-drift 31s ease-in-out infinite reverse"
          }}
        />

        {/* 90px Grid Pattern with Radial Mask */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: isDark
              ? "linear-gradient(rgba(255,255,255,.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.028) 1px, transparent 1px)"
              : "linear-gradient(rgba(15,23,42,.038) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.038) 1px, transparent 1px)",
            backgroundSize: "90px 90px",
            maskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, #000, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, #000, transparent)"
          }}
        />
      </div>

      {/* Top Fixed Navbar */}
      <Navbar />

      {/* Global Subtle Film Grain Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          pointerEvents: "none",
          opacity: isDark ? 0.12 : 0.04,
          mixBlendMode: isDark ? "overlay" : "multiply",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* HTML Foreground — Native Scrolling Layers */}
      <main style={{ position: "relative", zIndex: 10, width: "100%", display: "flex", flexDirection: "column" }}>
        <Hero />
        <AgentSwarm />
        <Services />
        <IndustryShowcase />
        <AIExperience />
        <Portfolio />
        <Stats />
        <TechWall />
        <Process />
        <Founder />
        <Pricing />
        <Contact />
      </main>

      {/* Corporate Enterprise Footer */}
      <CorporateFooter />
    </div>
  );
}
