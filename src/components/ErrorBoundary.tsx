import { Component, type ReactNode } from "react";

/* Futásidejű render-hiba → a statikus error/500.html oldalra küld.
   Az error/ mappa az egyetlen forrása minden hibaoldalnak. */
export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { crashed: boolean }
> {
  state = { crashed: false };

  static getDerivedStateFromError() {
    return { crashed: true };
  }

  componentDidCatch(err: unknown) {
    console.error("[Cubimera] render hiba:", err);
    window.location.replace("/error/500.html");
  }

  render() {
    if (this.state.crashed) return null;
    return this.props.children;
  }
}
