import type { Membership, User } from "@/types/church";

export type PostTag = { id: number; label: string };

// Same shape as a membership: a department, optionally narrowed to a section, then a cluster.
export type AudienceTarget = Membership;

// Public reaches everyone, targeted only reaches members who match at least one target.
export type PostAudience =
  { type: "public" } | { type: "targeted"; targets: AudienceTarget[] };

// Just enough of a user to show who posted, the way a feed returns it.
export type PostAuthor = Pick<
  User,
  "id" | "firstName" | "lastName" | "avatarUrl"
>;

export type Post = {
  id: number;
  author: PostAuthor;
  // ISO timestamp with offset, the date and the time shown on the post are both derived from it.
  createdAt: string;
  title: string;
  subtitle: string;
  tagIds: number[];
  // Image URLs, empty for a text-only post.
  images: string[];
  likeCount: number;
  audience: PostAudience;
};

// A post a user pinned to keep it, private to that user and shown on their own profile.
export type PostPin = { userId: number; postId: number; pinnedAt: string };

// The two feed sections on Home: posts aimed at the user's groups, and posts for everyone.
export type FeedTab = "groups" | "public";

// The two lists on a profile: what the user wrote, and what they pinned.
export type ProfileTab = "posts" | "pinned";
