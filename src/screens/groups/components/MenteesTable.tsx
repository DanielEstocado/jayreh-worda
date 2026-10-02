import { BookOpen } from "lucide-react";
import type { GroupMentee } from "@/types/mentoring";

type MenteesTableProps = {
  mentees: GroupMentee[];
  // Contact and address are only shown to the group's mentor, fellow mentees never see each other's.
  canEdit: boolean;
  onOpenLessons: (menteeId: number) => void;
};

const HEADER =
  "title px-3 py-3 text-caption font-semibold tracking-wide text-muted-foreground uppercase";

// The group's mentees as a roomy table: who they are, how far along, and a round book button that opens their lessons.
export default function MenteesTable({
  mentees,
  canEdit,
  onOpenLessons,
}: MenteesTableProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-border bg-card">
      <table className="w-full min-w-[30rem] text-left">
        <thead className="bg-muted">
          <tr>
            <th className={HEADER}>Mentee</th>
            {canEdit && <th className={HEADER}>Contact</th>}
            {canEdit && <th className={HEADER}>Address</th>}
            <th className={HEADER}>Progress</th>
            <th className={HEADER}>
              <span className="sr-only">Lessons</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {mentees.length === 0 && (
            <tr className="border-t border-border">
              <td
                colSpan={canEdit ? 5 : 3}
                className="subtitle px-3 py-lg text-center text-body text-muted-foreground"
              >
                No mentees yet. Add the first one.
              </td>
            </tr>
          )}

          {mentees.map(({ mentee, isMe, progress }) => {
            const name = `${mentee.firstName} ${mentee.lastName}`;

            return (
              <tr
                key={mentee.id}
                className="border-t border-border transition hover:bg-muted/50"
              >
                <td className="px-3 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="title text-body font-semibold whitespace-nowrap text-foreground">
                      {name}
                    </span>
                    {isMe && (
                      <span className="subtitle rounded-full bg-primary px-2 py-0.5 text-micro font-medium text-primary-foreground">
                        You
                      </span>
                    )}
                  </div>
                </td>

                {canEdit && (
                  <td className="subtitle px-3 py-3.5 text-body whitespace-nowrap text-foreground/70">
                    {mentee.contactNumber}
                  </td>
                )}
                {canEdit && (
                  <td className="subtitle max-w-28 truncate px-3 py-3.5 text-body text-foreground/70">
                    {mentee.address}
                  </td>
                )}

                <td className="px-3 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${progress.percent}%` }}
                      />
                    </div>
                    <span className="title w-10 text-body font-bold text-foreground">
                      {progress.percent}%
                    </span>
                  </div>
                </td>

                <td className="px-3 py-2.5 text-right">
                  <button
                    type="button"
                    aria-label={`Lessons for ${name}`}
                    title="Lessons"
                    onClick={() => onOpenLessons(mentee.id)}
                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border text-foreground/70 transition hover:bg-primary/10 hover:text-primary"
                  >
                    <BookOpen size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
