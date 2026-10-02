import { createContext } from "react";

// How a screen replaces the header title its route gave it, e.g. with a group's own name. Undefined puts the route's title back.
export const ShellTitleContext = createContext<(title?: string) => void>(
  () => {},
);
