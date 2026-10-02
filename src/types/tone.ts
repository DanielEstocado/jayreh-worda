// The three playful brand colors a card, chip or ring can wear.
export type ToneName = "pink" | "teal" | "yellow";

// Every class a tone needs, kept together so one color never drifts between components.
export type Tone = {
  // Tinted background and border, for a compact card.
  card: string;
  // Colored left edge of a glow card.
  edge: string;
  // Glow fading in from the right and the colored shadow of a glow card.
  glow: string;
  stroke: string;
  // Solid fill with readable text, for chips.
  chip: string;
  // Soft tint with deep text, for small badges.
  badge: string;
  // Solid fill only, for a progress bar.
  fill: string;
  // Text color, a deep shade of the tone, never plain black.
  ink: string;
  inkSoft: string;
};

// The slice of a tone a card's text and ring use, which the grey locked look also fills in.
export type CardTheme = Pick<Tone, "card" | "stroke" | "ink" | "inkSoft">;
