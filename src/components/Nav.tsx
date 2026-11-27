import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';

const chapters = [
  ['About', 'about'],
  ['What I do', 'services'],
  ['Work', 'work'],
  ['Builds', 'capabilities'],
  ['Journey', 'experience'],
  ['Toolkit', 'skills'],
  ['Credentials', 'certifications'],
] as const;

export default function Nav() {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useEffect(() => {
    const elements = ['home', ...chapters.map(([, id]) => id), 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -55%', threshold: [0, 0.15, 0.4] },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <motion.div className="header-progress" style={{ scaleX }} />
      <a className="brand" href="#home" aria-label="Jamie Teus, back to top">
        JT<span>↘</span>
      </a>
      <div className="chapter-indicator" aria-live="polite">
        <span>Now viewing</span>
        <strong>{active === 'home' ? 'Introduction' : active}</strong>
      </div>
      <nav className="desktop-nav" aria-label="Main navigation">
        {chapters.slice(0, 4).map(([label, id]) => (
          <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>
            {label}
          </a>
        ))}
        <a className="nav-cta" href="#contact">
          Let’s talk <span>↗</span>
        </a>
      </nav>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? 'Close' : 'Index'}</span>
        <i aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            {chapters.map(([label, id], index) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>
                {label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)}>
              <span>08</span>Contact
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
