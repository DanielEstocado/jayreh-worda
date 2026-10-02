import type { ActivityWithStatus } from "@/types/activity";

// Says in one line where the user stands with an activity: what is next, what unlocked, or why it is still locked.
export function getActivityMessage(item: ActivityWithStatus): string {
  if (item.status === "not-started") {
    return item.blockedBy.length > 0
      ? `Finish ${item.blockedBy.join(", ")} first`
      : "Ready to start";
  }
  if (item.status === "completed") {
    return item.activity.completedMessage ?? "All done, great work!";
  }
  return item.next
    ? `Up next: Module ${item.next.module.number}, Lesson ${item.next.lesson.number}`
    : "Lessons coming soon";
}

// Counts finished lessons out of all lessons, e.g. "1/4 lessons", or nothing when the activity has no lessons or is not started.
export function getLessonCountLabel(
  item: ActivityWithStatus,
): string | undefined {
  const lessons = item.modules.flatMap((m) => m.lessons);
  if (lessons.length === 0 || item.status === "not-started") return undefined;

  return `${lessons.filter((l) => l.status === "done").length}/${lessons.length} lessons`;
}
