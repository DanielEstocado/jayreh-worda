import { useState } from "react";
import { cn } from "@/lib/cn";

type AvatarSize = "sm" | "md" | "lg" | "xl";

type CustomAvatarProps = {
  name: string;
  src?: string;
  size?: AvatarSize;
  className?: string;
};

const SIZE_STYLES: Record<AvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-24 w-24 text-3xl",
};

// A round profile picture that falls back to the person's initials when there is no image.
export default function CustomAvatar({
  name,
  src,
  size = "md",
  className,
}: CustomAvatarProps) {
  // A picture that fails to load (e.g. an expired link) falls back to the initials.
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <span
      className={cn(
        "title inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary font-semibold text-secondary-foreground",
        SIZE_STYLES[size],
        className,
      )}
    >
      {src && !failed ? (
        <img
          src={src}
          alt={name}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        initials
      )}
    </span>
  );
}
