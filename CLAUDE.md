# Northern Sky website — rules for AI assistants

Read this before changing anything.

## What this is
Single-page marketing site for Northern Sky Developers LLP (solar EPC + installation & commissioning + civil, wind and BESS works; offices Erode, Karur, Bengaluru). Positioning: EPC is the headline offer; past projects are I&C/civil scopes and must stay labelled as such — never describe them as completed EPC projects.
Stack: Vite + React 18. 3D hero uses three.js via @react-three/fiber (src/three/HeroScene.jsx). Locations use an illustrated SVG India map (src/sections/IndiaMap.jsx, outline from DataMeet india-composite = official boundary, CC BY 4.0 — keep the attribution; never swap in a map that shows a different India boundary).
Deployed to GitHub Pages from the `main` branch, `/docs` folder. `npm run build` writes the finished site into `docs/`, which IS committed. Always build before pushing. Domain: northernskydevelopers.com.

## Where things live
- Projects and the earlier-projects table: `content/projects.csv` and `content/earlier-projects.csv` (edited by the owner in Excel; converted to `src/data/projects.json` by `scripts/content.mjs` before dev/build). Never hand-edit projects.json.
- All other text, numbers, clients, team, leadership, careers, contact details: `src/data/site.js`.
- Source of truth for facts: the owner's agreed project list (22 Nov 2026, "claude/Website_Project_List.md" in the NSD LLP Social Media project) wins conflicts, then owner-supplied team/equipment numbers, then Northern_Sky_Profile 3.pptx.
- Headline numbers (hero stats) count only work contracted directly. Earlier-projects table = second-level sub-contract work: keep it labelled as such and never add it to headline figures.
- Do not claim in-house fencing manufacturing (the company supplies and erects; it does not manufacture).
- Present one company (Northern Sky Developers LLP, team executing since 2019). Do not list group/associate firms on the site.
- Sections: `src/sections/*.jsx`. Styles: `src/styles/global.css` (design tokens at the top — use them, don't add new colours).
- Photos: originals in `content/photos/` (git-ignored); optimised copies `src/assets/img/<name>-<width>.webp` are generated automatically and committed.
- Client logos: `src/assets/logos/`. Icons: `src/assets/icons/`.

## Rules
1. Commit the built `docs/` folder (that is what goes live). Never commit `dist/`, `build/`, `static/` or original photos. Never commit files over 1 MB.
2. New photos: put in `content/photos/`, reference by file name in the CSV (or by name without extension in `site.js`). Never import raw JPG/PNG/HEIC.
3. Use the `<Img>` component (src/lib/Img.jsx) for photos so phones get small files and big screens get sharp ones.
4. Do not add new npm packages without asking. No Bootstrap, Tailwind, jQuery, AOS or GSAP: CSS + the existing helpers cover it.
5. Keep the 3D lazy-loaded. The first paint must never wait for three.js.
6. Every image needs a meaningful `alt` (or `alt=""` if decorative). Interactive things must be `<button>` or `<a>`.
7. Facts (MW, km, years, client names) must come from the business owner. Never invent numbers or clients.
8. One change per branch/pull request. Run `npm run build` and check the preview on phone width before merging.
