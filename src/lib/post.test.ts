import { describe, expect, it } from "vitest";
import type { ChurchLists, Membership } from "@/types/church";
import type { Post } from "@/types/post";
import { canSeePost, getAudienceLabel } from "./post";

const LISTS: ChurchLists = {
  departments: [{ id: 3, label: "Relationship" }],
  sections: [{ id: 5, departmentId: 3, label: "Sports" }],
  clusters: [{ id: 6, sectionId: 5, label: "5" }],
};

const BASE_POST: Post = {
  id: 1,
  author: { id: 1, firstName: "A", lastName: "B" },
  createdAt: "2026-09-28T09:30:00+08:00",
  title: "t",
  subtitle: "s",
  tagIds: [],
  images: [],
  likeCount: 0,
  audience: { type: "public" },
};

// Builds a post aimed at the given targets.
function targetedPost(targets: Membership[]): Post {
  return { ...BASE_POST, audience: { type: "targeted", targets } };
}

describe("canSeePost", () => {
  it("shows a public post to everyone, even with no memberships", () => {
    expect(canSeePost(BASE_POST, [])).toBe(true);
  });

  it("hides a targeted post from someone in no matching department", () => {
    const post = targetedPost([{ departmentId: 3 }]);
    expect(canSeePost(post, [{ departmentId: 1 }])).toBe(false);
  });

  it("lets a department-wide target cover every section and cluster below it", () => {
    const post = targetedPost([{ departmentId: 3 }]);
    expect(
      canSeePost(post, [{ departmentId: 3, sectionId: 5, clusterId: 6 }]),
    ).toBe(true);
  });

  it("hides a section target from a member of another section", () => {
    const post = targetedPost([{ departmentId: 3, sectionId: 5 }]);
    expect(canSeePost(post, [{ departmentId: 3, sectionId: 2 }])).toBe(false);
  });

  it("requires the cluster to match when the target names one", () => {
    const post = targetedPost([
      { departmentId: 3, sectionId: 5, clusterId: 6 },
    ]);
    expect(
      canSeePost(post, [{ departmentId: 3, sectionId: 5, clusterId: 1 }]),
    ).toBe(false);
    expect(
      canSeePost(post, [{ departmentId: 3, sectionId: 5, clusterId: 6 }]),
    ).toBe(true);
  });

  it("shows the post when any one target matches", () => {
    const post = targetedPost([{ departmentId: 1 }, { departmentId: 3 }]);
    expect(canSeePost(post, [{ departmentId: 3 }])).toBe(true);
  });
});

describe("getAudienceLabel", () => {
  it("says Public for a public post", () => {
    expect(getAudienceLabel({ type: "public" }, LISTS)).toBe("Public");
  });

  it("spells out the first target and counts the rest", () => {
    const audience = {
      type: "targeted" as const,
      targets: [
        { departmentId: 3, sectionId: 5, clusterId: 6 },
        { departmentId: 3 },
      ],
    };
    expect(getAudienceLabel(audience, LISTS)).toBe(
      "Relationship · Sports · Cluster 5 +1",
    );
  });
});
