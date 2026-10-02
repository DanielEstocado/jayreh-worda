import { Eye, GraduationCap } from "lucide-react";
import { CustomChip, CustomGlowCard, CustomRingStat } from "@/components";
import { cn } from "@/lib/cn";
import { TONES } from "@/lib/tones";

type GroupSummaryCardProps = {
  // True when the user leads the group, which also decides the card's color.
  canEdit: boolean;
  mentorName: string;
  activityLabel: string;
  menteeCount: number;
  averagePercent: number;
};

// The card on top of a group page: the user's role, who the mentor is, how many mentees there are, and a ring with the group's average progress.
export default function GroupSummaryCard({
  canEdit,
  mentorName,
  activityLabel,
  menteeCount,
  averagePercent,
}: GroupSummaryCardProps) {
  // Yellow for a group the user leads, teal for one they only belong to.
  const tone = canEdit ? "yellow" : "teal";
  const theme = TONES[tone];

  return (
    <CustomGlowCard tone={tone}>
      <div className="min-w-0 flex-1">
        <CustomChip tone={tone}>
          {canEdit ? <GraduationCap size={12} /> : <Eye size={12} />}
          {canEdit ? "You lead" : "View only"}
        </CustomChip>
        <p className={cn("subtitle mt-2 text-caption", theme.inkSoft)}>
          Mentor · {activityLabel}
        </p>
        <h2 className={cn("title truncate text-h3 font-bold", theme.ink)}>
          {canEdit ? "You" : mentorName}
        </h2>
        <p className={cn("subtitle text-body", theme.inkSoft)}>
          {menteeCount} {menteeCount === 1 ? "mentee" : "mentees"}
        </p>
      </div>

      <CustomRingStat
        percent={averagePercent}
        tone={tone}
        size={96}
        valueClassName="text-h3"
        caption="Avg progress"
      />
    </CustomGlowCard>
  );
}
