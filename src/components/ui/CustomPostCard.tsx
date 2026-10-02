import { Globe, Heart, Pin, Users } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Post } from "@/types/post";
import CustomAvatar from "./CustomAvatar";
import CustomImage from "./CustomImage";

type CustomPostCardProps = {
  post: Post;
  tagLabels: string[];
  audienceLabel: string;
  dateTime: string;
  likeCount: number;
  liked: boolean;
  pinned: boolean;
  onToggleLike: () => void;
  onTogglePin: () => void;
};

const IMAGE_GRID: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
};

// One post in the feed: a header row with who wrote it and who it is for, then the text, images and the like and pin buttons at full width below.
export default function CustomPostCard({
  post,
  tagLabels,
  audienceLabel,
  dateTime,
  likeCount,
  liked,
  pinned,
  onToggleLike,
  onTogglePin,
}: CustomPostCardProps) {
  const authorName = `${post.author.firstName} ${post.author.lastName}`;
  const images = post.images.slice(0, 3);
  const AudienceIcon = post.audience.type === "public" ? Globe : Users;

  return (
    <article className="border-b border-border p-sm">
      <header className="flex items-center gap-sm">
        <CustomAvatar name={authorName} src={post.author.avatarUrl} size="lg" />

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="title text-body font-semibold text-foreground">
              {authorName}
            </span>
            <span className="subtitle text-caption text-muted-foreground">
              {dateTime}
            </span>
          </div>
          <p className="subtitle mt-0.5 flex items-center gap-1 text-caption text-muted-foreground/70">
            <AudienceIcon size={12} />
            {audienceLabel}
          </p>
        </div>
      </header>

      <div className="mt-md">
        <h2 className="subtitle text-body font-medium text-foreground/85">
          {post.title}
        </h2>
        <p className="subtitle mt-1 text-body text-foreground/70">
          {post.subtitle}
        </p>

        {tagLabels.length > 0 && (
          <div className="mt-xs flex flex-wrap gap-1.5">
            {tagLabels.map((label) => (
              <span
                key={label}
                className="subtitle rounded-full bg-secondary px-2.5 py-0.5 text-caption font-medium text-secondary-foreground"
              >
                {label}
              </span>
            ))}
          </div>
        )}

        {images.length > 0 && (
          <div className={cn("mt-sm grid gap-1.5", IMAGE_GRID[images.length])}>
            {images.map((src, i) => (
              <CustomImage
                key={`${src}-${i}`}
                src={src}
                className="aspect-4/3 w-full rounded-xl border border-border object-cover"
              />
            ))}
          </div>
        )}

        <div className="mt-xs flex items-center gap-md">
          <button
            onClick={onToggleLike}
            aria-pressed={liked}
            aria-label={liked ? "Unlike" : "Like"}
            className={cn(
              "subtitle flex cursor-pointer items-center gap-1.5 rounded-full px-2 py-1 text-body font-medium transition hover:bg-muted",
              liked ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Heart size={18} className={cn(liked && "fill-current")} />
            {likeCount}
          </button>

          <button
            onClick={onTogglePin}
            aria-pressed={pinned}
            aria-label={pinned ? "Unpin" : "Pin to my profile"}
            className={cn(
              "subtitle flex cursor-pointer items-center gap-1.5 rounded-full px-2 py-1 text-body font-medium transition hover:bg-muted",
              pinned
                ? "bg-highlight/20 text-foreground"
                : "text-muted-foreground",
            )}
          >
            <Pin size={18} className={cn(pinned && "fill-highlight")} />
            {pinned ? "Pinned" : "Pin"}
          </button>
        </div>
      </div>
    </article>
  );
}
