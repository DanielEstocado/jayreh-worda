import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes.config";
import ShellLayout from "./ShellLayout";

const NotFoundScreen = lazy(() => import("@/screens/system/NotFoundScreen"));

// Renders every entry in ROUTES, the shell ones inside the shared layout and the standalone ones on their own, plus the catch-all 404.
export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="/home" replace />} />

      <Route element={<ShellLayout />}>
        {ROUTES.filter((r) => !r.standalone).map(({ path, screen: Screen }) => (
          <Route key={path} path={path} element={<Screen />} />
        ))}
      </Route>

      {ROUTES.filter((r) => r.standalone).map(({ path, screen: Screen }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={null}>
              <Screen />
            </Suspense>
          }
        />
      ))}

      <Route
        path="*"
        element={
          <Suspense fallback={null}>
            <NotFoundScreen />
          </Suspense>
        }
      />
    </Routes>
  );
}
