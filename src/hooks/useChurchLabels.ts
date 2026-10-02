import { POST_TAGS } from "@/constants/post";
import { CLUSTERS, DEPARTMENTS, SECTIONS, TAGS } from "@/constants/worda";
import { getMembershipLabel } from "@/lib/church";
import { getAudienceLabel } from "@/lib/post";
import type { ChurchLists, Membership } from "@/types/church";
import type { Post, PostAudience } from "@/types/post";

const LISTS: ChurchLists = {
  departments: DEPARTMENTS,
  sections: SECTIONS,
  clusters: CLUSTERS,
};

// Turns memberships and post audiences into readable text, using the church's department, section and cluster lists.
export function useChurchLabels() {
  // Reads a membership as "Relationship · Sports · Cluster 5".
  const membershipLabel = (membership: Membership) =>
    getMembershipLabel(membership, LISTS);

  // Reads a post audience as "Public" or its first target plus how many more.
  const audienceLabel = (audience: PostAudience) =>
    getAudienceLabel(audience, LISTS);

  // Reads a user's tag ids as their names, skipping any that no longer exist.
  const userTagLabels = (tagIds: number[]) =>
    tagIds.flatMap((id) => TAGS.find((t) => t.id === id)?.label ?? []);

  // Reads a post's tag ids as their names, skipping any that no longer exist.
  const postTagLabels = (post: Post) =>
    post.tagIds.flatMap(
      (id) => POST_TAGS.find((t) => t.id === id)?.label ?? [],
    );

  return { membershipLabel, audienceLabel, userTagLabels, postTagLabels };
}
