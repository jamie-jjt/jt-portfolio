import SmoothScroll from './components/SmoothScroll';
import SpaceBackground from './components/SpaceBackground';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Work from './sections/Work';
import Capabilities from './sections/Capabilities';
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

          {/* No heavy curtain here — the galaxy shows through every section so
              it reads as one continuous scroll through space. Sections keep
              their own local scrims/glass for text legibility. */}
          <About />
          <Services />
          <Work />
          <Capabilities />
          <Experience />
          <Skills />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
