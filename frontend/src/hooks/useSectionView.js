import { useEffect, useRef } from 'react';
import { track } from '@/lib/analytics';

// Hook: fires an analytics "section_view" event the first time the given
// element scrolls into view. `name` identifies the section.
export default function useSectionView(name, options = {}) {
  const ref = useRef(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || fired.current) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !fired.current) {
            fired.current = true;
            track('section_view', { section: name });
            io.disconnect();
          }
        });
      },
      { threshold: options.threshold ?? 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [name, options.threshold]);

  return ref;
}
