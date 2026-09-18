# Jeremie Judith R. Teus — Portfolio

A black/violet galaxy-themed portfolio for a Solutions Engineer. Built with a
smooth, animated, agency-landing-page feel.

## Stack

- **Vite + React + TypeScript** — build tooling and framework
- **Tailwind CSS** — styling (custom galaxy palette)
- **Framer Motion** — scroll reveals, transitions, micro-interactions
- **Lenis** — smooth momentum scrolling
- **React Three Fiber + drei** — the 3D particle galaxy in the hero (lazy-loaded)

## Local development

```bash
npm install
npm run dev
```

Open the URL Vite prints (default http://localhost:5173).

## Production build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

## Deploying to Vercel

This is a static Vite SPA, so Vercel hosts it on the free tier easily.

1. Push this project to a GitHub repository.
2. In Vercel, **Add New → Project** and import the repo.
3. Vercel auto-detects the Vite framework. The included `vercel.json` sets:
   - build command: `npm run build`
   - output directory: `dist`
   - SPA rewrites so anchor links work on refresh
4. Deploy. Every push to the main branch redeploys automatically.

Alternatively, deploy from the CLI:

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

## Structure

```
src/
  components/     # Nav, Footer, SmoothScroll, GalaxyScene, Reveal, Section
  sections/       # Hero, About, Services, Work, Experience, Skills, Certifications, Contact
  index.css       # Tailwind + global theme
  App.tsx         # composes the sections
```

## Customizing

- **Colors**: edit the palette in `tailwind.config.js`.
- **Content**: each section lives in `src/sections/` with its data at the top of the file.
- **Project screenshot**: the Selected Work banner uses an animated gradient
  placeholder — drop a real screenshot into the banner in `src/sections/Work.tsx`
  for a stronger case study.
