import { BookOpen } from "lucide-react";
import type { GroupMember } from "@/types/mentoring";

type MembersTableProps = {
  members: GroupMember[];
  // Contact and address are only shown to the group's mentor, fellow mentees never see each other's.
  canEdit: boolean;
  onOpenLessons: (menteeId: number) => void;
};

const HEADER = "title px-sm py-2 text-caption font-semibold tracking-wide text-muted-foreground uppercase";

// The group's members as a table: who they are, how far along, and a book button that opens their lessons.
const MembersTable = ({ members, canEdit, onOpenLessons }: MembersTableProps) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[28rem] text-left">
        <thead className="bg-muted">
          <tr>
            <th className={HEADER}>Member</th>
            {canEdit && <th className={HEADER}>Contact</th>}
            {canEdit && <th className={HEADER}>Address</th>}
            <th className={HEADER}>Progress</th>
            <th className={HEADER}>
              <span className="sr-only">Lessons</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {members.length === 0 && (
            <tr className="border-t border-border">
              <td colSpan={canEdit ? 5 : 3} className="subtitle px-sm py-md text-center text-body text-muted-foreground">
                No members yet. Add the first one.
              </td>
            </tr>
          )}

          {members.map(({ mentee, isMe, progress }) => {
            const name = `${mentee.firstName} ${mentee.lastName}`;

            return (
              <tr key={mentee.id} className="border-t border-border">
                <td className="px-sm py-2">
                  <div className="flex items-center gap-1.5">
                    <span className="title text-body font-semibold whitespace-nowrap text-foreground">{name}</span>
                    {isMe && (
                      <span className="subtitle rounded-full bg-primary px-2 py-0.5 text-[11px] font-medium text-primary-foreground">
                        You
                      </span>
                    )}
                  </div>
                </td>

                {canEdit && (
                  <td className="subtitle px-sm py-2 text-body whitespace-nowrap text-foreground/70">
                    {mentee.contactNumber}
                  </td>
                )}
                {canEdit && (
                  <td className="subtitle max-w-48 truncate px-sm py-2 text-body text-foreground/70">
                    {mentee.address}
                  </td>
                )}

                <td className="px-sm py-2">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${progress.percent}%` }} />
                    </div>
                    <span className="title text-caption font-bold text-foreground">{progress.percent}%</span>
                  </div>
                </td>

                <td className="px-sm py-2 text-right">
                  <button
                    type="button"
                    aria-label={`Lessons for ${name}`}
                    title="Lessons"
                    onClick={() => onOpenLessons(mentee.id)}
                    className="cursor-pointer rounded-xl p-2 text-foreground/70 transition hover:bg-muted hover:text-primary"
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
};

export default MembersTable;
