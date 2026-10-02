import type { Group, Mentee, MenteeCompletion } from "@/types/mentoring";

// MOCK: my C2S groups (mentor 1 is MOCK_USER), delete once the API returns groups.
export const MOCK_GROUPS: Group[] = [
  { id: 1, activityId: 1, mentorId: 1, name: "Group A", createdAt: "2026-09-02" },
];

// MOCK: my mentees, none finished C2S so none have an account yet, delete once the API returns mentees.
export const MOCK_MENTEES: Mentee[] = [
  {
    id: 1,
    groupId: 1,
    firstName: "Maria",
    lastName: "Santos",
    address: "Brgy. Sample 1, Trece Martires",
    contactNumber: "09170000001",
    joinedAt: "2026-09-02",
  },
  {
    id: 2,
    groupId: 1,
    firstName: "Pedro",
    lastName: "Reyes",
    address: "Brgy. Sample 2, Trece Martires",
    contactNumber: "09170000002",
    joinedAt: "2026-09-02",
  },
  {
    id: 3,
    groupId: 1,
    firstName: "Ana",
    lastName: "Garcia",
    address: "Brgy. Sample 3, Tanza",
    contactNumber: "09170000003",
    joinedAt: "2026-09-09",
  },
  {
    id: 4,
    groupId: 1,
    firstName: "Luis",
    lastName: "Cruz",
    address: "Brgy. Sample 4, Naic",
    contactNumber: "09170000004",
    joinedAt: "2026-09-09",
  },
];

// MOCK: lessons the mentor marked done per mentee, uneven on purpose since members miss sessions.
export const MOCK_MENTEE_COMPLETIONS: MenteeCompletion[] = [
  // Maria is furthest along, one lesson left.
  { menteeId: 1, lessonId: 1, completedAt: "2026-09-05" },
  { menteeId: 1, lessonId: 2, completedAt: "2026-09-12" },
  { menteeId: 1, lessonId: 3, completedAt: "2026-09-19" },
  // Pedro missed lesson 2, so he is behind the group.
  { menteeId: 2, lessonId: 1, completedAt: "2026-09-05" },
  // Ana joined later and has done Module 1.
  { menteeId: 3, lessonId: 1, completedAt: "2026-09-12" },
  { menteeId: 3, lessonId: 2, completedAt: "2026-09-19" },
  // Luis has not started yet.
];
