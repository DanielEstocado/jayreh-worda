import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CustomButton, CustomInput } from "@/components";
import { useAddGroup } from "@/services/mutations/group";
import { useCurrentUser } from "@/services/queries/user";
import { C2S_ACTIVITY_ID } from "@/constants/activity";
import { today } from "@/lib/date";
import { type NewGroupInput, newGroupSchema } from "@/validations/group";

type NewGroupFormProps = { onDone: () => void };

// The "New Group" form: just a name, the group is a C2S group and the signed-in user becomes its mentor.
export default function NewGroupForm({ onDone }: NewGroupFormProps) {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const addGroup = useAddGroup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewGroupInput>({ resolver: zodResolver(newGroupSchema) });

  // Creates the group, closes the dialog and opens the new group's page.
  const handleCreateGroup = (values: NewGroupInput) => {
    const group = addGroup({
      name: values.name,
      activityId: C2S_ACTIVITY_ID,
      mentor: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl,
      },
      createdAt: today(),
    });

    toast.success(`${group.name} created`);
    onDone();
    navigate(`/groups/${group.id}`);
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateGroup)}
      className="flex flex-col gap-sm"
      noValidate
    >
      <CustomInput
        label="Group name"
        placeholder="e.g. Group B"
        data-autofocus
        error={errors.name?.message}
        {...register("name")}
      />
      <p className="subtitle text-caption text-muted-foreground">
        A C2S group, you will be its mentor and can add mentees after.
      </p>

      <div className="flex justify-end gap-2">
        <CustomButton
          type="button"
          variant="ghost"
          size="md"
          className="title rounded-full"
          onClick={onDone}
        >
          Cancel
        </CustomButton>
        <CustomButton
          type="submit"
          variant="primary"
          size="md"
          className="title rounded-full"
        >
          Create group
        </CustomButton>
      </div>
    </form>
  );
}
