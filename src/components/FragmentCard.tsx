import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Signature card: the panel fades/settles into place while its inner
 * "data fragments" (children wrapped in <Fragment>) assemble with a stagger,
 * each sliding in from a small offset. A gradient hairline traces the top
 * edge. Re-triggers on scroll back into view.
 *
 * Usage:
 *   <FragmentCard>
 *     <Fragment><h3>Title</h3></Fragment>
 *     <Fragment>...</Fragment>
 *   </FragmentCard>
 */

const shell: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.09,
      delayChildren: 0.12,
    },
  },
};

const fragment: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Fragment({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fragment} className={className}>
      {children}
    </motion.div>
  );
}

export default function FragmentCard({
  children,
  className = '',
  delay = 0,
  amount = 0.35,
  once = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      variants={shell}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ delay }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl ${className}`}
    >
      {/* Tracing gradient hairline along the top edge */}
      <motion.span
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          show: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        style={{ transformOrigin: 'left' }}
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-glow to-transparent"
      />

      {/* Hover glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-core/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">{children}</div>
    </motion.div>
  );
}
