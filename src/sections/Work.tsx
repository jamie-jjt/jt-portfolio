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
    title: 'Frontend Engineering',
    body: 'Built major portions of the user-facing frontend in React + TypeScript — dashboards, project workflows, service catalog, and administration modules.',
    span: true,
  },
  {
    no: '02',
    title: 'Pricing & Quotation',
    body: 'Role-based access control and quotation flows — AWS Pricing Calculator, discounts, FX conversion, VAT, and submission.',
  },
  {
    no: '03',
    title: 'API Integration',
    body: 'TanStack Query on the frontend; contributed PHP/Laravel and PostgreSQL / Amazon RDS on the backend.',
  },
  {
    no: '04',
    title: 'Business Requirements',
    body: 'Authored the BRD across 15 business processes, project lifecycle states, and role/permission requirements.',
    span: true,
  },
];

const metrics = [
  { value: '$14M', label: 'Forecasted first-year revenue' },
  { value: '15', label: 'Business processes mapped' },
  { value: 'Full-stack', label: 'Frontend, backend & BRD' },
];

const stack = [
  'React',
  'TypeScript',
  'TanStack Query',
  'PHP / Laravel',
  'PostgreSQL',
  'Amazon RDS',
  'AWS',
];

export default function Work() {
  return (
    <Section id="work">
      <div className="mb-12 max-w-2xl">
        <Reveal variant="left">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-violet-glow/70">
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
                text="A cloud fulfillment platform for public-sector procurement — service catalog and quotation through project lifecycle and administration. I worked across the stack and the requirements."
                className="max-w-md text-sm leading-relaxed text-white/70 md:text-right"
                stagger={0.02}
              />
            </div>

            <div className="pt-4 md:pt-16">
              <h3 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
                Public-Sector Cloud
                <br />
                <span className="text-gradient">Fulfillment Platform</span>
              </h3>
              <p className="mt-4 text-sm text-white/60">
                Frontend Engineer, Full-Stack Contributor &amp; Solution Analyst
              </p>
            </div>

            {/* Metric strip — data fragments */}
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] sm:grid-cols-3">
              {metrics.map((m) => (
                <div key={m.label} className="bg-void/50 p-5 backdrop-blur-md sm:p-6">
                  <div className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                    {m.value}
                  </div>
                  <p className="mt-1.5 text-xs uppercase tracking-wider text-white/50">
                    {m.label}
                  </p>
                </div>
              ))}
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
