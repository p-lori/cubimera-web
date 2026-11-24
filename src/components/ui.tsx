import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Apple, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { useTheme } from "../lib/theme";

/* Scroll-reveal wrapper: finom emelkedés + fade, egyszer fut le */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Mágneses gomb: finoman követi az egeret */
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14 });
  const sy = useSpring(y, { stiffness: 180, damping: 14 });

  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/* Számláló: 0-ról fel a célértékig, amikor látszik */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* Világos/sötét mód kapcsoló — megosztott állapoton, bárhova kitehető */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Világos mód" : "Sötét mód"}
      title={dark ? "Világos mód" : "Sötét mód"}
      className={`relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border transition-colors duration-300 ${
        dark
          ? "border-white/15 bg-white/5 text-amber-200 hover:border-amber-200/50"
          : "border-black/15 bg-black/5 text-slate-600 hover:border-slate-500/50"
      } ${className}`}
    >
      <motion.span
        key={theme}
        initial={{ y: 14, opacity: 0, rotate: -60 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="grid place-items-center"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.span>
    </button>
  );
}

/* Hivatalos stílusú App Store letöltőgomb */
export function StoreBadge({ href = "#top" }: { href?: string }) {
  return (
    <Magnetic>
      <a
        href={href}
        className="flex items-center gap-3 rounded-2xl border border-white/25 bg-black px-5 py-2.5 transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.45)]"
      >
        <Apple size={30} className="shrink-0 text-white" fill="currentColor" />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-medium tracking-wide text-white/75">
            Download on the
          </span>
          <span className="font-display block text-[22px] font-semibold leading-none text-white">
            App Store
          </span>
        </span>
      </a>
    </Magnetic>
  );
}

/* Kurzor-glow: cián fény követi az egeret a hero mögött */
export function CursorGlow({ targetId }: { targetId: string }) {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 60, damping: 20 });
  const sy = useSpring(y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, [targetId, x, y]);

  return (
    <motion.div
      aria-hidden
      className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full pointer-events-none"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(34,211,238,0.14) 0%, transparent 65%)",
      }}
    />
  );
}
