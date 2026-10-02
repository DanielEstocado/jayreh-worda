import { useContext, useLayoutEffect } from "react";
import { ShellTitleContext } from "@/components/shell/shellTitleContext";

// Shows a title the screen only knows once its data is there, such as a group's name, in the page header instead of the route's default.
export function useShellTitle(title?: string) {
  const setTitle = useContext(ShellTitleContext);

  // Runs before paint so the default title never flashes, and puts it back when the screen unmounts.
  useLayoutEffect(() => {
    setTitle(title);
    return () => setTitle(undefined);
  }, [title, setTitle]);
}
