import type { ProfileTab } from "@/types/post";

// The two lists on a profile: what the user wrote, and what they pinned (visible only to them).
export const PROFILE_TABS: { key: ProfileTab; label: string }[] = [
  { key: "posts", label: "Posts" },
  { key: "pinned", label: "Pinned" },
];
