import type { StateCreator } from "zustand";
import { MOCK_LIKED_POST_IDS, MOCK_PINS, MOCK_POSTS } from "@/constants/post";
import { MOCK_USER } from "@/constants/user";
import type { Post } from "@/types/post";
import type { AppState } from "../store/store";

export type PostSlice = {
  posts: Post[];
  likedPostIds: number[];
  // Newest pin first.
  pinnedPostIds: number[];
  addPost: (input: Omit<Post, "id">) => Post;
  toggleLike: (postId: number) => void;
  togglePin: (postId: number) => void;
};

// Posts plus the signed-in user's likes and pins, global so Home and Profile always agree on them.
export const createPostSlice: StateCreator<AppState, [], [], PostSlice> = (set, get) => ({
  posts: MOCK_POSTS,
  likedPostIds: MOCK_LIKED_POST_IDS,
  pinnedPostIds: MOCK_PINS.filter((p) => p.userId === MOCK_USER.id)
    .sort((a, b) => Date.parse(b.pinnedAt) - Date.parse(a.pinnedAt))
    .map((p) => p.postId),

  // Adds a new post and returns it.
  addPost: (input) => {
    const post: Post = { ...input, id: Math.max(0, ...get().posts.map((p) => p.id)) + 1 };
    set((state) => ({ posts: [post, ...state.posts] }));
    return post;
  },

  toggleLike: (postId) =>
    set((state) => ({
      likedPostIds: state.likedPostIds.includes(postId)
        ? state.likedPostIds.filter((id) => id !== postId)
        : [...state.likedPostIds, postId],
    })),

  togglePin: (postId) =>
    set((state) => ({
      pinnedPostIds: state.pinnedPostIds.includes(postId)
        ? state.pinnedPostIds.filter((id) => id !== postId)
        : [postId, ...state.pinnedPostIds],
    })),
});
