import { Suspense } from "react";
import { createBrowserRouter } from "react-router";
import ErrorPage from "@/components/error/error.component";
import ProtectedRoutes, { protectedRoutes } from "./Protected";
import Preloader from "@/components/Preloader";
import Authentication, { authRoutes } from "./auth";

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Preloader />}>
        <Authentication />
      </Suspense>
    ),
    loader: () => <Preloader />,
    errorElement: <ErrorPage />,
    children: authRoutes,
  },
  {
    element: <ProtectedRoutes />,
    errorElement: <ErrorPage />,
    children: protectedRoutes,
  },
]);

export default router;
