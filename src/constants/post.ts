import type { Post, PostPin, PostTag } from "@/types/post";

export const POST_TAGS: PostTag[] = [
  { id: 1, label: "Announcement" },
  { id: 2, label: "Event" },
  { id: 3, label: "Testimony" },
  { id: 4, label: "Prayer Request" },
  { id: 5, label: "Devotional" },
];

// MOCK: feed posts, a mix of public and targeted so audience filtering can be tried, delete once the API returns posts.
export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    author: {
      id: 1,
      firstName: "Juan",
      lastName: "Dela Cruz",
      avatarUrl: "https://i.pravatar.cc/150?img=12",
    },
    createdAt: "2026-09-28T09:30:00+08:00",
    title: "Group A just finished Module 1",
    subtitle: "Three of four are through Lesson 2, praise God for faithful members.",
    tagIds: [3],
    images: [
      "https://picsum.photos/seed/worda-1a/800/600",
      "https://picsum.photos/seed/worda-1b/800/600",
    ],
    likeCount: 24,
    audience: { type: "public" },
  },
  {
    id: 2,
    author: {
      id: 2,
      firstName: "Mark",
      lastName: "Villanueva",
      avatarUrl: "https://i.pravatar.cc/150?img=33",
    },
    createdAt: "2026-09-27T18:00:00+08:00",
    title: "Sunday Service Schedule",
    subtitle: "Services start at 9:00 AM and 11:00 AM this week, doors open 30 minutes early.",
    tagIds: [1],
    images: [],
    likeCount: 87,
    audience: { type: "public" },
  },
  {
    id: 3,
    author: {
      id: 3,
      firstName: "Grace",
      lastName: "Mendoza",
      avatarUrl: "https://i.pravatar.cc/150?img=47",
    },
    createdAt: "2026-09-26T20:15:00+08:00",
    title: "Relationship Department Gathering",
    subtitle: "All sections are invited, bring a friend and come hungry.",
    tagIds: [2],
    images: ["https://picsum.photos/seed/worda-3/800/600"],
    likeCount: 41,
    audience: { type: "targeted", targets: [{ departmentId: 3 }] },
  },
  {
    id: 4,
    author: {
      id: 4,
      firstName: "Paolo",
      lastName: "Ramos",
      avatarUrl: "https://i.pravatar.cc/150?img=15",
    },
    createdAt: "2026-09-25T07:45:00+08:00",
    title: "Sports Fest Registration is Open",
    subtitle: "Sign up your cluster before Friday, slots are limited.",
    tagIds: [1, 2],
    images: [
      "https://picsum.photos/seed/worda-4a/800/600",
      "https://picsum.photos/seed/worda-4b/800/600",
      "https://picsum.photos/seed/worda-4c/800/600",
    ],
    likeCount: 33,
    audience: { type: "targeted", targets: [{ departmentId: 3, sectionId: 5 }] },
  },
  {
    id: 5,
    author: {
      id: 4,
      firstName: "Paolo",
      lastName: "Ramos",
      avatarUrl: "https://i.pravatar.cc/150?img=15",
    },
    createdAt: "2026-09-24T21:00:00+08:00",
    title: "Cluster 5 Prayer Night",
    subtitle: "Wednesday 8 PM, we will pray for our members who are sick.",
    tagIds: [4],
    images: [],
    likeCount: 12,
    audience: { type: "targeted", targets: [{ departmentId: 3, sectionId: 5, clusterId: 6 }] },
  },
  {
    id: 6,
    author: {
      id: 5,
      firstName: "Rina",
      lastName: "Lopez",
      avatarUrl: "https://i.pravatar.cc/150?img=44",
    },
    createdAt: "2026-09-23T06:30:00+08:00",
    title: "Worship Team Rehearsal Moved",
    subtitle: "Saturday rehearsal is now at 3 PM, please confirm with your leader.",
    tagIds: [1],
    images: [],
    likeCount: 9,
    // Worship department only, MOCK_USER is in Relationship so this one is not for me.
    audience: { type: "targeted", targets: [{ departmentId: 1 }] },
  },
];

// MOCK: ids of the posts I liked, delete once the API returns it per post.
export const MOCK_LIKED_POST_IDS: number[] = [1, 3];

// MOCK: posts I pinned (any post I can see, not just mine), newest pin first, delete once the API returns pins.
export const MOCK_PINS: PostPin[] = [
  { userId: 1, postId: 4, pinnedAt: "2026-09-26T08:10:00+08:00" },
  { userId: 1, postId: 2, pinnedAt: "2026-09-25T19:00:00+08:00" },
];
