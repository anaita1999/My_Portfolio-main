import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { gsap } from 'gsap';
import { toast } from 'sonner';
import { track } from '@/lib/analytics';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function CoverLetterButton({ testId = 'cover-letter-btn', label = 'Cover letter' }) {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [tone, setTone] = useState('warm');
  const [downloading, setDownloading] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (open && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { y: 20, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'expo.out' },
      );
      track('cover_letter_panel_open');
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const download = async (e) => {
    e.preventDefault();
    if (!role.trim()) {
      toast.error('Add the role you’re applying for.');
      return;
    }
    setDownloading(true);
    track('cover_letter_download', { role: role.trim(), company: company.trim() || null, tone });
    try {
      const params = new URLSearchParams({ role: role.trim(), tone });
      if (company.trim()) params.set('company', company.trim());
      const res = await axios.get(`${API}/cover-letter?${params.toString()}`, {
        responseType: 'blob',
      });
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      const safeRole = role.trim().replace(/[^a-z0-9]+/gi, '_').slice(0, 40);
      const safeCo = company.trim().replace(/[^a-z0-9]+/gi, '_').slice(0, 40);
      const suffix = safeCo ? `${safeRole}_${safeCo}` : safeRole;
      link.href = url;
      link.download = `Anaita_Pal_CoverLetter_${suffix || 'role'}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Cover letter downloaded.');
      setOpen(false);
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        data-testid={testId}
        onClick={() => setOpen(true)}
        className="cursor-hover pill"
        style={{
          padding: '12px 20px',
          fontSize: 11,
          fontWeight: 500,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16v16H4z" />
          <path d="M4 8l8 5 8-5" />
        </svg>
        {label}
      </button>

      {open && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          data-testid="cover-letter-modal"
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 95,
            background: 'rgba(5, 7, 10, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <form
            ref={panelRef}
            onClick={(e) => e.stopPropagation()}
            onSubmit={download}
            className="glass"
            style={{
              width: '100%',
              maxWidth: 520,
              padding: '36px 30px',
              borderRadius: 24,
              background: 'rgba(10, 14, 20, 0.95)',
              border: '1px solid rgba(223, 231, 224, 0.12)',
            }}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#e0231c] mb-2">
                  Dynamic Cover Letter
                </div>
                <h3
                  className="font-display font-light text-white"
                  style={{ fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.15 }}
                >
                  Tailor it in <span className="italic text-[#dfe7e0]">two fields</span>.
                </h3>
              </div>
              <button
                type="button"
                data-testid="cover-letter-close"
                onClick={() => setOpen(false)}
                aria-label="Close cover letter dialog"
                className="cursor-hover w-10 h-10 rounded-full border border-[rgba(223,231,224,0.15)] flex items-center justify-center text-white hover:border-[#e0231c] hover:text-[#e0231c]"
                style={{ transition: 'all 200ms ease' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.26em] text-[#aab4ad] mb-2">
                  Target Role
                </label>
                <input
                  data-testid="cover-letter-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Senior Product Designer"
                  autoFocus
                  className="cursor-hover w-full bg-[rgba(223,231,224,0.03)] border border-[rgba(223,231,224,0.12)] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#e0231c] transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.26em] text-[#aab4ad] mb-2">
                  Company (optional)
                </label>
                <input
                  data-testid="cover-letter-company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Vercel, Linear, Google"
                  className="cursor-hover w-full bg-[rgba(223,231,224,0.03)] border border-[rgba(223,231,224,0.12)] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#e0231c] transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.26em] text-[#aab4ad] mb-3">
                  Narrative Tone
                </label>
                <div
                  role="tablist"
                  aria-label="Cover letter tone"
                  className="flex flex-wrap gap-2"
                  data-testid="cover-letter-tone-group"
                >
                  {[
                    { key: 'warm', label: 'Warm & Personable', color: '#e0231c' },
                    { key: 'formal', label: 'Formal & Executive', color: '#dfe7e0' },
                    { key: 'bold', label: 'Bold & Direct', color: '#ff5a3c' },
                  ].map((t) => {
                    const active = tone === t.key;
                    return (
                      <button
                        key={t.key}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        data-testid={`cover-letter-tone-${t.key}`}
                        onClick={() => setTone(t.key)}
                        className="cursor-hover pill"
                        style={{
                          borderColor: active ? '#e0231c' : undefined,
                          color: active ? '#ffffff' : undefined,
                          background: active ? 'rgba(224, 35, 28, 0.15)' : undefined,
                        }}
                      >
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: 999,
                            background: active ? '#e0231c' : 'rgba(223,231,224,0.3)',
                            boxShadow: active ? '0 0 8px #e0231c' : 'none',
                            display: 'inline-block',
                          }}
                        />
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between pt-2 border-t border-[rgba(223,231,224,0.06)]">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#78837c]">
                ReportLab PDF engine
              </div>
              <button
                type="submit"
                data-testid="cover-letter-submit"
                disabled={downloading}
                className="cursor-hover pill"
                style={{
                  borderColor: '#e0231c',
                  color: '#ffffff',
                  background: '#e0231c',
                  padding: '12px 22px',
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {downloading ? 'Compiling PDF…' : 'Download PDF →'}
              </button>
            </div>
          </form>
        </div>,
        document.body,
      )}
    </>
  );
}
