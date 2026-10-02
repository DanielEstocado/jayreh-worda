export type Activity = {
  id: number;
  label: string;
  prerequisiteIds: number[];
  // Shown on the card once finished, instead of the generic congratulation.
  completedMessage?: string;
};

export type ActivityModule = {
  id: number;
  activityId: number;
  // Display number shown to the user, e.g. "1".
  number: string;
  title: string;
};

export type ActivityLesson = {
  id: number;
  moduleId: number;
  // Display number inside its module, e.g. "1".
  number: string;
  title: string;
  points: number;
};

export type LessonStatus = "done" | "current" | "locked";

export type LessonProgress = ActivityLesson & { status: LessonStatus };

export type ModuleProgress = ActivityModule & { lessons: LessonProgress[] };

export type ActivityProgress = {
  activity: Activity;
  // 0 to 100, share of the activity's lesson points the user has finished.
  percent: number;
  isComplete: boolean;
  // The lesson the user should do next, undefined when there is nothing left (or no lessons yet).
  next?: { module: ActivityModule; lesson: ActivityLesson };
  modules: ModuleProgress[];
};

export type ActivityStatus = "ongoing" | "completed" | "not-started";

// An activity's progress plus where the user stands with it, for activities they have not joined too.
export type ActivityWithStatus = ActivityProgress & {
  status: ActivityStatus;
  // Labels of unfinished prerequisites, empty when the user could start it now.
  blockedBy: string[];
};
