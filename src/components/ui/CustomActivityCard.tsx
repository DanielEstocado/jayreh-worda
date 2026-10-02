import { Link } from "react-router-dom";
import { Flame, Lock, Trophy } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ActivityStatus } from "@/types/activity";
import CustomCircularProgress from "./CustomCircularProgress";

// The playful colors the cards rotate through, one theme per card.
const THEMES = [
  {
    card: "border-primary/25 bg-primary/10",
    large: "border-l-primary from-primary/15 shadow-primary/20",
    stroke: "stroke-primary",
    chip: "bg-primary text-primary-foreground",
  },
  {
    card: "border-accent/40 bg-accent/15",
    large: "border-l-accent from-accent/20 shadow-accent/25",
    stroke: "stroke-accent",
    chip: "bg-accent text-foreground",
  },
  {
    card: "border-highlight/40 bg-highlight/15",
    large: "border-l-highlight from-highlight/25 shadow-highlight/30",
    stroke: "stroke-highlight",
    chip: "bg-highlight text-foreground",
  },
];

const LOCKED_THEME = {
  card: "border-border bg-muted opacity-60 grayscale",
  large: "",
  stroke: "stroke-muted-foreground/40",
  chip: "bg-card text-muted-foreground",
};

type CustomActivityCardProps = {
  label: string;
  percent: number;
  status: ActivityStatus;
  message: string;
  // e.g. "1/4 lessons", left out when there is nothing to count.
  lessonCount?: string;
  // Makes the whole card a link, only passed for activities that can be opened.
  to?: string;
  themeIndex: number;
  // Compact is a tinted card with the ring on the left, large is a neutral card with only the ring colored and on the right.
  variant?: "compact" | "large";
};

// One activity as a game card: a ring that fills as lessons are done, a status chip and what comes next. Not started ones are greyed out.
const CustomActivityCard = ({
  label,
  percent,
  status,
  message,
  lessonCount,
  to,
  themeIndex,
  variant = "compact",
}: CustomActivityCardProps) => {
  const isComplete = status === "completed";
  const isLocked = status === "not-started";
  const isLarge = variant === "large";
  const theme = isLocked ? LOCKED_THEME : THEMES[themeIndex % THEMES.length];
  // A completed chip is always white text on the darker teal, whichever color its card has.
  const chipColor = isComplete ? "bg-info text-white" : theme.chip;

  const ring = (
    <CustomCircularProgress
      percent={percent}
      strokeClass={theme.stroke}
      trackClass={isLarge ? "stroke-muted" : "stroke-card"}
      size={isLarge ? 104 : 64}
    >
      {isLocked ? (
        <Lock size={isLarge ? 28 : 18} className="text-muted-foreground" />
      ) : isComplete ? (
        <Trophy size={isLarge ? 36 : 22} className="text-foreground/80" />
      ) : (
        <span className={cn("title font-bold text-foreground", isLarge ? "text-h3" : "text-body")}>
          {percent}%
        </span>
      )}
    </CustomCircularProgress>
  );

  const chip = (
    <span
      className={cn(
        "subtitle inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 font-medium",
        isLarge ? cn("text-caption", chipColor) : cn("text-[11px]", chipColor),
      )}
    >
      {isLocked ? <Lock size={10} /> : isComplete ? <Trophy size={10} /> : <Flame size={10} />}
      {isLocked ? "Not started" : isComplete ? "Completed" : "In progress"}
    </span>
  );

  const content = isLarge ? (
    <>
      <div className="min-w-0 flex-1">
        {chip}
        <h3 className="title mt-1.5 truncate text-h3 font-bold text-foreground">{label}</h3>
        <p className="subtitle mt-0.5 text-body text-foreground/70">{message}</p>
        {lessonCount && (
          <p className="subtitle mt-0.5 text-caption font-medium text-muted-foreground">{lessonCount}</p>
        )}
      </div>
      {ring}
    </>
  ) : (
    <>
      {ring}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-1.5">
          <h3 className="title truncate text-body font-bold text-foreground">{label}</h3>
          {chip}
        </div>
        <p className="subtitle mt-0.5 text-caption text-foreground/70">
          {message}
          {lessonCount && <span className="text-foreground/60"> · {lessonCount}</span>}
        </p>
      </div>
    </>
  );

  const cardClass = isLarge
    ? cn(
        "flex items-center gap-md rounded-3xl border p-md",
        // White card that pops through a colored left edge, a glow fading in from the ring side, and a colored shadow.
        isLocked ? theme.card : cn("border-border border-l-4 bg-card bg-linear-to-l to-transparent shadow-lg", theme.large),
      )
    : cn("flex items-center gap-2.5 rounded-2xl border p-2.5", theme.card);

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
};

export default CustomActivityCard;
