import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS as PROJECTS_IDS } from '@/constants/testIds';
import { usePortfolioContent } from '@/context/PortfolioContentContext';
import useSectionView from '@/hooks/useSectionView';

gsap.registerPlugin(ScrollTrigger);

const PROJECT_EMOJIS = {
  'antirag': {
    emoji: '⛩️',
    subtitle: 'Sanctuary & Safety Network',
    glow: 'rgba(224, 35, 28, 0.45)',
  },
  'fast-meal': {
    emoji: '🍱',
    subtitle: 'Gourmet Bento & Fast Delivery',
    glow: 'rgba(255, 140, 40, 0.45)',
  },
  'cyberfiction': {
    emoji: '🌌',
    subtitle: '3D Metaverse Cyber Universe',
    glow: 'rgba(160, 90, 255, 0.45)',
  },
  'ai-voice-assistant': {
    emoji: '🤖',
    subtitle: 'Neural Voice & AI Intelligence',
    glow: 'rgba(50, 210, 120, 0.45)',
  },
};

export default function Projects() {
  const { projects: PROJECTS } = usePortfolioContent();
  const rootRef = useRef(null);
  const marqueeRef = useRef(null);
  const viewRef = useSectionView('projects');

  useEffect(() => {
    ScrollTrigger.refresh();
    const ctx = gsap.context(() => {
      // Fade in chapter headlines
      gsap.utils.toArray('[data-fade]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 25,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        });
      });

      // Staggered reveal for cards
      gsap.utils.toArray('[data-project-card]').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 25,
          duration: 0.8,
          delay: (i % 2) * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        });
      });

      // Infinite smooth horizontal marquee
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 30,
          ease: 'none',
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      data-testid={PROJECTS_IDS.root}
      ref={(el) => {
        rootRef.current = el;
        viewRef.current = el;
      }}
      style={{
        position: 'relative',
        padding: 'clamp(100px, 14vh, 180px) 0',
        background: 'transparent',
      }}
    >
      {/* Infinite Editorial Projects Marquee */}
      <div
        data-testid={PROJECTS_IDS.marquee}
        className="w-full overflow-hidden whitespace-nowrap mb-20 border-y border-[rgba(223,231,224,0.08)] py-4 bg-[rgba(5,7,10,0.5)] backdrop-blur-sm"
      >
        <div ref={marqueeRef} className="inline-flex items-center gap-12 font-mono text-xs uppercase tracking-[0.28em] text-[#78837c]">
          {[
            '03 — Selected Projects',
            'AntiRaG Capstone Mobile',
            'Fast Meal UI Architecture',
            'Cyberfiction 3D Universe',
            'AI Voice Assistant System',
            '03 — Selected Projects',
            'AntiRaG Capstone Mobile',
            'Fast Meal UI Architecture',
            'Cyberfiction 3D Universe',
            'AI Voice Assistant System',
          ].map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-4 hover:text-[#e0231c] transition-colors"
            >
              <span>{item}</span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#e0231c', display: 'inline-block' }} />
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        {/* Chapter 03 Eyebrow */}
        <div className="flex items-baseline gap-6 mb-16" data-fade>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#e0231c] flex items-center gap-2">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e0231c', display: 'inline-block' }} />
            (03) — Selected Works
          </span>
          <span className="h-px flex-1 bg-[rgba(223,231,224,0.1)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#78837c]">
            Featured Architecture & Systems
          </span>
        </div>

        <div className="mb-14" data-fade>
          <h2
            className="font-display font-light text-white"
            style={{
              fontSize: 'clamp(26px, 3.2vw, 44px)',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
            }}
          >
            Crafting systems across <span className="italic text-[#dfe7e0]">AI workflows</span>,{' '}
            <span className="italic text-[#e0231c] glow-vermilion">interaction design</span> & engineering.
          </h2>
        </div>

        {/* Projects Grid */}
        <div data-projects-grid className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((p, i) => {
            const tags = Array.isArray(p.tags)
              ? p.tags
              : Array.isArray(p.tools)
              ? p.tools
              : typeof p.tag === 'string'
              ? p.tag.split('·').map((t) => t.trim())
              : [];
            const category = p.tag || p.category || 'Product Design';
            const description = p.description || p.desc || p.subtitle || '';
            const year = p.date || p.year || '2024';
            const cardTestId = typeof PROJECTS_IDS.card === 'function' ? PROJECTS_IDS.card(p.slug) : `project-card-${p.slug}`;
            const linkTestId = typeof PROJECTS_IDS.viewCaseStudy === 'function'
              ? PROJECTS_IDS.viewCaseStudy(p.slug)
              : typeof PROJECTS_IDS.cardLink === 'function'
              ? PROJECTS_IDS.cardLink(p.slug)
              : `project-card-link-${p.slug}`;

            const projectMeta = PROJECT_EMOJIS[p.slug] || {
              emoji: '⛩️',
              subtitle: 'Featured Architecture',
              glow: 'rgba(224, 35, 28, 0.4)',
            };

            return (
              <article
                key={p.slug}
                data-project-card
                data-testid={cardTestId}
                className="glass rounded-2xl overflow-hidden group cursor-hover transition-all duration-500 hover:border-[rgba(224,35,28,0.5)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_30px_rgba(224,35,28,0.2)] flex flex-col justify-between"
                style={{
                  background: 'linear-gradient(145deg, rgba(14, 18, 26, 0.50) 0%, rgba(8, 10, 15, 0.60) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(223, 231, 224, 0.12)',
                }}
              >
                {/* Media Preview Glassmorphism Container with Centered Emoji */}
                <div
                  className="relative overflow-hidden aspect-[16/10] flex flex-col items-center justify-center border-b border-[rgba(223,231,224,0.08)] transition-all duration-500 group-hover:border-[rgba(224,35,28,0.3)]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(14, 18, 26, 0.40) 0%, rgba(8, 10, 15, 0.50) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                  }}
                >
                  {/* Radial Aura Glow behind the Emoji */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-40 group-hover:opacity-80"
                    style={{
                      background: `radial-gradient(circle at center, ${projectMeta.glow} 0%, transparent 65%)`,
                    }}
                  />

                  {/* Center Emoji Icon with Smooth Hover Micro-Animation */}
                  <div className="relative z-10 flex flex-col items-center justify-center transform transition-transform duration-500 ease-out group-hover:scale-115 group-hover:-translate-y-1">
                    <span
                      style={{
                        fontSize: 'clamp(56px, 6vw, 84px)',
                        lineHeight: 1,
                        filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.6)) drop-shadow(0 0 16px rgba(224,35,28,0.25))',
                      }}
                    >
                      {projectMeta.emoji}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#aab4ad] mt-3 group-hover:text-white transition-colors">
                      {projectMeta.subtitle}
                    </span>
                  </div>

                  {/* Chapter Index Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span
                      className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#dfe7e0] px-2.5 py-1 rounded-full border border-[rgba(223,231,224,0.18)]"
                      style={{
                        background: 'rgba(5, 7, 10, 0.65)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      0{i + 1} · {year}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-4 right-4 z-20">
                    <span
                      className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#e0231c] px-2.5 py-1 rounded-full border border-[rgba(224,35,28,0.3)]"
                      style={{
                        background: 'rgba(224, 35, 28, 0.12)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-7 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className="font-display font-light text-white text-2xl md:text-3xl tracking-tight group-hover:text-[#dfe7e0] transition-colors"
                    >
                      {p.title}
                    </h3>
                    <p className="text-[#8f9a93] text-sm leading-relaxed mt-3 font-light">
                      {description}
                    </p>

                    {/* Tech Tags */}
                    {tags.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {tags.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#aab4ad] px-2.5 py-1 rounded-md bg-[rgba(223,231,224,0.03)] border border-[rgba(223,231,224,0.08)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-5 border-t border-[rgba(223,231,224,0.08)] flex items-center justify-between">
                    <Link
                      to={`/work/${p.slug}`}
                      data-testid={linkTestId}
                      className="cursor-hover group/link inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.16em] text-white hover:text-[#e0231c] transition-colors font-semibold"
                    >
                      Read case study
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform group/link:translate-x-1"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>

                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#78837c]">
                      {p.role || 'Design & Code'}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
