import { lazy } from "react";

type RouteConfig = {
  path: string;
  screen: React.LazyExoticComponent<() => React.ReactElement>;
};

// Every routable screen in the app, add one entry here to register a new route. The 404 lives in routes/index.tsx.
export const ROUTES: RouteConfig[] = [
  { path: "/home", screen: lazy(() => import("@/screens/home/HomeScreen")) },
  { path: "/about", screen: lazy(() => import("@/screens/about/AboutScreen")) },
];
