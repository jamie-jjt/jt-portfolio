import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * A springy card entrance: the card tilts up from below with a subtle 3D
 * rotateX and overshoots slightly (spring), giving it more character than a
 * flat fade or scale. Re-triggers on scroll back into view.
 */
export default function CardReveal({
  children,
  className = '',
  delay = 0,
  once = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      style={{ perspective: 800 }}
      initial={{ opacity: 0, y: 60, rotateX: -18, transformOrigin: 'bottom' }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
          type: 'spring',
          damping: 18,
          stiffness: 120,
          mass: 1,
          delay,
        },
      }}
      viewport={{ once, amount: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
