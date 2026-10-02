import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";
import { LOCKED_THEME, TONES } from "@/lib/tones";
import type { ActivityStatus } from "@/types/activity";
import type { CardTheme, ToneName } from "@/types/tone";
import ProgressRing from "./activity-card/ProgressRing";
import StatusChip from "./activity-card/StatusChip";
import CustomGlowCard from "./CustomGlowCard";

type CustomActivityCardProps = {
  label: string;
  percent: number;
  status: ActivityStatus;
  message: string;
  // e.g. "1/4 lessons", left out when there is nothing to count.
  lessonCount?: string;
  // Makes the whole card a link, only passed for activities that can be opened.
  to?: string;
  tone: ToneName;
  // Compact is a tinted card with the ring on the left, large is a neutral card with only the ring colored and on the right.
  variant?: "compact" | "large";
};

// One activity as a game card: a ring that fills as lessons are done, a status chip and what comes next. Not started ones are greyed out.
export default function CustomActivityCard({
  label,
  percent,
  status,
  message,
  lessonCount,
  to,
  tone,
  variant = "compact",
}: CustomActivityCardProps) {
  const isLocked = status === "not-started";
  const isLarge = variant === "large";
  const theme: CardTheme = isLocked ? LOCKED_THEME : TONES[tone];

  const chip = <StatusChip status={status} tone={tone} isLarge={isLarge} />;
  const ring = (
    <ProgressRing
      percent={percent}
      status={status}
      isLarge={isLarge}
      theme={theme}
    />
  );

  const content = isLarge ? (
    <>
      <div className="min-w-0 flex-1">
        {chip}
        <h3
          className={cn("title mt-1.5 truncate text-h3 font-bold", theme.ink)}
        >
          {label}
        </h3>
        <p className={cn("subtitle mt-0.5 text-body", theme.inkSoft)}>
          {message}
        </p>
        {lessonCount && (
          <p
            className={cn(
              "subtitle mt-0.5 text-caption font-medium",
              theme.inkSoft,
            )}
          >
            {lessonCount}
          </p>
        )}
      </div>
      {ring}
    </>
  ) : (
    <>
      {ring}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-1.5">
          <h3 className={cn("title truncate text-body font-bold", theme.ink)}>
            {label}
          </h3>
          {chip}
        </div>
        <p className={cn("subtitle mt-0.5 text-caption", theme.inkSoft)}>
          {message}
          {lessonCount && <span> · {lessonCount}</span>}
        </p>
      </div>
    </>
  );

  // The large card is a glow card with a colored edge, the grey one is a plain card since it has nothing to glow about.
  if (isLarge && !isLocked) {
    return (
      <CustomGlowCard tone={tone} edge to={to}>
        {content}
      </CustomGlowCard>
    );
  }

  const cardClass = cn(
    isLarge
      ? "flex items-center gap-md rounded-3xl border p-md"
      : "flex items-center gap-2.5 rounded-2xl border p-2.5",
    theme.card,
  );

  return to ? (
    <Link
      to={to}
      className={cn(
        cardClass,
        "transition hover:-translate-y-0.5",
        isLarge ? "hover:shadow-xl" : "hover:-rotate-1 hover:shadow-md",
      )}
    >
      {content}
    </Link>
  ) : (
    <div className={cardClass}>{content}</div>
  );
}
