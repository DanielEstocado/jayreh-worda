import type { Group, GroupRole, Mentee } from "@/types/mentoring";

// Says how a user relates to a group: its mentor, one of its mentees (matched through their linked account), or neither.
export function getGroupRole(group: Group, mentees: Mentee[], userId: number): GroupRole | undefined {
  if (group.mentor.id === userId) return "mentor";

  return mentees.some((m) => m.groupId === group.id && m.userId === userId) ? "mentee" : undefined;
}

// Only a group's own mentor may change it, anyone else in the group can look but not edit.
export function canEditGroup(role: GroupRole | undefined): boolean {
  return role === "mentor";
}
