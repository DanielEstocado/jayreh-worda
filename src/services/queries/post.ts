import useStore from "@/zustand/store/store";
import { canSeePost } from "@/lib/post";
import type { FeedTab, Post } from "@/types/post";
import { useCurrentUser } from "./user";

// Sorts posts newest first without touching the original list.
function newestFirst(posts: Post[]) {
  return [...posts].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
  );
}

// Returns the posts the user may see for one feed tab, newest first: public ones, or the ones aimed at their groups.
export function useFeedPosts(tab: FeedTab) {
  const user = useCurrentUser();
  const posts = useStore((s) => s.posts);

  return newestFirst(
    posts.filter(
      (post) =>
        canSeePost(post, user.memberships) &&
        (tab === "public"
          ? post.audience.type === "public"
          : post.audience.type === "targeted"),
    ),
  );
}

// Returns what the user wrote, newest first, and what they pinned, newest pin first, skipping a pinned post they can no longer see.
export function useProfilePosts() {
  const user = useCurrentUser();
  const posts = useStore((s) => s.posts);
  const pinnedPostIds = useStore((s) => s.pinnedPostIds);

  const visible = posts.filter((post) => canSeePost(post, user.memberships));

  return {
    myPosts: newestFirst(visible.filter((post) => post.author.id === user.id)),
    pinnedPosts: pinnedPostIds.flatMap(
      (id) => visible.find((post) => post.id === id) ?? [],
    ),
  };
}
