import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CERTIFICATIONS as CERTS_DATA } from '@/lib/portfolioData';
import { CERTIFICATIONS as CERTS_IDS } from '@/constants/testIds';
import useSectionView from '@/hooks/useSectionView';

gsap.registerPlugin(ScrollTrigger);

const slug = (s) => (s ? String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '');

export default function Certifications() {
  const rootRef = useRef(null);
  const viewRef = useSectionView('certifications');

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

      gsap.utils.toArray('[data-cert-card]').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: (i % 2) * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          },
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certifications"
      data-testid={CERTS_IDS.root}
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
        {/* Chapter 05 Eyebrow */}
        <div className="flex items-baseline gap-6 mb-16" data-fade>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#e0231c] flex items-center gap-2">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e0231c', display: 'inline-block' }} />
            (05) — Credentials
          </span>
          <span className="h-px flex-1 bg-[rgba(223,231,224,0.1)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#78837c]">
            Verified Accreditations & Badges
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
            Verified credentials in <span className="italic text-[#dfe7e0]">cloud</span>,{' '}
            <span className="italic text-[#e0231c]">intelligence</span> & design.
          </h2>
        </div>

        <div
          data-certs-grid
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CERTS_DATA.map((c, i) => {
            const title = c.name || c.title || 'Accreditation';
            const issuer = c.issuer || 'Professional Program';
            const certSlug = slug(title);
            const cardTestId = typeof CERTS_IDS.card === 'function' ? CERTS_IDS.card(certSlug) : `certification-${certSlug}`;
            const linkTestId = typeof CERTS_IDS.link === 'function' ? CERTS_IDS.link(certSlug) : `certification-link-${certSlug}`;

            return (
              <div
                key={title + i}
                data-cert-card
                data-testid={cardTestId}
                className="glass rounded-2xl p-7 flex flex-col justify-between group transition-all duration-300 hover:border-[rgba(224,35,28,0.4)] hover:bg-[rgba(15,21,28,0.85)] cursor-hover"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#78837c] group-hover:text-[#e0231c] transition-colors">
                      VERIFIED · 0{i + 1}
                    </span>
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 999,
                        background: '#c9a24a',
                        boxShadow: '0 0 8px rgba(201,162,74,0.4)',
                      }}
                    />
                  </div>
                  <h3 className="font-display text-white text-lg font-medium leading-snug group-hover:text-[#dfe7e0] transition-colors">
                    {title}
                  </h3>
                  <p className="text-[#8f9a93] text-xs mt-2 font-mono">
                    {issuer}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[rgba(223,231,224,0.06)] flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#78837c]">
                    Status
                  </span>
                  {c.url ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={linkTestId}
                      className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#e0231c] hover:underline flex items-center gap-1.5"
                    >
                      Credly
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>
                  ) : (
                    <span className="font-mono text-[10px] text-[#dfe7e0]">
                      Completed
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
