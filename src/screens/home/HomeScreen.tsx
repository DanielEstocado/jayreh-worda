import { useState } from "react";
import { Plus } from "lucide-react";
import { CustomDialog, CustomPostList, CustomTabs } from "@/components";
import { useToggle } from "@/hooks/useToggle";
import { useFeedPosts } from "@/services/queries/post";
import type { NewPostInput } from "@/validations/post";
import type { FeedTab } from "@/types/post";
import NewPostForm from "./components/NewPostForm";
import { FEED_TABS } from "./constant";

type NewPostButtonProps = { onClick: () => void };

// The round floating button that opens the new post dialog, above the mobile dock on phones.
function NewPostButton({ onClick }: NewPostButtonProps) {
  return (
    <button
      type="button"
      aria-label="New post"
      title="New post"
      onClick={onClick}
      className="fixed right-4 bottom-24 z-20 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105 hover:shadow-xl lg:right-8 lg:bottom-8"
    >
      <Plus size={26} />
    </button>
  );
}

// The home feed: posts the user is allowed to see, newest first, split into their groups' posts and public ones, with a floating button to write a new post.
export default function HomeScreen() {
  const [tab, setTab] = useState<FeedTab>("groups");
  const {
    open: postOpen,
    onOpen: onPostOpen,
    onClose: onPostClose,
  } = useToggle();

  const posts = useFeedPosts(tab);

  // Closes the dialog and switches to the tab the new post landed in so it is visible right away.
  const handlePosted = (audience?: NewPostInput["audience"]) => {
    onPostClose();
    if (audience) setTab(audience === "public" ? "public" : "groups");
  };

  return (
    <>
      <CustomTabs tabs={FEED_TABS} active={tab} onChange={setTab} />
      <CustomPostList
        posts={posts}
        emptyMessage={
          tab === "groups"
            ? "Nothing for your groups yet."
            : "No public posts yet."
        }
      />

      <NewPostButton onClick={onPostOpen} />

      <CustomDialog open={postOpen} onClose={onPostClose} title="New post">
        <NewPostForm onDone={handlePosted} />
      </CustomDialog>
    </>
  );
}
