import type { FeedTab } from "@/types/post";

// The two feed sections: posts aimed at the user's departments, sections and clusters, and posts for everyone.
export const FEED_TABS: { key: FeedTab; label: string }[] = [
  { key: "groups", label: "My Groups" },
  { key: "public", label: "Public" },
];
