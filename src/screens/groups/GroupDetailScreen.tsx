import { useState } from "react";
import { useParams } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { CustomButton, CustomDialog } from "@/components";
import { useShellTitle } from "@/hooks/useShellTitle";
import { useToggle } from "@/hooks/useToggle";
import { useToggleMenteeLesson } from "@/services/mutations/group";
import { useGroupDetail } from "@/services/queries/group";
import AddMenteeForm from "./components/AddMenteeForm";
import GroupAccessNote from "./components/GroupAccessNote";
import GroupSummaryCard from "./components/GroupSummaryCard";
import LessonChecklist from "./components/LessonChecklist";
import MenteesTable from "./components/MenteesTable";

// One group: a summary card, a note on whether the user may edit, and the mentees as a table. Only the mentor can add mentees or tick lessons.
export default function GroupDetailScreen() {
  const { groupId } = useParams();
  const detail = useGroupDetail(Number(groupId));
  const toggleMenteeLesson = useToggleMenteeLesson();
  useShellTitle(detail?.group.name);
  const [lessonsForId, setLessonsForId] = useState<number | null>(null);
  const { open: addOpen, onOpen: onAddOpen, onClose: onAddClose } = useToggle();

  if (!detail) {
    return (
      <>
        <p className="subtitle p-md text-body text-foreground/70">
          This group doesn't exist or you are not in it.
        </p>
      </>
    );
  }

  const { group, canEdit, activityLabel, averagePercent, mentees } = detail;
  const mentorName = `${group.mentor.firstName} ${group.mentor.lastName}`;
  const lessonsMentee = mentees.find((m) => m.mentee.id === lessonsForId);

  // Closes the lessons dialog.
  const handleCloseLessons = () => setLessonsForId(null);

  // Ticks or unticks a lesson for the mentee whose dialog is open.
  const handleToggleLesson = (lessonId: number) => {
    if (lessonsMentee) toggleMenteeLesson(lessonsMentee.mentee.id, lessonId);
  };

  return (
    <>
      <div className="flex flex-col gap-md p-md">
        <GroupSummaryCard
          canEdit={canEdit}
          mentorName={mentorName}
          activityLabel={activityLabel}
          menteeCount={mentees.length}
          averagePercent={averagePercent}
        />

        <GroupAccessNote canEdit={canEdit} mentorName={mentorName} />

        <section>
          <div className="mb-sm flex items-center justify-between gap-sm">
            <h2 className="title text-body-lg font-bold text-foreground">
              {mentees.length === 1 ? "Mentee" : "Mentees"} ({mentees.length})
            </h2>
            {canEdit && (
              <CustomButton
                variant="primary"
                size="sm"
                className="title gap-1 rounded-full"
                onClick={onAddOpen}
              >
                <UserPlus size={14} />
                Add Mentee
              </CustomButton>
            )}
          </div>

          <MenteesTable
            mentees={mentees}
            canEdit={canEdit}
            onOpenLessons={setLessonsForId}
          />
        </section>
      </div>

      <CustomDialog
        open={Boolean(lessonsMentee)}
        onClose={handleCloseLessons}
        title={
          lessonsMentee
            ? `${lessonsMentee.mentee.firstName} ${lessonsMentee.mentee.lastName}`
            : "Lessons"
        }
      >
        {lessonsMentee && (
          <LessonChecklist
            progress={lessonsMentee.progress}
            canEdit={canEdit}
            onToggle={handleToggleLesson}
          />
        )}
      </CustomDialog>

      <CustomDialog open={addOpen} onClose={onAddClose} title="Add Mentee">
        <AddMenteeForm groupId={group.id} onDone={onAddClose} />
      </CustomDialog>
    </>
  );
}
