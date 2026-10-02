import { type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CustomTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

// A themed textarea that shows a validation message underneath when one is passed in.
export default function CustomTextarea({
  error,
  className,
  ...props
}: CustomTextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <textarea
        className={cn(
          "w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          error ? "border-error" : "border-border",
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
