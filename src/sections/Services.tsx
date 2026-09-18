import Section from '../components/Section';
import Reveal from '../components/Reveal';
import WaveText from '../components/WaveText';
import ServicesSlider, { type Service } from '../components/ServicesSlider';

const services: Service[] = [
  {
    title: 'Customer Discovery & Scoping',
    description:
      'Understanding business objectives, pain points, and environments, then translating them into clear technical requirements.',
    tags: ['Discovery', 'Technical Scoping', 'Requirements'],
    icon: 'search',
  },
  {
    title: 'Solution Consulting & Mapping',
    description:
      'Mapping needs to the right cloud, data, and AI solutions — decomposing complex processes into workable architectures.',
    tags: ['Solution Mapping', 'Cloud & Data', 'AI / Analytics'],
    icon: 'map',
  },
  {
    title: 'Technical Presentations & Demos',
    description:
      'Technical and executive-level presentations and demonstrations that support opportunities, proposals, and onboarding.',
    tags: ['Demos', 'Executive Briefings', 'POCs'],
    icon: 'present',
  },
  {
    title: 'Partner & Sales Enablement',
    description:
      'Enablement sessions across technical, sales, and industry topics — getting partners and customers confident and moving.',
    tags: ['Enablement', 'Onboarding', 'Positioning'],
    icon: 'people',
  },
  {
    title: 'Proposal & BOM Support',
    description:
      'AWS and VAST Data BOMs, pricing, and cost estimations for proposals and public-sector opportunities.',
    tags: ['BOM Development', 'Pricing', 'Proposals'],
    icon: 'doc',
  },
  {
    title: 'Business & GTM Planning',
    description:
      'Annual business and go-to-market planning — partner strategy, enablement initiatives, and supporting KPIs.',
    tags: ['GTM Strategy', 'Partner Strategy', 'KPIs'],
    icon: 'chart',
  },
];

export default function Services() {
  return (
    <Section id="services">
      <div className="mb-12 max-w-2xl">
        <Reveal variant="left">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-violet-glow/70">
            What I do
          </p>
        </Reveal>
        <WaveText
          as="h2"
          text="From first conversation to the {{solution that ships}}."
          className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
        />
      </div>

      <Reveal variant="up" amount={0.2}>
        <ServicesSlider services={services} />
      </Reveal>
    </Section>
  );
}
