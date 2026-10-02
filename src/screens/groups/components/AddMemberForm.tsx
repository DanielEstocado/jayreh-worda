import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CustomButton, CustomInput } from "@/components";
import { newMenteeSchema, type NewMenteeInput } from "@/validations/mentee";
import useStore from "@/zustand/store/store";

type AddMemberFormProps = { groupId: number; onDone: () => void };

// The "Add Member" form: the details a mentor records for someone who has no account yet.
const AddMemberForm = ({ groupId, onDone }: AddMemberFormProps) => {
  const addMentee = useStore((s) => s.addMentee);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewMenteeInput>({ resolver: zodResolver(newMenteeSchema) });

  // Adds the mentee to this group and closes the dialog.
  const onSubmit = (values: NewMenteeInput) => {
    addMentee({ ...values, groupId, joinedAt: new Date().toISOString().slice(0, 10) });

    toast.success(`${values.firstName} ${values.lastName} added`);
    onDone();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-sm" noValidate>
      <div className="grid grid-cols-2 gap-sm">
        <CustomInput label="First name" data-autofocus error={errors.firstName?.message} {...register("firstName")} />
        <CustomInput label="Last name" error={errors.lastName?.message} {...register("lastName")} />
      </div>
      <CustomInput label="Address" placeholder="Where they live" error={errors.address?.message} {...register("address")} />
      <CustomInput
        label="Contact number"
        placeholder="09171234567"
        inputMode="tel"
        error={errors.contactNumber?.message}
        {...register("contactNumber")}
      />

      <div className="flex justify-end gap-2">
        <CustomButton type="button" variant="ghost" size="md" className="title rounded-full" onClick={onDone}>
          Cancel
        </CustomButton>
        <CustomButton type="submit" variant="primary" size="md" className="title rounded-full">
          Add member
        </CustomButton>
      </div>
    </form>
  );
};

export default AddMemberForm;
