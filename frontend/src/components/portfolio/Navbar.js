import { useEffect, useState } from 'react';
import { NAV } from '@/constants/testIds';
import ResumeButton from './ResumeButton';

const LINKS = [
  { id: 'home', label: 'Home', testId: NAV.linkHome },
  { id: 'about', label: 'About', testId: NAV.linkAbout },
  { id: 'skills', label: 'Skills', testId: 'nav-link-skills' },
  { id: 'projects', label: 'Projects', testId: NAV.linkProjects },
  { id: 'experience', label: 'Journey', testId: NAV.linkExperience },
  { id: 'contact', label: 'Contact', testId: NAV.linkContact },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = String(d.getUTCHours()).padStart(2, '0');
      const m = String(d.getUTCMinutes()).padStart(2, '0');
      setTime(`${h}:${m} UTC`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const jump = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      data-testid={NAV.root}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(5,7,10,0.85)] backdrop-blur-md border-b border-[rgba(223,231,224,0.08)] py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          onClick={jump('home')}
          className="flex items-center gap-3 cursor-hover group"
          data-testid="nav-brand"
        >
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold text-white transition-all duration-300 group-hover:scale-105"
            style={{
              background: '#e0231c',
              boxShadow: '0 0 20px rgba(224,35,28,0.5)',
            }}
          >
            AP
          </span>
          <div className="flex flex-col">
            <span className="font-display font-medium text-white tracking-[0.14em] text-xs uppercase group-hover:text-[#e0231c] transition-colors">
              Anaita Pal
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.32em] text-[#78837c] mt-1">
              Creative Portfolio
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={jump(l.id)}
              data-testid={l.testId}
              className="cursor-hover relative px-3 py-1.5 font-mono uppercase tracking-[0.18em] text-[10px] text-[#aab4ad] hover:text-white group"
              style={{ transition: 'color 200ms ease' }}
            >
              <span>{l.label}</span>
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#78837c]">
            {time}
          </span>
          <ResumeButton variant="compact" testId={NAV.resumeBtn} label="Resume" />
          <a
            href="#contact"
            onClick={jump('contact')}
            className="pill cursor-hover"
            data-testid="nav-cta-contact"
            style={{ padding: '8px 16px', fontSize: '10px' }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#e0231c',
                boxShadow: '0 0 6px #e0231c',
              }}
            />
            Let’s Talk
          </a>
        </div>
      </div>
    </header>
  );
}
