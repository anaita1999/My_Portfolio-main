import { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CASESTUDY } from '@/constants/testIds';
import { track } from '@/lib/analytics';
import { usePortfolioContent } from '@/context/PortfolioContentContext';
import CustomCursor from '@/components/portfolio/CustomCursor';
import Footer from '@/components/portfolio/Footer';
import useLenisScroll from '@/hooks/useLenisScroll';

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudy() {
  const { projects: PROJECTS_DATA } = usePortfolioContent();
  useLenisScroll();
  const { slug } = useParams();
  const navigate = useNavigate();

  const { project, nextProject } = useMemo(() => {
    const list = PROJECTS_DATA || [];
    const idx = list.findIndex((p) => p.slug === slug);
    const p = idx >= 0 ? list[idx] : null;
    const next = p ? list[(idx + 1) % list.length] : (list[0] || null);
    return { project: p, nextProject: next };
  }, [slug, PROJECTS_DATA]);

  useEffect(() => {
    document.body.classList.add('grain');
    window.scrollTo(0, 0);
    if (project) track('case_study_view', { slug: project.slug });
    return () => document.body.classList.remove('grain');
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('[data-cs-hero]', {
        yPercent: 105,
        opacity: 0,
        duration: 1.15,
        ease: 'expo.out',
        stagger: 0.08,
      });
      gsap.utils.toArray('[data-cs-fade]').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
    });
    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="App min-h-screen flex items-center justify-center bg-[#05070a] text-[#dfe7e0]">
        <CustomCursor />
        <div className="text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#78837c] mb-4">
            404 · Case Study Not Found
          </div>
          <Link
            to="/"
            className="pill"
            data-testid="casestudy-404-back"
          >
            ← Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  // Safe computed field derivations with full dynamic CMS compatibility
  const toolsList = Array.isArray(project.tools) && project.tools.length > 0
    ? project.tools
    : (Array.isArray(project.stack) && project.stack.length > 0
        ? project.stack
        : ['React', 'Python', 'FastAPI', 'Three.js']);

  const approachList = Array.isArray(project.approach) && project.approach.length > 0
    ? project.approach
    : [
        project.sections?.overview || 'Requirement discovery and comprehensive architecture design.',
        project.sections?.architecture || 'Modular frontend engineering with reactive state & WebGL visual systems.',
        project.sections?.solution || 'End-to-end deployment with automated testing, CI/CD, and performance SLAs.',
      ].filter(Boolean);

  const outcomesList = Array.isArray(project.outcomes) && project.outcomes.length > 0
    ? project.outcomes
    : (Array.isArray(project.sections?.metrics) && project.sections.metrics.length > 0
        ? project.sections.metrics
        : [
            '100% Production uptime & high throughput performance',
            'Accelerated user workflows and seamless interaction velocity',
            'Full responsive compatibility across mobile, tablet, and desktop viewports',
          ]);

  const screensList = Array.isArray(project.screens) && project.screens.length > 0
    ? project.screens
    : [
        'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80',
      ];

  const coverImage = project.image || screensList[0];
  const subtitle = project.subtitle || project.tagline || project.summary || 'Cinematic Digital Experience';
  const tag = project.tag || project.category || 'Agentic AI · Full-Stack';
  const dateStr = project.date || project.year || '2026';
  const roleStr = project.role || project.category || 'Lead Full-Stack / AI Architect';
  const durationStr = project.duration || (project.year ? `${project.year} Production` : '4 weeks');
  const problemStr = project.problem || project.sections?.problem || project.sections?.overview || project.summary || 'Crafting intuitive architectures to solve complex computational and interaction challenges.';

  return (
    <div className="App bg-[#05070a] text-[#dfe7e0]" data-testid={CASESTUDY.root}>
      <CustomCursor />

      {/* Sticky mini-nav */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          padding: '16px 28px',
          background: 'rgba(5, 7, 10, 0.85)',
          backdropFilter: 'blur(20px) saturate(130%)',
          WebkitBackdropFilter: 'blur(20px) saturate(130%)',
          borderBottom: '1px solid rgba(223, 231, 224, 0.08)',
        }}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <Link
            to="/"
            data-testid={CASESTUDY.backLink}
            className="cursor-hover font-mono text-[10px] uppercase tracking-[0.24em] text-[#dfe7e0] hover:text-[#e0231c] inline-flex items-center gap-2"
            style={{ transition: 'color 200ms ease' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All projects
          </Link>
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#78837c]">
            Case study · <span className="text-[#dfe7e0]">{project.slug}</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        style={{
          position: 'relative',
          padding: '160px 24px 80px',
          background: `radial-gradient(1200px 700px at 80% 30%, rgba(224, 35, 28, 0.12), transparent 60%), #05070a`,
          overflow: 'hidden',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-2 sm:px-6">
          <div className="flex items-baseline gap-6 mb-8">
            <span className="pill" style={{ borderColor: '#e0231c', color: '#ffffff', background: 'rgba(224, 35, 28, 0.1)' }}>
              {tag}
            </span>
            <span className="h-px flex-1 bg-[rgba(223,231,224,0.1)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#78837c]">
              {dateStr}
            </span>
          </div>

          <h1
            data-testid={CASESTUDY.title}
            className="font-display font-light text-white"
            style={{
              fontSize: 'clamp(52px, 10vw, 160px)',
              letterSpacing: '-0.045em',
              lineHeight: 0.92,
            }}
          >
            <span className="block overflow-hidden">
              <span data-cs-hero className="inline-block">{project.title}</span>
            </span>
          </h1>

          <div className="block overflow-hidden mt-6">
            <p
              data-cs-hero
              className="font-display italic text-[#b4bfb7] max-w-3xl font-light"
              style={{ fontSize: 'clamp(20px, 2.2vw, 32px)', letterSpacing: '-0.015em', lineHeight: 1.25 }}
            >
              {subtitle}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
            <MetaItem label="Role" value={roleStr} />
            <MetaItem label="Duration" value={durationStr} />
            <MetaItem label="Tools" value={toolsList.join(' · ')} />
            <MetaItem label="Focus" value={tag} />
          </div>
        </div>
      </section>

      {/* Cover image */}
      <section
        data-cs-fade
        data-testid={CASESTUDY.section('cover')}
        style={{ padding: '20px 24px 80px', background: '#05070a' }}
      >
        <div className="max-w-[1440px] mx-auto px-2 sm:px-6">
          <div
            className="relative w-full aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden flex items-center justify-center border border-[rgba(223,231,224,0.14)] shadow-[0_30px_90px_rgba(0,0,0,0.7)]"
            style={{
              background: '#0a0e14',
            }}
          >
            <img
              src={coverImage}
              alt={project.title}
              className="w-full h-full object-contain object-center transition-transform duration-700 ease-out hover:scale-[1.01]"
            />
          </div>
        </div>
      </section>

      {/* Problem + Approach */}
      <section
        data-testid={CASESTUDY.section('problem')}
        style={{ padding: '80px 24px', background: '#05070a' }}
      >
        <div className="max-w-[1440px] mx-auto px-2 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4" data-cs-fade>
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#e0231c] mb-4 flex items-center gap-2">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e0231c', display: 'inline-block' }} />
              01 — Problem Definition
            </div>
            <h2
              className="font-display font-light text-white"
              style={{ fontSize: 'clamp(28px, 3.4vw, 52px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              What we set out to resolve.
            </h2>
          </div>
          <div className="md:col-span-8" data-cs-fade>
            <p className="text-[#b4bfb7] text-lg md:text-xl leading-relaxed font-light">
              {problemStr}
            </p>
          </div>
        </div>
      </section>

      <section
        data-testid={CASESTUDY.section('approach')}
        style={{ padding: '80px 24px', background: '#05070a', borderTop: '1px solid rgba(223,231,224,0.06)' }}
      >
        <div className="max-w-[1440px] mx-auto px-2 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4" data-cs-fade>
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#e0231c] mb-4 flex items-center gap-2">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e0231c', display: 'inline-block' }} />
              02 — Strategic Approach
            </div>
            <h2
              className="font-display font-light text-white"
              style={{ fontSize: 'clamp(28px, 3.4vw, 52px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              How we <span className="italic text-[#e0231c]">engineered</span> it.
            </h2>
          </div>
          <ol className="md:col-span-8 space-y-6" data-cs-fade>
            {approachList.map((step, i) => (
              <li key={i} className="flex gap-6 items-start">
                <span
                  className="font-display font-light shrink-0 text-[#e0231c]"
                  style={{ fontSize: 36, letterSpacing: '-0.03em', lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[#b4bfb7] text-base md:text-lg leading-relaxed font-light">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Screens gallery */}
      <section
        data-testid={CASESTUDY.section('screens')}
        style={{ padding: '80px 24px', background: '#05070a', borderTop: '1px solid rgba(223,231,224,0.06)' }}
      >
        <div className="max-w-[1440px] mx-auto px-2 sm:px-6">
          <div className="flex items-baseline gap-6 mb-12" data-cs-fade>
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#e0231c] flex items-center gap-2">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e0231c', display: 'inline-block' }} />
              03 — Interface Systems & Architecture
            </div>
            <span className="h-px flex-1 bg-[rgba(223,231,224,0.1)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#78837c]">
              Selected frames
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {screensList.map((src, i) => (
              <div
                key={i}
                data-cs-fade
                style={{
                  position: 'relative',
                  aspectRatio: '3 / 4',
                  borderRadius: 18,
                  overflow: 'hidden',
                  backgroundImage: `url(${src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1px solid rgba(223, 231, 224, 0.1)',
                  transform: i === 1 ? 'translateY(24px)' : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section
        data-testid={CASESTUDY.section('outcomes')}
        style={{ padding: '80px 24px 120px', background: '#05070a', borderTop: '1px solid rgba(223,231,224,0.06)' }}
      >
        <div className="max-w-[1440px] mx-auto px-2 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4" data-cs-fade>
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#e0231c] mb-4 flex items-center gap-2">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e0231c', display: 'inline-block' }} />
              04 — Impact & Outcomes
            </div>
            <h2
              className="font-display font-light text-white"
              style={{ fontSize: 'clamp(28px, 3.4vw, 52px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Measured results.
            </h2>
          </div>
          <ul className="md:col-span-8 space-y-4" data-cs-fade>
            {outcomesList.map((o, i) => (
              <li key={i} className="glass rounded-2xl p-6 flex gap-4 items-start">
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: '#e0231c',
                    boxShadow: '0 0 10px #e0231c',
                    marginTop: 8,
                    flexShrink: 0,
                  }}
                />
                <span className="text-[#dfe7e0] text-base md:text-lg leading-relaxed font-light">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Next project */}
      {nextProject && (
        <section
          style={{
            padding: '100px 24px 140px',
            background: 'linear-gradient(180deg, #05070a 0%, rgba(224, 35, 28, 0.08) 100%)',
            borderTop: '1px solid rgba(223, 231, 224, 0.08)',
          }}
        >
          <div className="max-w-[1440px] mx-auto px-2 sm:px-6 text-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#78837c] mb-4">
              Next Case Study · Continue Reading
            </div>
            <button
              data-testid={CASESTUDY.nextLink}
              onClick={() => navigate(`/work/${nextProject.slug}`)}
              className="cursor-hover font-display font-light text-white group inline-flex flex-col items-center"
              style={{
                fontSize: 'clamp(44px, 8vw, 120px)',
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                background: 'transparent',
                border: 'none',
                padding: 0,
              }}
            >
              <span
                style={{
                  transition: 'color 300ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#e0231c')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#dfe7e0')}
              >
                {nextProject.title} →
              </span>
              <span
                className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#78837c]"
              >
                {nextProject.subtitle || nextProject.tagline || nextProject.summary}
              </span>
            </button>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

function MetaItem({ label, value }) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#78837c] mb-2">
        {label}
      </div>
      <div className="font-display text-white text-base md:text-lg font-medium" style={{ letterSpacing: '-0.01em' }}>
        {value}
      </div>
      <div style={{ height: 2, width: 28, marginTop: 8, background: '#e0231c', opacity: 0.8 }} />
    </div>
  );
}
