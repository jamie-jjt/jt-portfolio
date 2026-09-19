import Section from '../components/Section';
import Reveal from '../components/Reveal';
import WaveText from '../components/WaveText';

type SkillGroup = {
  category: string;
  items: string[];
};

const groups: SkillGroup[] = [
  {
    category: 'Cloud & Data',
    items: [
      'AWS',
      'Amazon EC2',
      'Amazon S3',
      'AWS Lambda',
      'Amazon RDS',
      'PostgreSQL',
      'VAST Data',
      'AWS Pricing & Cost Estimation',
    ],
  },
  {
    category: 'Analytics & AI',
    items: [
      'SAS Viya',
      'SAS Visual Analytics',
      'SAS Customer 360',
      'SAS AML & Fraud Analytics',
      'Amazon Q',
      'Kiro',
      'AI-DLC',
    ],
  },
  {
    category: 'Development & Tools',
    items: [
      'TypeScript',
      'React.js',
      'TanStack Query',
      'PHP',
      'Laravel',
      'REST APIs',
      'GitHub',
      'Jira',
    ],
  },
];

export default function Skills() {
  return (
    <Section id="skills" scrim>
      <div className="mb-16 max-w-2xl">
        <Reveal variant="left">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-violet-glow">
            Skills &amp; stack
          </p>
        </Reveal>
        <WaveText
          as="h2"
          text="The toolkit behind the {{solutions}}."
          className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
        />
      </div>

      {/* Editorial category rows */}
      <div className="border-t border-white/10">
        {groups.map((group, gi) => (
          <Reveal key={group.category} variant="up" delay={gi * 0.08} amount={0.3}>
            <div className="grid grid-cols-1 gap-6 border-b border-white/10 py-10 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
              {/* Category label */}
              <div className="flex items-baseline gap-4">
                <span className="font-display text-sm font-semibold text-violet-glow/50">
                  0{gi + 1}
                </span>
                <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">
                  {group.category}
                </h3>
              </div>

              {/* Flowing skill pills */}
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-glow/50 hover:bg-violet-core/10 hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
