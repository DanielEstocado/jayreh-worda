import { Flame, Lock, Trophy } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ActivityStatus } from "@/types/activity";
import type { ToneName } from "@/types/tone";
import CustomChip from "../CustomChip";

type StatusChipProps = {
  status: ActivityStatus;
  tone: ToneName;
  isLarge: boolean;
};

// The status pill with its icon. A completed one is always white text on the darker teal, whichever color its card has.
export default function StatusChip({ status, tone, isLarge }: StatusChipProps) {
  const isComplete = status === "completed";
  const isLocked = status === "not-started";

  return (
    <CustomChip
      tone={tone}
      small={!isLarge}
      className={cn(
        "px-2",
        isComplete && "bg-info text-white",
        isLocked && "bg-card text-muted-foreground",
      )}
    >
      {isLocked ? (
        <Lock size={10} />
      ) : isComplete ? (
        <Trophy size={10} />
      ) : (
        <Flame size={10} />
      )}
      {isLocked ? "Not started" : isComplete ? "Completed" : "In progress"}
    </CustomChip>
  );
}
