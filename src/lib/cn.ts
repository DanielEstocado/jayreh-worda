import { twMerge } from "tailwind-merge";

// Combines conditional class names and resolves any conflicting Tailwind utilities.
export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(classes.filter(Boolean).join(" "));
}
