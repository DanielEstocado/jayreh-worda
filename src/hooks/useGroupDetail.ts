import { ACTIVITIES, LESSONS, MODULES } from "@/constants/activity";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { canEditGroup, getGroupRole } from "@/lib/groups";
import { getActivityProgress } from "@/lib/progress";
import useStore from "@/zustand/store/store";

// Returns one group with every member's progress, the user's role in it and whether they may edit, or undefined when the user is not in it.
export function useGroupDetail(groupId: number) {
  const user = useCurrentUser();
  const groups = useStore((s) => s.groups);
  const allMentees = useStore((s) => s.mentees);
  const menteeCompletions = useStore((s) => s.menteeCompletions);
  const toggleMenteeLesson = useStore((s) => s.toggleMenteeLesson);
  const addMentee = useStore((s) => s.addMentee);

  const group = groups.find((g) => g.id === groupId);
  const activity = ACTIVITIES.find((a) => a.id === group?.activityId);
  const role = group ? getGroupRole(group, allMentees, user.id) : undefined;

  if (!group || !activity || !role) return undefined;

  const members = allMentees
    .filter((m) => m.groupId === group.id)
    .map((mentee) => ({
      mentee,
      isMe: mentee.userId === user.id,
      progress: getActivityProgress({
        activity,
        modules: MODULES,
        lessons: LESSONS,
        completedLessonIds: menteeCompletions
          .filter((c) => c.menteeId === mentee.id)
          .map((c) => c.lessonId),
      }),
    }));

  return {
    group,
    role,
    canEdit: canEditGroup(role),
    activityLabel: activity.label,
    members,
    toggleMenteeLesson,
    addMentee,
  };
}
