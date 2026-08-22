import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { toast } from 'sonner';
import { SHARE } from '@/constants/testIds';
import { track } from '@/lib/analytics';

const CHANNELS = [
  {
    id: 'twitter',
    label: 'Post to X (Twitter)',
    color: '#00F3FF',
    href: (url, text) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    testId: SHARE.twitter,
  },
  {
    id: 'linkedin',
    label: 'Share on LinkedIn',
    color: '#7C5CFF',
    href: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    testId: SHARE.linkedin,
  },
  {
    id: 'whatsapp',
    label: 'Send on WhatsApp',
    color: '#00FFA3',
    href: (url, text) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`,
    testId: SHARE.whatsapp,
  },
  {
    id: 'email',
    label: 'Email a friend',
    color: '#FF00E5',
    href: (url, text) =>
      `mailto:?subject=${encodeURIComponent('You should see this portfolio')}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
    testId: SHARE.email,
  },
];

export default function ShareWidget() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const text = "Anaita Pal's 3D portfolio — WebGL, motion & product design in one page.";

  useEffect(() => {
    if (!open || !panelRef.current) return;
    gsap.fromTo(
      panelRef.current,
      { y: 12, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'expo.out' },
    );
    track('share_open');
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard.');
      track('share_copy');
    } catch {
      toast.error('Copy failed — please copy manually.');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        left: 24,
        bottom: 24,
        zIndex: 70,
      }}
    >
      <button
        data-testid={SHARE.fab}
        onClick={() => setOpen((v) => !v)}
        aria-label="Share portfolio"
        className="cursor-hover"
        style={{
          width: 52,
          height: 52,
          borderRadius: 999,
          background: 'rgba(10,10,10,0.75)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: '#fff',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'border-color 200ms ease, background-color 200ms ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#00F3FF')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      </button>

      {open && (
        <div
          ref={panelRef}
          data-testid={SHARE.panel}
          className="glass"
          style={{
            position: 'absolute',
            left: 0,
            bottom: 68,
            width: 320,
            padding: 18,
            borderRadius: 20,
            background: 'rgba(10,10,10,0.95)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/50 mb-4">
            Share this portfolio
          </div>
          <div className="space-y-2">
            {CHANNELS.map((c) => (
              <a
                key={c.id}
                href={c.href(url, text)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={c.testId}
                onClick={() => track('share_click', { channel: c.id })}
                className="cursor-hover flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:text-white text-sm"
                style={{
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'border-color 200ms ease, background-color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = c.color;
                  e.currentTarget.style.background = `${c.color}12`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: c.color,
                    boxShadow: `0 0 10px ${c.color}`,
                  }}
                />
                {c.label}
              </a>
            ))}
            <button
              onClick={copy}
              data-testid={SHARE.copy}
              className="cursor-hover w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:text-white text-sm text-left"
              style={{
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'transparent',
                transition: 'border-color 200ms ease, background-color 200ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ffffff';
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15V5a2 2 0 0 1 2-2h10" />
              </svg>
              Copy link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
