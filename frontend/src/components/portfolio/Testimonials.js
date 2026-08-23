import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS as TEST_IDS } from '@/constants/testIds';
import { usePortfolioContent } from '@/context/PortfolioContentContext';
import useSectionView from '@/hooks/useSectionView';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const { testimonials: TEST_DATA } = usePortfolioContent();
  const [index, setIndex] = useState(0);
  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const viewRef = useSectionView('testimonials');

  useEffect(() => {
    ScrollTrigger.refresh();
    const ctx = gsap.context(() => {
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
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const next = () => {
    gsap.to(cardRef.current, {
      opacity: 0,
      y: -15,
      duration: 0.22,
      onComplete: () => {
        setIndex((i) => (i + 1) % (TEST_DATA.length || 1));
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
        );
      },
    });
  };

  const prev = () => {
    gsap.to(cardRef.current, {
      opacity: 0,
      y: 15,
      duration: 0.22,
      onComplete: () => {
        setIndex((i) => (i - 1 + TEST_DATA.length) % (TEST_DATA.length || 1));
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
        );
      },
    });
  };

  const current = (TEST_DATA && TEST_DATA[index]) || (TEST_DATA && TEST_DATA[0]) || {
    quote: 'Meticulously crafted interactive experiences.',
    author: 'Collaborator',
    role: 'Product Lead',
  };

  const authorName = current.author || current.name || 'Peer Endorsement';
  const roleText = [current.role, current.company].filter(Boolean).join(' · ') || 'Collaborator';

  return (
    <section
      id="testimonials"
      data-testid={TEST_IDS.root}
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
        {/* Chapter 06 Eyebrow */}
        <div className="flex items-baseline gap-6 mb-16" data-fade>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#e0231c] flex items-center gap-2">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e0231c', display: 'inline-block' }} />
            (06) — Kind Words
          </span>
          <span className="h-px flex-1 bg-[rgba(223,231,224,0.1)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#78837c]">
            Client & Collaborator Endorsements
          </span>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            ref={cardRef}
            data-testid={typeof TEST_IDS.card === 'function' ? TEST_IDS.card(index) : `testimonial-${index}`}
            className="glass rounded-3xl p-8 sm:p-12 relative"
            style={{
              background: 'rgba(10, 14, 20, 0.8)',
              border: '1px solid rgba(223, 231, 224, 0.12)',
            }}
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#e0231c]">
                Recommendation 0{index + 1} / 0{TEST_DATA.length}
              </span>
              <span className="font-serif text-4xl text-[#78837c] leading-none select-none">
                “
              </span>
            </div>

            <blockquote className="font-display font-light text-white text-xl sm:text-2xl md:text-3xl leading-relaxed">
              {current.quote}
            </blockquote>

            <div className="mt-10 pt-6 border-t border-[rgba(223,231,224,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="font-display font-medium text-white text-base">
                  {authorName}
                </div>
                <div className="text-[#8f9a93] text-xs mt-0.5">
                  {roleText}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  data-testid={TEST_IDS.prevBtn || TEST_IDS.prev}
                  aria-label="Previous testimonial"
                  className="pill cursor-hover"
                  style={{ padding: '8px 14px' }}
                >
                  ← Prev
                </button>
                <button
                  onClick={next}
                  data-testid={TEST_IDS.nextBtn || TEST_IDS.next}
                  aria-label="Next testimonial"
                  className="pill cursor-hover"
                  style={{ padding: '8px 14px', borderColor: '#e0231c', color: '#ffffff' }}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
