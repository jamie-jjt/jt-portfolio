import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const duration = reduceMotion ? 250 : 1450;
    const started = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const next = Math.min(100, Math.round(((now - started) / duration) * 100));
      setProgress(next);
      if (next < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setVisible(false), reduceMotion ? 40 : 220);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          className="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: reduceMotion ? 0.1 : 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="preloader-grid" aria-hidden="true" />
          <div className="preloader-top">
            <span>Jamie Teus</span>
            <span>Portfolio / 2026</span>
          </div>
          <div className="preloader-center">
            <motion.div
              className="loader-mark"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              JT<span>/</span>
            </motion.div>
            <p>Preparing the experience</p>
          </div>
          <div className="preloader-bottom">
            <div className="loader-track"><motion.i animate={{ scaleX: progress / 100 }} /></div>
            <strong>{String(progress).padStart(3, '0')}</strong>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
