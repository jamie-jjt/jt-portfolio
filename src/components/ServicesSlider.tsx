import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  animate,
  useInView,
  type PanInfo,
} from 'framer-motion';

export type ServiceIcon =
  | 'search'
  | 'map'
  | 'present'
  | 'people'
  | 'doc'
  | 'chart';

export type Service = {
  title: string;
  description: string;
  tags: string[];
  icon: ServiceIcon;
};

const ICONS: Record<ServiceIcon, React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  map: (
    <>
      <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  present: (
    <>
      <path d="M3 4h18M4 4v10a2 2 0 002 2h12a2 2 0 002-2V4" />
      <path d="M12 16v4M9 21h6" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0112 0M16 5a3 3 0 010 6M21 20a6 6 0 00-4-5.6" />
    </>
  ),
  doc: (
    <>
      <path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="M8 16l4-5 3 3 4-6" />
    </>
  ),
};

const AUTO_MS = 6500;
const SWIPE_DISTANCE = 0.2; // fraction of card width to commit
const SWIPE_VELOCITY = 400;

function Card({ s, no }: { s: Service; no: number }) {
  return (
    <div className="relative flex h-full flex-col gap-6 p-5 sm:gap-8 sm:flex-row sm:items-stretch sm:p-12">
      {/* Icon plate — top on mobile, right on desktop */}
      <div className="order-1 flex items-center gap-4 sm:order-2 sm:w-52 sm:shrink-0 sm:items-center sm:justify-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-20 w-20 animate-[spin_18s_linear_infinite] rounded-full border border-white/[0.08] sm:h-40 sm:w-40" />
          <div className="absolute h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.3),transparent_70%)] blur-lg sm:h-40 sm:w-40" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-void/60 backdrop-blur-md sm:h-24 sm:w-24">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-8 w-8 text-violet-glow sm:h-11 sm:w-11"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {ICONS[s.icon]}
            </svg>
          </div>
        </div>
        <span className="font-display text-4xl font-bold text-white/10 sm:hidden">
          0{no}
        </span>
      </div>

      {/* Text */}
      <div className="order-2 flex flex-1 flex-col justify-between sm:order-1">
        <div className="hidden items-center gap-4 sm:flex">
          <span className="font-display text-5xl font-bold text-white/10 sm:text-6xl">
            0{no}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        </div>
        <div>
          <h3 className="font-display text-2xl font-bold leading-tight text-white sm:text-4xl">
            {s.title}
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
            {s.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {s.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-violet-glow/25 bg-violet-core/10 px-3 py-1 text-[11px] text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSlider({ services }: { services: Service[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const count = services.length;

  const containerRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef(0);
  // Only auto-advance while the slider is actually on screen, so it always
  // starts from card 1 when the user scrolls to it (not mid-cycle).
  const inView = useInView(containerRef, { amount: 0.4 });
  // Track offset in px. The track holds all cards; we translate by -index*width.
  const x = useMotionValue(0);

  const measure = () => {
    widthRef.current = containerRef.current?.offsetWidth ?? 0;
  };

  useEffect(() => {
    measure();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onResize = () => {
    measure();
    x.set(-index * widthRef.current);
  };

  // Keep the track aligned to the active card whenever index changes.
  const goTo = (i: number, velocity = 0) => {
    const clamped = Math.max(0, Math.min(count - 1, i));
    setIndex(clamped);
    animate(x, -clamped * widthRef.current, {
      type: 'spring',
      stiffness: 320,
      damping: 38,
      velocity,
    });
  };

  useEffect(() => {
    if (paused || dragging || !inView) return;
    const id = setInterval(() => goTo((index + 1) % count), AUTO_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, dragging, inView, index, count]);

  const onDragStart = () => setDragging(true);

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    setDragging(false);
    const w = widthRef.current || 1;
    const movedFraction = -info.offset.x / w;
    const v = info.velocity.x;

    let target = index;
    if (movedFraction > SWIPE_DISTANCE || v < -SWIPE_VELOCITY) target = index + 1;
    else if (movedFraction < -SWIPE_DISTANCE || v > SWIPE_VELOCITY)
      target = index - 1;

    goTo(target, v);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={containerRef}
        className="relative min-h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-void/70 backdrop-blur-xl"
      >
        {/* themed ambient glows + grid texture (static frame) */}
        <div className="pointer-events-none absolute -right-24 -top-24 z-10 h-72 w-72 rounded-full bg-violet-core/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 z-10 h-80 w-80 rounded-full bg-nebula-blue/15 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />

        {/* Progress bar */}
        <div className="absolute inset-x-0 top-0 z-20 h-0.5 bg-white/5">
          <motion.div
            key={index + (paused || dragging || !inView ? '-hold' : '')}
            className="h-full bg-nebula-gradient"
            initial={{ width: '0%' }}
            animate={{ width: paused || dragging || !inView ? '0%' : '100%' }}
            transition={{
              duration: paused || dragging || !inView ? 0 : AUTO_MS / 1000,
              ease: 'linear',
            }}
          />
        </div>

        {/* Draggable track: all cards in a row, moves as one so the next card
            is revealed while dragging. */}
        <motion.div
          className="flex h-full min-h-[360px] cursor-grab touch-pan-y active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{
            left: -(count - 1) * (widthRef.current || 0),
            right: 0,
          }}
          dragElastic={0.12}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          {services.map((s, i) => (
            <div key={i} className="h-full w-full shrink-0">
              <Card s={s} no={i + 1} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots + counter */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {services.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-8 bg-nebula-gradient'
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
        <span className="font-display text-sm text-white/40">
          0{index + 1} <span className="text-white/20">/ 0{count}</span>
        </span>
      </div>
    </div>
  );
}
