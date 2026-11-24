import { motion } from "framer-motion";
import { FlaskConical, Home, RotateCcw } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { WireCube } from "./Hero";
import { Magnetic } from "./ui";

function Shell({
  code,
  title,
  text,
  children,
}: {
  code: string;
  title: ReactNode;
  text: string;
  children: ReactNode;
}) {
  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden px-5 py-14">
      {/* rács külön rétegen: a mask csak ezt halványítja, a tartalmat nem */}
      <div aria-hidden className="bg-blueprint pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative m-auto flex w-full max-w-2xl flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative opacity-90"
      >
        <WireCube size={120} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mt-8 text-xs font-semibold tracking-[0.3em] text-cyan-300 uppercase"
      >
        Cubimera · hiba
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-stroke mt-4 text-[26vw] leading-none font-bold tracking-tighter sm:text-8xl md:text-9xl"
      >
        {code}
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="font-display mt-2 max-w-2xl text-3xl font-bold tracking-tight md:text-5xl"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-4 max-w-md leading-relaxed text-white/55"
      >
        {text}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        {children}
      </motion.div>
      </div>
    </section>
  );
}

export function NotFound() {
  useEffect(() => {
    document.title = "404 — Cubimera";
  }, []);

  return (
    <Shell
      code="404"
      title={
        <>
          ELTÉVEDTÉL <span className="text-cyan-300">A TÉRBEN.</span>
        </>
      }
      text="Ez az oldal nem létezik. Ha létezne, megmérnénk a térfogatát — de így inkább visszaküldünk a főoldalra."
    >
      <Magnetic>
        <a
          href="/"
          className="flex items-center gap-2.5 rounded-full bg-cyan-300 px-7 py-4 text-sm font-bold text-black transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(34,211,238,0.6)]"
        >
          <Home size={18} />
          Vissza a főoldalra
        </a>
      </Magnetic>
      <Magnetic>
        <a
          href="/#labor"
          className="glass flex items-center gap-2.5 rounded-full px-7 py-4 text-sm font-semibold text-white/90 transition-colors hover:border-cyan-300/40"
        >
          <FlaskConical size={18} className="text-cyan-300" />
          Megnézem a Labort
        </a>
      </Magnetic>
    </Shell>
  );
}

export function CrashPage({ onRetry }: { onRetry: () => void }) {
  useEffect(() => {
    document.title = "500 — Cubimera";
  }, []);

  return (
    <Shell
      code="500"
      title={
        <>
          A MŰSZER <span className="text-cyan-300">MEGHIBÁSODOTT.</span>
        </>
      }
      text="Valami elromlott futás közben. Próbáld újra — a számok megvárnak."
    >
      <Magnetic>
        <button
          onClick={onRetry}
          className="flex items-center gap-2.5 rounded-full bg-cyan-300 px-7 py-4 text-sm font-bold text-black transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(34,211,238,0.6)]"
        >
          <RotateCcw size={18} />
          Újrapróbálom
        </button>
      </Magnetic>
      <Magnetic>
        <a
          href="/"
          className="glass flex items-center gap-2.5 rounded-full px-7 py-4 text-sm font-semibold text-white/90 transition-colors hover:border-cyan-300/40"
        >
          <Home size={18} className="text-cyan-300" />
          Vissza a főoldalra
        </a>
      </Magnetic>
    </Shell>
  );
}
