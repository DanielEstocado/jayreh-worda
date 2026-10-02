import { Link } from "react-router-dom";
import { Eye, GraduationCap } from "lucide-react";
import type { MyGroup } from "@/hooks/useMyGroups";

type GroupCardProps = { myGroup: MyGroup };

// One group as a simple text card: name, size and mentor, with a chip that says whether the user runs it or only belongs to it.
const GroupCard = ({ myGroup }: GroupCardProps) => {
  const { group, role, activityLabel, memberCount } = myGroup;
  const isMentor = role === "mentor";
  const mentorName = `${group.mentor.firstName} ${group.mentor.lastName}`;

  return (
    <Link
      to={`/groups/${group.id}`}
      className="rounded-2xl border border-border bg-card p-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-1.5">
        <h3 className="title truncate text-body-lg font-bold text-foreground">{group.name}</h3>
        {isMentor ? (
          <span className="subtitle inline-flex shrink-0 items-center gap-1 rounded-full bg-highlight px-2 py-0.5 text-[11px] font-medium text-foreground">
            <GraduationCap size={11} />
            You lead
          </span>
        ) : (
          <span className="subtitle inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
            <Eye size={11} />
            View only
          </span>
        )}
      </div>

      <p className="subtitle mt-1 text-caption text-foreground/70">
        {activityLabel} · {memberCount} {memberCount === 1 ? "member" : "members"}
      </p>
      <p className="subtitle truncate text-caption text-muted-foreground">
        Mentor: {isMentor ? "you" : mentorName}
      </p>
    </Link>
  );
};

export default GroupCard;
