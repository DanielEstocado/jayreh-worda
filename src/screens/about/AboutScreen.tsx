import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { CustomButton } from "@/components";
import FileTree from "./components/FileTree";
import {
  FILE_STRUCTURE,
  STACK_ITEMS,
  CONVENTIONS,
  TYPE_SCALE,
  SPACING_SCALE,
} from "./constant";

// Documents this template's own folder structure, stack, and conventions, rendered from constant.ts so it stays data-driven.
const AboutScreen = () => {
  const navigate = useNavigate();

  // Sends the user back to the home screen.
  const handleNavigateToHome = () => {
    navigate("/");
  };
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-lg py-sm">
          <div>
            <p className="title text-h3">Jayreh</p>
            <p className="subtitle text-caption text-muted-foreground">
              We code to provide
            </p>
          </div>

          <CustomButton
            variant="ghost"
            size="md"
            className="subtitle rounded-full"
            onClick={handleNavigateToHome}
          >
            <ChevronLeft size={16} />
            Go Back
          </CustomButton>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-lg py-xl">
        <div className="grid w-full grid-cols-1 gap-lg lg:grid-cols-2">
          <div className="flex flex-col gap-lg">
            <div>
              <span className="subtitle mb-sm inline-block rounded-full bg-primary/10 px-4 py-1 text-caption font-semibold text-primary">
                Template Guide
              </span>
              <h1 className="title text-h1 text-balance">
                How this app is built
              </h1>
              <p className="subtitle mt-md max-w-lg text-body-lg text-muted-foreground">
                A walkthrough of the folder structure, conventions, and stack
                that make this template a reliable starting point.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-md">
              <h2 className="title text-h3">Stack</h2>
              <div className="mt-sm flex gap-sm flex-wrap">
                {STACK_ITEMS.map(({ label, description }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-border bg-muted px-4 py-2"
                  >
                    <p className="text-body font-semibold">{label}</p>
                    <p className="text-caption text-muted-foreground">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-md">
              <h2 className="title text-h3">Conventions</h2>
              <div className="mt-sm space-y-4">
                {CONVENTIONS.map(({ label, example }, i) => (
                  <div
                    key={label}
                    className={i !== 0 ? "border-t border-border pt-4" : ""}
                  >
                    <p className="text-body font-semibold text-foreground">
                      {label}
                    </p>
                    <p className="mt-0.5 font-mono text-caption text-muted-foreground">
                      {example}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-md">
            <h2 className="title text-h3">File structure</h2>
            <div className="mt-sm">
              <FileTree nodes={FILE_STRUCTURE} />
            </div>
          </div>
        </div>

        <div className="mt-lg grid grid-cols-1 gap-lg lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-md">
            <h2 className="title text-h3">Typography scale</h2>
            <p className="subtitle mt-1 text-caption text-muted-foreground">
              Size is one class (text-h1...), typeface is another (title /
              subtitle), combine them freely.
            </p>

            <div className="mt-sm space-y-3">
              {TYPE_SCALE.map(({ className, label, sample }, i) => (
                <div
                  key={label}
                  className={i !== 0 ? "border-t border-border pt-3" : ""}
                >
                  <p className={`title ${className}`}>{sample}</p>
                  <p className={`subtitle ${className}`}>{sample}</p>
                  <p className="subtitle text-caption text-muted-foreground">
                    {label} title / subtitle
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-md">
            <h2 className="title text-h3">Spacing scale</h2>
            <p className="subtitle mt-1 text-caption text-muted-foreground">
              One ladder (xs...xl), reused by p-, px-, py-, m-, and gap- alike.
            </p>

            <p className="subtitle mt-sm text-caption font-semibold text-foreground">
              Padding
            </p>
            <div className="mt-2 space-y-3">
              {SPACING_SCALE.map((size) => (
                <div key={size} className="flex items-center gap-sm">
                  <div
                    className={`rounded-lg border border-dashed border-border p-${size}`}
                  >
                    <div className="h-5 w-5 rounded-md bg-primary/30"></div>
                  </div>
                  <p className="subtitle text-caption text-muted-foreground">
                    p-{size}
                  </p>
                </div>
              ))}
            </div>

            <p className="subtitle mt-sm text-caption font-semibold text-foreground">
              Gap
            </p>
            <div className="mt-2 space-y-3">
              {SPACING_SCALE.map((size) => (
                <div key={size}>
                  <p className="subtitle mb-1 text-caption text-muted-foreground">
                    gap-{size}
                  </p>
                  <div className={`flex gap-${size}`}>
                    <div className="h-5 w-5 rounded-md bg-primary/30"></div>
                    <div className="h-5 w-5 rounded-md bg-primary/30"></div>
                    <div className="h-5 w-5 rounded-md bg-primary/30"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutScreen;
