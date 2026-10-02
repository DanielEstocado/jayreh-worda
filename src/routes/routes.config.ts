import { lazy } from "react";

type RouteConfig = {
  path: string;
  // The header title, a screen can swap it for one it only knows once loaded with `useShellTitle`.
  title: string;
  // Puts a back arrow in the header that links here.
  backTo?: string;
  // Skips the app shell, for pages that bring their own header.
  standalone?: boolean;
  screen: React.LazyExoticComponent<() => React.ReactElement>;
};

// Every routable screen in the app, add one entry here to register a new route. The 404 lives in routes/index.tsx.
export const ROUTES: RouteConfig[] = [
  {
    path: "/home",
    title: "Home",
    screen: lazy(() => import("@/screens/home/HomeScreen")),
  },
  {
    path: "/profile",
    title: "Profile",
    screen: lazy(() => import("@/screens/profile/ProfileScreen")),
  },
  {
    path: "/about",
    title: "About",
    standalone: true,
    screen: lazy(() => import("@/screens/about/AboutScreen")),
  },
  {
    path: "/store",
    title: "Store",
    screen: lazy(() => import("@/screens/store/StoreScreen")),
  },
  {
    path: "/groups",
    title: "My Groups",
    screen: lazy(() => import("@/screens/groups/GroupsScreen")),
  },
  {
    path: "/groups/:groupId",
    title: "Group",
    backTo: "/groups",
    screen: lazy(() => import("@/screens/groups/GroupDetailScreen")),
  },
  {
    path: "/activities",
    title: "My Activities",
    screen: lazy(() => import("@/screens/activities/MyActivitiesScreen")),
  },
  {
    path: "/activities/:activityId",
    title: "Activity",
    backTo: "/activities",
    screen: lazy(() => import("@/screens/activities/ActivityDetailScreen")),
  },
];
