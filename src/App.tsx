import { useEffect, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Hero from "./components/Hero";
import Lab from "./components/Lab";
import Nav from "./components/Nav";
import { AppSection, Features, Footer, Stats, Steps } from "./components/Sections";

/* Csak a gyökér és az index.html a landing — minden más útvonal
   az error/ mappába irányít (lásd public/error/*.html).
   A Vite dev/preview szerver az index.html-t szolgálja ki ilyenkor,
   így localon is működik; éles static hoston a gyökér 404.html fog. */
function resolveRoute(): "home" | "404" | "500demo" {
  const path = window.location.pathname;
  if (new URLSearchParams(window.location.search).get("hiba") === "500") {
    return "500demo";
  }
  return path === "/" || path === "/index.html" ? "home" : "404";
}

export default function App() {
  const [route] = useState<"home" | "404" | "500demo">(() => resolveRoute());

  useEffect(() => {
    if (route === "404") window.location.replace("/error/404.html");
    else if (route === "500demo") window.location.replace("/error/500.html");
    else document.title = "Cubimera — Fotóból térfogat";
  }, [route]);

  if (route !== "home") return null;

  return (
    <div className="noise min-h-screen bg-[#eef2f3] text-[#0b0e10] antialiased dark:bg-[#050607] dark:text-white">
      <ErrorBoundary>
        <Nav />
        <main>
          <Hero />
          <Stats />
          <Features />
          <Steps />
          <Lab />
          <AppSection />
        </main>
        <Footer />
      </ErrorBoundary>
    </div>
  );
}
