import type { Enrollment } from "@/types/progress";

// Says whether a user has finished an activity, e.g. C2S101 is what makes someone a mentor.
export function hasCompletedActivity(
  enrollments: Enrollment[],
  userId: number,
  activityId: number,
): boolean {
  return enrollments.some(
    (e) => e.userId === userId && e.activityId === activityId && Boolean(e.completedAt),
  );
}
