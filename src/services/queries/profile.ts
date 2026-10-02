import { useChurchLabels } from "@/hooks/useChurchLabels";
import useStore from "@/zustand/store/store";
import { useProfilePosts } from "./post";
import { useCurrentUser, useIsMentor } from "./user";

// Returns everything the profile shows: the user, their tags and where they serve, the mentor badge, the three counts, and the two post lists.
export function useProfile() {
  const user = useCurrentUser();
  const isMentor = useIsMentor();
  const { membershipLabel, userTagLabels } = useChurchLabels();
  const groups = useStore((s) => s.groups);
  const mentees = useStore((s) => s.mentees);
  const { myPosts, pinnedPosts } = useProfilePosts();

  const myGroupIds = groups
    .filter((g) => g.mentor.id === user.id)
    .map((g) => g.id);
  const menteeCount = mentees.filter((m) =>
    myGroupIds.includes(m.groupId),
  ).length;

  return {
    user,
    isMentor,
    tagLabels: userTagLabels(user.tagIds),
    membershipLabels: user.memberships.map(membershipLabel),
    stats: [
      { label: "Posts", value: myPosts.length },
      { label: "Pinned", value: pinnedPosts.length },
      { label: "Mentees", value: menteeCount },
    ],
    myPosts,
    pinnedPosts,
  };
}
