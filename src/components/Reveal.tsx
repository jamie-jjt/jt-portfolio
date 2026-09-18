import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const; // smooth, gentle landing

type RevealVariant =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'blur'
  | 'scale'
  | 'fade';

function buildVariants(variant: RevealVariant, distance: number): Variants {
  const hidden: Record<string, number | string> = { opacity: 0 };
  const show: Record<string, number | string> = { opacity: 1, x: 0, y: 0 };

  switch (variant) {
    case 'up':
      hidden.y = distance;
      break;
    case 'down':
      hidden.y = -distance;
      break;
    case 'left':
      hidden.x = -distance;
      break;
    case 'right':
      hidden.x = distance;
      break;
    case 'blur':
      hidden.y = distance * 0.6;
      hidden.filter = 'blur(12px)';
      show.filter = 'blur(0px)';
      break;
    case 'scale':
      hidden.scale = 0.9;
      hidden.y = distance * 0.6;
      show.scale = 1;
      break;
    case 'fade':
    default:
      break;
  }

  return {
    hidden,
    show: {
      ...show,
      transition: { duration: 1.1, ease: EASE },
    },
  };
}

/**
 * Reveals children as they scroll into view.
 * Re-triggers every time the element re-enters the viewport (set `once`
 * to keep it firing only the first time).
 *
 * variant: 'up' | 'down' | 'left' | 'right' | 'blur' | 'scale' | 'fade'
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  variant = 'up',
  distance = 40,
  amount = 0.4,
  once = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  distance?: number;
  amount?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={buildVariants(variant, distance)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
