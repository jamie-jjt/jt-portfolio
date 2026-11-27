import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react';
import Lenis from 'lenis';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const lenis = new Lenis({ autoRaf: true, duration: 1.05, smoothWheel: true });
    return () => lenis.destroy();
  }, [reduceMotion]);

  return children;
}

function ScrollWord({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.14, 1]);
  const y = useTransform(progress, [start, end], ['0.38em', '0em']);
  return (
    <motion.span className="scroll-word" style={{ opacity, y }}>
      {word}&nbsp;
    </motion.span>
  );
}

export function ScrollWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.88', 'end 0.35'],
  });
  const words = text.split(' ');

  return (
    <p ref={ref} className={`scroll-words ${className}`}>
      {words.map((word, index) => {
        const start = index / Math.max(words.length, 1);
        return (
          <ScrollWord
            key={`${word}-${index}`}
            word={word}
            progress={scrollYProgress}
            start={start}
            end={Math.min(start + 0.12, 1)}
          />
        );
      })}
    </p>
  );
}

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function MagneticLink({
  children,
  href,
  className = '',
  target,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  target?: string;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 19, mass: 0.5 });
  const y = useSpring(my, { stiffness: 260, damping: 19, mass: 0.5 });
  const reduceMotion = useReducedMotion();

  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left - rect.width / 2) * 0.18);
    my.set((event.clientY - rect.top - rect.height / 2) * 0.18);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.a
      href={href}
      target={target}
      rel={target ? 'noopener noreferrer' : undefined}
      className={className}
      style={{ x, y }}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
    </motion.a>
  );
}

const threadPath =
  'M 1220 0 C 1250 500 920 620 930 1100 C 940 1550 230 1450 260 2100 C 285 2600 1130 2490 1090 3180 C 1060 3700 420 3640 450 4300 C 475 4860 1210 4770 1160 5480 C 1120 6070 230 5960 275 6700 C 310 7240 1120 7140 1080 7850 C 1040 8450 400 8430 430 9100 C 450 9500 1030 9570 1180 10000';

export function BlueThread() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 85, damping: 24, mass: 0.45 });
  const travelerX = useTransform(
    smooth,
    [0, 0.12, 0.27, 0.43, 0.58, 0.74, 0.9, 1],
    ['84vw', '64vw', '16vw', '72vw', '32vw', '78vw', '24vw', '82vw'],
  );
  const travelerScale = useTransform(smooth, [0, 0.08, 0.94, 1], [0.4, 1, 1, 1.8]);

  return (
    <>
      <svg
        className="thread-canvas"
        viewBox="0 0 1440 10000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="thread-ghost" d={threadPath} />
        <motion.path className="thread-live" d={threadPath} style={{ pathLength: smooth }} />
      </svg>
      <motion.div
        className="thread-traveler"
        aria-hidden="true"
        style={{ left: travelerX, scale: travelerScale }}
      >
        <span />
      </motion.div>
    </>
  );
}
