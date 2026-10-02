import { extendTailwindMerge } from "tailwind-merge";

// Teaches tailwind-merge our type scale from index.css, otherwise it mistakes text-body for a colour and drops it.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h1", "h2", "h3", "body-lg", "body", "caption"] }],
    },
  },
});

// Combines conditional class names and resolves any conflicting Tailwind utilities.
export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(classes.filter(Boolean).join(" "));
}
