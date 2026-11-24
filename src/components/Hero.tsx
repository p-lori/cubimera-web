import { motion, useScroll, useTransform } from "framer-motion";
import { Apple, ArrowDown, ScanLine } from "lucide-react";
import { useRef } from "react";
import { CursorGlow, Magnetic } from "./ui";

/* Forgó drótváz-kocka — az app logójának nagy testvére */
export function WireCube({ size = 220 }: { size?: number }) {
  const t = size / 2;
  const faces = [
    `rotateY(0deg) translateZ(${t}px)`,
    `rotateY(90deg) translateZ(${t}px)`,
    `rotateY(180deg) translateZ(${t}px)`,
    `rotateY(-90deg) translateZ(${t}px)`,
    `rotateX(90deg) translateZ(${t}px)`,
    `rotateX(-90deg) translateZ(${t}px)`,
  ];
  return (
    <div className="cube-scene" style={{ width: size, height: size }}>
      <div className="cube-3d relative" style={{ width: size, height: size }}>
        {faces.map((tr, i) => (
          <div key={i} className="cube-face" style={{ transform: tr }} />
        ))}
        {/* belső mag */}
        <div
          className="absolute left-1/2 top-1/2 rounded-full bg-cyan-400/80 blur-2xl"
          style={{
            width: size * 0.35,
            height: size * 0.35,
            transform: "translate(-50%,-50%)",
          }}
        />
      </div>
    </div>
  );
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yCube = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="bg-blueprint relative flex min-h-screen flex-col overflow-hidden pt-28"
    >
      {/* fények */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/12 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-200px] top-1/3 h-[400px] w-[400px] rounded-full bg-teal-500/10 blur-[120px]" />
      <CursorGlow targetId="top" />

      <motion.div
        style={{ y: yText, opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-5 pt-10 md:pt-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/8 px-4 py-1.5 text-xs font-medium tracking-widest text-cyan-200 uppercase"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
          Cubimera · iOS · AR + fotó
        </motion.div>

        <h1 className="font-display text-[13.5vw] font-bold leading-[0.92] tracking-tighter sm:text-7xl md:text-8xl lg:text-[7.5rem]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease, delay: 0.1 }}
            >
              FOTÓBÓL
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="text-stroke block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease, delay: 0.22 }}
            >
              TÉRFOGAT.
            </motion.span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.45 }}
            className="max-w-md text-base leading-relaxed text-white/60 md:text-lg"
          >
            Lefotózod. Körbeszkenneled. A Cubimera felismeri a testet, és
            megadja a{" "}
            <span className="text-white">térfogatot és a felszínt</span> —
            ellenőrzött számokkal, 11 testcsaládra.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.55 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#app"
                className="group flex items-center gap-2.5 rounded-full bg-cyan-300 px-7 py-4 text-sm font-bold text-black transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(34,211,238,0.6)]"
              >
                <Apple size={18} />
                Letöltöm iOS-re
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#igy-mukodik"
                className="glass flex items-center gap-2.5 rounded-full px-7 py-4 text-sm font-semibold text-white/90 transition-colors hover:border-cyan-300/40"
              >
                <ScanLine size={18} className="text-cyan-300" />
                Hogy működik?
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* kocka + chipsek */}
        <motion.div
          style={{ y: yCube }}
          className="relative mx-auto mt-6 flex h-[380px] items-center justify-center md:h-[440px]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease, delay: 0.5 }}
          >
            <WireCube />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.9 }}
            className="glass absolute left-0 top-10 hidden animate-float rounded-2xl px-5 py-4 sm:block md:left-10"
          >
            <p className="text-[11px] tracking-widest text-white/50 uppercase">
              Felismerve
            </p>
            <p className="font-display text-xl font-bold text-cyan-300">
              Henger · 96%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.05 }}
            className="glass absolute bottom-10 right-0 hidden animate-float rounded-2xl px-5 py-4 [animation-delay:1.2s] sm:block md:right-10"
          >
            <p className="text-[11px] tracking-widest text-white/50 uppercase">
              Térfogat
            </p>
            <p className="font-display text-xl font-bold">
              98,2 <span className="text-sm font-medium text-white/50">cm³</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.2 }}
            className="glass absolute bottom-0 left-1/2 hidden -translate-x-1/2 rounded-2xl px-5 py-3 lg:block"
          >
            <p className="text-xs text-white/60">
              Felszín{" "}
              <span className="font-display font-bold text-white">
                117,8 cm²
              </span>{" "}
              <span className="text-cyan-300">✓ egyértelmű</span>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* marquee */}
      <div className="relative z-10 border-y border-white/10 bg-black/40 py-4 backdrop-blur">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8 whitespace-nowrap">
            {Array.from({ length: 2 }).flatMap((_, k) =>
              [
                "FOTÓ",
                "3D SZKEN",
                "11 TEST",
                "TÉRFOGAT",
                "FELSZÍN",
                "AR",
                "1:1 MODELL",
              ].map((w, i) => (
                <span
                  key={`${k}-${i}`}
                  className="font-display flex items-center gap-8 text-sm font-semibold tracking-[0.25em] text-white/50"
                >
                  {w} <span className="text-cyan-300">✦</span>
                </span>
              )),
            )}
          </div>
        </div>
      </div>

      <motion.a
        href="#funkciok"
        aria-label="Görgess le"
        style={{ opacity: fade }}
        className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 text-white/40 transition-colors hover:text-cyan-300 lg:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
