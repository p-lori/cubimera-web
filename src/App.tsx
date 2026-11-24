import { useEffect, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { CrashPage, NotFound } from "./components/ErrorPages";
import Hero from "./components/Hero";
import Lab from "./components/Lab";
import Nav from "./components/Nav";
import { AppSection, Features, Footer, Stats, Steps } from "./components/Sections";

/* Csak a gyökér és az index.html a landing — minden más útvonal 404.
   A Vite dev/preview szerver az index.html-t szolgálja ki ilyenkor,
   így ez localon is működik; éles static hoston a public/404.html fog. */
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
    if (route === "home") document.title = "Cubimera — Fotóból térfogat";
  }, [route]);

  return (
    <div className="noise min-h-screen bg-[#050607] text-white antialiased">
      <ErrorBoundary>
        {route === "404" ? (
          <NotFound />
        ) : route === "500demo" ? (
          /* local előnézet az 500-as oldalra: /?hiba=500 */
          <CrashPage onRetry={() => (window.location.href = "/")} />
        ) : (
          <>
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
          </>
        )}
      </ErrorBoundary>
    </div>
  );
}
