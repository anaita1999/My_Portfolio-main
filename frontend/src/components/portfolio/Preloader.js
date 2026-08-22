import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { PRELOADER } from '@/constants/testIds';

export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const numberRef = useRef(null);
  const barRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const obj = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(rootRef.current, {
          yPercent: -100,
          duration: 1.05,
          ease: 'expo.inOut',
          onComplete: () => {
            if (onDone) onDone();
          },
        });
      },
    });
    tl.to(obj, {
      v: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(obj.v)),
    });
    return () => tl.kill();
  }, [onDone]);

  return (
    <div
      ref={rootRef}
      data-testid={PRELOADER.root}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#05070a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(24px, 5vw, 64px)',
      }}
    >
      <div className="flex items-end justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#78837c] mb-4 flex items-center gap-2">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e0231c', display: 'inline-block' }} />
            Initializing Sanctuary · <span className="text-[#e0231c]">Loading Systems</span>
          </div>
          <div
            ref={numberRef}
            data-testid={PRELOADER.progress}
            className="font-display font-light text-white"
            style={{ fontSize: 'clamp(80px, 20vw, 280px)', lineHeight: 0.85, letterSpacing: '-0.06em' }}
          >
            {String(count).padStart(3, '0')}
          </div>
        </div>
        <div className="hidden md:block text-right">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#dfe7e0]">Anaita Pal</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#78837c] mt-1">Portfolio · 2024</div>
        </div>
      </div>
      <div className="mt-8 w-full h-[2px] bg-[rgba(223,231,224,0.1)] overflow-hidden">
        <div
          ref={barRef}
          style={{
            width: `${count}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #ff5a3c, #e0231c)',
            boxShadow: '0 0 12px rgba(224,35,28,0.8)',
            transition: 'width 60ms linear',
          }}
        />
      </div>
    </div>
  );
}
