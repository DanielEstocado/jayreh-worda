import type { Enrollment, LessonCompletion } from "@/types/progress";

// MOCK: which activities the demo user joined (C2S101 is finished, so he is a mentor), delete once the API returns enrollments.
export const MOCK_ENROLLMENTS: Enrollment[] = [
  { userId: 1, activityId: 1, joinedAt: "2026-09-01" },
  { userId: 1, activityId: 2, joinedAt: "2026-06-01", completedAt: "2026-08-15" },
];

// MOCK: lessons the demo user finished (C2S, Module 1 Lesson 1), delete once the API returns completions.
export const MOCK_COMPLETIONS: LessonCompletion[] = [
  { userId: 1, lessonId: 1, completedAt: "2026-09-05" },
];
