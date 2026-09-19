import Section from '../components/Section';
import Reveal from '../components/Reveal';
import Aurora from '../components/Aurora';
import WaveText from '../components/WaveText';
import FragmentCard, { Fragment } from '../components/FragmentCard';

type Feature = {
  no: string;
  title: string;
  body: string;
  span?: boolean;
};

const features: Feature[] = [
  {
    no: '01',
    title: 'Core Business Logic',
    body: 'Built key end-to-end workflows connecting user requests, approvals, and downstream processing across the platform.',
    span: true,
  },
  {
    no: '02',
    title: 'Pricing & Computation',
    body: 'Developed pricing and computation logic with multi-currency support and rule-based calculations.',
  },
  {
    no: '03',
    title: 'Data Processing',
    body: 'Built server-side data parsing and preview flows that turn uploaded files into structured, usable data.',
  },
  {
    no: '04',
    title: 'Full-Stack Delivery',
    body: 'Shipped features across the stack — React/TypeScript interfaces backed by a Laravel API — with reusable, accessible UI.',
    span: true,
  },
];

const metrics = [
  { value: 'End-to-end', label: 'Core workflows delivered' },
  { value: 'Full-stack', label: 'Frontend & backend' },
  { value: 'AWS', label: 'Cloud-deployed & live' },
];

const stack = [
  'React',
  'TypeScript',
  'React Router',
  'Tailwind CSS',
  'PHP / Laravel',
  'MongoDB',
  'AWS',
];

export default function Work() {
  return (
    <Section id="work" scrim>
      <div className="mb-12 max-w-2xl">
        <Reveal variant="left">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-violet-glow">
            Selected work
          </p>
        </Reveal>
        <WaveText
          as="h2"
          text="One project, told {{properly}}."
          className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
        />
      </div>

      {/* Hero card of the case study */}
      <Reveal variant="scale" delay={0.05} amount={0.25}>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
          <Aurora />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-void/75 via-void/45 to-void/85" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,transparent_35%,rgba(8,6,15,0.75))]" />

          <div className="relative flex flex-col gap-8 p-6 sm:gap-10 sm:p-10 md:p-14">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start md:gap-8">
              <div className="flex items-center gap-2 self-start rounded-full border border-white/15 bg-void/40 px-4 py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 animate-pulse-glow rounded-full bg-violet-glow" />
                <span className="text-xs tracking-wide text-white/70">
                  Public Sector · 2026
                </span>
              </div>
              <WaveText
                text="An enterprise cloud platform for a public-sector engagement. I contributed across the stack, focusing on the core business-logic workflows that power it."
                className="max-w-md text-sm leading-relaxed text-white/70 md:text-right"
                stagger={0.02}
              />
            </div>

            <div className="pt-4 md:pt-16">
              <h3 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
                Cloud Service
                <br />
                <span className="text-gradient">Fulfillment Platform</span>
              </h3>
              <p className="mt-4 text-sm text-white/60">
                Full-Stack Engineer &amp; Solution Analyst
              </p>
            </div>

            {/* Impact — headline value spotlight + supporting metrics */}
            <div className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
              {/* Featured value */}
              <div className="relative overflow-hidden rounded-2xl border border-violet-glow/30 bg-violet-core/10 p-6 backdrop-blur-md sm:p-8">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-glow/25 blur-3xl" />
                <p className="relative text-[11px] uppercase tracking-[0.25em] text-violet-glow/70">
                  Forecasted first-year revenue
                </p>
                <div className="relative mt-3 flex items-baseline gap-2">
                  <span className="font-display text-6xl font-bold text-gradient sm:text-7xl">
                    $14M
                  </span>
                </div>
                <p className="relative mt-2 text-sm text-white/50">
                  The value this platform is projected to unlock in year one.
                </p>
              </div>

              {/* Supporting metrics */}
              <div className="grid grid-cols-1 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-void/40 backdrop-blur-md sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:grid-cols-1 md:divide-x-0 md:divide-y">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex flex-col justify-center p-5"
                  >
                    <div className="font-display text-2xl font-bold text-white">
                      {m.value}
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-wider text-white/45">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Contribution bento — fragment cards assembling in */}
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {features.map((f, i) => (
          <FragmentCard
            key={f.no}
            delay={(i % 3) * 0.08}
            className={`p-7 ${f.span ? 'md:col-span-2' : ''}`}
          >
            <Fragment>
              <span className="font-display text-sm font-semibold text-violet-glow/50">
                {f.no}
              </span>
            </Fragment>
            <Fragment>
              <h4 className="mt-4 font-display text-xl font-semibold text-white">
                {f.title}
              </h4>
            </Fragment>
            <Fragment>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {f.body}
              </p>
            </Fragment>
          </FragmentCard>
        ))}
      </div>

      {/* Stack row */}
      <Reveal variant="up" delay={0.1} amount={0.5}>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs uppercase tracking-[0.25em] text-white/40">
            Built with
          </span>
          {stack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-void/30 px-3.5 py-1.5 text-xs text-white/60 backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
