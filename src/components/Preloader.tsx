import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * A themed loading screen with a counting percentage (0 → 100), on the galaxy
 * theme. Counts up smoothly, snaps to 100 once the window has fully loaded,
 * then fades out. Also has a max-duration fallback so it never hangs.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const loadedRef = useRef(false);
  const startRef = useRef(performance.now());

  useEffect(() => {
    const MIN_MS = 1100; // don't flash too fast
    const MAX_MS = 6000; // never hang longer than this

    const onLoad = () => {
      loadedRef.current = true;
    };
    if (document.readyState === 'complete') loadedRef.current = true;
    else window.addEventListener('load', onLoad);

    let raf: number;
    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      setProgress((prev) => {
        // Ease toward a ceiling: 90% until loaded, 100% once ready.
        const ready = loadedRef.current && elapsed >= MIN_MS;
        const ceiling = ready || elapsed >= MAX_MS ? 100 : 90;
        const step = ceiling === 100 ? 4 : 1.4;
        const next = Math.min(ceiling, prev + Math.max(0.5, (ceiling - prev) * 0.08) + step * 0.15);
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100 && !done) {
      const t = setTimeout(() => setDone(true), 450);
      return () => clearTimeout(t);
    }
  }, [progress, done]);

  // Lock scroll while loading.
  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [done]);

  const pct = Math.round(progress);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ambient violet glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.18),transparent_60%)]" />

          {/* orbiting mark */}
          <div className="relative mb-10 h-24 w-24">
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
            >
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-violet-glow shadow-[0_0_12px_4px_rgba(168,85,247,0.7)]" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center font-display text-lg font-bold text-white">
              JT<span className="text-violet-glow">.</span>
            </div>
          </div>

          {/* Counting percentage */}
          <div className="relative font-display text-8xl font-bold leading-none tracking-tight text-white sm:text-9xl">
            {pct}
            <span className="text-gradient">%</span>
          </div>

          {/* progress bar */}
          <div className="relative mt-8 h-px w-72 overflow-hidden bg-white/10 sm:w-80">
            <motion.div
              className="h-full bg-nebula-gradient"
              style={{ width: `${pct}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
