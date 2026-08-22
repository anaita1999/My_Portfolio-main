import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCE as EXP_DATA } from '@/lib/portfolioData';
import { EXPERIENCE as EXP_IDS } from '@/constants/testIds';
import { track as trackEvent } from '@/lib/analytics';
import useSectionView from '@/hooks/useSectionView';

gsap.registerPlugin(ScrollTrigger);

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const FILTERS = [
  { key: 'all', label: 'All roles', color: '#e0231c' },
  { key: 'design', label: 'Design & Dev', color: '#dfe7e0' },
  { key: 'risk', label: 'Risk & Operations', color: '#ff5a3c' },
];

export default function Experience() {
  const rootRef = useRef(null);
  const viewRef = useSectionView('experience');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return EXP_DATA;
    return EXP_DATA.filter((e) => e.track === filter);
  }, [filter]);

  useEffect(() => {
    ScrollTrigger.refresh();
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-fade]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          },
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const onFilter = (key) => {
    setFilter(key);
    trackEvent('experience_filter', { filter: key });
  };

  return (
    <section
      id="experience"
      data-testid={EXP_IDS.root}
      ref={(el) => {
        rootRef.current = el;
        viewRef.current = el;
      }}
      style={{
        position: 'relative',
        padding: 'clamp(100px, 14vh, 180px) 24px',
        background: 'transparent',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-2 sm:px-6">
        {/* Chapter 04 Eyebrow */}
        <div className="flex items-baseline gap-6 mb-16" data-fade>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#e0231c] flex items-center gap-2">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e0231c', display: 'inline-block' }} />
            (04) — Career Journey
          </span>
          <span className="h-px flex-1 bg-[rgba(223,231,224,0.1)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#78837c]">
            Milestones & Roles
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16" data-fade>
          <div>
            <h2
              className="font-display font-light text-white"
              style={{
                fontSize: 'clamp(26px, 3.2vw, 44px)',
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
              }}
            >
              Milestones along the <span className="italic text-[#dfe7e0]">craft</span> &{' '}
              <span className="italic text-[#e0231c]">operations</span> path.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter experience">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              const count =
                f.key === 'all' ? EXP_DATA.length : EXP_DATA.filter((e) => e.track === f.key).length;
              return (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  data-testid={EXP_IDS.filter(f.key)}
                  onClick={() => onFilter(f.key)}
                  className="cursor-hover pill"
                  style={{
                    borderColor: active ? '#e0231c' : 'rgba(223, 231, 224, 0.12)',
                    color: active ? '#ffffff' : 'var(--bone)',
                    background: active ? 'rgba(224, 35, 28, 0.15)' : 'rgba(223, 231, 224, 0.03)',
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: 999,
                      background: active ? '#e0231c' : 'rgba(223,231,224,0.3)',
                      boxShadow: active ? '0 0 8px #e0231c' : 'none',
                    }}
                  />
                  {f.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeline Flow */}
        <div className="relative border-l border-[rgba(223,231,224,0.12)] ml-4 md:ml-8 pl-6 md:pl-12 space-y-10">
          {filtered.map((e, i) => (
            <div
              key={e.role + e.company}
              data-testid={EXP_IDS.item(slug(e.role))}
              className="relative group"
            >
              {/* Timeline Waypoint Node */}
              <div
                style={{
                  position: 'absolute',
                  left: '-31px',
                  top: '8px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#05070a',
                  border: '2px solid #e0231c',
                  boxShadow: '0 0 10px rgba(224, 35, 28, 0.6)',
                  transition: 'transform 250ms ease, background-color 250ms ease',
                }}
                className="group-hover:scale-125 group-hover:bg-[#e0231c]"
              />

              <div className="glass rounded-2xl p-7 md:p-8 transition-all duration-300 hover:border-[rgba(224,35,28,0.35)] hover:bg-[rgba(15,21,28,0.85)]">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-display font-medium text-white text-xl md:text-2xl tracking-tight">
                      {e.role}
                    </h3>
                    <div className="text-[#aab4ad] text-sm font-medium mt-1">
                      {e.company}{' '}
                      <span className="text-[#78837c] font-mono text-xs ml-2">
                        · {e.location || 'Kolkata, India'}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 text-left sm:text-right">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#e0231c] bg-[rgba(224,35,28,0.1)] px-3 py-1 rounded-full border border-[rgba(224,35,28,0.25)]">
                      {e.period}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="mt-5 space-y-2.5">
                  {e.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      className="text-[#8f9a93] text-sm leading-relaxed flex items-start gap-3 font-light"
                    >
                      <span className="text-[#e0231c] mt-1.5 shrink-0 text-xs">◆</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                {e.tags && (
                  <div className="mt-6 pt-4 border-t border-[rgba(223,231,224,0.06)] flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#78837c]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
