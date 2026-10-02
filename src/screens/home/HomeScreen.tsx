import { CustomButton } from "@/components";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// The landing screen, a centered hero plus a live preview of the theme's color tokens.
function HomeScreen() {
  const navigate = useNavigate();

  const [dark, setDark] = useState(false);

  // Flips the preview between the light and dark theme.
  const handleToggleDark = () => {
    setDark((prev) => !prev);
  };

  // Sends the user to the About screen, which documents this template's own structure.
  const handleNavigateToAbout = () => {
    navigate("/about");
  };

  return (
    <main className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-lg py-sm">
            <div>
              <p className="title text-h3">Jayreh</p>
              <p className="subtitle text-caption text-muted-foreground">
                We code to provide
              </p>
            </div>

            <button
              onClick={handleToggleDark}
              className="subtitle flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm transition hover:opacity-80"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
              {dark ? "Light" : "Dark"}
            </button>
          </div>
        </header>

        <section className="mx-auto flex max-w-3xl flex-col items-center px-lg py-xl text-center">
          <span className="subtitle mb-sm w-fit rounded-full bg-primary/10 px-4 py-1 text-caption font-semibold text-primary">
            React + Vite + Tailwind
          </span>

          <h1 className="title text-display text-balance">
            A clean starting point, not a blank page
          </h1>

          <p className="subtitle mt-md max-w-xl text-body-lg text-muted-foreground text-balance">
            Routing, theming, forms, data fetching, and global state are
            already wired and ready. Spend the first day building the
            product, not the scaffolding.
          </p>

          <div className="mt-lg flex flex-wrap items-center justify-center gap-md">
            <CustomButton
              variant="primary"
              className="subtitle rounded-full"
              onClick={handleNavigateToAbout}
            >
              About this template
            </CustomButton>
            <CustomButton variant="muted" className="subtitle rounded-full">
              Muted Button
            </CustomButton>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-lg pb-lg">
          <div className="rounded-2xl border border-border bg-card p-md">
            <h2 className="title text-h3">Color tokens</h2>

            <div className="mt-sm grid grid-cols-1 gap-lg sm:grid-cols-2">
              <div>
                <p className="subtitle mb-sm text-caption text-muted-foreground">
                  Brand
                </p>
                <div className="flex gap-sm">
                  <div className="h-14 w-14 rounded-xl bg-primary"></div>
                  <div className="h-14 w-14 rounded-xl bg-secondary"></div>
                  <div className="h-14 w-14 rounded-xl bg-muted"></div>
                </div>
              </div>

              <div>
                <p className="subtitle mb-sm text-caption text-muted-foreground">
                  States
                </p>
                <div className="grid grid-cols-2 gap-sm">
                  <div>
                    <div className="mb-2 h-2 w-16 rounded-full bg-success"></div>
                    <p className="subtitle text-body text-muted-foreground">
                      Success
                    </p>
                  </div>
                  <div>
                    <div className="mb-2 h-2 w-16 rounded-full bg-warning"></div>
                    <p className="subtitle text-body text-muted-foreground">
                      Warning
                    </p>
                  </div>
                  <div>
                    <div className="mb-2 h-2 w-16 rounded-full bg-error"></div>
                    <p className="subtitle text-body text-muted-foreground">
                      Error
                    </p>
                  </div>
                  <div>
                    <div className="mb-2 h-2 w-16 rounded-full bg-info"></div>
                    <p className="subtitle text-body text-muted-foreground">
                      Info
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default HomeScreen;
