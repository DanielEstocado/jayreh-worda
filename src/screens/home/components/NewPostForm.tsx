import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CustomButton, CustomInput, CustomTextarea } from "@/components";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { cn } from "@/lib/cn";
import { newPostSchema, type NewPostInput } from "@/validations/post";
import useStore from "@/zustand/store/store";

type NewPostFormProps = {
  // Called when the form is done, with the audience that was chosen when a post was made so the feed can show it.
  onDone: (audience?: NewPostInput["audience"]) => void;
};

const AUDIENCE_OPTIONS: { value: NewPostInput["audience"]; label: string }[] = [
  { value: "public", label: "Public" },
  { value: "groups", label: "My groups" },
];

// The "New post" form: a title, a subtitle and whether it is for everyone or only for the user's own departments, sections and clusters.
const NewPostForm = ({ onDone }: NewPostFormProps) => {
  const user = useCurrentUser();
  const addPost = useStore((s) => s.addPost);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewPostInput>({
    resolver: zodResolver(newPostSchema),
    defaultValues: { audience: "public" },
  });
  const audience = useWatch({ control, name: "audience" });

  // Adds the post to the feed, a groups post is aimed at every group the user is in.
  const onSubmit = (values: NewPostInput) => {
    addPost({
      author: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl,
      },
      createdAt: new Date().toISOString(),
      title: values.title,
      subtitle: values.subtitle,
      tagIds: [],
      images: [],
      likeCount: 0,
      audience:
        values.audience === "public"
          ? { type: "public" }
          : { type: "targeted", targets: user.memberships },
    });

    toast.success("Posted");
    onDone(values.audience);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-sm" noValidate>
      <CustomInput
        label="Title"
        placeholder="What's it about?"
        data-autofocus
        error={errors.title?.message}
        {...register("title")}
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="subtitle" className="subtitle text-caption font-medium text-foreground/80">
          Subtitle
        </label>
        <CustomTextarea
          id="subtitle"
          rows={3}
          placeholder="Say a little more"
          error={errors.subtitle?.message}
          {...register("subtitle")}
        />
      </div>

      <fieldset className="flex flex-col gap-1">
        <legend className="subtitle mb-1 text-caption font-medium text-foreground/80">Who is it for?</legend>
        <div className="flex gap-2">
          {AUDIENCE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={cn(
                "title cursor-pointer rounded-full border px-3 py-1.5 text-caption font-semibold transition",
                audience === option.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-muted",
              )}
            >
              <input type="radio" value={option.value} className="sr-only" {...register("audience")} />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex justify-end gap-2">
        <CustomButton type="button" variant="ghost" size="md" className="title rounded-full" onClick={() => onDone()}>
          Cancel
        </CustomButton>
        <CustomButton type="submit" variant="primary" size="md" className="title rounded-full">
          Post
        </CustomButton>
      </div>
    </form>
  );
};

export default NewPostForm;
