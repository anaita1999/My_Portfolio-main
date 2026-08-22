import { PROFILE } from '@/lib/portfolioData';

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '36px 24px',
        background: 'rgba(5, 7, 10, 0.95)',
        borderTop: '1px solid rgba(223, 231, 224, 0.08)',
      }}
    >
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-2 sm:px-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#78837c]">
          © {PROFILE.name} · {PROFILE.year} — All rights reserved
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#78837c] flex items-center gap-4">
          <span>Three.js WebGL · Procedural World · GSAP Motion</span>
          <span
            className="inline-block"
            style={{
              width: 5,
              height: 5,
              borderRadius: 999,
              background: '#e0231c',
              boxShadow: '0 0 8px #e0231c',
            }}
          />
          <span className="text-[#dfe7e0]">Connected</span>
        </div>
      </div>
    </footer>
  );
}
