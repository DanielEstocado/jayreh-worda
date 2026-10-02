import useStore from "@/zustand/store/store";
import { ACTIVITIES, LESSONS, MODULES } from "@/constants/activity";
import {
  canEditGroup,
  getAveragePercent,
  getGroupMentees,
  getGroupRole,
} from "@/lib/groups";
import type { MyGroup } from "@/types/mentoring";
import { useCurrentUser } from "./user";

// Returns the groups the signed-in user is in, split into the ones they run (editable) and the ones they only belong to.
export function useMyGroups(): { led: MyGroup[]; joined: MyGroup[] } {
  const user = useCurrentUser();
  const groups = useStore((s) => s.groups);
  const mentees = useStore((s) => s.mentees);
  const completions = useStore((s) => s.menteeCompletions);

  const mine = groups.flatMap((group): MyGroup[] => {
    const role = getGroupRole(group, mentees, user.id);
    const activity = ACTIVITIES.find((a) => a.id === group.activityId);
    if (!role || !activity) return [];

    const groupMentees = getGroupMentees({
      group,
      activity,
      mentees,
      completions,
      modules: MODULES,
      lessons: LESSONS,
      userId: user.id,
    });

    return [
      {
        group,
        role,
        activityLabel: activity.label,
        menteeCount: groupMentees.length,
        averagePercent: getAveragePercent(
          groupMentees.map((m) => m.progress.percent),
        ),
      },
    ];
  });

  return {
    led: mine.filter((g) => g.role === "mentor"),
    joined: mine.filter((g) => g.role === "mentee"),
  };
}

// Returns one group with every mentee's progress, the user's role in it and whether they may edit, or undefined when the user is not in it.
export function useGroupDetail(groupId: number) {
  const user = useCurrentUser();
  const groups = useStore((s) => s.groups);
  const allMentees = useStore((s) => s.mentees);
  const completions = useStore((s) => s.menteeCompletions);

  const group = groups.find((g) => g.id === groupId);
  const activity = ACTIVITIES.find((a) => a.id === group?.activityId);
  const role = group ? getGroupRole(group, allMentees, user.id) : undefined;

  if (!group || !activity || !role) return undefined;

  const mentees = getGroupMentees({
    group,
    activity,
    mentees: allMentees,
    completions,
    modules: MODULES,
    lessons: LESSONS,
    userId: user.id,
  });

  return {
    group,
    role,
    canEdit: canEditGroup(role),
    activityLabel: activity.label,
    averagePercent: getAveragePercent(mentees.map((m) => m.progress.percent)),
    mentees,
  };
}
