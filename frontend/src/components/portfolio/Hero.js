import { useEffect, useRef, useState } from 'react';
import { HERO } from '@/constants/testIds';
import { PROFILE } from '@/lib/portfolioData';
import useSectionView from '@/hooks/useSectionView';

export default function Hero() {
  const containerRef = useRef(null);
  const viewRef = useSectionView('home');
  const [scrollY, setScrollY] = useState(0);
  const [viewportH, setViewportH] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 900,
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || 0);
    };

    const handleResize = () => {
      setViewportH(window.innerHeight || 900);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const CHAPTER_CHIPS = [
    { num: '01', title: 'Threshold & Bio', id: 'about' },
    { num: '02', title: 'Sacred Craft', id: 'skills' },
    { num: '03', title: 'Selected Work', id: 'projects' },
    { num: '04', title: 'Career Journey', id: 'experience' },
  ];

  const BADGES = [
    { label: 'Agentic AI Systems', color: '#ff3b30', glow: 'rgba(255, 59, 48, 0.45)', bg: 'rgba(255, 59, 48, 0.16)' },
    { label: 'UI/UX & Product Design', color: '#dfe7e0', glow: 'rgba(223, 231, 224, 0.35)', bg: 'rgba(223, 231, 224, 0.12)' },
    { label: 'AI Automation Creator', color: '#ff7744', glow: 'rgba(255, 119, 68, 0.45)', bg: 'rgba(255, 119, 68, 0.16)' },
    { label: 'Full-Stack Web Architecture', color: '#dfe7e0', glow: 'rgba(223, 231, 224, 0.35)', bg: 'rgba(223, 231, 224, 0.12)' },
    { label: 'Founder · Arisetek IT Solutions', color: '#ffd15c', glow: 'rgba(255, 209, 92, 0.5)', bg: 'rgba(255, 209, 92, 0.18)' },
  ];

  const NAME_LETTERS = ['A', 'N', 'A', 'I', 'T', 'A', '·', 'P', 'A', 'L'];

  // Track height is 1.35x viewport height for brisk, fast-paced scroll progression
  const trackHeight = viewportH * 1.35;
  const pinDistance = trackHeight - viewportH;
  const isPinned = scrollY < pinDistance;

  // Normalized scroll progress (0.0 to 1.0)
  const progress = Math.min(1, Math.max(0, scrollY / (pinDistance * 0.85 || 1)));

  // Fast, crisp animation reveals
  const headlineAlpha = Math.max(0, Math.min(1, (progress - 0.02) / 0.12));
  const nameAlpha = Math.max(0, Math.min(1, (progress - 0.10) / 0.14));
  const badgeAlpha = Math.max(0, Math.min(1, (progress - 0.18) / 0.14));
  const ctaAlpha = Math.max(0, Math.min(1, (progress - 0.35) / 0.16));
  const initialHintAlpha = Math.max(0, 1 - progress * 10);

  return (
    <section
      id="home"
      data-testid={HERO.root}
      ref={(el) => {
        containerRef.current = el;
        viewRef.current = el;
      }}
      style={{
        position: 'relative',
        height: `${trackHeight}px`,
        background: 'transparent',
      }}
    >
      <div
        style={{
          position: isPinned ? 'fixed' : 'absolute',
          top: isPinned ? 0 : `${pinDistance}px`,
          left: 0,
          width: '100%',
          height: `${viewportH}px`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'transparent',
          zIndex: 10,
          pointerEvents: isPinned || progress >= 0.85 ? 'auto' : 'none',
        }}
      >
        {/* Atmospheric Top Gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '24vh',
            background: 'linear-gradient(180deg, rgba(5, 7, 10, 0.8) 0%, rgba(5, 7, 10, 0.05) 75%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Top Container: Left Headline + Badges placed right below it */}
        <div
          className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6"
          style={{ paddingTop: 'clamp(85px, 12vh, 125px)' }}
        >
          {/* Left Column: Eyebrow, Headline & Discipline Badges */}
          <div className="max-w-2xl flex-1">
            {/* 1. Chapter 00 Eyebrow */}
            <div
              className="mb-4 flex items-center gap-3 transition-opacity duration-200"
              style={{
                opacity: headlineAlpha,
                pointerEvents: headlineAlpha > 0.2 ? 'auto' : 'none',
              }}
            >
              <span
                className="pill"
                style={{
                  background: 'rgba(10, 14, 20, 0.88)',
                  borderColor: 'rgba(223, 231, 224, 0.25)',
                  color: '#dfe7e0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#e0231c',
                    boxShadow: '0 0 12px #e0231c',
                    display: 'inline-block',
                  }}
                />
                Chapter 00 — The Threshold · 2024
              </span>
              <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.28em] text-[#c5d2c8]">
                {PROFILE.location}
              </span>
            </div>

            {/* 2. Refined Typography with Continuous Shimmer Animations (Borderless) */}
            <div
              className="transition-opacity duration-200 max-w-xl"
              style={{
                opacity: headlineAlpha,
                pointerEvents: headlineAlpha > 0.2 ? 'auto' : 'none',
              }}
            >
              {/* Line 1: WHERE CRAFT */}
              <div className="flex items-center gap-3 mb-2.5">
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#ff3322',
                    boxShadow: '0 0 10px #ff3322',
                    display: 'inline-block',
                  }}
                />
                <span className="font-mono text-xs sm:text-sm tracking-[0.32em] uppercase font-bold text-[#dfe7e0]">
                  Where Craft
                </span>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-[rgba(255,51,34,0.6)] via-[rgba(223,231,224,0.2)] to-transparent" />
              </div>

              {/* Line 2: REVEALS THE */}
              <div className="font-display font-black italic uppercase tracking-tight text-white leading-none text-[clamp(28px,4.5vw,58px)]">
                <span className="shimmer-text-silver drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
                  Reveals The
                </span>
              </div>

              {/* Line 3: INTELLIGENCE. */}
              <div className="font-display font-black italic uppercase tracking-tight leading-none text-[clamp(32px,5.2vw,70px)] mt-2">
                <span className="shimmer-text-vermilion drop-shadow-[0_0_28px_rgba(255,51,34,0.7)]">
                  Intelligence
                </span>
                <span className="text-[#ff3322] drop-shadow-[0_0_14px_#ff3322]">.</span>
              </div>
            </div>

            {/* 3. Badges moved right here instead of text lines */}
            <div
              className="mt-6 flex flex-wrap items-center gap-2.5 max-w-xl transition-opacity duration-200"
              style={{
                opacity: badgeAlpha,
                pointerEvents: badgeAlpha > 0.2 ? 'auto' : 'none',
              }}
            >
              {BADGES.map((b) => (
                <div key={b.label}>
                  <span
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-semibold transition-all duration-300 hover:scale-105"
                    style={{
                      background: b.bg,
                      color: b.color,
                      border: `1px solid ${b.color}55`,
                      boxShadow: `0 4px 16px rgba(0,0,0,0.5), 0 0 10px ${b.glow}`,
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: b.color,
                        boxShadow: `0 0 8px ${b.color}`,
                        display: 'inline-block',
                      }}
                    />
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lower Third: Iconic Spaced Display Title "A N A I T A · P A L" */}
        <div
          className="relative z-10 max-w-[1440px] w-full mx-auto px-4 md:px-8 pb-6 transition-opacity duration-200"
          style={{
            opacity: nameAlpha,
            pointerEvents: nameAlpha > 0.2 ? 'auto' : 'none',
          }}
        >
          <div
            data-testid={HERO.title}
            className="w-full flex items-center justify-between pointer-events-none select-none font-display font-extrabold uppercase overflow-visible"
            style={{
              fontSize: 'clamp(32px, 7.2vw, 115px)',
              lineHeight: 0.9,
              letterSpacing: '0.06em',
              textShadow: '0 6px 30px rgba(0,0,0,0.95), 0 0 60px rgba(5,7,10,0.9)',
            }}
          >
            {NAME_LETTERS.map((char, i) => (
              <span
                key={i}
                className="inline-block transition-transform duration-300 hover:scale-105"
                style={{
                  color: char === '·' ? '#ff3322' : '#dfe7e0',
                  opacity: char === '·' ? 1.0 : 0.94,
                  textShadow: char === '·' ? '0 0 16px #ff3322' : '0 4px 20px rgba(0,0,0,0.85)',
                }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Bottom Bar: Chapter Nav Chips (01 02 03 04) & Scroll Cue */}
          <div
            className="mt-4 pt-4 border-t border-[rgba(223,231,224,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-opacity duration-200"
            style={{
              opacity: ctaAlpha,
              pointerEvents: ctaAlpha > 0.2 ? 'auto' : 'none',
            }}
          >
            <div className="flex items-center gap-6 sm:gap-10">
              {CHAPTER_CHIPS.map((c) => (
                <a
                  key={c.num}
                  href={`#${c.id}`}
                  onClick={scrollTo(c.id)}
                  className="cursor-hover group flex items-baseline gap-2 text-[#aab4ad] hover:text-[#ff3b30] transition-colors"
                >
                  <span className="font-display font-light text-base sm:text-lg group-hover:text-[#ff3b30] transition-colors">
                    {c.num}
                  </span>
                  <span className="hidden md:inline font-mono text-[9px] uppercase tracking-[0.2em] text-[#dfe7e0] group-hover:text-white transition-colors">
                    {c.title}
                  </span>
                </a>
              ))}
            </div>

            <div
              data-testid={HERO.scrollCue}
              className="flex items-center gap-3"
            >
              <span
                style={{
                  width: 30,
                  height: 2,
                  background: 'linear-gradient(90deg, #ff3322, transparent)',
                  boxShadow: '0 0 8px #ff3322',
                }}
              />
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#dfe7e0] font-medium">
                Scroll to explore
              </span>
            </div>
          </div>
        </div>

        {/* Pristine Initial Landing Prompt (Only visible at scroll = 0) */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: initialHintAlpha,
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#dfe7e0] bg-[rgba(10,14,20,0.75)] px-4 py-1.5 rounded-full border border-[rgba(223,231,224,0.2)] shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              Scroll to explore sanctuary
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3322" strokeWidth="2.5" className="animate-bounce">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
