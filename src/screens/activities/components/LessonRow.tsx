import { Check, Lock, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import type { LessonProgress } from "@/types/activity";

type LessonRowProps = { lesson: LessonProgress };

const STATUS_TILE = {
  done: { icon: <Check size={16} />, tile: "bg-success/15 text-success" },
  current: {
    icon: <Play size={14} className="fill-current" />,
    tile: "bg-primary text-primary-foreground",
  },
  locked: { icon: <Lock size={14} />, tile: "bg-muted text-muted-foreground" },
};

// One roomy lesson row: a status tile, the lesson number and title, and its XP. The current lesson is highlighted with an "Up next" tag, finished ones fade back and locked ones fade the most.
export default function LessonRow({ lesson }: LessonRowProps) {
  const { icon, tile } = STATUS_TILE[lesson.status];
  const isCurrent = lesson.status === "current";

  return (
    <li
      className={cn(
        "flex items-center gap-sm rounded-2xl border px-sm py-3",
        isCurrent ? "border-primary/30 bg-primary/10" : "border-transparent",
        lesson.status === "locked" && "opacity-60",
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
          tile,
        )}
      >
        {icon}
      </span>

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "subtitle text-caption",
            isCurrent ? "text-ink-pink/70" : "text-muted-foreground",
          )}
        >
          Lesson {lesson.number}
        </p>
        <p
          className={cn(
            "subtitle text-body",
            isCurrent && "font-semibold text-ink-pink",
            lesson.status === "done" && "text-foreground/70",
            lesson.status === "locked" && "text-muted-foreground",
          )}
        >
          {lesson.title}
        </p>
      </div>

      {isCurrent && (
        <span className="subtitle hidden shrink-0 rounded-full bg-primary px-2.5 py-0.5 text-micro font-medium text-primary-foreground sm:inline">
          Up next
        </span>
      )}
      <span className="title shrink-0 rounded-full bg-highlight/15 px-2.5 py-0.5 text-caption font-bold text-ink-yellow">
        {lesson.points} XP
      </span>
    </li>
  );
}
