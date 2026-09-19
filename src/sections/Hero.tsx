import { motion, type Variants } from 'framer-motion';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Word-mask reveal for the name — animates on MOUNT (hero is at top on load,
// so whileInView never fires here).
const nameContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
};
const nameWord: Variants = {
  hidden: { y: '115%' },
  show: {
    y: '0%',
    transition: { type: 'spring', damping: 16, stiffness: 130, mass: 0.9 },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Local center scrim so the copy stays readable over the global space bg */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_42%_34%_at_50%_46%,rgba(8,6,15,0.55),rgba(8,6,15,0.2)_55%,transparent_78%)]" />

      {/* Decorative orbital rings behind the name, gently breathing */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="h-[520px] w-[520px] rounded-full border border-white/[0.06] md:h-[680px] md:w-[680px]"
        />
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.6,
          }}
          className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-glow/10 md:h-[480px] md:w-[480px]"
        />
      </div>

      {/* Local readability scrim behind the hero copy (stronger on mobile
          where the galaxy crowds the text). */}
      <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_70%_50%_at_50%_52%,rgba(8,6,15,0.78),rgba(8,6,15,0.35)_60%,transparent_85%)] sm:bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(8,6,15,0.55),transparent_78%)]" />

      {/* Hero copy */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="mb-5 text-[11px] uppercase tracking-[0.3em] text-violet-glow sm:mb-6 sm:text-sm sm:tracking-[0.4em]"
          >
            Solutions Engineer · Presales · Developer
          </motion.p>

          {/* Name — mount-triggered word reveal */}
          <motion.h1
            variants={nameContainer}
            initial="hidden"
            animate="show"
            className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-white [text-shadow:0_2px_30px_rgba(8,6,15,0.9)] xs:text-6xl sm:text-7xl md:text-8xl"
          >
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span variants={nameWord} className="inline-block">
                Jeremie
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span variants={nameWord} className="inline-block">
                <span className="text-gradient">&ldquo;Jamie&rdquo;</span> Teus
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/70 sm:mt-8 sm:max-w-xl sm:text-base md:text-lg"
          >
            I turn business objectives into cloud, data, and AI solutions — and
            I build them too. From discovery and scoping to the demo that closes
            the room, and the React/TypeScript app behind it.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
          >
            <a
              href="#work"
              className="group relative overflow-hidden rounded-full bg-nebula-gradient px-8 py-3.5 text-center text-sm font-semibold text-white shadow-glow transition-transform duration-300 hover:scale-[1.03]"
            >
              View selected work
            </a>
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1.5px]"
            >
              {/* rotating conic-gradient outline */}
              <span className="absolute inset-[-100%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,rgba(168,85,247,0.9)_60deg,rgba(99,102,241,0.6)_120deg,transparent_180deg)]" />
              {/* inner button surface */}
              <span className="relative w-full rounded-full bg-void px-8 py-3.5 text-center text-sm font-semibold text-white/80 backdrop-blur-sm transition-colors duration-300 group-hover:text-white">
                Get in touch
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1.5 rounded-full bg-violet-glow"
          />
        </div>
      </motion.div>
    </section>
  );
}
