# Cubimera — Fotóból térfogat

A **Cubimera** iOS-alkalmazás hivatalos landing oldala. Az app lényege egy
mondatban: **lefotózod a tárgyat, körbeszkenneled, megkapod a térfogatát és a
felszínét** — ellenőrzött számokkal, 11 testcsaládra.

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-r187-black?logo=three.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22d3ee)

## Miről szól az oldal

Sötét, blueprint-hangulatú one-pager, ami végigviszi a látogatót az app
sztoriján: mit tud, hogyan működik, és milyen érzés használni.

- **Hero** — „FOTÓBÓL TÉRFOGAT." óriástipó, forgó drótváz-kocka, élő
  felismerési kártyákkal (pl. *Henger · 96% · 98,2 cm³*)
- **Statok** — 11 testcsalád, fotó + 3D AR szken mód, 1:1-es valós méret
- **Funkciók** — bento-kártyák: fotó mód, 3D szken, ellenőrzött számok,
  felhős könyvtár és előzmények
- **Így működik** — három lépés, harminc másodperc: fotózd, szkenneld körbe,
  kapd meg a számokat
- **Labor** — a fénypont: hat testcsalád (kocka, téglatest, henger, gúla, kúp,
  gömb) **ténylegesen megforgatható 3D-ben**, csúszkákkal állítható méretekkel,
  és az app valódi képleteivel számolt élő térfogattal és felszínnel
- **Az app** — lebegő iPhone-mockup az app felületével, App Store CTA-val
- **Hibaoldalak** — `public/error/` mappában, kódonként egy önálló oldal
  (400, 401, 403, 404, 405, 408, 429, 500, 502, 503, 504), Cubimera-arculattal,
  világos/sötét móddal — a dizájn része, nem utólagos toldalék

## Tech röviden

React + TypeScript + Vite alapon, Tailwind CSS 4-gyel stilizálva. A mozgásért
Framer Motion felel (revealek, parallax, mágneses gombok), a Labor 3D-jéért
pedig Three.js OrbitControls-szal — utóbbi külön chunkban, csak akkor töltődik,
amikor odagörgetsz.

## Licenc

MIT — lásd [LICENSE](LICENSE).
