import { CircleCheck, CirclePlay, Lock } from "lucide-react";
import { cn } from "@/lib/cn";
import type { LessonProgress } from "@/types/activity";

const STATUS_ICON = {
  done: <CircleCheck size={16} className="text-success" />,
  current: <CirclePlay size={16} className="text-primary" />,
  locked: <Lock size={16} className="text-muted-foreground/70" />,
};

type LessonRowProps = { lesson: LessonProgress };

// One compact lesson line with its status icon: the current one is boldest, done ones fade back, locked ones fade the most.
const LessonRow = ({ lesson }: LessonRowProps) => {
  return (
    <li
      className={cn(
        "subtitle flex items-center gap-2 rounded-xl px-2 py-1.5 text-body",
        lesson.status === "current" && "bg-primary/10 font-semibold text-foreground",
        lesson.status === "done" && "text-foreground/70",
        lesson.status === "locked" && "text-muted-foreground/70",
      )}
    >
      {STATUS_ICON[lesson.status]}
      <span className="min-w-0 flex-1 truncate">
        Lesson {lesson.number}: {lesson.title}
      </span>
      <span className="shrink-0 text-caption text-muted-foreground/70">{lesson.points} pts</span>
    </li>
  );
};

export default LessonRow;
