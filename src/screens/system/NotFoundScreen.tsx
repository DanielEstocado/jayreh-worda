import { Link } from "react-router-dom";
import { AlertTriangle, ChevronLeft } from "lucide-react";

// Rendered for any URL that doesn't match a route, via the catch-all "*" entry.
export default function NotFoundScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-lg py-10">
      <div className="w-full max-w-xl rounded-4xl border border-border bg-card p-10 shadow-sm">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <AlertTriangle className="h-10 w-10 text-primary" />
          </div>
        </div>

        <div className="text-center">
          <p className="title text-display tracking-tight text-primary">
            404
          </p>

          <h1 className="title mt-4 text-h1 text-foreground">
            Page Not Found
          </h1>

          <p className="subtitle mx-auto mt-3 max-w-md text-body-lg text-muted-foreground">
            The page you are trying to access does not exist or may have been
            moved.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/"
            className="subtitle inline-flex h-11 items-center rounded-full bg-primary px-6 font-medium text-primary-foreground transition hover:opacity-90"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Go Back
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-border pt-5 text-center">
          <p className="subtitle text-caption text-muted-foreground">
            If you think this is a mistake, please contact system
            administration.
          </p>
        </div>
      </div>
    </div>
  );
}
