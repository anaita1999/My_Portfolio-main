import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS as SKILLS_IDS } from '@/constants/testIds';
import { SKILLS } from '@/lib/portfolioData';
import useSectionView from '@/hooks/useSectionView';

gsap.registerPlugin(ScrollTrigger);

const slug = (s) => (s ? String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '');

const SKILL_DETAILS = {
  'Agentic AI Systems': {
    category: 'AI Core',
    desc: 'Multi-agent orchestration, autonomous decision loops, tool-calling pipelines & self-healing LLM chains.',
    mastery: '98%',
  },
  'AI Automation Pipelines': {
    category: 'Automation',
    desc: 'Autonomous workflow execution, enterprise process automation, webhook triggers & integration architectures.',
    mastery: '96%',
  },
  'Cognitive & RAG Architecture': {
    category: 'Intelligence',
    desc: 'Vector embeddings, semantic retrieval, hybrid search, context engineering & private LLM knowledge graphs.',
    mastery: '95%',
  },
  'UI/UX Design': {
    category: 'Design',
    desc: 'Human-AI interface architecture, cognitive UX systems, design tokens & high-fidelity interactive prototypes.',
    mastery: '96%',
  },
  'Web Development': {
    category: 'Frontend',
    desc: 'Modern high-performance web platforms, real-time WebGL, micro-frontends & responsive architectures.',
    mastery: '94%',
  },
  'App Development': {
    category: 'Mobile',
    desc: 'Cross-platform mobile applications with smooth native interactions and offline-first data synchronization.',
    mastery: '88%',
  },
  'Node.js': {
    category: 'Backend',
    desc: 'Event-driven microservices, asynchronous task queues, high-throughput REST APIs & server runtime.',
    mastery: '88%',
  },
  'Python': {
    category: 'AI & Data',
    desc: 'Agentic AI frameworks, async data automation pipelines, model integration & backend algorithms.',
    mastery: '96%',
  },
  'HTML / CSS': {
    category: 'Frontend',
    desc: 'Semantic web structure, advanced CSS grid, canvas shaders & accessible design system components.',
    mastery: '98%',
  },
  'Flutter': {
    category: 'Mobile',
    desc: 'Cross-platform mobile & desktop client applications with reactive state management and clean architecture.',
    mastery: '85%',
  },
  'JavaScript': {
    category: 'Core',
    desc: 'Modern ES6+, Three.js WebGL rendering, GSAP physics and asynchronous client execution engines.',
    mastery: '94%',
  },
  'React': {
    category: 'Frontend',
    desc: 'Scalable component ecosystems, custom hooks, atomic state management and sub-millisecond UI latency.',
    mastery: '95%',
  },
};

export default function Skills() {
  const rootRef = useRef(null);
  const viewRef = useSectionView('skills');

  useEffect(() => {
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // Fade in chapter headlines
      gsap.utils.toArray('[data-fade]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 25 },
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

      // Pure opacity reveal for cards — zero translation offsets to ensure 100% stable grid alignment
      gsap.fromTo(
        '[data-skill-card]',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '[data-skills-grid]',
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      data-testid={SKILLS_IDS.root}
      ref={(el) => {
        rootRef.current = el;
        viewRef.current = el;
      }}
      style={{
        position: 'relative',
        padding: 'clamp(100px, 14vh, 180px) 24px',
        scrollMarginTop: '100px',
        background: 'transparent',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-2 sm:px-6">
        {/* Chapter 02 Eyebrow */}
        <div className="flex items-baseline gap-6 mb-12" data-fade>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#e0231c] flex items-center gap-2">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e0231c', display: 'inline-block' }} />
            (02) — Sacred Craft
          </span>
          <span className="h-px flex-1 bg-[rgba(223,231,224,0.15)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#dfe7e0]">
            Core Capabilities · 12 Disciplines
          </span>
        </div>

        {/* Section Headline */}
        <div className="mb-12" data-fade>
          <h2
            className="font-display font-light text-white"
            style={{
              fontSize: 'clamp(28px, 3.6vw, 48px)',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              textShadow: '0 2px 20px rgba(0,0,0,0.8)',
            }}
          >
            Architecting <span className="italic font-normal text-[#dfe7e0]">autonomous intelligence</span>,{' '}
            <span className="italic font-normal text-[#ff3322]" style={{ textShadow: '0 0 20px rgba(255,51,34,0.5)' }}>
              cognitive workflows
            </span>{' '}
            & scalable digital ecosystems.
          </h2>
        </div>

        {/* 12-Card Bento Grid */}
        <div
          data-skills-grid
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 items-stretch"
          style={{
            gridAutoRows: '1fr',
          }}
        >
          {SKILLS.map((s, i) => {
            const name = typeof s === 'string' ? s : s?.name || 'Skill';
            const details = SKILL_DETAILS[name] || {
              category: 'Technical',
              desc: typeof s === 'object' && s?.desc ? s.desc : 'Core discipline and production-grade engineering craft.',
              mastery: typeof s === 'object' && s?.level ? s.level : '90%',
            };
            const skillSlug = slug(name);
            const testId = typeof SKILLS_IDS.item === 'function' ? SKILLS_IDS.item(skillSlug) : `skills-item-${skillSlug}`;

            return (
              <div
                key={name}
                data-skill-card
                data-testid={testId}
                className="glass rounded-2xl p-6 relative group transition-all duration-300 hover:border-[rgba(224,35,28,0.5)] hover:bg-[rgba(18,24,32,0.95)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.6),0_0_20px_rgba(224,35,28,0.15)] cursor-hover flex flex-col justify-between h-full"
                style={{
                  background: 'rgba(10, 14, 20, 0.86)',
                  border: '1px solid rgba(223, 231, 224, 0.16)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                  opacity: 1,
                }}
              >
                <div className="flex flex-col flex-1">
                  {/* Top Card Row: Index & Category Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#aab4ad] group-hover:text-[#ff3322] transition-colors font-medium">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="font-mono text-[9px] uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full"
                      style={{
                        background: 'rgba(223, 231, 224, 0.1)',
                        border: '1px solid rgba(223, 231, 224, 0.2)',
                        color: '#dfe7e0',
                      }}
                    >
                      {details.category}
                    </span>
                  </div>

                  {/* Skill Name with Top-Aligned Baseline */}
                  <div className="min-h-[56px] mb-2 flex items-start">
                    <div className="font-display text-white text-xl font-semibold group-hover:text-[#ff3322] transition-colors tracking-tight leading-tight">
                      {name}
                    </div>
                  </div>

                  {/* Skill Description */}
                  <div className="min-h-[60px] flex items-start">
                    <p className="text-[#c5d2c8] text-xs leading-relaxed font-light">
                      {details.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Card Row: Strictly Aligned Mastery Progress Bar */}
                <div className="mt-5 pt-3.5 border-t border-[rgba(223,231,224,0.1)]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#aab4ad]">
                      Proficiency
                    </span>
                    <span className="font-mono text-[10px] text-[#ffffff] font-semibold">
                      {details.mastery}
                    </span>
                  </div>
                  {/* Visual Progress Bar */}
                  <div
                    style={{
                      width: '100%',
                      height: 3,
                      borderRadius: 999,
                      background: 'rgba(223, 231, 224, 0.12)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: details.mastery,
                        height: '100%',
                        background: 'linear-gradient(90deg, #ff3322, #ff7744)',
                        boxShadow: '0 0 8px rgba(255, 51, 34, 0.6)',
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
