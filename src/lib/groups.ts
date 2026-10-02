import type {
  Activity,
  ActivityLesson,
  ActivityModule,
} from "@/types/activity";
import type {
  Group,
  GroupMentee,
  GroupRole,
  Mentee,
  MenteeCompletion,
} from "@/types/mentoring";
import { getActivityProgress } from "./progress";

type GroupMenteesInput = {
  group: Group;
  activity: Activity;
  mentees: Mentee[];
  completions: MenteeCompletion[];
  modules: ActivityModule[];
  lessons: ActivityLesson[];
  userId: number;
};

// Lists a group's mentees, each with how far along they are and whether that mentee is the signed-in user.
export function getGroupMentees({
  group,
  activity,
  mentees,
  completions,
  modules,
  lessons,
  userId,
}: GroupMenteesInput): GroupMentee[] {
  return mentees
    .filter((mentee) => mentee.groupId === group.id)
    .map((mentee) => ({
      mentee,
      isMe: mentee.userId === userId,
      progress: getActivityProgress({
        activity,
        modules,
        lessons,
        completedLessonIds: completions
          .filter((c) => c.menteeId === mentee.id)
          .map((c) => c.lessonId),
      }),
    }));
}

// Says how a user relates to a group: its mentor, one of its mentees (matched through their linked account), or neither.
export function getGroupRole(
  group: Group,
  mentees: Mentee[],
  userId: number,
): GroupRole | undefined {
  if (group.mentor.id === userId) return "mentor";

  return mentees.some((m) => m.groupId === group.id && m.userId === userId)
    ? "mentee"
    : undefined;
}

// Only a group's own mentor may change it, anyone else in the group can look but not edit.
export function canEditGroup(role: GroupRole | undefined): boolean {
  return role === "mentor";
}

// Averages the mentees' progress percentages into one group percentage, 0 for an empty group.
export function getAveragePercent(percents: number[]): number {
  if (percents.length === 0) return 0;

  return Math.round(percents.reduce((sum, p) => sum + p, 0) / percents.length);
}
