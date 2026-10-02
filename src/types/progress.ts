export type Enrollment = {
  userId: number;
  activityId: number;
  joinedAt: string;
  // Set when the activity is finished, for in-person activities like C2S101 this is entered by hand.
  completedAt?: string;
};

export type LessonCompletion = {
  userId: number;
  lessonId: number;
  completedAt: string;
};
