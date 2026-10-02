import { Plus } from "lucide-react";
import { CustomButton, CustomDialog } from "@/components";
import { useToggle } from "@/hooks/useToggle";
import { useMyGroups } from "@/services/queries/group";
import { useIsMentor } from "@/services/queries/user";
import GroupCard from "./components/GroupCard";
import NewGroupForm from "./components/NewGroupForm";

// Every group the user is in as one roomy grid, the ones other mentors run come first and the ones the user leads after, with a New Group button for mentors.
export default function GroupsScreen() {
  const { led, joined } = useMyGroups();
  const isMentor = useIsMentor();
  const {
    open: createOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useToggle();

  const groups = [...joined, ...led];

  return (
    <>
      <div className="flex flex-col gap-md p-md">
        <div className="flex items-start justify-between gap-sm">
          <div>
            <h2 className="title text-body-lg font-bold text-foreground">
              {groups.length} {groups.length === 1 ? "group" : "groups"}
            </h2>
            <p className="subtitle text-body text-foreground/70">
              Groups you are in come first. You can only edit the ones you lead.
            </p>
          </div>

          {isMentor && (
            <CustomButton
              variant="primary"
              size="sm"
              className="title shrink-0 gap-1 rounded-full"
              onClick={onCreateOpen}
            >
              <Plus size={14} />
              New Group
            </CustomButton>
          )}
        </div>

        {groups.length === 0 ? (
          <p className="subtitle text-body text-foreground/70">
            You are not in any group yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
            {groups.map((myGroup) => (
              <GroupCard key={myGroup.group.id} myGroup={myGroup} />
            ))}
          </div>
        )}
      </div>

      <CustomDialog open={createOpen} onClose={onCreateClose} title="New Group">
        <NewGroupForm onDone={onCreateClose} />
      </CustomDialog>
    </>
  );
}
