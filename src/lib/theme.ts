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

export function setTheme(t: Theme) {
  if (t !== current) apply(t);
}

export function toggleTheme() {
  apply(current === "dark" ? "light" : "dark");
}

/* Megosztott állapot: bárhány kapcsoló lehet az oldalon, mind szinkronban marad */
export function useTheme(): { theme: Theme; toggle: () => void } {
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
