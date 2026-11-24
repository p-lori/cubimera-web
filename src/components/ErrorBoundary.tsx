import { Component, type ReactNode } from "react";
import { CrashPage } from "./ErrorPages";

/* Futásidejű render-hiba → 500-as oldal az üres képernyő helyett */
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
  }

  render() {
    if (this.state.crashed) {
      return <CrashPage onRetry={() => window.location.reload()} />;
    }
    return this.props.children;
  }
}
