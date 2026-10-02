import { PLACEHOLDER_IMAGE } from "@/constants/images";
import type { Group, Mentee, MenteeCompletion } from "@/types/mentoring";

// MOCK: C2S groups, one I run (mentor id 1 is MOCK_USER) and one run by King Ezekiel Domingo that I am a mentee in, delete once the API returns groups.
export const MOCK_GROUPS: Group[] = [
  {
    id: 1,
    activityId: 1,
    mentor: { id: 1, firstName: "Dan", lastName: "Estocado", avatarUrl: PLACEHOLDER_IMAGE },
    name: "Group A",
    createdAt: "2026-09-02",
  },
  {
    id: 2,
    activityId: 1,
    mentor: { id: 20, firstName: "King Ezekiel", lastName: "Domingo", avatarUrl: PLACEHOLDER_IMAGE },
    name: "King's Group",
    createdAt: "2026-08-20",
  },
];

// MOCK: mentees of both groups. In my own group none finished C2S so none have an account. In King's group I am a mentee with my account linked (userId 1), Darwin and John Gabriel are my fellow mentees. Delete once the API returns mentees.
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
  {
    id: 5,
    groupId: 2,
    firstName: "Dan",
    lastName: "Estocado",
    address: "Trece Martires City, Cavite",
    contactNumber: "09170000000",
    userId: 1,
    joinedAt: "2026-08-25",
  },
  {
    id: 6,
    groupId: 2,
    firstName: "Darwin",
    lastName: "Abarientos",
    address: "Brgy. Sample 6, Trece Martires",
    contactNumber: "09170000006",
    joinedAt: "2026-08-25",
  },
  {
    id: 7,
    groupId: 2,
    firstName: "John Gabriel",
    lastName: "Estocado",
    address: "Brgy. Sample 7, Trece Martires",
    contactNumber: "09170000007",
    joinedAt: "2026-08-25",
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
  // Me (mentee 5) in King's group, same as my own progress on the Activities screen: lesson 1 done.
  { menteeId: 5, lessonId: 1, completedAt: "2026-09-05" },
  // Darwin is a step ahead of me, Module 1 done.
  { menteeId: 6, lessonId: 1, completedAt: "2026-09-05" },
  { menteeId: 6, lessonId: 2, completedAt: "2026-09-12" },
  // John Gabriel has not started yet.
];
