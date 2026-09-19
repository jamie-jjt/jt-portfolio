import { lazy, Suspense, useEffect, useRef } from 'react';

// Code-split the Three.js scene into its own chunk.
const GalaxyScene = lazy(() => import('./GalaxyScene'));

/**
 * A fixed, full-page space background. Tracks whole-page scroll progress
 * (0 at the top of the document, 1 at the bottom) and feeds it to the 3D
 * scene so scrolling the page feels like travelling through space.
 */
export default function SpaceBackground() {
  const scrollProgress = useRef(0);
  // Normalized pointer position (-1..1 on each axis), 0,0 at screen center.
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      scrollProgress.current = max > 0 ? window.scrollY / max : 0;
    }
    function onPointerMove(e: PointerEvent) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      {/* Base gradient so the scene has depth even before/behind the stars */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,#160f2b_0%,#0a0714_45%,#08060f_100%)]" />

      <Suspense fallback={null}>
        <GalaxyScene scrollRef={scrollProgress} pointerRef={pointer} />
      </Suspense>

      {/* Light, even legibility wash — keeps text readable while the galaxy
          stays clearly visible behind every section (no heavy curtain). */}
      <div className="pointer-events-none absolute inset-0 bg-void/25" />
      {/* Gentle top/bottom fade for depth as you travel */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void/45" />
    </div>
  );
}
