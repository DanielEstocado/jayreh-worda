import { Eye, Pencil } from "lucide-react";

type GroupAccessNoteProps = {
  canEdit: boolean;
  mentorName: string;
};

// A one-line note under the summary that says whether the user can change this group or only look at it.
export default function GroupAccessNote({
  canEdit,
  mentorName,
}: GroupAccessNoteProps) {
  return (
    <p className="subtitle flex items-center gap-2.5 rounded-2xl bg-muted px-md py-sm text-body text-foreground/70">
      {canEdit ? (
        <Pencil size={16} className="shrink-0" />
      ) : (
        <Eye size={16} className="shrink-0" />
      )}
      {canEdit
        ? "You lead this group. Add mentees, and open a mentee's lessons to tick them done."
        : `View only. Only ${mentorName} can update this group.`}
    </p>
  );
}
