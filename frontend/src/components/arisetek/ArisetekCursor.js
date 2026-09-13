import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ArisetekCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Fast sub-frame tracker for dot
    const xTo = gsap.quickTo(dot, 'x', { duration: 0.04, ease: 'power3' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.04, ease: 'power3' });
    // Smooth trailing ring tracker
    const rxTo = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power3' });
    const ryTo = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power3' });

    let isVisible = false;

    const onMove = (e) => {
      if (!isVisible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.15 });
        isVisible = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
      rxTo(e.clientX);
      ryTo(e.clientY);
    };

    const onDown = () => gsap.to(ring, { scale: 0.65, duration: 0.18 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.22 });

    const onOver = (e) => {
      const t = e.target;
      if (t.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor], .group')) {
        gsap.to(ring, {
          scale: 2.1,
          borderColor: '#FF6B00',
          backgroundColor: 'rgba(255, 107, 0, 0.14)',
          boxShadow: '0 0 24px rgba(255, 107, 0, 0.5)',
          duration: 0.22,
        });
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.12 });
      }
    };

    const onOut = (e) => {
      const t = e.target;
      if (t.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor], .group')) {
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(255, 107, 0, 0.75)',
          backgroundColor: 'transparent',
          boxShadow: '0 0 12px rgba(255, 107, 0, 0.25)',
          duration: 0.22,
        });
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.12 });
      }
    };

    const onLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.15 });
      isVisible = false;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none" aria-hidden="true">
      {/* Outer Cyber Orange Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 32,
          height: 32,
          marginLeft: -16,
          marginTop: -16,
          border: '1.5px solid rgba(255, 107, 0, 0.8)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          boxShadow: '0 0 14px rgba(255, 107, 0, 0.3)',
          transition: 'border-color 200ms ease, background-color 200ms ease, box-shadow 200ms ease',
        }}
      />
      {/* Center Precise Cyber Orange Core Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          background: '#FF6B00',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          boxShadow: '0 0 8px #FF6B00',
        }}
      />
    </div>
  );
}
