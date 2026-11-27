import { AnimatePresence, motion, useInView } from "framer-motion";
import { lazy, Suspense, useRef, useState } from "react";
import { SOLIDS, fmt, type SolidId } from "../lib/solids";
import { Reveal } from "./ui";

/* three.js csak akkor töltődik, ha a Labor a közelbe ér */
const SolidViewer = lazy(() => import("./SolidViewer"));

function ViewerFallback() {
  return (
    <div className="grid h-64 w-full place-items-center md:h-72">
      <div className="h-24 w-24 rounded-2xl border border-black/15 dark:border-white/15" />
    </div>
  );
}

/* Forgatható 3D drótváz-előnézet three.js-szel (lásd SolidViewer) */

export default function Lab() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerNear = useInView(viewerRef, { once: true, margin: "500px" });
  const [id, setId] = useState<SolidId>("cylinder");
  const solid = SOLIDS.find((s) => s.id === id)!;
  const [vals, setVals] = useState<number[]>(solid.params.map((p) => p.def));

  const pick = (s: SolidId) => {
    setId(s);
    setVals(SOLIDS.find((x) => x.id === s)!.params.map((p) => p.def));
  };

  const V = solid.volume(vals);
  const A = solid.surface(vals);

  return (
    <section id="labor" className="relative scroll-mt-20 py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mb-6 flex items-center gap-4">
            <p className="text-xs font-semibold tracking-[0.3em] text-cyan-700 uppercase dark:text-cyan-300">
              03 — Labor
            </p>
            <span aria-hidden className="h-px flex-1 bg-black/15 dark:bg-white/15" />
            <span className="font-mono text-[11px] tracking-widest text-black/40 dark:text-white/40">
              INTERAKTÍV
            </span>
          </div>
          <h2 className="font-display max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
            Próbáld ki.
            <br />
            <span className="text-black/40 dark:text-white/40">Ugyanaz a matek, mint az appban.</span>
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-black/60 dark:text-white/55">
            Válassz testet, húzd a csúszkákat — a térfogat és a felszín élőben
            számolódik, pontosan azokkal a képletekkel, amiket a Cubimera is
            használ.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass mt-12 overflow-hidden rounded-3xl">
            <div className="flex flex-wrap gap-2 border-b border-black/10 dark:border-white/8 p-4">
              {SOLIDS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => pick(s.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    s.id === id
                      ? "bg-cyan-300 text-black"
                      : "border border-black/15 text-black/60 hover:border-cyan-600/50 hover:text-black dark:border-white/10 dark:text-white/60 dark:hover:border-cyan-300/40 dark:hover:text-white"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2">
              <div
                ref={viewerRef}
                className="relative border-b border-black/10 dark:border-white/8 md:border-b-0 md:border-r"
              >
                {viewerNear ? (
                  <Suspense fallback={<ViewerFallback />}>
                    <SolidViewer id={id} vals={vals} />
                  </Suspense>
                ) : (
                  <ViewerFallback />
                )}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={id + V.toFixed(1)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-8 px-6 pb-6"
                  >
                    <div>
                      <p className="text-[11px] tracking-widest text-black/50 dark:text-white/45 uppercase">
                        Térfogat
                      </p>
                      <p className="font-display text-3xl font-bold text-cyan-700 dark:text-cyan-300">
                        {fmt(V)}{" "}
                        <span className="text-sm font-medium text-black/50 dark:text-white/40">cm³</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] tracking-widest text-black/50 dark:text-white/45 uppercase">
                        Felszín
                      </p>
                      <p className="font-display text-3xl font-bold">
                        {fmt(A)}{" "}
                        <span className="text-sm font-medium text-black/50 dark:text-white/40">cm²</span>
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="space-y-6 p-6 md:p-8">
                <p className="font-display text-lg font-bold">
                  {solid.name} <span className="text-black/50 dark:text-white/35">· cm</span>
                </p>
                {solid.params.map((p, i) => (
                  <div key={p.key}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-black/60 dark:text-white/60">{p.label}</span>
                      <span className="font-mono font-semibold text-cyan-700 dark:text-cyan-300">
                        {vals[i].toFixed(1)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={p.min}
                      max={p.max}
                      step={0.1}
                      value={vals[i]}
                      onChange={(e) => {
                        const next = [...vals];
                        next[i] = parseFloat(e.target.value);
                        setVals(next);
                      }}
                      className="w-full"
                    />
                  </div>
                ))}
                <p className="rounded-2xl border border-black/10 bg-black/[0.03] p-4 font-mono text-xs leading-relaxed text-black/60 dark:border-white/8 dark:bg-white/[0.03] dark:text-white/40">
                  V ≈ {fmt(V)} cm³ · A ≈ {fmt(A)} cm²
                  <br />
                  <span className="text-emerald-700 dark:text-emerald-300/80">
                    ✓ egyértelmű — megszerkeszthető
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
