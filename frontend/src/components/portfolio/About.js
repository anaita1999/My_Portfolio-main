import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ABOUT } from '@/constants/testIds';
import { PROFILE, EDUCATION } from '@/lib/portfolioData';
import useSectionView from '@/hooks/useSectionView';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const rootRef = useRef(null);
  const viewRef = useSectionView('about');

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

  return (
    <section
      id="about"
      data-testid={ABOUT.root}
      ref={(el) => {
        rootRef.current = el;
        viewRef.current = el;
      }}
      style={{
        position: 'relative',
        padding: 'clamp(120px, 16vh, 200px) 24px',
        background: 'transparent',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-2 sm:px-6">
        {/* Chapter 01 Eyebrow */}
        <div className="flex items-baseline gap-6 mb-16" data-fade>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#e0231c] flex items-center gap-2">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e0231c', display: 'inline-block' }} />
            (01) — The Threshold
          </span>
          <span className="h-px flex-1 bg-[rgba(223,231,224,0.1)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#78837c]">
            Background & Bio
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Left Editorial Text */}
          <div className="lg:col-span-7" data-fade>
            <h2
              className="font-display font-light text-white"
              style={{
                fontSize: 'clamp(28px, 3.6vw, 48px)',
                lineHeight: 1.12,
                letterSpacing: '-0.025em',
              }}
            >
              I design & build{' '}
              <span className="italic text-[#dfe7e0] border-b border-[#e0231c]">interfaces</span>{' '}
              that feel{' '}
              <span className="italic text-[#e0231c] glow-vermilion">alive</span>.
            </h2>

            <p
              data-testid={ABOUT.bio}
              className="mt-8 text-[#b4bfb7] text-base md:text-lg leading-[1.8] max-w-2xl whitespace-pre-line font-light"
            >
              {PROFILE.bio}
            </p>

            <div className="mt-8 flex flex-wrap gap-2 items-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#78837c] mr-2">
                Languages:
              </span>
              {PROFILE.languages.map((l) => (
                <span key={l} className="pill" style={{ padding: '6px 14px', fontSize: '11px' }}>
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* Right Bento Grid Stats */}
          <div className="lg:col-span-5 lg:pl-6" data-fade>
            {/* Education Card */}
            <div className="glass rounded-2xl p-7 mb-5" data-testid={ABOUT.statEducation}>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[rgba(223,231,224,0.08)]">
                <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#aab4ad]">
                  Academic Journey
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#e0231c]">
                  Accreditation
                </span>
              </div>
              <div className="space-y-5">
                {EDUCATION.map((e, i) => (
                  <div key={i} className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-display text-white text-base font-medium">{e.level}</div>
                      <div className="text-[#8f9a93] text-xs mt-0.5">{e.school}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono text-[9px] text-[#78837c] uppercase tracking-widest">
                        {e.year}
                      </div>
                      <div className="font-mono text-xs text-[#e0231c] mt-0.5 font-medium">{e.score}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience & Languages Bento Pair */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-2xl p-6" data-testid={ABOUT.statExperience}>
                <div className="font-mono text-[9px] uppercase tracking-[0.26em] text-[#78837c]">
                  Experience
                </div>
                <div
                  className="font-display font-light text-white mt-2"
                  style={{ fontSize: 38, letterSpacing: '-0.04em' }}
                >
                  4<span className="text-[#e0231c]">+</span>
                </div>
                <div className="text-[#8f9a93] text-xs mt-1">Roles & credentials</div>
              </div>

              <div className="glass rounded-2xl p-6" data-testid={ABOUT.statLanguages}>
                <div className="font-mono text-[9px] uppercase tracking-[0.26em] text-[#78837c]">
                  Languages
                </div>
                <div
                  className="font-display font-light text-white mt-2"
                  style={{ fontSize: 38, letterSpacing: '-0.04em' }}
                >
                  3
                </div>
                <div className="text-[#8f9a93] text-xs mt-1">Bengali · Hindi · English</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

