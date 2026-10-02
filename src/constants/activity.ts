import type {
  Activity,
  ActivityLesson,
  ActivityModule,
} from "@/types/activity";

export const ACTIVITIES: Activity[] = [
  { id: 1, label: "C2S", prerequisiteIds: [] },
  {
    id: 2,
    label: "C2S101",
    prerequisiteIds: [],
    completedMessage: "Mentor badge unlocked!",
  },
  { id: 3, label: "CLDP", prerequisiteIds: [2] },
];

export const MODULES: ActivityModule[] = [
  { id: 1, activityId: 1, number: "1", title: "A Born Again Experience" },
  { id: 2, activityId: 1, number: "2", title: "Life of a Winner" },
  { id: 3, activityId: 1, number: "3", title: "Walking in Great Faith" },
];

// A module's total points is the sum of its lessons, compute it instead of storing it.
export const LESSONS: ActivityLesson[] = [
  { id: 1, moduleId: 1, number: "1", title: "Fresh Start", points: 50 },
  {
    id: 2,
    moduleId: 1,
    number: "2",
    title: "Receiving God's Forgiveness",
    points: 50,
  },
  {
    id: 3,
    moduleId: 2,
    number: "1",
    title: "The 'I' That Matters Most",
    points: 50,
  },
  {
    id: 4,
    moduleId: 2,
    number: "2",
    title: "Forgiveness: Best Choice",
    points: 50,
  },
];

// Finishing this activity is what makes a user a mentor who can create C2S groups.
export const MENTOR_ACTIVITY_ID = 2;

// Every mentor group is a group for this activity.
export const C2S_ACTIVITY_ID = 1;
