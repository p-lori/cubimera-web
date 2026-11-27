import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Moon, Sun } from "lucide-react";
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
      onClick={(e) => toggle({ x: e.clientX, y: e.clientY })}
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

/* Hivatalos Apple „Download on the App Store" SVG badge */
export function StoreBadge({ href = "#top" }: { href?: string }) {
  return (
    <a
      href={href}
      aria-label="Letöltés az App Store-ból"
      className="inline-block transition-transform duration-300 hover:scale-[1.04]"
    >
      <img
        src={`${import.meta.env.BASE_URL}app-store-badge.svg`}
        alt="Download on the App Store"
        className="h-12 w-auto md:h-14"
      />
    </a>
  );
}

/* Görgetés-vezérelt belépés: a kártya a scrollhoz kötve dől a helyére.
   Nem egyszeri trigger — oda-vissza görgetve is él. */
export function ScrollTilt({
  children,
  className,
  amount = 1,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [72 * amount, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [8 * amount, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotateX, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
