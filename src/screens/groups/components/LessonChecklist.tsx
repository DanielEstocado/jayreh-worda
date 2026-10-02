import { useState } from "react";
import { Search } from "lucide-react";
import type { ActivityProgress } from "@/types/activity";

type LessonChecklistProps = {
  progress: ActivityProgress;
  // Only a group's mentor can tick or untick, everyone else sees the boxes locked.
  canEdit: boolean;
  onToggle: (lessonId: number) => void;
};

// A searchable, scrollable list of every lesson with a checkbox for done or not done.
export default function LessonChecklist({
  progress,
  canEdit,
  onToggle,
}: LessonChecklistProps) {
  const [query, setQuery] = useState("");

  const rows = progress.modules.flatMap((m) =>
    m.lessons.map((l) => ({
      id: l.id,
      moduleNumber: m.number,
      moduleTitle: m.title,
      number: l.number,
      title: l.title,
      done: l.status === "done",
    })),
  );
  const text = query.trim().toLowerCase();
  const shown = text
    ? rows.filter((r) =>
        `module ${r.moduleNumber} ${r.moduleTitle} lesson ${r.number} ${r.title}`
          .toLowerCase()
          .includes(text),
      )
    : rows;
  const doneCount = rows.filter((r) => r.done).length;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Search
          size={16}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search lessons"
          aria-label="Search lessons"
          data-autofocus
          className="subtitle w-full rounded-xl border border-border bg-card py-2 pr-3 pl-9 text-body text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        />
      </div>

      <p className="subtitle text-caption text-muted-foreground">
        {doneCount}/{rows.length} done{canEdit ? "" : " · view only"}
      </p>

      <ul className="max-h-72 divide-y divide-border overflow-y-auto rounded-xl border border-border">
        {shown.length === 0 ? (
          <li className="subtitle p-sm text-center text-caption text-muted-foreground">
            No lessons match.
          </li>
        ) : (
          shown.map((r) => (
            <li key={r.id}>
              <label className="flex cursor-pointer items-start gap-sm px-sm py-2 hover:bg-muted">
                <input
                  type="checkbox"
                  checked={r.done}
                  disabled={!canEdit}
                  onChange={() => onToggle(r.id)}
                  className="mt-1 h-4 w-4 accent-primary disabled:cursor-default"
                />
                <span className="min-w-0">
                  <span className="subtitle block text-caption text-muted-foreground">
                    Module {r.moduleNumber} · Lesson {r.number}
                  </span>
                  <span className="subtitle block text-body text-foreground">
                    {r.title}
                  </span>
                </span>
              </label>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
