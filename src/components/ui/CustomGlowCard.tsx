import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { TONES } from "@/lib/tones";
import type { ToneName } from "@/types/tone";

type CustomGlowCardProps = {
  tone: ToneName;
  children: ReactNode;
  // Makes the whole card a link that lifts on hover.
  to?: string;
  // Adds a colored left edge.
  edge?: boolean;
  className?: string;
};

// A white card with a colored glow fading in from the right, the one look shared by group, activity and points cards.
export default function CustomGlowCard({
  tone,
  children,
  to,
  edge = false,
  className,
}: CustomGlowCardProps) {
  const theme = TONES[tone];
  const classes = cn(
    "flex items-center gap-md rounded-3xl border border-border bg-card bg-linear-to-l to-transparent p-md shadow-lg",
    theme.glow,
    edge && cn("border-l-4", theme.edge),
    to && "transition hover:-translate-y-0.5 hover:shadow-xl",
    className,
  );

  return to ? (
    <Link to={to} className={classes}>
      {children}
    </Link>
  ) : (
    <div className={classes}>{children}</div>
  );
}
