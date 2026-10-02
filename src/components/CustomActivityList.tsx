import { useMyActivityProgress } from "@/services/queries/activity";
import { getActivityMessage, getLessonCountLabel } from "@/lib/activity";
import { cn } from "@/lib/cn";
import { getRotatingTone } from "@/lib/tones";
import CustomActivityCard from "./ui/CustomActivityCard";

type CustomActivityListProps = {
  // Compact is a two-column grid of small cards, large is one big card per row.
  variant?: "compact" | "large";
};

// Every activity as a game-style card, ongoing ones open their detail, shared by Profile (compact) and My Activities (large).
export default function CustomActivityList({
  variant = "compact",
}: CustomActivityListProps) {
  const activities = useMyActivityProgress();

  return (
    <div
      className={cn(
        "grid grid-cols-1",
        variant === "compact" ? "gap-2 sm:grid-cols-2" : "gap-sm",
      )}
    >
      {activities.map((item, i) => (
        <CustomActivityCard
          key={item.activity.id}
          label={item.activity.label}
          percent={item.percent}
          status={item.status}
          message={getActivityMessage(item)}
          lessonCount={getLessonCountLabel(item)}
          to={
            item.status === "ongoing"
              ? `/activities/${item.activity.id}`
              : undefined
          }
          tone={getRotatingTone(i)}
          variant={variant}
        />
      ))}
    </div>
  );
}
