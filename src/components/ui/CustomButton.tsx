import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "muted" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
};

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:opacity-90 border-transparent",
  secondary:
    "bg-secondary text-secondary-foreground hover:opacity-80 border-transparent",
  muted: "bg-muted text-foreground hover:bg-border border-transparent",
  ghost: "bg-transparent text-foreground hover:bg-muted border-border",
  danger: "bg-error text-white hover:opacity-90 border-transparent",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3.5 text-base rounded-xl",
};

// A themed button that handles its own disabled/loading look so screens never restyle it by hand.
export default function CustomButton({
  variant = "primary",
  size = "md",
  children,
  loading = false,
  fullWidth = false,
  disabled,
  className,
  ...props
}: CustomButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 border font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97]",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        fullWidth && "w-full",
        isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}
