import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { TONES } from "@/lib/tones";
import type { ToneName } from "@/types/tone";

type CustomChipProps = {
  tone: ToneName;
  children: ReactNode;
  // The small size is for dense cards, the default fits roomy ones.
  small?: boolean;
  // Overrides the tone's colors, e.g. the darker teal of a completed chip.
  className?: string;
};

// A small rounded pill with an icon and a label in one of the brand colors.
export default function CustomChip({
  tone,
  children,
  small = false,
  className,
}: CustomChipProps) {
  return (
    <span
      className={cn(
        "subtitle inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 font-medium",
        small ? "text-micro" : "text-caption",
        TONES[tone].chip,
        className,
      )}
    >
      {children}
    </span>
  );
}
