import Section from '../components/Section';
import Reveal from '../components/Reveal';
import WaveText from '../components/WaveText';
import FragmentCard, { Fragment } from '../components/FragmentCard';

type Entry = {
  role: string;
  org: string;
  period: string;
  highlight: string;
  summary: string;
  current?: boolean;
};

const entries: Entry[] = [
  {
    role: 'Product Solutions Engineer',
    org: 'VST ECS Phils. Inc.',
    period: 'Jul 2025 — Present',
    highlight: '40+ enablement sessions · 25+ partners · 50+ customers',
    summary:
      'Lead discovery and technical scoping, position SAS Viya, Visual Analytics, Customer 360 and AML/Fraud Analytics, and build AWS & VAST Data BOMs — while also shipping the frontend of a public-sector cloud app.',
    current: true,
  },
  {
    role: 'IT Support & Software QA Intern',
    org: 'TTEC India Customer Solutions',
    period: 'Mar 2025 — May 2025',
    highlight: '50–150 workstations deployed · 6–7 client accounts',
    summary:
      'Deployed and configured workstations, resolved LAN/VLAN/IP issues, and ran software QA on internal tools — UI walkthroughs, test execution, and bug reproduction.',
  },
  {
    role: 'BS in Information Technology',
    org: 'Pamantasan ng Lungsod ng Pasig',
    period: '2021 — 2025',
    highlight: 'Cum Laude',
    summary:
      'Focused on software development and IT solutions, graduating with honors.',
  },
];

export default function Experience() {
  return (
    <Section id="experience" scrim>
      <div className="mb-14 max-w-2xl">
        <Reveal variant="left">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-violet-glow">
            The journey
          </p>
        </Reveal>
        <WaveText
          as="h2"
          text="Short track record. {{Real impact}}."
          className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {entries.map((e, i) => (
          <FragmentCard key={e.role} delay={i * 0.1} className="flex flex-col p-7">
            <Fragment>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-white/40">
                  {e.period}
                </span>
                {e.current && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Now
                  </span>
                )}
              </div>
            </Fragment>
            <Fragment>
              <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-white">
                {e.role}
              </h3>
            </Fragment>
            <Fragment>
              <p className="mt-1 text-sm font-medium text-violet-glow/70">
                {e.org}
              </p>
            </Fragment>
            <Fragment>
              <p className="mt-4 text-sm font-semibold text-gradient">
                {e.highlight}
              </p>
            </Fragment>
            <Fragment>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {e.summary}
              </p>
            </Fragment>
          </FragmentCard>
        ))}
      </div>
    </Section>
  );
}
