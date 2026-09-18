import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Animates text in word-by-word (or char-by-char) with a springy bounce.
 * Re-triggers whenever it scrolls back into view.
 *
 * Pass plain text via `text`, or rich content via children (children won't
 * be split — used when you need <span> gradients inside).
 */

const containerVariants: Variants = {
  hidden: {},
  show: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

const pieceVariants: Variants = {
  hidden: { y: '110%', opacity: 0 },
  show: {
    y: '0%',
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 220,
      mass: 0.7,
    },
  },
};

type Split = 'word' | 'char';

export default function BounceText({
  text,
  as: Tag = 'h2',
  className = '',
  split = 'word',
  stagger,
  once = false,
}: {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  split?: Split;
  stagger?: number;
  once?: boolean;
}) {
  const words = text.split(' ');
  const defaultStagger = split === 'char' ? 0.03 : 0.08;
  const MotionTag = motion(Tag as 'h2');

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      custom={stagger ?? defaultStagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-80px', amount: 0.3 }}
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.08em' }}
        >
          {split === 'char' ? (
            word.split('').map((char, ci) => (
              <motion.span
                key={ci}
                variants={pieceVariants}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))
          ) : (
            <motion.span variants={pieceVariants} className="inline-block">
              {word}
            </motion.span>
          )}
          {/* preserve spaces between words */}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </MotionTag>
  );
}

/** Wrapper for arbitrary rich children that should bounce as one piece. */
export function BouncePiece({
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
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        className={`inline-block ${className}`}
        initial={{ y: '110%', opacity: 0 }}
        whileInView={{
          y: '0%',
          opacity: 1,
          transition: {
            type: 'spring',
            damping: 15,
            stiffness: 140,
            mass: 0.9,
            delay,
          },
        }}
        viewport={{ once, amount: 0.4 }}
      >
        {children}
      </motion.span>
    </span>
  );
}
