import { ACTIVITIES, LESSONS, MODULES } from "@/constants/activity";
import { MOCK_COMPLETIONS, MOCK_ENROLLMENTS } from "@/constants/progress";
import { getActivityProgress } from "@/lib/progress";
import type { ActivityStatus, ActivityWithStatus } from "@/types/activity";
import { useCurrentUser } from "./user";

const STATUS_ORDER: Record<ActivityStatus, number> = {
  ongoing: 0,
  completed: 1,
  "not-started": 2,
};

// Returns every activity with the signed-in user's progress: ongoing first, then finished, then not started yet.
export function useMyActivityProgress(): ActivityWithStatus[] {
  const user = useCurrentUser();

  const completedLessonIds = MOCK_COMPLETIONS.filter(
    (c) => c.userId === user.id,
  ).map((c) => c.lessonId);
  const enrollments = MOCK_ENROLLMENTS.filter((e) => e.userId === user.id);

  return ACTIVITIES.map((activity): ActivityWithStatus => {
    const progress = getActivityProgress({
      activity,
      modules: MODULES,
      lessons: LESSONS,
      completedLessonIds,
    });
    const enrollment = enrollments.find((e) => e.activityId === activity.id);

    if (!enrollment) {
      const blockedBy = activity.prerequisiteIds
        .filter(
          (id) =>
            !enrollments.some((e) => e.activityId === id && e.completedAt),
        )
        .flatMap((id) => ACTIVITIES.find((a) => a.id === id)?.label ?? []);
      return {
        ...progress,
        percent: 0,
        next: undefined,
        status: "not-started",
        blockedBy,
      };
    }

    // In-person activities like C2S101 have no lessons in the app, the completed date is the truth.
    if (enrollment.completedAt) {
      return {
        ...progress,
        percent: 100,
        isComplete: true,
        next: undefined,
        status: "completed",
        blockedBy: [],
      };
    }

    return { ...progress, status: "ongoing", blockedBy: [] };
  }).sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);
}
