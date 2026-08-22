import { useEffect, useState } from 'react';

const CHAPTERS = [
  { id: 'home', num: '00', label: 'Threshold' },
  { id: 'about', num: '01', label: 'Sanmon' },
  { id: 'skills', num: '02', label: 'Craft' },
  { id: 'projects', num: '03', label: 'Gardens' },
  { id: 'experience', num: '04', label: 'Journey' },
  { id: 'certifications', num: '05', label: 'Credentials' },
  { id: 'testimonials', num: '06', label: 'Kind Words' },
  { id: 'contact', num: '07', label: 'Afterlight' },
];

export default function ChapterRail() {
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.35 },
    );

    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const jump = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <aside
      aria-label="Chapter progress rail"
      className="hidden lg:flex"
      style={{
        position: 'fixed',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 45,
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'flex-end',
      }}
    >
      {CHAPTERS.map((c) => {
        const on = activeId === c.id;
        return (
          <button
            key={c.id}
            onClick={jump(c.id)}
            aria-label={`Jump to chapter ${c.num} ${c.label}`}
            className="cursor-hover group flex items-center gap-3 py-1"
            style={{
              background: 'none',
              border: 'none',
              padding: '2px 0',
              cursor: 'none',
            }}
          >
            <span
              className="font-mono text-[9px] uppercase tracking-[0.24em] transition-all duration-300 opacity-0 group-hover:opacity-100"
              style={{
                color: on ? 'var(--vermilion)' : 'var(--bone-dim)',
                transform: on ? 'translateX(0)' : 'translateX(4px)',
              }}
            >
              {c.num} · {c.label}
            </span>
            <i
              style={{
                display: 'block',
                width: on ? '26px' : '10px',
                height: '1.5px',
                background: on ? 'var(--vermilion)' : 'var(--line)',
                boxShadow: on ? '0 0 10px rgba(224, 35, 28, 0.8)' : 'none',
                transition: 'all 350ms var(--ease-out)',
              }}
              className="group-hover:w-[22px] group-hover:bg-[#dfe7e0]"
            />
          </button>
        );
      })}
    </aside>
  );
}
