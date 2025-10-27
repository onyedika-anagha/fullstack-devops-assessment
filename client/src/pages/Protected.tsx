import Preloader from "@/components/Preloader";
import { useAppSelector } from "@/hooks/redux";
import { authLinks, REDIRECT_URI } from "@/lib/utils";
import { lazy } from "react";
import { Navigate, Outlet, useLocation, type RouteObject } from "react-router";

const DashboardPage = lazy(() => import("./dashboard"));

function ProtectedRoutes() {
  const { user, token, isLoading } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) return <Preloader />;
  if (user && token) {
    return <Outlet />;
  }
  sessionStorage.setItem(REDIRECT_URI, location.pathname);
  return <Navigate to={authLinks.login} replace />;
}

export const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
];

export default ProtectedRoutes;
