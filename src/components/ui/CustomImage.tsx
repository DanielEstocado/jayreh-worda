import { type SyntheticEvent } from "react";
import fallbackImage from "@/assets/placeholder.svg";

type CustomImageProps = { src: string; className?: string };

// Swaps an image that failed to load (e.g. an expired link) for the local placeholder, only once so a broken fallback can never loop.
function showFallback(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  if (image.dataset.fallback) return;

  image.dataset.fallback = "true";
  image.src = fallbackImage;
}

// A decorative photo that loads lazily, hides the referrer from the photo host and falls back to the local placeholder when the link is broken.
export default function CustomImage({ src, className }: CustomImageProps) {
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={showFallback}
      className={className}
    />
  );
}
