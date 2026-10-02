import type {
  Activity,
  ActivityLesson,
  ActivityModule,
  ActivityProgress,
} from "@/types/activity";

type Input = {
  activity: Activity;
  modules: ActivityModule[];
  lessons: ActivityLesson[];
  completedLessonIds: number[];
};

// Works out a user's percentage, next lesson and per-lesson status for one activity, in module then lesson order.
export function getActivityProgress({
  activity,
  modules,
  lessons,
  completedLessonIds,
}: Input): ActivityProgress {
  const completed = new Set(completedLessonIds);
  const activityModules = modules.filter((m) => m.activityId === activity.id);
  const ordered = activityModules.flatMap((m) =>
    lessons.filter((l) => l.moduleId === m.id),
  );

  const totalPoints = ordered.reduce((sum, l) => sum + l.points, 0);
  const donePoints = ordered
    .filter((l) => completed.has(l.id))
    .reduce((sum, l) => sum + l.points, 0);
  const nextLesson = ordered.find((l) => !completed.has(l.id));

  return {
    activity,
    percent:
      totalPoints === 0 ? 0 : Math.round((donePoints / totalPoints) * 100),
    isComplete: ordered.length > 0 && !nextLesson,
    next: nextLesson && {
      module: activityModules.find((m) => m.id === nextLesson.moduleId)!,
      lesson: nextLesson,
    },
    modules: activityModules.map((m) => ({
      ...m,
      lessons: lessons
        .filter((l) => l.moduleId === m.id)
        .map((l) => ({
          ...l,
          status: completed.has(l.id)
            ? "done"
            : l.id === nextLesson?.id
              ? "current"
              : "locked",
        })),
    })),
  };
}
