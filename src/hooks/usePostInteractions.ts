import { MOCK_LIKED_POST_IDS } from "@/constants/post";
import useStore from "@/zustand/store/store";
import type { Post } from "@/types/post";

// Reads and changes the user's likes and pins so every list of posts behaves the same.
export function usePostInteractions() {
  const likedPostIds = useStore((s) => s.likedPostIds);
  const pinnedPostIds = useStore((s) => s.pinnedPostIds);
  const toggleLike = useStore((s) => s.toggleLike);
  const togglePin = useStore((s) => s.togglePin);

  // Counts a post's likes with the user's own like added or taken away from what the server sent.
  const getLikeCount = (post: Post) => {
    const sentWithMyLike = MOCK_LIKED_POST_IDS.includes(post.id);
    const liked = likedPostIds.includes(post.id);
    return post.likeCount - (sentWithMyLike ? 1 : 0) + (liked ? 1 : 0);
  };

  return {
    pinnedPostIds,
    isLiked: (postId: number) => likedPostIds.includes(postId),
    isPinned: (postId: number) => pinnedPostIds.includes(postId),
    getLikeCount,
    toggleLike,
    togglePin,
  };
}
