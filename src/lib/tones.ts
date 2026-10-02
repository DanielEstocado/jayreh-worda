import type { CardTheme, Tone, ToneName } from "@/types/tone";

// The one place the brand colors become classes. Text is always a deep shade of the same color, never plain black.
export const TONES: Record<ToneName, Tone> = {
  pink: {
    card: "border-primary/25 bg-primary/10",
    edge: "border-l-primary",
    glow: "from-primary/15 shadow-primary/20",
    stroke: "stroke-primary",
    chip: "bg-primary text-primary-foreground",
    badge: "bg-primary/10 text-ink-pink",
    fill: "bg-primary",
    ink: "text-ink-pink",
    inkSoft: "text-ink-pink/75",
  },
  teal: {
    card: "border-accent/40 bg-accent/15",
    edge: "border-l-accent",
    glow: "from-accent/20 shadow-accent/25",
    stroke: "stroke-accent",
    chip: "bg-accent text-on-accent",
    badge: "bg-accent/20 text-ink-teal",
    fill: "bg-accent",
    ink: "text-ink-teal",
    inkSoft: "text-ink-teal/75",
  },
  yellow: {
    card: "border-highlight/40 bg-highlight/15",
    edge: "border-l-highlight",
    glow: "from-highlight/25 shadow-highlight/25",
    stroke: "stroke-highlight",
    chip: "bg-highlight text-on-highlight",
    badge: "bg-highlight/25 text-ink-yellow",
    fill: "bg-highlight",
    ink: "text-ink-yellow",
    inkSoft: "text-ink-yellow/75",
  },
};

// The order cards and modules rotate through, one tone per item.
export const TONE_ROTATION: ToneName[] = ["pink", "teal", "yellow"];

// Picks the tone for the nth item in a list, wrapping around.
export function getRotatingTone(index: number): ToneName {
  return TONE_ROTATION[index % TONE_ROTATION.length];
}

// The grey look of something that is not started yet, in place of its tone.
export const LOCKED_THEME: CardTheme = {
  card: "border-border bg-muted opacity-60 grayscale",
  stroke: "stroke-muted-foreground/40",
  ink: "text-muted-foreground",
  inkSoft: "text-muted-foreground/80",
};
