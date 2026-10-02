import { Lock, Trophy } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ActivityStatus } from "@/types/activity";
import type { CardTheme } from "@/types/tone";
import CustomCircularProgress from "../CustomCircularProgress";

type ProgressRingProps = {
  percent: number;
  status: ActivityStatus;
  isLarge: boolean;
  theme: CardTheme;
};

// The progress ring with a lock, a trophy or the percentage in the middle depending on the status.
export default function ProgressRing({
  percent,
  status,
  isLarge,
  theme,
}: ProgressRingProps) {
  return (
    <CustomCircularProgress
      percent={percent}
      strokeClass={theme.stroke}
      trackClass={isLarge ? "stroke-muted" : "stroke-card"}
      size={isLarge ? 104 : 64}
    >
      {status === "not-started" ? (
        <Lock size={isLarge ? 28 : 18} className="text-muted-foreground" />
      ) : status === "completed" ? (
        <Trophy size={isLarge ? 36 : 22} className={theme.ink} />
      ) : (
        <span
          className={cn(
            "title font-bold",
            theme.ink,
            isLarge ? "text-h3" : "text-body",
          )}
        >
          {percent}%
        </span>
      )}
    </CustomCircularProgress>
  );
}
