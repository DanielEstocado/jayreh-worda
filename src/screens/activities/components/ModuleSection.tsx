import { cn } from "@/lib/cn";
import type { ModuleProgress } from "@/types/activity";
import LessonRow from "./LessonRow";

// The number badge rotates through the palette, one color per module.
const BADGE_THEMES = ["bg-primary/10 text-primary", "bg-accent/20 text-foreground", "bg-highlight/25 text-foreground"];

type ModuleSectionProps = { module: ModuleProgress; index: number };

// A compact module card: a colored number badge, the title, how many lessons are done, then its lessons or a note when none exist yet.
const ModuleSection = ({ module, index }: ModuleSectionProps) => {
  const doneCount = module.lessons.filter((l) => l.status === "done").length;

  return (
    <section className="rounded-2xl border border-border bg-card p-2.5">
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "title flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-body font-bold",
            BADGE_THEMES[index % BADGE_THEMES.length],
          )}
        >
          {module.number}
        </span>
        <h2 className="title min-w-0 flex-1 truncate text-body font-bold text-foreground">{module.title}</h2>
        {module.lessons.length > 0 && (
          <span className="subtitle shrink-0 text-caption font-medium text-muted-foreground">
            {doneCount}/{module.lessons.length}
          </span>
        )}
      </div>

      {module.lessons.length === 0 ? (
        <p className="subtitle mt-1.5 text-caption text-muted-foreground">Lessons coming soon.</p>
      ) : (
        <ul className="mt-1.5 flex flex-col">
          {module.lessons.map((lesson) => (
            <LessonRow key={lesson.id} lesson={lesson} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default ModuleSection;
