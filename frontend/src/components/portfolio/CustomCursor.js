import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CURSOR } from '@/constants/testIds';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power3' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power3' });
    const rxTo = gsap.quickTo(ring, 'x', { duration: 0.32, ease: 'power3' });
    const ryTo = gsap.quickTo(ring, 'y', { duration: 0.32, ease: 'power3' });

    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      rxTo(e.clientX);
      ryTo(e.clientY);
    };
    const onDown = () => gsap.to(ring, { scale: 0.65, duration: 0.22 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3 });

    const onOver = (e) => {
      const t = e.target;
      if (t.closest('a, button, [role="button"], input, textarea, .cursor-hover, [data-cursor]')) {
        gsap.to(ring, {
          scale: 2.1,
          borderColor: '#e0231c',
          backgroundColor: 'rgba(224, 35, 28, 0.08)',
          duration: 0.3,
        });
        gsap.to(dot, { opacity: 0, duration: 0.18 });
      }
    };
    const onOut = (e) => {
      const t = e.target;
      if (t.closest('a, button, [role="button"], input, textarea, .cursor-hover, [data-cursor]')) {
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(223, 231, 224, 0.45)',
          backgroundColor: 'transparent',
          duration: 0.3,
        });
        gsap.to(dot, { opacity: 1, duration: 0.18 });
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return (
    <div data-testid={CURSOR.root} className="hidden md:block">
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
          border: '1px solid rgba(223, 231, 224, 0.45)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transition: 'border-color 200ms ease, background-color 200ms ease',
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 5,
          height: 5,
          marginLeft: -2.5,
          marginTop: -2.5,
          background: '#dfe7e0',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
      />
    </div>
  );
}

