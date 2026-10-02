import { type ReactNode } from "react";

type CustomHeaderProps = {
  // The one action shown on the right, e.g. a back or theme button.
  action: ReactNode;
};

// The sticky top bar every screen shares: logo and tagline on the left, one action on the right.
const CustomHeader = ({ action }: CustomHeaderProps) => {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-lg py-sm">
        <div>
          <p className="title text-h3">Jayreh</p>
          <p className="subtitle text-caption text-muted-foreground">
            We code to provide
          </p>
        </div>

        {action}
      </div>
    </header>
  );
};

export default CustomHeader;
