import { motion, useScroll, useSpring } from "framer-motion";
import {
  Boxes,
  Camera,
  Cuboid,
  History,
  Moon,
  Ruler,
  Sigma,
} from "lucide-react";
import { useRef, type ReactNode } from "react";
import { IPhoneSVG, ResultScreen, ScanScreen } from "./PhoneScreens";
import { CountUp, Reveal, ScrollTilt, StoreBadge } from "./ui";

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
      className={`group glass relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-700 dark:hover:border-cyan-300/50 ${
        big ? "md:col-span-2" : ""
      } ${className}`}
    >
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
          <div className="mb-6 flex items-center gap-4">
            <p className="text-xs font-semibold tracking-[0.3em] text-cyan-700 uppercase dark:text-cyan-300">
              01 — Funkciók
            </p>
            <span aria-hidden className="h-px flex-1 bg-black/15 dark:bg-white/15" />
            <span className="font-mono text-[11px] tracking-widest text-black/40 dark:text-white/40">
              11 TESTCSALÁD
            </span>
          </div>
          <h2 className="font-display max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
            Két mód.
            <br />
            <span className="text-black/40 dark:text-white/40">
              Nulla tippelgetés.
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 [perspective:1200px] md:grid-cols-3">
          <ScrollTilt amount={1}>
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
                <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                <span className="text-black/60 dark:text-white/70">
                  gúla ·{" "}
                  <span className="text-cyan-700 dark:text-cyan-300">94%</span>{" "}
                  · V = 26,7 cm³
                </span>
              </div>
            </Card>
          </ScrollTilt>

          <ScrollTilt amount={0.8}>
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
          </ScrollTilt>

          <ScrollTilt amount={1}>
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
          </ScrollTilt>

          <ScrollTilt amount={0.8}>
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
          </ScrollTilt>

          <ScrollTilt amount={0.65}>
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
          </ScrollTilt>
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
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section
      id="igy-mukodik"
      className="relative scroll-mt-20 border-y border-black/10 bg-[#e4eaeb] py-24 md:py-36 dark:border-white/8 dark:bg-[#07090a]"
    >
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mb-6 flex items-center gap-4">
            <p className="text-xs font-semibold tracking-[0.3em] text-cyan-700 uppercase dark:text-cyan-300">
              02 — Így működik
            </p>
            <span aria-hidden className="h-px flex-1 bg-black/15 dark:bg-white/15" />
            <span className="font-mono text-[11px] tracking-widest text-black/40 dark:text-white/40">
              3 LÉPÉS
            </span>
          </div>
          <h2 className="font-display max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
            Három lépés.
            <br />
            <span className="text-stroke-cyan">Harminc másodperc.</span>
          </h2>
        </Reveal>

        <div ref={gridRef} className="mt-14">
          <motion.div
            aria-hidden
            style={{ scaleX: lineScale }}
            className="mb-6 h-px origin-left bg-cyan-700/60 dark:bg-cyan-300/60"
          />
          <div className="grid gap-4 [perspective:1200px] md:grid-cols-3">
          {STEPS.map((s, i) => (
            <ScrollTilt key={s.n} amount={1 - i * 0.15}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-black/10 bg-black/[0.03] p-8 transition-colors duration-300 hover:border-cyan-500/40 dark:border-white/8 dark:bg-white/[0.02] dark:hover:border-cyan-300/30">
                <span className="font-display text-stroke text-7xl font-bold opacity-40 transition-opacity duration-300 group-hover:opacity-100">
                  {s.n}
                </span>
                <h3 className="font-display mt-6 text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-black/60 dark:text-white/55">{s.text}</p>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-cyan-600 transition-all duration-700 group-hover:w-full dark:bg-cyan-300" />
              </div>
            </ScrollTilt>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- APP / TELEFON ---------- */
export function AppSection() {
  return (
    <section id="app" className="relative scroll-mt-20 overflow-hidden py-24 md:py-36">
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-2">
        <Reveal>
          <div className="mb-6 flex items-center gap-4">
            <p className="text-xs font-semibold tracking-[0.3em] text-cyan-700 uppercase dark:text-cyan-300">
              04 — Az app
            </p>
            <span aria-hidden className="h-px flex-1 bg-black/15 dark:bg-white/15" />
            <span className="font-mono text-[11px] tracking-widest text-black/40 dark:text-white/40">
              iOS 17+
            </span>
          </div>
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

        {/* app képernyők rendes iPhone SVG-keretben */}
        <Reveal delay={0.15} className="flex justify-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            className="relative flex items-end"
          >
            {/* eredményképernyő — kisebb, megdöntve hátul */}
            <div className="hidden w-[190px] shrink-0 -rotate-6 -mr-8 mb-6 opacity-95 sm:block">
              <IPhoneSVG>
                <ResultScreen />
              </IPhoneSVG>
            </div>
            {/* szkenképernyő — fő telefon */}
            <div className="w-[270px] shrink-0 md:w-[290px]">
              <IPhoneSVG>
                <ScanScreen />
              </IPhoneSVG>
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
