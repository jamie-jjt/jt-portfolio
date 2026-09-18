import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Custom circle cursor: a small solid dot that tracks the pointer exactly,
 * plus a larger ring that trails behind with a spring. The ring expands and
 * fills subtly when hovering interactive elements. Disabled on touch devices.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  // Dot follows instantly; ring follows via spring for the trailing feel.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 400, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 400, damping: 30, mass: 0.6 });

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse/trackpad).
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add('has-custom-cursor');

    function move(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHovering(
        !!el?.closest('a, button, [role="button"], input, textarea, .cursor-hover'),
      );
    }
    function onDown() {
      setDown(true);
    }
    function onUp() {
      setDown(false);
    }

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-violet-glow/70"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          opacity: down ? 0.5 : 1,
          backgroundColor: hovering
            ? 'rgba(168,85,247,0.12)'
            : 'rgba(168,85,247,0)',
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        initial={false}
      />

      {/* Instant dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-violet-glow"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: down ? 0.6 : 1, opacity: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
