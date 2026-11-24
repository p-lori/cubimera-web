import { AnimatePresence, motion } from "framer-motion";
import { Box, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ui";

const LINKS = [
  { href: "#funkciok", label: "Funkciók" },
  { href: "#igy-mukodik", label: "Így működik" },
  { href: "#labor", label: "Labor" },
  { href: "#app", label: "Az app" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div
          className={`pointer-events-none absolute inset-0 border-b transition-all duration-500 ${
            scrolled
              ? "border-black/10 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#050607]/80"
              : "border-transparent bg-transparent"
          }`}
        />
        <a href="#top" className="relative flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_24px_rgba(34,211,238,0.35)]">
            <Box className="h-4.5 w-4.5 text-cyan-700 dark:text-cyan-300" size={18} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Cubimera
          </span>
        </a>

        <nav className="relative hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm text-black/60 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan-600 transition-all duration-300 group-hover:w-full dark:bg-cyan-300" />
            </a>
          ))}
        </nav>

        <div className="relative hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href="#app"
            className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] dark:bg-white dark:text-black dark:hover:bg-cyan-300"
          >
            Letöltöm
          </a>
        </div>

        <div className="relative flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg border border-black/10 p-2 dark:border-white/10"
            aria-label="Menü"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-4 rounded-2xl border border-black/10 bg-white/95 p-4 backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-[#0b0e10]/95"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-black/80 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
