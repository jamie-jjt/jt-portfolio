import SmoothScroll from './components/SmoothScroll';
import SpaceBackground from './components/SpaceBackground';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Work from './sections/Work';
import Skills from './sections/Skills';
import Certifications from './sections/Certifications';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <SmoothScroll>
      {/* Custom circle cursor (desktop only) */}
      <Cursor />

      {/* Persistent space background travels with page scroll (fixed, z-0) */}
      <SpaceBackground />

      {/* Content sits above the background. No opaque bg here so space shows through. */}
      <div className="grain relative z-10 w-full overflow-x-clip">
        <Nav />
        <main className="relative">
          {/* Hero: space fully visible */}
          <Hero />

          {/* Mid content: a soft scrim keeps text readable while space still
              shows through faintly. Sits behind these sections only. */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-void/55" />
            <About />
            <Services />
            <Work />
            <Experience />
            <Skills />
            <Certifications />
          </div>

          {/* Contact: space opens back up for the closing */}
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
