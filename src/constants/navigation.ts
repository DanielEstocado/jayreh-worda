import { BookOpen, House, Shirt, Store, User, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  id: "home" | "activities" | "groups" | "merch" | "store" | "profile";
  label: string;
  icon: LucideIcon;
  // No path means a visual-only entry that goes nowhere yet, it is left out of the mobile dock.
  path?: string;
};

// The main sections of the app, shown in the sidebar on desktop and (the ones with a path) in the bottom dock on mobile.
export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", path: "/home", icon: House },
  { id: "activities", label: "My Activities", path: "/activities", icon: BookOpen },
  { id: "groups", label: "My Groups", path: "/groups", icon: Users },
  // Merch is visual only for now, the store is where points (XP) are spent.
  { id: "merch", label: "Merch", icon: Shirt },
  { id: "store", label: "Store", path: "/store", icon: Store },
  { id: "profile", label: "Profile", path: "/profile", icon: User },
];
