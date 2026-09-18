import { useEffect, useRef, type ReactNode } from 'react';
import { ReactLenis, type LenisRef } from 'lenis/react';
import 'lenis/dist/lenis.css';

/**
 * Wraps the app in a Lenis-powered smooth scroll context using the official
 * ReactLenis component (handles the RAF loop and the required html classes).
 * Also routes in-page anchor clicks through Lenis so jumps animate smoothly
 * instead of snapping.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement)?.closest(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = document.querySelector(hash);
      if (!target) return;

      const lenis = lenisRef.current?.lenis;
      if (!lenis) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, {
        offset: -72, // clear the fixed nav bar
        duration: 1.6,
        easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out cubic, gentle landing
      });
    }

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
