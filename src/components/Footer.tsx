export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-white/40 sm:flex-row">
        <p>
          © {year} Jeremie Judith R. Teus. Built with React, Three.js &amp; a
          little stardust.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#home"
            className="transition-colors hover:text-violet-glow"
          >
            Back to top
          </a>
          <a
            href="https://www.linkedin.com/in/jeremie-judith-teus"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-violet-glow"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
