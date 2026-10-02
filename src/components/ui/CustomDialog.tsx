import { type ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";

type CustomDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

// A modal dialog built on the native <dialog>, so focus stays inside, Escape closes it and the page behind is inert. Its content mounts fresh each time it opens.
export default function CustomDialog({
  open,
  onClose,
  title,
  children,
}: CustomDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  // Opens or closes the native dialog whenever the open prop changes, and focuses the field marked data-autofocus (React's autoFocus runs before the dialog is open).
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // Escape is turned into a normal close request so React state stays the single source of truth, the effect above closes the dialog.
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      // The dialog itself only receives a click when the backdrop is clicked, its content sits in the inner div.
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-auto w-[calc(100%-1.5rem)] max-w-md rounded-2xl border border-border bg-card p-0 text-foreground shadow-xl backdrop:bg-foreground/40"
    >
      <div>
        <div className="flex items-center justify-between gap-2 border-b border-border p-sm">
          <h2 className="title truncate text-body-lg font-bold">{title}</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="cursor-pointer rounded-full p-1 text-muted-foreground transition hover:bg-muted"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-sm">{open && children}</div>
      </div>
    </dialog>
  );
}
