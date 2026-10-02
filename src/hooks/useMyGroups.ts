import { ACTIVITIES } from "@/constants/activity";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getGroupRole } from "@/lib/groups";
import type { Group, GroupRole } from "@/types/mentoring";
import useStore from "@/zustand/store/store";

export type MyGroup = {
  group: Group;
  role: GroupRole;
  activityLabel: string;
  memberCount: number;
};

// Returns the groups the signed-in user is in, split into the ones they run (editable) and the ones they only belong to.
export function useMyGroups(): { led: MyGroup[]; joined: MyGroup[] } {
  const user = useCurrentUser();
  const groups = useStore((s) => s.groups);
  const mentees = useStore((s) => s.mentees);

  const mine = groups.flatMap((group) => {
    const role = getGroupRole(group, mentees, user.id);
    if (!role) return [];

    return [
      {
        group,
        role,
        activityLabel: ACTIVITIES.find((a) => a.id === group.activityId)?.label ?? "",
        memberCount: mentees.filter((m) => m.groupId === group.id).length,
      },
    ];
  });

  return {
    led: mine.filter((g) => g.role === "mentor"),
    joined: mine.filter((g) => g.role === "mentee"),
  };
}
