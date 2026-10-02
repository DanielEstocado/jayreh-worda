import type { ChurchLists, Membership } from "@/types/church";
import type { Post, PostAudience } from "@/types/post";
import { getMembershipLabel } from "./church";

// Says whether a post's audience reaches someone with these memberships, a target without a section or cluster covers everything below it.
export function canSeePost(post: Post, memberships: Membership[]): boolean {
  if (post.audience.type === "public") return true;

  return post.audience.targets.some((target) =>
    memberships.some(
      (m) =>
        m.departmentId === target.departmentId &&
        (target.sectionId === undefined || m.sectionId === target.sectionId) &&
        (target.clusterId === undefined || m.clusterId === target.clusterId),
    ),
  );
}

// Describes who a post is for: "Public", or the first target and how many more there are.
export function getAudienceLabel(
  audience: PostAudience,
  lists: ChurchLists,
): string {
  if (audience.type === "public") return "Public";

  const [first, ...rest] = audience.targets;
  const label = getMembershipLabel(first, lists);
  return rest.length > 0 ? `${label} +${rest.length}` : label;
}

// Formats a post's timestamp as date and time, e.g. "Sep 28, 9:30 AM".
export function formatPostDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
