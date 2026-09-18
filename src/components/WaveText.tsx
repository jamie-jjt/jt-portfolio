import { motion, type Variants } from 'framer-motion';

/**
 * Reveals text word-by-word with a rising "wave", each word masked by its
 * own line box so it slides up from below. Works for headings and body copy.
 *
 * Supports simple inline emphasis: wrap a phrase in {{...}} to give it the
 * gradient treatment, e.g. "Backed by {{verified credentials}}."
 *
 * Re-triggers each time it scrolls back into view (once=false by default).
 */

const container: Variants = {
  hidden: {},
  show: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.1 },
  }),
};

const word: Variants = {
  hidden: { y: '115%' },
  show: {
    y: '0%',
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

type Token = { text: string; gradient: boolean };

function tokenize(input: string): Token[] {
  // Split on {{...}} groups, keep the emphasis flag.
  const parts = input.split(/(\{\{.*?\}\})/g).filter(Boolean);
  const tokens: Token[] = [];
  for (const part of parts) {
    const isGrad = part.startsWith('{{') && part.endsWith('}}');
    const clean = isGrad ? part.slice(2, -2) : part;
    for (const w of clean.split(' ')) {
      if (w.length) tokens.push({ text: w, gradient: isGrad });
    }
  }
  return tokens;
}

export default function WaveText({
  text,
  as: Tag = 'p',
  className = '',
  stagger = 0.055,
  amount = 0.4,
  once = false,
}: {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  stagger?: number;
  amount?: number;
  once?: boolean;
}) {
  const tokens = tokenize(text);
  const MotionTag = motion(Tag as 'p');

  return (
    <MotionTag
      className={className}
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {tokens.map((tok, i) => (
        <span
          key={i}
          className="inline-flex overflow-hidden align-bottom"
          style={{ paddingBottom: '0.12em' }}
        >
          <motion.span
            variants={word}
            className={`inline-block ${tok.gradient ? 'text-gradient' : ''}`}
          >
            {tok.text}
          </motion.span>
          {i < tokens.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </MotionTag>
  );
}
