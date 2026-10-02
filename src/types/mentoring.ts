// A mentor's group for one activity (C2S), mentees are enrolled into it.
export type Group = {
  id: number;
  activityId: number;
  mentorId: number;
  name: string;
  createdAt: string;
};

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

// A lesson the mentor recorded as done for one mentee, per mentee because members miss sessions.
export type MenteeCompletion = {
  menteeId: number;
  lessonId: number;
  completedAt: string;
};
