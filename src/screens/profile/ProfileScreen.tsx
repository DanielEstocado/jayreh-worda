import { useState } from "react";
import { CustomPostList, CustomTabs } from "@/components";
import { useProfile } from "@/services/queries/profile";
import type { ProfileTab } from "@/types/post";
import ActivityCards from "./components/ActivityCards";
import ProfileHeader from "./components/ProfileHeader";
import { PROFILE_TABS } from "./constant";

// The signed-in user's profile: who they are, where they serve, what they posted and what they pinned.
export default function ProfileScreen() {
  const {
    user,
    isMentor,
    tagLabels,
    membershipLabels,
    stats,
    myPosts,
    pinnedPosts,
  } = useProfile();
  const [tab, setTab] = useState<ProfileTab>("posts");

  return (
    <>
      <ProfileHeader
        user={user}
        tagLabels={tagLabels}
        isMentor={isMentor}
        membershipLabels={membershipLabels}
        stats={stats}
      />

      <ActivityCards />

      <CustomTabs tabs={PROFILE_TABS} active={tab} onChange={setTab} />
      <CustomPostList
        posts={tab === "posts" ? myPosts : pinnedPosts}
        emptyMessage={
          tab === "posts"
            ? "You haven't posted yet."
            : "Pin a post from your feed to keep it here."
        }
      />
    </>
  );
}
