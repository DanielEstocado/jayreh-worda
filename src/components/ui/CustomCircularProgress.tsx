import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type CustomCircularProgressProps = {
  percent: number;
  // Tailwind stroke class that colors the filled arc, e.g. "stroke-primary".
  strokeClass: string;
  // Tailwind stroke class for the empty track behind the arc, white by default for tinted cards.
  trackClass?: string;
  size?: number;
  children?: ReactNode;
};

// A ring that fills clockwise to the given percentage, with whatever is passed in shown in its center.
const CustomCircularProgress = ({
  percent,
  strokeClass,
  trackClass = "stroke-card",
  size = 64,
  children,
}: CustomCircularProgressProps) => {
  const [shown, setShown] = useState(0);

  // Starts the ring empty and fills it one frame later so it animates in on mount.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(percent));
    return () => cancelAnimationFrame(frame);
  }, [percent]);

  const strokeWidth = Math.round(size / 9);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={trackClass}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - shown / 100)}
          className={cn(strokeClass, "transition-[stroke-dashoffset] duration-1000 ease-out")}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
};

export default CustomCircularProgress;
