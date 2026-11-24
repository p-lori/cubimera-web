# Cubimera — Fotóból térfogat

A **Cubimera** iOS-app landing oldala. Sötét, blueprint-hangulatú one-pager:
óriástipó, forgó drótváz-kocka, count-up statok, bento funkciókártyák — és egy
kipróbálható **3D Labor**, ahol a testek tényleg megforgathatók.

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-r187-black?logo=three.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-7-3178c6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22d3ee)

## Oldalszerkezet

| Blokkel | Tartalom |
|---|---|
| Hero | Beúszó óriástipó, CSS-3D drótváz-kocka, parallax, kurzor-glow, marquee |
| Statok | Animált számlálók: 11 testcsalád · 2 szken mód · 100% valós méret |
| Funkciók | Bento-kártyák: fotó mód, 3D szken, 11 test, ellenőrzött számok, könyvtár |
| Így működik | 3 lépés: fotózd → szkenneld körbe → kapd meg a számokat |
| Labor | Forgatható three.js testek + élő térfogat/felszín csúszkákkal |
| App | Lebegő iPhone-mockup, App Store CTA |
| Hibaoldalak | Brandezett 404 + 500, ErrorBoundary-vel |

## Útvonalak

| Út | Mit ad |
|---|---|
| `/` | A landing |
| `/bármi` | Kliensoldali 404 oldal (a dev/preview szerver `index.html`-t szolgál ki) |
| `/?hiba=500` | Az 500-as oldal előnézete |
| `/404.html` | Önálló statikus 404 (JS nélkül is megy, static hostoknak) |

## Indítás

```bash
npm install
npm run dev      # fejlesztés: http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # build előnézet
npm run lint     # oxlint
```

## Tech

- **React 19 + TypeScript + Vite 8** — build és dev
- **Tailwind CSS 4** (`@tailwindcss/vite`) — stílus, téma `src/index.css`-ben
- **Framer Motion** — reveal, parallax, mágneses gombok, számlálók
- **Three.js + OrbitControls** — a Labor forgatható testei (lazy chunkban töltődik)
- **Lucide** — ikonok

## Projektfa

```
public/
  404.html        # statikus 404 oldal
  favicon.svg     # Cubimera kocka-mark
src/
  components/
    Nav.tsx       # fix fejléc + mobilmenü
    Hero.tsx      # hero + WireCube
    Sections.tsx  # statok, funkciók, lépések, app, footer
    Lab.tsx       # interaktív labor (lazy three.js)
    SolidViewer.tsx # three.js nézegető (OrbitControls)
    ErrorPages.tsx  # 404 + 500 oldalak
    ErrorBoundary.tsx
    ui.tsx        # Reveal, Magnetic, CountUp, CursorGlow
  lib/
    solids.ts     # térfogat/felszín képletek (az app logikájának portja)
  App.tsx         # route-elágazás + összerakás
  index.css       # Tailwind téma, keyframe-ek, glass, rács
```

## Deploy

Bármilyen statikus hostra mehet (`dist/`). Ismeretlen útvonalakhoz állíts be
SPA-fallbackot `index.html`-re — így a kliensoldali 404 jelenik meg. Ahol van
natív `404.html`-támogatás (pl. GitHub Pages), ott a `public/404.html` magától
működik.

## Licenc

MIT — lásd [LICENSE](LICENSE).
