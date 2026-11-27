export const services = [
  {
    title: 'Customer Discovery & Scoping',
    description:
      'Understanding business objectives, pain points, and environments, then translating them into clear technical requirements.',
    tags: ['Discovery', 'Technical Scoping', 'Requirements'],
  },
  {
    title: 'Solution Consulting & Mapping',
    description:
      'Mapping needs to the right cloud, data, and AI solutions — decomposing complex processes into workable architectures.',
    tags: ['Solution Mapping', 'Cloud & Data', 'AI / Analytics'],
  },
  {
    title: 'Technical Presentations & Demos',
    description:
      'Technical and executive-level presentations and demonstrations that support opportunities, proposals, and onboarding.',
    tags: ['Demos', 'Executive Briefings', 'POCs'],
  },
  {
    title: 'Partner & Sales Enablement',
    description:
      'Enablement sessions across technical, sales, and industry topics — getting partners and customers confident and moving.',
    tags: ['Enablement', 'Onboarding', 'Positioning'],
  },
  {
    title: 'Proposal & BOM Support',
    description:
      'AWS and VAST Data BOMs, pricing, and cost estimations for proposals and public-sector opportunities.',
    tags: ['BOM Development', 'Pricing', 'Proposals'],
  },
  {
    title: 'Business & GTM Planning',
    description:
      'Annual business and go-to-market planning — partner strategy, enablement initiatives, and supporting KPIs.',
    tags: ['GTM Strategy', 'Partner Strategy', 'KPIs'],
  },
] as const;

export const workFeatures = [
  {
    no: '01',
    title: 'Core Business Logic',
    body: 'Built key end-to-end workflows connecting user requests, approvals, and downstream processing across the platform.',
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
  },
] as const;

export const capabilities = [
  {
    kind: 'Real project',
    label: 'Graviton Converter',
    description:
      'A full-stack tool that migrates x86/x64 projects to AWS Graviton (ARM64) — scans code, auto-resolves compatibility, rewrites assembly, and validates builds via Docker.',
    tags: ['React', 'TypeScript', 'Node', 'Docker', 'AWS'],
    link: 'https://github.com/jamie-jjt/graviton-converter',
    mark: 'x86 → ARM64',
  },
  {
    kind: 'Real project',
    label: 'Spin the Wheel',
    description:
      'A customizable prize wheel with a weighted-selection engine, segment editor, confetti, and sound — made for event giveaways and raffles.',
    tags: ['JavaScript', 'Weighted engine', 'Canvas'],
    link: 'https://github.com/jamie-jjt/spinning-wheel',
    mark: '360°',
  },
  {
    kind: 'Live project',
    label: 'DevPath',
    description:
      'An interactive learning platform that takes IT/CS students from zero to DevOps-ready — 12 tracks, 100+ lessons, and in-browser code runners for JavaScript, Python, SQL, and HTML.',
    tags: ['Next.js', 'TypeScript', 'Monaco', 'Pyodide (WASM)'],
    link: 'https://jamie-jjt.github.io/dev-path/',
    mark: '12 / 100+',
  },
  {
    kind: 'Capability',
    label: 'Dashboards',
    description:
      'Analytics dashboards with charts, KPIs, and real-time data — turning numbers into interfaces people can act on.',
    tags: ['React', 'Charts', 'Real-time'],
    mark: '↗ KPI',
  },
  {
    kind: 'Capability',
    label: 'E-commerce',
    description:
      'Storefronts, catalogs, carts, and checkout — clean, fast shopping experiences from browse to buy.',
    tags: ['Storefront', 'Checkout', 'Payments'],
    mark: 'BUY / 01',
  },
  {
    kind: 'Capability',
    label: 'Games',
    description:
      'Browser games and interactive experiences — animation, game loops, scoring, and the fun that keeps people engaged.',
    tags: ['Game loop', 'Animation', 'Canvas'],
    mark: 'PLAY ▶',
  },
  {
    kind: 'Capability',
    label: 'Business Apps',
    description:
      'Internal tools and workflow apps — approval queues, role-based access, and the operational glue businesses run on.',
    tags: ['Workflows', 'RBAC', 'Admin'],
    mark: 'REQ → OK',
  },
] as const;

export const experience = [
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
] as const;

export const skillGroups = [
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
] as const;

export const certifications = [
  { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services' },
  { name: 'VASTronaut Sales Associate', issuer: 'VAST Data' },
  { name: 'SAS SQL Essentials', issuer: 'SAS' },
  { name: 'AI Foundations Knowledge', issuer: 'SAS' },
  { name: 'SAS AI and Machine Learning Skills', issuer: 'SAS' },
] as const;

export const training = [
  'AWS Kiro Workshops',
  'AWS AI-DLC',
  'Amazon Q Workshop',
  'AWS Transform Workshop',
] as const;

export const contactLinks = [
  {
    label: 'Email',
    value: 'teusjeremiejudith@gmail.com',
    href: 'mailto:teusjeremiejudith@gmail.com',
    action: 'Send',
  },
  {
    label: 'Phone',
    value: '0991 785 9095',
    href: 'tel:+639917859095',
    action: 'Call',
  },
  {
    label: 'LinkedIn',
    value: 'in/jeremie-judith-teus',
    href: 'https://www.linkedin.com/in/jeremie-judith-teus',
    action: 'Open',
  },
  {
    label: 'Location',
    value: 'Cainta, Rizal, PH',
    href: null,
    action: 'GMT+8',
  },
] as const;
