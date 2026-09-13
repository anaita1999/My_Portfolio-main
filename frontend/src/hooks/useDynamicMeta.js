import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Dynamically updates document.title and favicon based on current route
 */
export function useDynamicMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Set Favicon dynamically to Arisetek mark
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.type = 'image/svg+xml';
    link.href = '/arisetek-mark-dark.svg';

    // 2. Set Contextual Page Title
    if (pathname.startsWith('/admin')) {
      document.title = 'Admin Portal — Anaita Pal Portfolio';
    } else if (pathname.startsWith('/work/')) {
      document.title = 'Case Study & Architecture — Anaita Pal';
    } else {
      document.title = 'Anaita Pal — Agentic AI Developer, Designer & Founder';
    }
  }, [pathname]);
}

export default useDynamicMeta;
