import { ChevronRight } from "lucide-react";
import type { ActivityProgress } from "@/types/activity";
import ProgressBar from "./ProgressBar";

type ActivityCardProps = {
  progress: ActivityProgress;
  onOpen: () => void;
};

// One joined activity: its name, percentage, and where the user is up to, clickable to open the detail.
const ActivityCard = ({ progress, onOpen }: ActivityCardProps) => {
  const { activity, percent, next, isComplete } = progress;

  return (
    <button
      onClick={onOpen}
      className="flex w-full cursor-pointer flex-col gap-sm rounded-2xl border border-border bg-card p-md text-left transition hover:opacity-90"
    >
      <div className="flex items-center justify-between gap-sm">
        <h2 className="title text-h3">{activity.label}</h2>
        <span className="subtitle flex items-center gap-1 text-body text-muted-foreground">
          {percent}%
          <ChevronRight size={16} />
        </span>
      </div>

      <ProgressBar percent={percent} />

      <p className="subtitle text-caption text-muted-foreground">
        {isComplete
          ? "Completed"
          : next
            ? `Up next: Module ${next.module.number}, Lesson ${next.lesson.number}`
            : "Lessons coming soon"}
      </p>
    </button>
  );
};

export default ActivityCard;
