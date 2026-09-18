import Section from '../components/Section';
import Reveal from '../components/Reveal';
import WaveText from '../components/WaveText';

const certs = [
  { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services' },
  { name: 'VASTronaut Sales Associate', issuer: 'VAST Data' },
  { name: 'SAS SQL Essentials', issuer: 'SAS' },
  { name: 'AI Foundations Knowledge', issuer: 'SAS' },
  { name: 'SAS AI and Machine Learning Skills', issuer: 'SAS' },
];

const training = [
  'AWS Kiro Workshops',
  'AWS AI-DLC',
  'Amazon Q Workshop',
  'AWS Transform Workshop',
];

export default function Certifications() {
  return (
    <Section id="certifications">
      <div className="mb-16 max-w-2xl">
        <Reveal variant="left">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-violet-glow/70">
            Certifications &amp; credentials
          </p>
        </Reveal>
        <WaveText
          as="h2"
          text="Backed by {{verified credentials}}."
          className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
        />
      </div>

      {/* Editorial credential list */}
      <div className="border-t border-white/10">
        {certs.map((c, i) => (
          <Reveal key={c.name} variant="up" delay={(i % 3) * 0.07} amount={0.4}>
            <div className="group flex items-center justify-between gap-6 border-b border-white/10 py-6 transition-colors">
              <div className="flex items-center gap-5">
                <span className="font-display text-sm font-semibold text-violet-glow/40">
                  0{i + 1}
                </span>
                <h3 className="font-display text-lg font-semibold text-white/85 transition-colors duration-300 group-hover:text-white md:text-xl">
                  {c.name}
                </h3>
              </div>
              <span className="shrink-0 text-right text-xs uppercase tracking-wider text-white/40 md:text-sm">
                {c.issuer}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Additional training */}
      <Reveal variant="up" delay={0.1} amount={0.4}>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <p className="shrink-0 text-xs uppercase tracking-[0.25em] text-white/40">
            Also trained in
          </p>
          <div className="flex flex-wrap gap-2.5">
            {training.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-white/55 transition-colors hover:border-violet-glow/40 hover:text-white/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
