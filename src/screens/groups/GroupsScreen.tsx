import { useState } from "react";
import { Plus } from "lucide-react";
import { CustomAppShell, CustomButton, CustomDialog } from "@/components";
import { useIsMentor } from "@/hooks/useIsMentor";
import { useMyGroups } from "@/hooks/useMyGroups";
import GroupCard from "./components/GroupCard";
import NewGroupForm from "./components/NewGroupForm";

// Every group the user is in as one grid, the ones other mentors run come first and the ones the user leads after, with a New Group button for mentors.
const GroupsScreen = () => {
  const { led, joined } = useMyGroups();
  const isMentor = useIsMentor();
  const [creating, setCreating] = useState(false);
  const groups = [...joined, ...led];

  return (
    <CustomAppShell title="My Groups">
      <div className="p-sm">
        <div className="mb-sm flex items-start justify-between gap-sm">
          <p className="subtitle text-body text-foreground/70">
            Groups you are in come first. You can only edit the ones you lead.
          </p>

          {isMentor && (
            <CustomButton
              variant="primary"
              size="sm"
              className="title shrink-0 gap-1 rounded-full"
              onClick={() => setCreating(true)}
            >
              <Plus size={14} />
              New Group
            </CustomButton>
          )}
        </div>

        {groups.length === 0 ? (
          <p className="subtitle text-body text-foreground/70">You are not in any group yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {groups.map((myGroup) => (
              <GroupCard key={myGroup.group.id} myGroup={myGroup} />
            ))}
          </div>
        )}
      </div>

      <CustomDialog open={creating} onClose={() => setCreating(false)} title="New Group">
        <NewGroupForm onDone={() => setCreating(false)} />
      </CustomDialog>
    </CustomAppShell>
  );
};

export default GroupsScreen;
