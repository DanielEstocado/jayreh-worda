import { describe, expect, it } from "vitest";
import type {
  Activity,
  ActivityLesson,
  ActivityModule,
} from "@/types/activity";
import type { Group, Mentee, MenteeCompletion } from "@/types/mentoring";
import {
  canEditGroup,
  getAveragePercent,
  getGroupMentees,
  getGroupRole,
} from "./groups";

const GROUP: Group = {
  id: 1,
  activityId: 1,
  mentor: { id: 10, firstName: "M", lastName: "Entor" },
  name: "Group A",
  createdAt: "2026-01-01",
};

// Builds a mentee in the given group, optionally linked to a user account.
function mentee(id: number, groupId: number, userId?: number): Mentee {
  return {
    id,
    groupId,
    firstName: "F",
    lastName: "L",
    address: "",
    contactNumber: "",
    userId,
    joinedAt: "2026-01-01",
  };
}

describe("getGroupRole", () => {
  const mentees = [mentee(1, 1, 20), mentee(2, 1), mentee(3, 2, 30)];

  it("makes the group's own mentor its mentor", () => {
    expect(getGroupRole(GROUP, mentees, 10)).toBe("mentor");
  });

  it("recognizes a mentee through their linked account", () => {
    expect(getGroupRole(GROUP, mentees, 20)).toBe("mentee");
  });

  it("has no role for a user who is in another group only", () => {
    expect(getGroupRole(GROUP, mentees, 30)).toBeUndefined();
  });

  it("has no role for a stranger", () => {
    expect(getGroupRole(GROUP, mentees, 99)).toBeUndefined();
  });
});

describe("canEditGroup", () => {
  it("lets only the mentor edit", () => {
    expect(canEditGroup("mentor")).toBe(true);
    expect(canEditGroup("mentee")).toBe(false);
    expect(canEditGroup(undefined)).toBe(false);
  });
});

describe("getAveragePercent", () => {
  it("is 0 for an empty group", () => {
    expect(getAveragePercent([])).toBe(0);
  });

  it("rounds the average", () => {
    expect(getAveragePercent([100, 50, 0])).toBe(50);
    expect(getAveragePercent([100, 0, 0])).toBe(33);
  });
});

describe("getGroupMentees", () => {
  const activity: Activity = { id: 1, label: "C2S", prerequisiteIds: [] };
  const modules: ActivityModule[] = [
    { id: 1, activityId: 1, number: "1", title: "M1" },
  ];
  const lessons: ActivityLesson[] = [
    { id: 1, moduleId: 1, number: "1", title: "L1", points: 50 },
    { id: 2, moduleId: 1, number: "2", title: "L2", points: 50 },
  ];
  const completions: MenteeCompletion[] = [
    { menteeId: 1, lessonId: 1, completedAt: "2026-01-02" },
    { menteeId: 3, lessonId: 2, completedAt: "2026-01-02" },
  ];

  it("lists only this group's mentees with their own progress", () => {
    const result = getGroupMentees({
      group: GROUP,
      activity,
      mentees: [mentee(1, 1, 20), mentee(2, 1), mentee(3, 2)],
      completions,
      modules,
      lessons,
      userId: 20,
    });

    expect(result.map((m) => m.mentee.id)).toEqual([1, 2]);
    expect(result.map((m) => m.progress.percent)).toEqual([50, 0]);
  });

  it("flags the mentee who is the signed-in user", () => {
    const result = getGroupMentees({
      group: GROUP,
      activity,
      mentees: [mentee(1, 1, 20), mentee(2, 1)],
      completions,
      modules,
      lessons,
      userId: 20,
    });

    expect(result.map((m) => m.isMe)).toEqual([true, false]);
  });
});
