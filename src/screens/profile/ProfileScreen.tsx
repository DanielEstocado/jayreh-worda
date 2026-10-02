import { useState } from "react";
import { CustomAppShell, CustomPostList, CustomTabs } from "@/components";
import { MENTOR_ACTIVITY_ID } from "@/constants/activity";
import { MOCK_ENROLLMENTS } from "@/constants/progress";
import { TAGS } from "@/constants/worda";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePostInteractions } from "@/hooks/usePostInteractions";
import { getMembershipLabel } from "@/lib/church";
import { hasCompletedActivity } from "@/lib/enrollment";
import { canSeePost } from "@/lib/post";
import useStore from "@/zustand/store/store";
import ActivityCards from "./components/ActivityCards";
import ProfileHeader from "./components/ProfileHeader";
import { PROFILE_TABS, type ProfileTab } from "./constant";

// The signed-in user's profile: who they are, where they serve, what they posted and what they pinned.
const ProfileScreen = () => {
  const user = useCurrentUser();
  const { pinnedPostIds } = usePostInteractions();
  const [tab, setTab] = useState<ProfileTab>("posts");

  const allPosts = useStore((s) => s.posts);
  const visible = allPosts.filter((post) => canSeePost(post, user.memberships));
  const myPosts = visible
    .filter((post) => post.author.id === user.id)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  // Pins keep their order, newest pin first, and quietly skip a post the user can no longer see.
  const pinnedPosts = pinnedPostIds.flatMap((id) => visible.find((post) => post.id === id) ?? []);

  const groups = useStore((s) => s.groups);
  const mentees = useStore((s) => s.mentees);
  const myGroupIds = groups.filter((g) => g.mentor.id === user.id).map((g) => g.id);
  const menteeCount = mentees.filter((m) => myGroupIds.includes(m.groupId)).length;

  return (
    <CustomAppShell title="Profile">
      <ProfileHeader
        user={user}
        tagLabels={user.tagIds.flatMap((id) => TAGS.find((t) => t.id === id)?.label ?? [])}
        isMentor={hasCompletedActivity(MOCK_ENROLLMENTS, user.id, MENTOR_ACTIVITY_ID)}
        membershipLabels={user.memberships.map(getMembershipLabel)}
        stats={[
          { label: "Posts", value: myPosts.length },
          { label: "Pinned", value: pinnedPosts.length },
          { label: "Mentees", value: menteeCount },
        ]}
      />

      <ActivityCards />

      <CustomTabs tabs={PROFILE_TABS} active={tab} onChange={setTab} />
      <CustomPostList
        posts={tab === "posts" ? myPosts : pinnedPosts}
        emptyMessage={
          tab === "posts" ? "You haven't posted yet." : "Pin a post from your feed to keep it here."
        }
      />
    </CustomAppShell>
  );
};

export default ProfileScreen;
