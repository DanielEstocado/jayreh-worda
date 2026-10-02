import { lazy } from "react";

type RouteConfig = {
  path: string;
  screen: React.LazyExoticComponent<() => React.ReactElement>;
};

// Every routable screen in the app, add one entry here to register a new route. The 404 lives in routes/index.tsx.
export const ROUTES: RouteConfig[] = [
  { path: "/home", screen: lazy(() => import("@/screens/home/HomeScreen")) },
  { path: "/profile", screen: lazy(() => import("@/screens/profile/ProfileScreen")) },
  { path: "/about", screen: lazy(() => import("@/screens/about/AboutScreen")) },
  { path: "/store", screen: lazy(() => import("@/screens/store/StoreScreen")) },
  { path: "/groups", screen: lazy(() => import("@/screens/groups/GroupsScreen")) },
  { path: "/groups/:groupId", screen: lazy(() => import("@/screens/groups/GroupDetailScreen")) },
  { path: "/activities", screen: lazy(() => import("@/screens/activities/MyActivitiesScreen")) },
  {
    path: "/activities/:activityId",
    screen: lazy(() => import("@/screens/activities/ActivityDetailScreen")),
  },
];
