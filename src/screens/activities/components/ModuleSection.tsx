import { cn } from "@/lib/cn";
import { getRotatingTone, TONES } from "@/lib/tones";
import type { ModuleProgress } from "@/types/activity";
import LessonRow from "./LessonRow";

type ModuleSectionProps = { module: ModuleProgress; index: number };

// A module as a roomy card: a numbered badge, its title and how many lessons are done, a progress bar, then its lessons or a note when none exist yet.
export default function ModuleSection({ module, index }: ModuleSectionProps) {
  // Each module rotates through the palette: a tinted number badge and a matching progress bar fill.
  const theme = TONES[getRotatingTone(index)];
  const total = module.lessons.length;
  const done = module.lessons.filter((l) => l.status === "done").length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <section className="rounded-3xl border border-border bg-card p-md">
      <div className="flex items-center gap-sm">
        <span
          className={cn(
            "title flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-body-lg font-bold",
            theme.badge,
          )}
        >
          {module.number}
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="title truncate text-body-lg font-bold text-foreground">
            {module.title}
          </h2>
          <p className="subtitle text-caption text-muted-foreground">
            {total > 0
              ? `${done} of ${total} lessons done`
              : "Lessons coming soon"}
          </p>
        </div>

        {total > 0 && (
          <span className="title shrink-0 text-body-lg font-bold text-foreground">
            {percent}%
          </span>
        )}
      </div>

      {total > 0 && (
        <>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            className="mt-sm h-2 w-full overflow-hidden rounded-full bg-muted"
          >
            <div
              className={cn("h-full rounded-full transition-all", theme.fill)}
              style={{ width: `${percent}%` }}
            />
          </div>

          <ul className="mt-md flex flex-col gap-2">
            {module.lessons.map((lesson) => (
              <LessonRow key={lesson.id} lesson={lesson} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
