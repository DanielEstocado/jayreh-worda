import { Component, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { CustomButton } from "@/components";

type Props = { children: ReactNode };
type State = { hasError: boolean };

// Shows a reload prompt instead of a blank screen when a child throws, e.g. a lazy chunk that failed to load.
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  // Flips the boundary into its fallback state the moment a child throws during render.
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Reloads the page, the reliable fix for a stale or failed chunk.
  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-lg text-center">
        <div className="max-w-sm">
          <div className="mx-auto mb-sm flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <AlertTriangle className="h-7 w-7 text-primary" />
          </div>
          <h1 className="title text-h2 text-foreground">
            Something went wrong
          </h1>
          <p className="subtitle mt-sm text-body text-muted-foreground">
            This usually clears up with a refresh.
          </p>
          <CustomButton
            variant="primary"
            className="subtitle mt-md rounded-full"
            onClick={this.handleReload}
          >
            Reload
          </CustomButton>
        </div>
      </div>
    );
  }
}
