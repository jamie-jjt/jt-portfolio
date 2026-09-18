import Section from '../components/Section';
import Reveal from '../components/Reveal';
import WaveText from '../components/WaveText';

const stats = [
  { value: '40+', label: 'Enablement sessions delivered' },
  { value: '25+', label: 'Partners supported' },
  { value: '50+', label: 'Customers engaged' },
  { value: 'AWS', label: 'Certified Cloud Practitioner' },
];

export default function About() {
  return (
    <Section id="about">
      {/* Top divider glow */}
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-violet-glow/30 to-transparent" />

      <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        {/* Left: label + heading */}
        <div>
          <Reveal variant="left">
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-violet-glow/70">
              About
            </p>
          </Reveal>
          <WaveText
            as="h2"
            text="I sit between the {{business problem}} and the {{technical solution}}."
            className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
          />
        </div>

        {/* Right: narrative — word-by-word wave */}
        <div className="flex flex-col justify-center">
          <WaveText
            text="I'm a Solutions Engineer in technical presales and solution consulting across the IT distribution space. I listen closely during discovery, decompose what a customer actually needs, and map it to the right cloud, data, and AI solutions."
            className="text-lg leading-relaxed text-white/70"
            stagger={0.028}
          />
          <WaveText
            text="I translate business objectives into solution approaches, then present them to technical teams and executives — through scoping, demos, and enablement. I'm also hands-on: I built a public-sector cloud application end to end with React, TypeScript, Laravel, and AWS."
            className="mt-6 text-lg leading-relaxed text-white/70"
            stagger={0.026}
          />

          {/* Stats — editorial divided row, not boxes */}
          <div className="mt-14 grid grid-cols-2 gap-y-8 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} variant="up" delay={0.08 + i * 0.1}>
                <div
                  className={`px-1 ${
                    i > 0 ? 'sm:border-l sm:border-white/10 sm:pl-6' : ''
                  }`}
                >
                  <div className="font-display text-4xl font-bold text-gradient sm:text-5xl">
                    {s.value}
                  </div>
                  <div className="mt-2 text-xs leading-snug text-white/45">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
