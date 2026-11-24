import { motion } from "framer-motion";
import {
  Boxes,
  Camera,
  Cuboid,
  History,
  Moon,
  Ruler,
  Sigma,
  Signal,
  Wifi,
} from "lucide-react";
import type { ReactNode } from "react";
import { CountUp, Reveal, StoreBadge } from "./ui";

/* ---------- STAT SÁV ---------- */
const STATS = [
  { value: 11, suffix: "", label: "testcsalád", sub: "kockától a gömbig" },
  { value: 2, suffix: "", label: "szken mód", sub: "fotó + 3D AR" },
  { value: 100, suffix: "%", label: "valós méret", sub: "1:1-es modell" },
  { value: 0, suffix: "", label: "kacat", sub: "csak a számok" },
];

export function Stats() {
  return (
    <section className="border-b border-black/10 dark:border-white/8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-black/10 px-5 max-md:gap-y-10 max-md:py-12 md:grid-cols-4 md:divide-x md:py-0 dark:divide-white/8">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="md:py-12 md:text-center">
            <p className="font-display text-5xl font-bold tracking-tight md:text-6xl">
              <CountUp to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
              {s.label}
            </p>
            <p className="text-xs text-black/50 dark:text-white/40">{s.sub}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- BENTO ---------- */
function Card({
  children,
  className = "",
  big = false,
}: {
  children: ReactNode;
  className?: string;
  big?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`group glass relative overflow-hidden rounded-3xl p-7 transition-colors duration-300 hover:border-cyan-500/40 dark:hover:border-cyan-300/30 ${
        big ? "md:col-span-2" : ""
      } ${className}`}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/0 blur-[80px] transition-all duration-500 group-hover:bg-cyan-400/15" />
      {children}
    </motion.div>
  );
}

function Icon({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl border border-cyan-600/30 bg-cyan-600/10 text-cyan-700 dark:border-cyan-300/30 dark:bg-cyan-300/10 dark:text-cyan-300">
      {children}
    </div>
  );
}

export function Features() {
  return (
    <section id="funkciok" className="relative scroll-mt-20 py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-cyan-700 uppercase dark:text-cyan-300">
            01 — Funkciók
          </p>
          <h2 className="font-display max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
            Két mód.
            <br />
            <span className="text-black/40 dark:text-white/40">
              Nulla tippelgetés.
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <Reveal delay={0.05}>
            <Card big className="h-full">
              <Icon>
                <Camera size={20} />
              </Icon>
              <h3 className="font-display text-2xl font-bold">Fotó mód</h3>
              <p className="mt-2 max-w-md leading-relaxed text-black/60 dark:text-white/55">
                Egy koppintás. A kamera megállítja a pillanatot, az app
                felismeri a testet, és azonnal dobja a térfogatot meg a
                felszínt. Retikül a közepén, számok a szélén.
              </p>
              <div className="glass mt-6 flex items-center gap-3 rounded-2xl px-4 py-3 font-mono text-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-black/60 dark:text-white/70">
                  gúla ·{" "}
                  <span className="text-cyan-700 dark:text-cyan-300">94%</span>{" "}
                  · V = 26,7 cm³
                </span>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.12}>
            <Card className="h-full">
              <Icon>
                <Cuboid size={20} />
              </Icon>
              <h3 className="font-display text-2xl font-bold">3D szken</h3>
              <p className="mt-2 leading-relaxed text-black/60 dark:text-white/55">
                Nyomva tartod, körbejárod — AR csak érdemi elmozdulás után
                ment. Földön vagy kézben, a végén valódi 1:1-es modell.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.05}>
            <Card className="h-full">
              <Icon>
                <Boxes size={20} />
              </Icon>
              <h3 className="font-display text-2xl font-bold">11 testcsalád</h3>
              <p className="mt-2 leading-relaxed text-black/60 dark:text-white/55">
                Kocka, téglatest, hasáb, gúla, tetraéder, csonkagúla, henger,
                kúp, csonkakúp, gömb. Mindegyikhez képlet, nem hasraütés.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.12}>
            <Card className="h-full">
              <Icon>
                <Sigma size={20} />
              </Icon>
              <h3 className="font-display text-2xl font-bold">Ellenőrzött számok</h3>
              <p className="mt-2 leading-relaxed text-black/60 dark:text-white/55">
                Egyértelmű, hiányos vagy ellentmondó — az app megmondja, mikor
                hihetsz a számoknak, és mikor mérj rá még egyet.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.19}>
            <Card className="h-full">
              <Icon>
                <History size={20} />
              </Icon>
              <h3 className="font-display text-2xl font-bold">Könyvtár</h3>
              <p className="mt-2 leading-relaxed text-black/60 dark:text-white/55">
                Minden mérésed elmentve, felhőbe szinkronizálva. Előzmények,
                kedvencek, újramérés egy koppintással.
              </p>
            </Card>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="glass mt-4 flex flex-col items-start gap-4 rounded-3xl p-7 md:flex-row md:items-center">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-black/10 bg-black/5 dark:border-white/15 dark:bg-white/5">
              <Moon size={20} className="text-black/60 dark:text-white/70" />
            </div>
            <p className="leading-relaxed text-black/60 dark:text-white/55">
              <span className="font-semibold text-black dark:text-white">
                Sötétben is olvasható.
              </span>{" "}
              Üvegfelületek, rendszer-színsémák, világos / sötét / automata —
              az app úgy néz ki, ahogy egy mérőműszernek kell.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-black/50 dark:text-white/40 md:ml-auto">
              <Ruler size={14} /> mm · cm · 1 tizedes
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- LÉPÉSEK ---------- */
const STEPS = [
  {
    n: "01",
    title: "Fotózd le",
    text: "Irányítsd rá a testre. Egy koppintás, és a felismerés megmondja: kocka, henger, gúla — és mennyire biztos benne.",
  },
  {
    n: "02",
    title: "Szkenneld körbe",
    text: "Komolyabb darab? Tartsd nyomva, járd körbe. Az AR csak akkor ment képet, ha tényleg mozdultál — a modell 1:1-es lesz.",
  },
  {
    n: "03",
    title: "Kapd meg a számokat",
    text: "Térfogat, felszín, méretek cm-ben vagy mm-ben. Ha az adatok ellentmondanak, az app szól, mielőtt elhinnéd.",
  },
];

export function Steps() {
  return (
    <section
      id="igy-mukodik"
      className="relative scroll-mt-20 border-y border-black/10 bg-[#e4eaeb] py-24 md:py-36 dark:border-white/8 dark:bg-[#07090a]"
    >
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-cyan-700 uppercase dark:text-cyan-300">
            02 — Így működik
          </p>
          <h2 className="font-display max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
            Három lépés.
            <br />
            <span className="text-stroke-cyan">Harminc másodperc.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-black/10 bg-black/[0.03] p-8 transition-colors duration-300 hover:border-cyan-500/40 dark:border-white/8 dark:bg-white/[0.02] dark:hover:border-cyan-300/30">
                <span className="font-display text-stroke text-7xl font-bold opacity-40 transition-opacity duration-300 group-hover:opacity-100">
                  {s.n}
                </span>
                <h3 className="font-display mt-6 text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-black/60 dark:text-white/55">{s.text}</p>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-cyan-300 transition-all duration-700 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- APP / TELEFON ---------- */
export function AppSection() {
  return (
    <section id="app" className="relative scroll-mt-20 overflow-hidden py-24 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-2">
        <Reveal>
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-cyan-700 uppercase dark:text-cyan-300">
            04 — Az app
          </p>
          <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
            Mérőműszer,
            <br />
            <span className="text-black/40 dark:text-white/40">a zsebedben.</span>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-black/60 dark:text-white/55">
            Natív iOS, ARKit-tel és kamerával. Bejelentkezel, mérsz, a felhő
            megjegyzi. Sötét mód alapból, mert műhelyben úgysem világos van.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-black/60 dark:text-white/60">
            {[
              "Fotó + 3D AR szken egy helyen",
              "Felhős mentés és előzmények",
              "mm / cm, állítható tizedesek",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full border border-cyan-600/40 text-xs text-cyan-700 dark:border-cyan-300/40 dark:text-cyan-300">
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <StoreBadge href="#top" />
            <p className="mt-3 font-mono text-xs text-black/50 dark:text-white/35">
              iOS 17+ · iPhone + iPad
            </p>
          </div>
        </Reveal>

        {/* telefon mockup — rendes iPhone */}
        <Reveal delay={0.15} className="flex justify-center">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative"
          >
            {/* oldalsó gombok */}
            <div className="absolute -left-[2px] top-28 h-7 w-[3px] rounded-l-md bg-[#43484e]" />
            <div className="absolute -left-[2px] top-40 h-12 w-[3px] rounded-l-md bg-[#43484e]" />
            <div className="absolute -left-[2px] top-56 h-12 w-[3px] rounded-l-md bg-[#43484e]" />
            <div className="absolute -right-[2px] top-44 h-16 w-[3px] rounded-r-md bg-[#43484e]" />
            {/* titán keret */}
            <div className="w-[280px] rounded-[3.2rem] bg-gradient-to-b from-[#767c84] via-[#22262a] to-[#565b62] p-[11px] shadow-[0_30px_80px_rgba(0,0,0,0.45),0_0_100px_rgba(34,211,238,0.22)]">
              <div className="overflow-hidden rounded-[2.6rem] bg-black">
                {/* kijelző */}
                <div className="relative bg-[#0b0e10]">
                  {/* Dynamic Island */}
                  <div className="absolute left-1/2 top-2.5 z-20 h-[25px] w-[95px] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
                  {/* státuszsor */}
                  <div className="flex items-center justify-between px-7 pt-3.5 text-[11px] font-semibold text-white">
                    <span>9:41</span>
                    <span className="flex items-center gap-1.5">
                      <Signal size={12} />
                      <Wifi size={12} />
                      <span className="flex h-[11px] w-[22px] items-center rounded-[3px] border border-white/60 p-[1.5px]">
                        <span className="h-full w-3/4 rounded-[1px] bg-white" />
                      </span>
                    </span>
                  </div>
                  <div className="space-y-3 p-4">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-400/50 bg-cyan-400/10">
                        <Cuboid size={16} className="text-cyan-300" />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Cubimera
                        </p>
                        <p className="text-[11px] text-white/45">
                          Fotó → 3D test → mérés
                        </p>
                      </div>
                    </div>
                    <div className="relative grid h-44 place-items-center overflow-hidden rounded-2xl border border-cyan-300/25 bg-gradient-to-b from-cyan-400/10 to-transparent">
                      <div className="cube-scene scale-[0.42]">
                        <div
                          className="cube-3d relative"
                          style={{ width: 220, height: 220 }}
                        >
                          {[
                            "rotateY(0deg) translateZ(110px)",
                            "rotateY(90deg) translateZ(110px)",
                            "rotateY(180deg) translateZ(110px)",
                            "rotateY(-90deg) translateZ(110px)",
                            "rotateX(90deg) translateZ(110px)",
                            "rotateX(-90deg) translateZ(110px)",
                          ].map((tr, i) => (
                            <div
                              key={i}
                              className="cube-face"
                              style={{ transform: tr }}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="absolute left-3 top-3 rounded-full bg-emerald-400/15 px-2.5 py-1 font-mono text-[10px] text-emerald-300">
                        ● 3D SZKEN
                      </span>
                      <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] text-cyan-300">
                        24 / 32 kép
                      </span>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
                      <p className="text-[11px] tracking-widest text-white/45 uppercase">
                        Henger · 96%
                      </p>
                      <div className="mt-2 flex gap-4 text-white">
                        <div>
                          <p className="font-display text-xl font-bold">98,2</p>
                          <p className="text-[10px] text-white/45">
                            cm³ térfogat
                          </p>
                        </div>
                        <div>
                          <p className="font-display text-xl font-bold">117,8</p>
                          <p className="text-[10px] text-white/45">
                            cm² felszín
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-cyan-300 py-3 text-center text-sm font-bold text-black">
                      Mentés a könyvtárba
                    </div>
                  </div>
                  {/* home csík + tükröződés */}
                  <div className="mx-auto mb-2 h-1 w-28 rounded-full bg-white/40" />
                  <div className="pointer-events-none absolute inset-0 rounded-[2.6rem] bg-gradient-to-br from-white/[0.09] via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
export function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/8">
      <div className="mx-auto max-w-6xl px-5 py-16 text-center">
        <Reveal>
          <h2 className="font-display mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            MÉRD MEG A{" "}
            <span className="text-cyan-700 dark:text-cyan-300">VALÓSÁGOT.</span>
          </h2>
          <div className="mt-8 flex justify-center">
            <StoreBadge href="#top" />
          </div>
        </Reveal>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-black/10 dark:border-white/8 pt-8 text-xs text-black/50 dark:text-white/35 md:flex-row">
          <span className="flex items-center gap-2">
            <Cuboid size={14} className="text-cyan-700/60 dark:text-cyan-300/60" />
            Cubimera © 2026 — fotóból térfogat
          </span>
          <span className="font-mono">11 test · 2 mód · 0 tippelgetés</span>
        </div>
      </div>
    </footer>
  );
}
