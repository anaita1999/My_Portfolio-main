import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Shimmer Color Palettes
 */
export const SHIMMER_THEMES = {
  flame: "live-shimmer-flame",
  vermilion: "live-shimmer-vermilion",
  aurora: "live-shimmer-aurora",
  silver: "live-shimmer-silver",
  gold: "live-shimmer-gold",
};

/**
 * Inline Live Shimmer Text
 */
export function LiveShimmerText({
  children,
  theme = "flame",
  className = "",
  style = {},
}) {
  const themeClass = SHIMMER_THEMES[theme] || SHIMMER_THEMES.flame;
  return (
    <span className={`${themeClass} ${className}`} style={style}>
      {children}
    </span>
  );
}

/**
 * Live Scramble / Matrix Decryption Text
 * Animates characters in technical headings, badges, and labels
 */
export function LiveScrambleText({
  text,
  className = "",
  style = {},
  scrambleOnHover = true,
  speed = 30,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>[]{}",
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20px" });

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = text.length * 2;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n" || char === "·") return char;
            if (index < iteration / 2) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
      iteration += 1;
    }, speed);
  }, [isScrambling, text, characters, speed]);

  useEffect(() => {
    if (isInView) {
      scramble();
    }
  }, [isInView, scramble]);

  return (
    <span
      ref={containerRef}
      onMouseEnter={scrambleOnHover ? scramble : undefined}
      className={`inline-block font-mono select-none ${className}`}
      style={{ cursor: scrambleOnHover ? "crosshair" : "inherit", ...style }}
    >
      {displayText}
    </span>
  );
}

/**
 * Live Animated Heading with Character Hover Physics and Ambient Breathing
 */
export function LiveHeading({
  text,
  as: Component = "h2",
  theme = "flame",
  className = "",
  style = {},
  interactiveChars = true,
  glow = true,
  delay = 0,
}) {
  const themeClass = SHIMMER_THEMES[theme] || SHIMMER_THEMES.flame;
  const glowClass =
    theme === "vermilion"
      ? "live-glow-vermilion"
      : theme === "aurora"
      ? "live-glow-aurora"
      : "live-glow-flame";

  const words = typeof text === "string" ? text.split(" ") : [];

  return (
    <Component
      className={`relative ${glow ? glowClass : ""} ${className}`}
      style={{
        display: "block",
        lineHeight: "1.05",
        ...style,
      }}
    >
      {words.map((word, wIdx) => (
        <span
          key={wIdx}
          style={{ display: "inline-block", whiteSpace: "nowrap", marginRight: "0.28em" }}
        >
          {interactiveChars
            ? word.split("").map((char, cIdx) => (
                <motion.span
                  key={cIdx}
                  className={`inline-block ${
                    theme === "vermilion"
                      ? "live-interactive-char-vermilion"
                      : "live-interactive-char"
                  }`}
                  initial={{ opacity: 0, y: 15, rotateX: -40 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.45,
                    delay: delay + (wIdx * 5 + cIdx) * 0.025,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                >
                  <span className={themeClass}>{char}</span>
                </motion.span>
              ))
            : (
                <motion.span
                  className={themeClass}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: delay + wIdx * 0.05 }}
                >
                  {word}
                </motion.span>
              )}
        </span>
      ))}
    </Component>
  );
}

/**
 * Live Numeric Counter with Glowing Aura
 */
export function LiveCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.8,
  className = "",
  style = {},
  theme = "flame",
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  const numericValue = typeof value === "number" ? value : parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0;

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easeOutProgress * numericValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(numericValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, numericValue, duration]);

  const themeClass = SHIMMER_THEMES[theme] || SHIMMER_THEMES.flame;

  return (
    <span
      ref={ref}
      className={`font-mono font-bold tracking-tight inline-flex items-center ${themeClass} ${className}`}
      style={style}
    >
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

/**
 * Live Shimmer Badge Pill
 */
export function LiveBadge({
  children,
  icon,
  theme = "flame",
  className = "",
  style = {},
  pulse = true,
}) {
  const isFlame = theme === "flame";
  const isVermilion = theme === "vermilion";
  const isCyan = theme === "aurora" || theme === "cyan";

  const color = isFlame ? "#FF6B00" : isVermilion ? "#E0231C" : isCyan ? "#00F3FF" : "#34D399";
  const bg = isFlame
    ? "rgba(255,107,0,0.08)"
    : isVermilion
    ? "rgba(224,35,28,0.08)"
    : isCyan
    ? "rgba(0,243,255,0.08)"
    : "rgba(52,211,153,0.08)";
  const border = isFlame
    ? "rgba(255,107,0,0.3)"
    : isVermilion
    ? "rgba(224,35,28,0.3)"
    : isCyan
    ? "rgba(0,243,255,0.3)"
    : "rgba(52,211,153,0.3)";

  return (
    <div
      className={`live-badge-glow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] backdrop-blur-md transition-all duration-300 hover:scale-105 ${className}`}
      style={{
        background: bg,
        border: `1px solid ${border}`,
        color: color,
        ...style,
      }}
    >
      {pulse && (
        <span
          className="w-1.5 h-1.5 rounded-full inline-block"
          style={{
            background: color,
            animation: "ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite",
          }}
        />
      )}
      {icon && <span>{icon}</span>}
      <span className="font-semibold">{children}</span>
    </div>
  );
}
