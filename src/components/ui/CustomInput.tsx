import { type ComponentProps } from "react";
import { cn } from "@/lib/cn";

type CustomInputProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
};

// A themed text input with its label on top and a validation message underneath when one is passed in.
export default function CustomInput({
  label,
  error,
  id,
  className,
  ...props
}: CustomInputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className="subtitle text-caption font-medium text-foreground/80"
      >
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        className={cn(
          "subtitle w-full rounded-xl border bg-card px-3 py-2 text-body text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          error ? "border-error" : "border-border",
          className,
        )}
        {...props}
      />
      {error && <p className="subtitle text-caption text-error">{error}</p>}
    </div>
  );
}
