import Section from '../components/Section';
import Reveal from '../components/Reveal';

type Link = {
  label: string;
  value: string;
  href: string | null;
  icon: React.ReactNode;
  action: string;
};

const links: Link[] = [
  {
    label: 'Email',
    value: 'teusjeremiejudith@gmail.com',
    href: 'mailto:teusjeremiejudith@gmail.com',
    action: 'Send',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
  },
  {
    label: 'Phone',
    value: '0991 785 9095',
    href: 'tel:+639917859095',
    action: 'Call',
    icon: (
      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.4 2.1L8.1 9.9a16 16 0 006 6l1.5-1.2a2 2 0 012.1-.4c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z" />
    ),
  },
  {
    label: 'LinkedIn',
    value: 'in/jeremie-judith-teus',
    href: 'https://www.linkedin.com/in/jeremie-judith-teus',
    action: 'Open',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 014 0v4" />
      </>
    ),
  },
  {
    label: 'Location',
    value: 'Cainta, Rizal, PH',
    href: null,
    action: 'GMT+8',
    icon: (
      <>
        <path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
];

export default function Contact() {
  return (
    <Section id="contact" className="pb-16">
      <Reveal variant="scale">
        <div className="relative overflow-hidden rounded-3xl glass p-6 text-center sm:p-10 md:p-16">
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.35),transparent_60%)]" />

          <div className="relative">
            {/* Availability status */}
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.06] px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-emerald-200/90">
                Available for new opportunities
              </span>
            </div>

            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
              Let's build the{' '}
              <span className="text-gradient">right solution</span> together.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-white/55">
              Whether it's a discovery call, a technical deep-dive, or just a
              conversation about a problem you're solving — I'd love to hear from
              you.
            </p>

            <div className="mt-9 flex justify-center">
              <a
                href="mailto:teusjeremiejudith@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-nebula-gradient px-9 py-4 text-sm font-semibold text-white shadow-glow-lg transition-transform duration-300 hover:scale-[1.03]"
              >
                Start a conversation
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>

            {/* Contact detail cards */}
            <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {links.map((l) => {
                const inner = (
                  <div className="group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-violet-glow/40 hover:bg-white/[0.05]">
                    {/* tracing top hairline on hover */}
                    <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-violet-glow to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                    {/* corner glow on hover */}
                    <span className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-violet-core/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-void/50 text-violet-glow transition-all duration-300 group-hover:border-violet-glow/40 group-hover:shadow-glow">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-5 w-5"
                          stroke="currentColor"
                          strokeWidth={1.7}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {l.icon}
                        </svg>
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-white/30 transition-colors duration-300 group-hover:text-violet-glow/70">
                        {l.action}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-wider text-white/40">
                        {l.label}
                      </p>
                      <p className="mt-1 truncate text-sm font-medium text-white/85">
                        {l.value}
                      </p>
                    </div>
                  </div>
                );
                return l.href ? (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      l.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={l.label}>{inner}</div>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
