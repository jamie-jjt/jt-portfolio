# Jeremie Judith R. Teus — Portfolio V2

A highly interactive, scroll-driven portfolio for a Solutions Engineer. The visual system uses a bright blue-and-white technical editorial direction and a continuous “Blue Thread” that traces the page as the visitor scrolls.

## Stack

- **Vite + React 19 + TypeScript** — application and build tooling
- **Motion for React** — loading sequence, staggered hero choreography, scroll-linked transforms, layout transitions, section reveals, and pointer interactions
- **Paper Shaders** — the animated WebGL mesh gradient in the hero
- **Lenis** — smooth scrolling, disabled automatically for reduced-motion users
- **CSS** — responsive visual system, grids, sticky horizontal storytelling, and reduced-motion fallbacks

## Experience structure

1. Animated identity introduction
2. Scroll-revealed About narrative
3. Interactive services console
4. Pinned horizontal case study
5. Projects and capabilities explorer
6. Experience route map
7. Interactive skills network
8. Credentials and contact circuit

All content from the original portfolio is retained and reorganized into the new experience.

## Local development

```bash
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

## Validation

```bash
npm run lint
npm run build
```

The production build is written to `dist/`.

## Deployment

The included `vercel.json` configures this repository as a static Vite SPA. Import the repository in Vercel or deploy it through the Vercel CLI.
