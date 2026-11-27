import { useRef, useState } from 'react';
import { MeshGradient } from '@paper-design/shaders-react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import Nav from './components/Nav';
import Preloader from './components/Preloader';
import {
  BlueThread,
  MagneticLink,
  Reveal,
  ScrollWords,
  SmoothScroll,
} from './components/motion';
import {
  capabilities,
  certifications,
  contactLinks,
  experience,
  services,
  skillGroups,
  training,
  workFeatures,
} from './data';

function SectionIntro({
  number,
  label,
  title,
}: {
  number: string;
  label: string;
  title: React.ReactNode;
}) {
  return (
    <div className="section-intro">
      <div className="section-code">
        <span>{number}</span>
        <span>{label}</span>
      </div>
      <Reveal>
        <h2>{title}</h2>
      </Reveal>
    </div>
  );
}

function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const titleX = useTransform(scrollYProgress, [0, 0.52], ['0%', '-12%']);
  const titleScale = useTransform(scrollYProgress, [0, 0.52], [1, 0.78]);
  const titleOpacity = useTransform(scrollYProgress, [0.28, 0.62], [1, 0]);
  const shaderY = useTransform(scrollYProgress, [0, 0.58], ['0%', '18%']);
  const shaderScale = useTransform(scrollYProgress, [0, 0.58], [1, 1.22]);
  const shaderOpacity = useTransform(scrollYProgress, [0.32, 0.68], [1, 0]);
  const apertureWidth = useTransform(scrollYProgress, [0.42, 0.93], ['11vw', '100vw']);
  const apertureHeight = useTransform(scrollYProgress, [0.42, 0.93], ['8vh', '100vh']);
  const apertureRight = useTransform(scrollYProgress, [0.42, 0.93], ['18vw', '0vw']);
  const apertureBottom = useTransform(scrollYProgress, [0.42, 0.93], ['3.5vh', '0vh']);
  const apertureRadius = useTransform(scrollYProgress, [0.42, 0.82], [16, 0]);
  const apertureTitleScale = useTransform(scrollYProgress, [0.48, 0.92], [0.12, 1]);
  const apertureLabelOpacity = useTransform(scrollYProgress, [0.42, 0.72], [1, 0]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
  };
  const slide = {
    hidden: { y: '115%', opacity: 0 },
    show: { y: '0%', opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="hero-stage">
        <motion.div
          className="hero-shader"
          style={{ y: shaderY, scale: shaderScale, opacity: shaderOpacity }}
          initial={{ clipPath: 'polygon(100% 0,100% 0,100% 100%,100% 100%,100% 100%,100% 0)' }}
          animate={ready ? { clipPath: 'polygon(15% 0,100% 0,100% 82%,78% 100%,0 100%,0 22%)' } : undefined}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <MeshGradient
            width="100%"
            height="100%"
            colors={['#F7FBFF', '#DCEEFF', '#0067FF', '#0757D9', '#A9D6FF']}
            distortion={0.82}
            swirl={0.34}
            grainMixer={0.12}
            grainOverlay={0.06}
            speed={reduceMotion ? 0 : 0.22}
            scale={1.15}
            maxPixelCount={1200000}
          />
        </motion.div>
        <div className="hero-grid" aria-hidden="true" />
        <motion.div
          className="hero-meta-row"
          variants={container}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
        >
          <motion.p variants={slide}>Solutions Engineer<br />Presales · Developer</motion.p>
          <motion.p variants={slide}>Cainta, Rizal, PH<br />GMT +08:00</motion.p>
          <motion.p variants={slide} className="hero-status"><i /> Available for conversations</motion.p>
        </motion.div>
        <motion.div
          className="hero-copy"
          style={{ x: titleX, scale: titleScale, opacity: titleOpacity, transformOrigin: 'left center' }}
        >
          <motion.h1
            aria-label="Jeremie Jamie Teus"
            variants={container}
            initial="hidden"
            animate={ready ? 'show' : 'hidden'}
          >
            <span className="hero-line"><motion.span variants={slide} className="hero-token">Jeremie</motion.span></span>
            <span className="hero-line hero-line-offset">
              <motion.span variants={slide} className="hero-token hero-nickname">Jamie</motion.span>
              <motion.span variants={slide} className="hero-token">Teus</motion.span>
            </span>
          </motion.h1>
        </motion.div>
        <motion.p
          className="hero-deck"
          initial={{ opacity: 0, x: 60 }}
          animate={ready ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          I turn business objectives into cloud, data, and AI solutions — and I build them too.
          From discovery and scoping to the demo that closes the room, and the React/TypeScript app behind it.
        </motion.p>
        <motion.div
          className="hero-bottom"
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 1.05 }}
        >
          <MagneticLink href="#work" className="round-link">
            <span>Explore the work</span><b>↓</b>
          </MagneticLink>
          <span>PORTFOLIO / 2026</span>
        </motion.div>
        <motion.div
          className="about-aperture"
          style={{
            width: apertureWidth,
            height: apertureHeight,
            right: apertureRight,
            bottom: apertureBottom,
            borderRadius: apertureRadius,
          }}
          aria-hidden="true"
        >
          <motion.span style={{ opacity: apertureLabelOpacity }}>NEXT / 01</motion.span>
          <motion.strong style={{ scale: apertureTitleScale }}>About</motion.strong>
          <motion.i style={{ opacity: apertureLabelOpacity }}>SCROLL TO OPEN ↘</motion.i>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="chapter about-section">
      <SectionIntro
        number="01"
        label="The person"
        title={<>Between the <em>business problem</em><br />and the technical solution.</>}
      />
      <div className="about-layout">
        <aside className="about-margin">
          <span>How I work</span>
          <div className="vertical-rule" />
          <span>Listen<br />Translate<br />Build</span>
        </aside>
        <div className="about-story">
          <ScrollWords text="I work where business questions become technical decisions. I listen for what a customer actually needs, then map it to practical cloud, data, and AI solutions." />
          <ScrollWords text="I carry that thinking into demos, scoping, enablement, and code — from executive conversations to hands-on delivery with React, TypeScript, Laravel, and AWS." />
        </div>
      </div>
      <div className="stat-ribbon">
        {[
          ['40+', 'Enablement sessions delivered'],
          ['25+', 'Partners supported'],
          ['50+', 'Customers engaged'],
          ['AWS', 'Certified Cloud Practitioner'],
        ].map(([value, label], index) => (
          <Reveal key={label} delay={index * 0.08}>
            <div className="stat-item">
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const [active, setActive] = useState(0);
  const service = services[active];

  return (
    <section id="services" className="chapter services-section">
      <SectionIntro
        number="02"
        label="What I do"
        title={<>From first conversation to the <em>solution that ships.</em></>}
      />
      <div className="service-console">
        <div className="service-list" role="tablist" aria-label="Services">
          {services.map((item, index) => (
            <button
              key={item.title}
              role="tab"
              aria-selected={index === active}
              aria-controls="service-detail"
              onClick={() => setActive(index)}
              onPointerEnter={() => setActive(index)}
            >
              <span>0{index + 1}</span>
              <strong>{item.title}</strong>
              <i>{index === active ? '●' : '○'}</i>
            </button>
          ))}
        </div>
        <div id="service-detail" className="service-detail" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="detail-index">SERVICE / 0{active + 1}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="tag-row">
                {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <div className="service-diagram" aria-hidden="true">
                <span>QUESTION</span><i /><span>MAP</span><i /><span>OUTCOME</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Work() {
  const ref = useRef<HTMLElement>(null);
  const [scene, setScene] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const trackX = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);
  const meter = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setScene(Math.min(3, Math.floor(value * 4)));
  });

  return (
    <section id="work" className="work-section" ref={ref}>
      <div className="work-sticky">
        <div className="work-topline">
          <span>03 / SELECTED WORK</span>
          <span>Cloud Service Fulfillment Platform</span>
          <span>Scene 0{scene + 1} / 04</span>
        </div>
        <div className="work-progress"><motion.i style={{ width: meter }} /></div>
        <motion.div className="work-track" style={{ x: trackX }}>
          <article className="work-panel work-overview">
            <div className="work-blueprint" aria-hidden="true">
              <span className="bp-node bp-a">REQUEST</span>
              <span className="bp-node bp-b">APPROVE</span>
              <span className="bp-node bp-c">FULFILL</span>
              <svg viewBox="0 0 800 500"><path d="M150 250 C300 80 420 420 650 220" /></svg>
            </div>
            <div className="work-copy">
              <span>Public Sector · 2026</span>
              <h2>Cloud Service<br /><em>Fulfillment Platform</em></h2>
              <p>Full-Stack Engineer &amp; Solution Analyst</p>
              <p className="work-summary">
                An enterprise cloud platform for a public-sector engagement. I contributed across the stack,
                focusing on the core business-logic workflows that power it.
              </p>
            </div>
          </article>
          <article className="work-panel work-impact">
            <div className="impact-number">
              <span>Forecasted first-year revenue</span>
              <strong>$14M</strong>
              <p>The value this platform is projected to unlock in year one.</p>
            </div>
            <div className="impact-stack">
              {[
                ['End-to-end', 'Core workflows delivered'],
                ['Full-stack', 'Frontend & backend'],
                ['AWS', 'Cloud-deployed & live'],
              ].map(([value, label]) => (
                <div key={value}><strong>{value}</strong><span>{label}</span></div>
              ))}
            </div>
          </article>
          <article className="work-panel work-features">
            <div className="feature-intro">
              <span>Contribution map</span>
              <h3>What moved<br />through my hands.</h3>
            </div>
            <div className="feature-grid">
              {workFeatures.map((feature) => (
                <div key={feature.no} className="feature-cell">
                  <span>{feature.no}</span><h4>{feature.title}</h4><p>{feature.body}</p>
                </div>
              ))}
            </div>
          </article>
          <article className="work-panel work-stack-panel">
            <span className="stack-label">Built across the stack</span>
            <div className="stack-marquee">
              {['React', 'TypeScript', 'React Router', 'Tailwind CSS', 'PHP / Laravel', 'MongoDB', 'AWS'].map((item, index) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0.2 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.08 }}
                >{item}</motion.span>
              ))}
            </div>
            <div className="work-end">
              <span>One platform</span><i /><span>Seven technologies</span><i /><span>End-to-end delivery</span>
            </div>
          </article>
        </motion.div>
        <div className="work-scroll-hint">VERTICAL SCROLL / HORIZONTAL STORY →</div>
      </div>
    </section>
  );
}

function Capabilities() {
  const [active, setActive] = useState(0);
  const current = capabilities[active];

  return (
    <section id="capabilities" className="chapter capabilities-section">
      <SectionIntro
        number="04"
        label="Projects & capabilities"
        title={<>Side projects and what I can <em>build.</em></>}
      />
      <div className="capability-stage">
        <div className="capability-index" role="tablist" aria-label="Projects and capabilities">
          {capabilities.map((capability, index) => (
            <button
              role="tab"
              aria-selected={active === index}
              key={capability.label}
              onClick={() => setActive(index)}
              onPointerEnter={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{capability.label}</strong>
              <i>↗</i>
            </button>
          ))}
        </div>
        <div className="capability-view" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div
              className="capability-card"
              key={current.label}
              initial={{ opacity: 0, rotateY: -9, x: 40 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={{ opacity: 0, rotateY: 7, x: -30 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="capability-visual" aria-hidden="true">
                <span>{current.mark}</span>
                <div className="visual-grid" />
                <i className="visual-orbit" />
              </div>
              <div className="capability-copy">
                <span>{current.kind}</span>
                <h3>{current.label}</h3>
                <p>{current.description}</p>
                <div className="tag-row">{current.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                {'link' in current && current.link && (
                  <a href={current.link} target="_blank" rel="noopener noreferrer">View project <b>↗</b></a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="chapter experience-section">
      <SectionIntro number="05" label="The journey" title={<>Short track record.<br /><em>Real impact.</em></>} />
      <div className="route-map">
        {experience.map((entry, index) => (
          <Reveal key={entry.role} className="route-stop" delay={index * 0.08}>
            <div className="route-marker">
              <span>{String(index + 1).padStart(2, '0')}</span><i />
            </div>
            <div className="route-time">
              <span>{entry.period}</span>
              {'current' in entry && entry.current && <strong><i />Now</strong>}
            </div>
            <div className="route-role">
              <h3>{entry.role}</h3><p>{entry.org}</p>
            </div>
            <div className="route-detail">
              <strong>{entry.highlight}</strong><p>{entry.summary}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active];

  return (
    <section id="skills" className="chapter skills-section">
      <SectionIntro number="06" label="Skills & stack" title={<>The toolkit behind<br />the <em>solutions.</em></>} />
      <div className="skills-map">
        <div className="skill-switcher">
          {skillGroups.map((item, index) => (
            <button
              key={item.category}
              onClick={() => setActive(index)}
              className={active === index ? 'active' : ''}
            >
              <span>0{index + 1}</span>{item.category}
            </button>
          ))}
        </div>
        <div className="skill-field">
          <AnimatePresence mode="popLayout">
            {group.items.map((item, index) => (
              <motion.span
                layout
                key={item}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: index * 0.035, type: 'spring', stiffness: 230, damping: 20 }}
                className={`skill-node node-${index % 6}`}
              >
                <i />{item}
              </motion.span>
            ))}
          </AnimatePresence>
          <svg className="skill-lines" aria-hidden="true" viewBox="0 0 900 520">
            <path d="M90 100 L430 80 L760 160 L530 270 L800 410 L350 445 L100 330 Z" />
            <path d="M430 80 L350 445 M760 160 L100 330 M90 100 L800 410" />
          </svg>
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="chapter certifications-section">
      <SectionIntro
        number="07"
        label="Credentials"
        title={<>Backed by <em>verified credentials.</em></>}
      />
      <div className="credential-list">
        {certifications.map((certification, index) => (
          <motion.div
            key={certification.name}
            className="credential-row"
            initial="rest"
            whileHover="hover"
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span>0{index + 1}</span>
            <h3>{certification.name}</h3>
            <p>{certification.issuer}</p>
            <motion.i variants={{ rest: { x: 0 }, hover: { x: 8, rotate: -45 } }}>→</motion.i>
          </motion.div>
        ))}
      </div>
      <div className="training-row">
        <span>Also trained in</span>
        <div>{training.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="contact-section">
      <div className="contact-path" aria-hidden="true"><i /><i /><i /></div>
      <span className="contact-kicker">08 / Start a conversation</span>
      <h2>Let’s build the<br /><em>right solution</em><br />together.</h2>
      <p className="contact-intro">
        Whether it's a discovery call, a technical deep-dive, or just a conversation about a problem you're solving — I'd love to hear from you.
      </p>
      <MagneticLink href="mailto:teusjeremiejudith@gmail.com" className="contact-cta">
        <span>Start a conversation</span><b>↗</b>
      </MagneticLink>
      <div className="contact-grid">
        {contactLinks.map((link) => {
          const content = <><span>{link.label}</span><strong>{link.value}</strong><i>{link.action} ↗</i></>;
          return link.href ? (
            <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{content}</a>
          ) : <div key={link.label}>{content}</div>;
        })}
      </div>
      <div className="footer-line">
        <span>© {new Date().getFullYear()} Jeremie Judith R. Teus</span>
        <span>Built with React · Motion · Paper Shaders</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}

function App() {
  const [ready, setReady] = useState(false);

  return (
    <SmoothScroll>
      <Preloader onComplete={() => setReady(true)} />
      <a className="skip-link" href="#about">Skip to content</a>
      <BlueThread />
      <Nav />
      <main>
        <Hero ready={ready} />
        <About />
        <Services />
        <Work />
        <Capabilities />
        <Experience />
        <Skills />
        <Certifications />
      </main>
      <Contact />
    </SmoothScroll>
  );
}

export default App;