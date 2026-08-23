import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';
import { toast } from 'sonner';
import { SERVICES } from '@/lib/portfolioData';
import { HIRE } from '@/constants/testIds';
import { track } from '@/lib/analytics';
import useCurrency, { BUDGET_PILLS, DEFAULT_BUDGET } from '@/hooks/useCurrency';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function HireMeWidget() {
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const panelRef = useRef(null);
  const [currency, setCurrency] = useCurrency();
  const [form, setForm] = useState({
    name: '',
    email: '',
    budget: DEFAULT_BUDGET.INR,
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm((f) => ({ ...f, budget: DEFAULT_BUDGET[currency] }));
  }, [currency]);

  // Scroll proximity tracker: completely invisible at the top, gradually ramping up to 100% at the Contact section
  useEffect(() => {
    const updateProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const maxScroll = Math.max(
        (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight,
        1,
      );

      // At the very top (< 60px), strictly invisible
      if (scrollY < 60) {
        setScrollProgress(0);
        return;
      }

      // Smooth progress calculation ramping from 0 at the top to 1.0 at the contact/bottom section
      const progress = Math.min(Math.max((scrollY - 60) / (maxScroll - 60), 0), 1);
      setScrollProgress(progress);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useEffect(() => {
    if (!panelRef.current) return;
    if (open) {
      gsap.fromTo(
        panelRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'expo.out' },
      );
      track('hire_panel_open');
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in name, email and a brief description.');
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/hire`, form);
      toast.success('Brief received — I’ll be in touch within 24h.');
      track('hire_submit');
      setForm({ name: '', email: '', budget: form.budget, message: '' });
      setOpen(false);
    } catch (err) {
      toast.error('Something went wrong. Try emailing directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const currentOpacity = isHovered && scrollProgress > 0.05 ? 1 : scrollProgress;
  const currentTranslateY = isHovered && scrollProgress > 0.05 ? -3 : (1 - scrollProgress) * 24;
  const currentScale = isHovered && scrollProgress > 0.05 ? 1.03 : (0.85 + scrollProgress * 0.15);
  const pointerEvents = scrollProgress > 0.05 ? 'auto' : 'none';

  return (
    <>
      {/* Floating Rates & Brief Button with Scroll-Linked Proximity Visibility */}
      <button
        data-testid={HIRE.fab}
        onClick={() => setOpen(true)}
        aria-label="Hire me"
        className="cursor-hover group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'fixed',
          right: 24,
          bottom: 24,
          zIndex: 70,
          padding: '14px 22px 14px 18px',
          borderRadius: 999,
          background: 'linear-gradient(135deg, #ff5a3c 0%, #e0231c 100%)',
          color: '#ffffff',
          fontFamily: "'Unbounded', sans-serif",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: `0 12px 36px rgba(224, 35, 28, ${0.45 * scrollProgress}), 0 4px 14px rgba(0, 0, 0, ${0.4 * scrollProgress})`,
          border: 'none',
          opacity: currentOpacity,
          transform: `translateY(${currentTranslateY}px) scale(${currentScale})`,
          pointerEvents,
          transition: 'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 300ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease',
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: 999,
            background: '#ffffff',
            display: 'inline-block',
            boxShadow: '0 0 6px #ffffff',
          }}
        />
        Rates & Brief
      </button>

      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 90,
            background: 'rgba(5, 7, 10, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          onClick={() => setOpen(false)}
        >
          <div
            ref={panelRef}
            data-testid={HIRE.panel}
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-3xl"
            style={{
              width: '100%',
              maxWidth: 1080,
              maxHeight: '92vh',
              overflowY: 'auto',
              background: '#0a0e14',
              border: '1px solid rgba(223, 231, 224, 0.12)',
              padding: 'clamp(28px, 4vw, 56px)',
              position: 'relative',
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-8 pb-6 border-b border-[rgba(223,231,224,0.08)]">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#e0231c] mb-2 flex items-center gap-2">
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e0231c', display: 'inline-block' }} />
                  Rates & Direct Engagement
                </div>
                <h2
                  className="font-display font-light text-white"
                  style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}
                >
                  Let’s build something <span className="italic text-[#e0231c]">exceptional</span>.
                </h2>
              </div>
              <button
                data-testid={HIRE.close}
                onClick={() => setOpen(false)}
                className="cursor-hover w-10 h-10 rounded-full border border-[rgba(223,231,224,0.12)] flex items-center justify-center text-[#aab4ad] hover:text-white hover:border-white transition-colors"
                aria-label="Close panel"
              >
                ✕
              </button>
            </div>

            {/* Two Column Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left: Engagement tiers */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#78837c]">
                    Engagement Models
                  </span>
                  {/* Currency Toggle */}
                  <div
                    data-testid="currency-toggle"
                    className="inline-flex rounded-full p-1 bg-[rgba(223,231,224,0.05)] border border-[rgba(223,231,224,0.12)]"
                  >
                    {['INR', 'USD'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCurrency(c)}
                        data-testid={`currency-${c.toLowerCase()}`}
                        className={`cursor-hover px-3 py-1 font-mono text-[10px] uppercase tracking-wider rounded-full transition-all ${
                          currency === c
                            ? 'bg-[#e0231c] text-white font-bold shadow-[0_0_12px_rgba(224,35,28,0.5)]'
                            : 'text-[#78837c] hover:text-white'
                        }`}
                      >
                        {c === 'INR' ? '₹ INR' : '$ USD'}
                      </button>
                    ))}
                  </div>
                </div>

                {SERVICES.map((s, idx) => {
                  const priceStr = currency === 'INR'
                    ? (s.rateInr || (typeof s.price === 'object' ? s.price?.INR : s.price) || 'from ₹1.2L')
                    : (s.rateUsd || (typeof s.price === 'object' ? s.price?.USD : s.price) || 'from $1.4k');
                  const periodStr = s.period || s.duration || 'Per Project';
                  const descStr = s.desc || (Array.isArray(s.includes) ? s.includes.join(' · ') : '');

                  return (
                    <div
                      key={s.title}
                      data-testid={typeof HIRE.tier === 'function' ? HIRE.tier(idx) : typeof HIRE.card === 'function' ? HIRE.card(idx) : `hire-tier-${idx}`}
                      className="p-5 rounded-2xl border border-[rgba(223,231,224,0.1)] bg-[rgba(5,7,10,0.6)] hover:border-[rgba(224,35,28,0.5)] hover:bg-[rgba(10,14,20,0.8)] transition-all group"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-display font-medium text-white text-lg group-hover:text-[#dfe7e0]">
                              {s.title}
                            </span>
                            {s.tag && (
                              <span className="font-mono text-[9px] uppercase tracking-wider text-[#e0231c] bg-[rgba(224,35,28,0.12)] px-2 py-0.5 rounded-full border border-[rgba(224,35,28,0.25)]">
                                {s.tag}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div
                            data-testid={typeof HIRE.tierPrice === 'function' ? HIRE.tierPrice(idx) : `hire-tier-price-${idx}`}
                            className="font-mono text-base text-[#e0231c] font-bold tracking-tight"
                          >
                            {priceStr}
                          </div>
                          <div className="font-mono text-[9px] text-[#78837c] uppercase tracking-widest mt-0.5">
                            {periodStr}
                          </div>
                        </div>
                      </div>
                      <p className="text-[#8f9a93] text-xs leading-relaxed font-light mt-2">{descStr}</p>
                    </div>
                  );
                })}

                <div className="p-4 rounded-xl border border-[rgba(224,35,28,0.2)] bg-[rgba(224,35,28,0.05)] text-xs text-[#b4bfb7]">
                  <span className="text-[#e0231c] font-mono uppercase tracking-wider font-bold mr-2">Note:</span>
                  Open to fixed-scope project agreements and selected retainers. Invoices in INR or USD.
                </div>
              </div>

              {/* Right: Quick Brief Form */}
              <div className="lg:col-span-6 lg:pl-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#78837c] block mb-4">
                  Submit a Project Brief
                </span>

                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#aab4ad] block mb-1.5">
                      Your Name *
                    </label>
                    <input
                      data-testid={HIRE.inputName || HIRE.name || 'hire-input-name'}
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-[rgba(5,7,10,0.6)] border border-[rgba(223,231,224,0.12)] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e0231c] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#aab4ad] block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      data-testid={HIRE.inputEmail || HIRE.email || 'hire-input-email'}
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-[rgba(5,7,10,0.6)] border border-[rgba(223,231,224,0.12)] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e0231c] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#aab4ad] block mb-1.5">
                      Approximate Budget ({currency})
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {BUDGET_PILLS[currency].map((b) => (
                        <button
                          key={b}
                          type="button"
                          data-testid={typeof HIRE.budgetPill === 'function' ? HIRE.budgetPill(b) : `hire-budget-${b}`}
                          onClick={() => setForm({ ...form, budget: b })}
                          className={`cursor-hover px-3 py-2 rounded-lg font-mono text-xs border transition-all text-left ${
                            form.budget === b
                              ? 'border-[#e0231c] bg-[rgba(224,35,28,0.15)] text-white font-medium'
                              : 'border-[rgba(223,231,224,0.1)] text-[#78837c] hover:text-white'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#aab4ad] block mb-1.5">
                      Project Overview *
                    </label>
                    <textarea
                      data-testid={HIRE.inputMsg || HIRE.message || 'hire-input-message'}
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Timeline, scope, goals, links to existing assets..."
                      className="w-full bg-[rgba(5,7,10,0.6)] border border-[rgba(223,231,224,0.12)] rounded-xl p-4 text-white text-sm focus:outline-none focus:border-[#e0231c] transition-colors resize-none"
                    />
                  </div>

                  <button
                    data-testid={HIRE.submit}
                    type="submit"
                    disabled={submitting}
                    className="w-full cursor-hover pill justify-center"
                    style={{ padding: '14px 24px', fontSize: '11px', marginTop: 12 }}
                  >
                    {submitting ? (
                      'Sending brief...'
                    ) : (
                      <>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffffff', display: 'inline-block' }} />
                        Dispatch Project Brief
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
