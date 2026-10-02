import type { SyntheticEvent } from "react";
import fallbackImage from "@/assets/placeholder.svg";

// Swaps an image that failed to load (e.g. an expired link) for the local placeholder, only once so a broken fallback can never loop.
export function showFallbackImage(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  if (image.dataset.fallback) return;

  image.dataset.fallback = "true";
  image.src = fallbackImage;
}
