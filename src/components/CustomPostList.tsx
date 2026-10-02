import { useChurchLabels } from "@/hooks/useChurchLabels";
import { usePostInteractions } from "@/services/mutations/post";
import { formatPostDateTime } from "@/lib/post";
import type { Post } from "@/types/post";
import CustomPostCard from "./ui/CustomPostCard";

type CustomPostListProps = {
  posts: Post[];
  emptyMessage: string;
};

// A list of posts wired to the user's likes and pins, shared by Home and Profile.
export default function CustomPostList({
  posts,
  emptyMessage,
}: CustomPostListProps) {
  const { audienceLabel, postTagLabels } = useChurchLabels();
  const { isLiked, isPinned, getLikeCount, toggleLike, togglePin } =
    usePostInteractions();

  if (posts.length === 0) {
    return (
      <p className="subtitle p-md text-center text-body text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <CustomPostCard
          key={post.id}
          post={post}
          tagLabels={postTagLabels(post)}
          audienceLabel={audienceLabel(post.audience)}
          dateTime={formatPostDateTime(post.createdAt)}
          likeCount={getLikeCount(post)}
          liked={isLiked(post.id)}
          pinned={isPinned(post.id)}
          onToggleLike={() => toggleLike(post.id)}
          onTogglePin={() => togglePin(post.id)}
        />
      ))}
    </div>
  );
}
