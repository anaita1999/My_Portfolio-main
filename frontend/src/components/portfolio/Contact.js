import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { toast } from 'sonner';
import { CONTACT as CONTACT_IDS } from '@/constants/testIds';
import { PROFILE } from '@/lib/portfolioData';
import { track as trackEvent } from '@/lib/analytics';
import ResumeButton from './ResumeButton';
import CoverLetterButton from './CoverLetterButton';
import useSectionView from '@/hooks/useSectionView';

gsap.registerPlugin(ScrollTrigger);

const API_BASE = process.env.REACT_APP_BACKEND_URL || '';

export default function Contact() {
  const rootRef = useRef(null);
  const viewRef = useSectionView('contact');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all fields.');
      return;
    }
    setLoading(true);
    trackEvent('contact_form_submit_start', { name: form.name });

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(data.message || 'Message sent successfully! I will get back to you shortly.');
        setForm({ name: '', email: '', message: '' });
        trackEvent('contact_form_success', { name: form.name });
      } else {
        toast.error(data.detail || data.message || 'Failed to send message. Please try again.');
        trackEvent('contact_form_error', { error: data.detail });
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error. Please email directly at ' + PROFILE.email);
      trackEvent('contact_form_network_error', { error: String(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid={CONTACT_IDS.root}
      ref={(el) => {
        rootRef.current = el;
        viewRef.current = el;
      }}
      style={{
        position: 'relative',
        padding: 'clamp(120px, 16vh, 220px) 24px 100px',
        background: 'transparent',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-2 sm:px-6">
        {/* Chapter 07 Eyebrow */}
        <div className="flex items-baseline gap-6 mb-16" data-fade>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#e0231c] flex items-center gap-2">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e0231c', display: 'inline-block' }} />
            (07) — Connect
          </span>
          <span className="h-px flex-1 bg-[rgba(223,231,224,0.1)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#78837c]">
            Initiate Collaboration & Dialogue
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Big typography & direct coordinates */}
          <div className="lg:col-span-6" data-fade>
            <h2
              className="font-display font-light text-white"
              style={{
                fontSize: 'clamp(28px, 3.8vw, 50px)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
              }}
            >
              Let’s build something{' '}
              <span className="italic text-[#e0231c] glow-vermilion">exceptional</span>.
            </h2>

            <p className="mt-8 text-[#b4bfb7] text-base md:text-lg leading-relaxed max-w-lg font-light">
              Whether you have an upcoming product, a technical challenge, or an opportunity to explore,
              my inbox is always open.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href={`mailto:${PROFILE.email}`}
                data-testid={CONTACT_IDS.emailLink}
                className="cursor-hover block font-display text-white text-xl sm:text-2xl hover:text-[#e0231c] transition-colors"
              >
                {PROFILE.email} ↗
              </a>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#78837c]">
                {PROFILE.phone} · {PROFILE.location}
              </div>
            </div>

            {/* Resume & Cover Letter CTA row */}
            <div className="mt-10 flex flex-wrap gap-3 items-center">
              <ResumeButton variant="primary" testId={CONTACT_IDS.resumeBtn} label="Download ATS Resume" />
              <CoverLetterButton />
            </div>
          </div>

          {/* Right Column: Glass Contact Form */}
          <div className="lg:col-span-6" data-fade>
            <form
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-8 sm:p-10 space-y-6"
              style={{
                background: 'rgba(10, 14, 20, 0.82)',
              }}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block font-mono text-[10px] uppercase tracking-[0.24em] text-[#aab4ad] mb-2"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  data-testid={CONTACT_IDS.nameInput}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3.5 rounded-xl bg-[rgba(223,231,224,0.03)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#e0231c] transition-colors placeholder:text-[#4a544e]"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-[10px] uppercase tracking-[0.24em] text-[#aab4ad] mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  data-testid={CONTACT_IDS.emailInput}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-[rgba(223,231,224,0.03)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#e0231c] transition-colors placeholder:text-[#4a544e]"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-mono text-[10px] uppercase tracking-[0.24em] text-[#aab4ad] mb-2"
                >
                  Project Brief or Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={handleChange}
                  data-testid={CONTACT_IDS.msgInput}
                  placeholder="Tell me about your vision, timeline, and goals..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[rgba(223,231,224,0.03)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#e0231c] transition-colors placeholder:text-[#4a544e] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                data-testid={CONTACT_IDS.submitBtn}
                className="cursor-hover w-full py-4 rounded-xl bg-[#e0231c] hover:bg-[#ff3b30] text-white font-display text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 shadow-[0_8px_24px_rgba(224,35,28,0.35)] disabled:opacity-50"
              >
                {loading ? 'Sending message...' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>

        {/* Footer info & copyright */}
        <div className="mt-24 pt-8 border-t border-[rgba(223,231,224,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#78837c]">
            © {new Date().getFullYear()} Anaita Pal · All rights reserved
          </div>
          <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#78837c]">
            <a
              href="https://www.linkedin.com/in/anaitapal1999/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e0231c] transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/anaita1999"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e0231c] transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
