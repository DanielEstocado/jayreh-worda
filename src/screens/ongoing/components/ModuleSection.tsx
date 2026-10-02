import type { ModuleProgress } from "@/types/activity";
import LessonRow from "./LessonRow";

type ModuleSectionProps = { module: ModuleProgress };

// A module's title and its lessons, or a note when the lessons haven't been added yet.
const ModuleSection = ({ module }: ModuleSectionProps) => {
  return (
    <section className="rounded-2xl border border-border bg-card p-md">
      <h2 className="title text-h3">
        Module {module.number}: {module.title}
      </h2>

      {module.lessons.length === 0 ? (
        <p className="subtitle mt-sm text-body text-muted-foreground">Lessons coming soon.</p>
      ) : (
        <ul className="mt-sm flex flex-col gap-1">
          {module.lessons.map((lesson) => (
            <LessonRow key={lesson.id} lesson={lesson} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default ModuleSection;
