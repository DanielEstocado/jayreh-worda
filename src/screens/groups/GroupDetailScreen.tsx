import { useState } from "react";
import { useParams } from "react-router-dom";
import { Eye, Pencil, UserPlus } from "lucide-react";
import { CustomAppShell, CustomButton, CustomDialog } from "@/components";
import { useGroupDetail } from "@/hooks/useGroupDetail";
import AddMemberForm from "./components/AddMemberForm";
import LessonChecklist from "./components/LessonChecklist";
import MembersTable from "./components/MembersTable";

// One group: who runs it, whether the user may edit it, and its members as a table. Only the group's mentor can add members or tick lessons.
const GroupDetailScreen = () => {
  const { groupId } = useParams();
  const detail = useGroupDetail(Number(groupId));
  const [lessonsForId, setLessonsForId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);

  if (!detail) {
    return (
      <CustomAppShell title="Group" backTo="/groups">
        <p className="subtitle p-sm text-body text-foreground/70">
          This group doesn't exist or you are not in it.
        </p>
      </CustomAppShell>
    );
  }

  const { group, canEdit, activityLabel, members, toggleMenteeLesson } = detail;
  const mentorName = `${group.mentor.firstName} ${group.mentor.lastName}`;
  const lessonsMember = members.find((m) => m.mentee.id === lessonsForId);

  return (
    <CustomAppShell title={group.name} backTo="/groups">
      <div className="flex flex-col gap-sm p-sm">
        <div className="rounded-2xl border border-border bg-card p-sm">
          <p className="subtitle text-caption text-muted-foreground">Mentor · {activityLabel}</p>
          <h2 className="title truncate text-body-lg font-bold text-foreground">
            {canEdit ? "You" : mentorName}
          </h2>
        </div>

        <p className="subtitle flex items-center gap-2 rounded-xl bg-muted px-sm py-2 text-caption text-foreground/70">
          {canEdit ? <Pencil size={14} className="shrink-0" /> : <Eye size={14} className="shrink-0" />}
          {canEdit
            ? "You lead this group. Add members, and open a member's lessons to tick them done."
            : `View only. Only ${mentorName} can update this group.`}
        </p>

        <section>
          <div className="mb-2 flex items-center justify-between gap-sm">
            <h2 className="title text-body-lg font-bold text-foreground">Members ({members.length})</h2>
            {canEdit && (
              <CustomButton
                variant="primary"
                size="sm"
                className="title gap-1 rounded-full"
                onClick={() => setAdding(true)}
              >
                <UserPlus size={14} />
                Add Member
              </CustomButton>
            )}
          </div>

          <MembersTable members={members} canEdit={canEdit} onOpenLessons={setLessonsForId} />
        </section>
      </div>

      <CustomDialog
        open={Boolean(lessonsMember)}
        onClose={() => setLessonsForId(null)}
        title={lessonsMember ? `${lessonsMember.mentee.firstName} ${lessonsMember.mentee.lastName}` : "Lessons"}
      >
        {lessonsMember && (
          <LessonChecklist
            progress={lessonsMember.progress}
            canEdit={canEdit}
            onToggle={(lessonId) => toggleMenteeLesson(lessonsMember.mentee.id, lessonId)}
          />
        )}
      </CustomDialog>

      <CustomDialog open={adding} onClose={() => setAdding(false)} title="Add Member">
        <AddMemberForm groupId={group.id} onDone={() => setAdding(false)} />
      </CustomDialog>
    </CustomAppShell>
  );
};

export default GroupDetailScreen;
