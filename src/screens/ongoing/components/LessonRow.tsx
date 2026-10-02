import { CircleCheck, CirclePlay, Lock } from "lucide-react";
import { cn } from "@/lib/cn";
import type { LessonProgress } from "@/types/activity";

const STATUS_ICON = {
  done: <CircleCheck size={18} className="text-success" />,
  current: <CirclePlay size={18} className="text-primary" />,
  locked: <Lock size={18} className="text-muted-foreground" />,
};

type LessonRowProps = { lesson: LessonProgress };

// One lesson line with its status icon, highlighted when it is the one the user is on.
const LessonRow = ({ lesson }: LessonRowProps) => {
  return (
    <li
      className={cn(
        "subtitle flex items-center gap-sm rounded-xl px-sm py-2 text-body",
        lesson.status === "current" && "bg-primary/10 font-semibold",
        lesson.status === "locked" && "text-muted-foreground",
      )}
    >
      {STATUS_ICON[lesson.status]}
      <span className="flex-1">
        Lesson {lesson.number}: {lesson.title}
      </span>
      <span className="text-caption text-muted-foreground">{lesson.points} pts</span>
    </li>
  );
};

export default LessonRow;
