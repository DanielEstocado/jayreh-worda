import { useCallback, useState } from "react";

// Holds an open or closed flag, for a dialog or a panel, with stable handlers. Rename them when a screen has several, e.g. `onOpen: onAddOpen`.
export function useToggle(defaultValue = false) {
  const [open, setOpen] = useState(defaultValue);

  // Flips between open and closed.
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  // Opens it.
  const onOpen = useCallback(() => setOpen(true), []);

  // Closes it.
  const onClose = useCallback(() => setOpen(false), []);

  return { open, toggle, onOpen, onClose };
}
