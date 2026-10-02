import { Suspense, useState } from "react";
import { matchPath, Outlet, useLocation } from "react-router-dom";
import ShellDock from "@/components/shell/ShellDock";
import ShellHeader from "@/components/shell/ShellHeader";
import ShellPromoColumn from "@/components/shell/ShellPromoColumn";
import ShellSidebar from "@/components/shell/ShellSidebar";
import { ShellTitleContext } from "@/components/shell/shellTitleContext";
import { ROUTES } from "./routes.config";

// The frame every signed-in screen sits in, mounted once: sidebar, a content column under a sticky header, a promo column on wide screens and a dock on mobile. Screens render through the outlet.
export default function ShellLayout() {
  const { pathname } = useLocation();
  const [screenTitle, setScreenTitle] = useState<string>();

  const route = ROUTES.find((r) => matchPath(r.path, pathname));

  return (
    <ShellTitleContext value={setScreenTitle}>
      <div className="min-h-screen bg-background text-foreground lg:flex lg:justify-center">
        <ShellSidebar />

        <main className="min-h-screen min-w-0 max-w-3xl flex-1 border-border bg-card pb-24 lg:border-x lg:pb-0">
          <ShellHeader
            title={screenTitle ?? route?.title ?? ""}
            backTo={route?.backTo}
          />
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>

        <ShellPromoColumn />
        <ShellDock />
      </div>
    </ShellTitleContext>
  );
}
