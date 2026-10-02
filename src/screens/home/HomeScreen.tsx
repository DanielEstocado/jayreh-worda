import { useState } from "react";
import { Plus } from "lucide-react";
import { CustomAppShell, CustomDialog, CustomPostList, CustomTabs } from "@/components";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { canSeePost } from "@/lib/post";
import useStore from "@/zustand/store/store";
import NewPostForm from "./components/NewPostForm";
import { FEED_TABS, type FeedTab } from "./constant";

// The home feed: posts the user is allowed to see, newest first, split into their groups' posts and public ones, with a floating button to write a new post.
const HomeScreen = () => {
  const user = useCurrentUser();
  const allPosts = useStore((s) => s.posts);
  const [tab, setTab] = useState<FeedTab>("groups");
  const [writing, setWriting] = useState(false);

  const posts = allPosts
    .filter(
      (post) =>
        canSeePost(post, user.memberships) &&
        (tab === "public" ? post.audience.type === "public" : post.audience.type === "targeted"),
    )
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return (
    <CustomAppShell title="Home">
      <CustomTabs tabs={FEED_TABS} active={tab} onChange={setTab} />
      <CustomPostList
        posts={posts}
        emptyMessage={tab === "groups" ? "Nothing for your groups yet." : "No public posts yet."}
      />

      <button
        type="button"
        aria-label="New post"
        title="New post"
        onClick={() => setWriting(true)}
        className="fixed right-4 bottom-24 z-20 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105 hover:shadow-xl lg:right-8 lg:bottom-8"
      >
        <Plus size={26} />
      </button>

      <CustomDialog open={writing} onClose={() => setWriting(false)} title="New post">
        <NewPostForm
          onDone={(audience) => {
            setWriting(false);
            // Shows the tab the new post landed in so it is visible right away.
            if (audience) setTab(audience === "public" ? "public" : "groups");
          }}
        />
      </CustomDialog>
    </CustomAppShell>
  );
};

export default HomeScreen;
