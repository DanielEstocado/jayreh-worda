import { describe, expect, it } from "vitest";
import type {
  Activity,
  ActivityLesson,
  ActivityModule,
} from "@/types/activity";
import { getActivityProgress } from "./progress";

const ACTIVITY: Activity = { id: 1, label: "C2S", prerequisiteIds: [] };
const MODULES: ActivityModule[] = [
  { id: 1, activityId: 1, number: "1", title: "M1" },
  { id: 2, activityId: 1, number: "2", title: "M2" },
  { id: 3, activityId: 2, number: "1", title: "Other activity" },
];
const LESSONS: ActivityLesson[] = [
  { id: 1, moduleId: 1, number: "1", title: "L1", points: 50 },
  { id: 2, moduleId: 1, number: "2", title: "L2", points: 50 },
  { id: 3, moduleId: 2, number: "1", title: "L3", points: 100 },
  { id: 4, moduleId: 3, number: "1", title: "Not ours", points: 999 },
];

// Computes progress for the C2S fixture given which lessons are done.
function progressFor(completedLessonIds: number[]) {
  return getActivityProgress({
    activity: ACTIVITY,
    modules: MODULES,
    lessons: LESSONS,
    completedLessonIds,
  });
}

describe("getActivityProgress", () => {
  it("is 0 percent with the first lesson up next when nothing is done", () => {
    const result = progressFor([]);
    expect(result.percent).toBe(0);
    expect(result.isComplete).toBe(false);
    expect(result.next?.lesson.id).toBe(1);
  });

  it("weights the percentage by lesson points", () => {
    expect(progressFor([1, 2]).percent).toBe(50);
  });

  it("ignores lessons that belong to another activity", () => {
    expect(progressFor([4]).percent).toBe(0);
  });

  it("is complete at 100 percent with nothing left up next", () => {
    const result = progressFor([1, 2, 3]);
    expect(result.percent).toBe(100);
    expect(result.isComplete).toBe(true);
    expect(result.next).toBeUndefined();
  });

  it("marks lessons done, current or locked in order", () => {
    const statuses = progressFor([1]).modules.flatMap((m) =>
      m.lessons.map((l) => l.status),
    );
    expect(statuses).toEqual(["done", "current", "locked"]);
  });

  it("is never complete for an activity without lessons", () => {
    const result = getActivityProgress({
      activity: { id: 9, label: "Empty", prerequisiteIds: [] },
      modules: [],
      lessons: [],
      completedLessonIds: [],
    });
    expect(result.percent).toBe(0);
    expect(result.isComplete).toBe(false);
  });
});
