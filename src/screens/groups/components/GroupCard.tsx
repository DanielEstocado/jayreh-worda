import { Eye, GraduationCap } from "lucide-react";
import { CustomChip, CustomGlowCard, CustomRingStat } from "@/components";
import { cn } from "@/lib/cn";
import { TONES } from "@/lib/tones";
import type { MyGroup } from "@/types/mentoring";

type GroupCardProps = { myGroup: MyGroup };

// One group as a roomy card: a chip for the user's role, the name, size and mentor, and a ring with the group's average progress on the right. No picture or avatar.
export default function GroupCard({ myGroup }: GroupCardProps) {
  const { group, role, activityLabel, menteeCount, averagePercent } = myGroup;
  const isMentor = role === "mentor";
  // Yellow for groups the user leads, teal for the ones they only belong to.
  const tone = isMentor ? "yellow" : "teal";
  const theme = TONES[tone];
  const mentorName = `${group.mentor.firstName} ${group.mentor.lastName}`;

  return (
    <CustomGlowCard tone={tone} to={`/groups/${group.id}`} className="gap-sm">
      <div className="min-w-0 flex-1">
        <CustomChip tone={tone}>
          {isMentor ? <GraduationCap size={12} /> : <Eye size={12} />}
          {isMentor ? "You lead" : "View only"}
        </CustomChip>

        <h3
          className={cn(
            "title mt-2 line-clamp-2 text-body-lg leading-snug font-bold",
            theme.ink,
          )}
        >
          {group.name}
        </h3>
        <p className={cn("subtitle mt-0.5 text-body", theme.inkSoft)}>
          {activityLabel} · {menteeCount}{" "}
          {menteeCount === 1 ? "mentee" : "mentees"}
        </p>
        <p
          className={cn(
            "subtitle mt-0.5 line-clamp-2 text-caption",
            theme.inkSoft,
          )}
        >
          Mentor: {isMentor ? "you" : mentorName}
        </p>
      </div>

      <CustomRingStat
        percent={averagePercent}
        tone={tone}
        size={72}
        valueClassName="text-body"
        caption="Avg progress"
      />
    </CustomGlowCard>
  );
}
