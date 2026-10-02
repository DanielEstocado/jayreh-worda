import type { ActivityProgress } from "@/types/activity";
import type { User } from "@/types/church";

// Just enough of a user to show who runs a group, the way an API embeds it.
export type GroupMentor = Pick<
  User,
  "id" | "firstName" | "lastName" | "avatarUrl"
>;

// A mentor's group for one activity (C2S), mentees are enrolled into it. Only its mentor can edit it.
export type Group = {
  id: number;
  activityId: number;
  mentor: GroupMentor;
  name: string;
  createdAt: string;
};

// How the signed-in user relates to a group: they run it, or they are a member of it.
export type GroupRole = "mentor" | "mentee";

// A person being mentored. No account and no login, the mentor records everything on their behalf.
export type Mentee = {
  id: number;
  // One group at a time.
  groupId: number;
  firstName: string;
  lastName: string;
  // One temporary free-text line, replaced by the full address fields once they become a user.
  address: string;
  contactNumber: string;
  // Set only after they finish C2S and an account is created for them, until then they have no login.
  userId?: number;
  joinedAt: string;
};

// A lesson the mentor recorded as done for one mentee, per mentee because mentees miss sessions.
export type MenteeCompletion = {
  menteeId: number;
  lessonId: number;
  completedAt: string;
};

// A mentee in a group with how far along they are and whether that mentee is the signed-in user.
export type GroupMentee = {
  mentee: Mentee;
  isMe: boolean;
  progress: ActivityProgress;
};

// One group the signed-in user is in, with the numbers its card shows.
export type MyGroup = {
  group: Group;
  role: GroupRole;
  activityLabel: string;
  menteeCount: number;
  // Average progress of the group's mentees, 0 to 100.
  averagePercent: number;
};
