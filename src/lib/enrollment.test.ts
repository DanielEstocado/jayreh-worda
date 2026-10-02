import { describe, expect, it } from "vitest";
import { hasCompletedActivity } from "./enrollment";

const ENROLLMENTS = [
  {
    userId: 1,
    activityId: 2,
    joinedAt: "2026-01-01",
    completedAt: "2026-02-01",
  },
  { userId: 1, activityId: 3, joinedAt: "2026-03-01" },
];

describe("hasCompletedActivity", () => {
  it("is true only when the enrollment has a completed date", () => {
    expect(hasCompletedActivity(ENROLLMENTS, 1, 2)).toBe(true);
    expect(hasCompletedActivity(ENROLLMENTS, 1, 3)).toBe(false);
  });

  it("is false for another user or an activity they never joined", () => {
    expect(hasCompletedActivity(ENROLLMENTS, 2, 2)).toBe(false);
    expect(hasCompletedActivity(ENROLLMENTS, 1, 9)).toBe(false);
  });
});
