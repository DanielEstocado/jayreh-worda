import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./routes.config";

const NotFoundScreen = lazy(() => import("@/screens/system/NotFoundScreen"));

// Renders every entry in ROUTES, each lazy-loaded behind its own Suspense boundary, plus the catch-all 404.
export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="/home" replace />} />

      {ROUTES.map(({ path, screen: Screen }) => (
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
