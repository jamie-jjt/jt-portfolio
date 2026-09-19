import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
} from 'framer-motion';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import WaveText from '../components/WaveText';
import {
  SpinWheelPreview,
  GravitonPreview,
  DashboardPreview,
  StorePreview,
  GamePreview,
  BusinessPreview,
} from '../components/CapabilityPreviews';

type Capability = {
  kind: 'project' | 'concept';
  label: string;
  eyebrow: string;
  description: string;
  tags: string[];
  preview: (active: boolean) => React.ReactNode;
  link?: string;
};

const capabilities: Capability[] = [
  {
    kind: 'project',
    label: 'Graviton Converter',
    eyebrow: 'Built · Real project',
    description:
      'A full-stack tool that migrates x86/x64 projects to AWS Graviton (ARM64) — scans code, auto-resolves compatibility, rewrites assembly, and validates builds via Docker.',
    tags: ['React', 'TypeScript', 'Node', 'Docker', 'AWS'],
    preview: (a) => <GravitonPreview active={a} />,
    link: 'https://github.com/jamie-jjt/graviton-converter',
  },
  {
    kind: 'project',
    label: 'Spin the Wheel',
    eyebrow: 'Built · Real project',
    description:
      'A customizable prize wheel with a weighted-selection engine, segment editor, confetti, and sound — made for event giveaways and raffles.',
    tags: ['JavaScript', 'Weighted engine', 'Canvas'],
    preview: (a) => <SpinWheelPreview active={a} />,
    link: 'https://github.com/jamie-jjt/spinning-wheel',
  },
  {
    kind: 'concept',
    label: 'Dashboards',
    eyebrow: 'Capability',
    description:
      'Analytics dashboards with charts, KPIs, and real-time data — turning numbers into interfaces people can act on.',
    tags: ['React', 'Charts', 'Real-time'],
    preview: () => <DashboardPreview />,
  },
  {
    kind: 'concept',
    label: 'E-commerce',
    eyebrow: 'Capability',
    description:
      'Storefronts, catalogs, carts, and checkout — clean, fast shopping experiences from browse to buy.',
    tags: ['Storefront', 'Checkout', 'Payments'],
    preview: () => <StorePreview />,
  },
  {
    kind: 'concept',
    label: 'Games',
    eyebrow: 'Capability',
    description:
      'Browser games and interactive experiences — animation, game loops, scoring, and the fun that keeps people engaged.',
    tags: ['Game loop', 'Animation', 'Canvas'],
    preview: (a) => <GamePreview active={a} />,
  },
  {
    kind: 'concept',
    label: 'Business Apps',
    eyebrow: 'Capability',
    description:
      'Internal tools and workflow apps — approval queues, role-based access, and the operational glue businesses run on.',
    tags: ['Workflows', 'RBAC', 'Admin'],
    preview: () => <BusinessPreview />,
  },
];

const AUTO_MS = 7000;

// Staggered entrance for the left copy — plays each time the slide changes.
const copyContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: [0.5, 0, 0.75, 0] as const },
  },
};

const copyItem = {
  hidden: { opacity: 0, x: -24, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Capabilities() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const count = capabilities.length;
  const c = capabilities[index];

  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });

  // Live drag offset (px) — the front card follows this 1:1 while dragging;
  // the peeking cards behind follow a dampened fraction for a parallax feel.
  const dragX = useMotionValue(0);
  const peekX = useTransform(dragX, (v) => v * 0.28);
  // Front card dims a touch as it's dragged away; the next peek card brightens
  // as it's pulled in (based on how far you've dragged, either direction).
  const frontOpacity = useTransform(dragX, [-180, 0, 180], [0.7, 1, 0.7]);
  const peekOpacity = useTransform(dragX, [-180, 0, 180], [0.85, 0.33, 0.85]);

  const paginate = (step: number) =>
    setState(([i]) => [((i + step) % count + count) % count, step]);
  const goTo = (i: number) => setState(([cur]) => [i, i >= cur ? 1 : -1]);

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    setDragging(false);
    if (info.offset.x < -60 || info.velocity.x < -400) paginate(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) paginate(-1);
    // Snap the live offset back to 0; the index change repositions the deck.
    animate(dragX, 0, { type: 'spring', stiffness: 400, damping: 40 });
  };

  useEffect(() => {
    if (paused || dragging || !inView) return;
    const id = setInterval(() => paginate(1), AUTO_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, dragging, inView, count]);

  return (
    <Section id="capabilities" scrim>
      <div className="mb-10 max-w-2xl">
        <Reveal variant="left">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-violet-glow">
            Projects &amp; capabilities
          </p>
        </Reveal>
        <WaveText
          as="h2"
          text="Side projects and what I can {{build}}."
          className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
        />
      </div>

      <div
        ref={ref}
        className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* LEFT — fixed intro copy + category list (like the reference) */}
        <div className="relative z-10">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              variants={copyContainer}
              initial="hidden"
              animate="show"
              exit="exit"
              custom={dir}
            >
              <motion.span
                variants={copyItem}
                className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium ${
                  c.kind === 'project'
                    ? 'border-emerald-400/30 text-emerald-300'
                    : 'border-violet-glow/30 text-violet-glow/80'
                }`}
              >
                {c.kind === 'project' && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                )}
                {c.eyebrow}
              </motion.span>
              <motion.h3
                variants={copyItem}
                className="mt-4 font-display text-3xl font-bold leading-[1.05] text-white sm:text-4xl"
              >
                {c.label}
              </motion.h3>
              <motion.p
                variants={copyItem}
                className="mt-4 max-w-sm text-sm leading-relaxed text-white/55"
              >
                {c.description}
              </motion.p>
              <motion.div variants={copyItem} className="mt-4 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-white/50"
                  >
                    {t}
                  </span>
                ))}
              </motion.div>
              {c.link && (
                <motion.a
                  variants={copyItem}
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-glow transition-colors hover:text-white"
                >
                  View project
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H8M17 7v9" />
                  </svg>
                </motion.a>
              )}
            </motion.div>
          </AnimatePresence>

          {/* category list, like "WEB & MOBILE / UX&UI / BRANDING" */}
          <div className="mt-8 flex flex-wrap gap-x-2 gap-y-1 text-[11px] uppercase tracking-wider text-white/30">
            {capabilities.map((cap, i) => (
              <button
                key={cap.label}
                onClick={() => goTo(i)}
                className={`transition-colors ${
                  i === index ? 'text-violet-glow' : 'hover:text-white/60'
                }`}
              >
                {cap.label}
                {i < count - 1 && <span className="ml-2 text-white/15">/</span>}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT — overlapping laptop mockups that bleed off the edge */}
        <div className="relative h-[320px] touch-pan-y sm:h-[360px] md:h-[380px]">
          {/* the stage bleeds beyond the right edge on larger screens only */}
          <div className="absolute inset-y-0 left-0 right-0 overflow-hidden sm:right-[-8%] sm:overflow-visible">
            {capabilities.map((cap, i) => {
              let offset = (i - index + count) % count;
              if (offset > count / 2) offset -= count;
              const visible = offset >= 0 && offset <= 2;
              if (!visible) return null;
              return (
                <motion.div
                  key={i}
                  className="absolute top-1/2"
                  // Front card follows the finger 1:1; peek cards follow a
                  // dampened amount. While dragging, opacity is live so the
                  // incoming slide fades in and the front dims.
                  style={{
                    zIndex: count - offset,
                    x: offset === 0 ? dragX : peekX,
                    y: '-50%',
                    opacity: dragging
                      ? offset === 0
                        ? frontOpacity
                        : offset === 1
                          ? peekOpacity
                          : 0.45 - offset * 0.12
                      : undefined,
                  }}
                  initial={false}
                  animate={{
                    // front card centered-ish; next ones step to the right + down, dimmed
                    left: `${offset * 26}%`,
                    scale: 1 - offset * 0.08,
                    opacity: offset === 0 ? 1 : 0.45 - offset * 0.12,
                    rotate: offset === 0 ? -2 : 0,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="w-[78vw] max-w-[440px] sm:w-[440px]">
                    {cap.preview(offset === 0)}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Transparent drag layer — its motion value (x) drives dragX, which
              the cards follow in real time so they track the finger. */}
          <motion.div
            className="absolute inset-0 z-40 cursor-grab active:cursor-grabbing"
            style={{ x: dragX }}
            drag="x"
            dragConstraints={{ left: -300, right: 300 }}
            dragElastic={0.4}
            dragMomentum={false}
            onDragStart={() => setDragging(true)}
            onDragEnd={onDragEnd}
          />
        </div>

        {/* dots — bottom right like the reference */}
        <div className="col-span-full flex justify-center gap-2 md:col-start-2 md:justify-end">
          {capabilities.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-nebula-gradient' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
