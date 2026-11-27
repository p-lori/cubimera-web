import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const KEY = "cubimera-theme";

function initial(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.localStorage.getItem(KEY) === "light" ? "light" : "dark";
}

let current: Theme = initial();
const listeners = new Set<() => void>();

function apply(t: Theme) {
  current = t;
  document.documentElement.classList.toggle("dark", t === "dark");
  try {
    window.localStorage.setItem(KEY, t);
  } catch {
    /* privát mód: nem perzisztálunk */
  }
  listeners.forEach((l) => l());
}

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

export function setTheme(t: Theme) {
  if (t !== current) apply(t);
}

/* Körkörös wipe-átmenet a kattintás pontjából (View Transitions API).
   Ahol nem támogatott, sima azonnali váltás. */
export function toggleTheme(from?: { x: number; y: number }) {
  const next: Theme = current === "dark" ? "light" : "dark";
  const doc = document as ViewTransitionDoc;
  if (typeof doc.startViewTransition === "function" && from) {
    try {
      const transition = doc.startViewTransition(() => apply(next));
      transition.ready.then(() => {
        const r = Math.hypot(
          Math.max(from.x, window.innerWidth - from.x),
          Math.max(from.y, window.innerHeight - from.y),
        );
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${from.x}px ${from.y}px)`,
              `circle(${r}px at ${from.x}px ${from.y}px)`,
            ],
          },
          {
            duration: 650,
            easing: "cubic-bezier(0.16,1,0.3,1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      });
      return;
    } catch {
      /* esés vissza az azonnali váltásra */
    }
  }
  apply(next);
}

/* Megosztott állapot: bárhány kapcsoló lehet az oldalon, mind szinkronban marad */
export function useTheme(): {
  theme: Theme;
  toggle: (from?: { x: number; y: number }) => void;
} {
  const theme = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => {
        listeners.delete(cb);
      };
    },
    () => current,
    (): Theme => "dark",
  );
  return { theme, toggle: toggleTheme };
}
