import { useAppSelector } from "@/hooks/redux";
import { authLinks, REDIRECT_URI } from "@/lib/utils";
import { lazy } from "react";
import { Navigate, Outlet, type RouteObject } from "react-router";

const LoginPage = lazy(() => import("./Login"));
const RegisterPage = lazy(() => import("./RegisterPage"));

function Authentication() {
  const { user } = useAppSelector((state) => state.auth);
  const redirect = sessionStorage.getItem(REDIRECT_URI);
  const redirectURI = redirect == null ? "/" : redirect;

  return user ? (
    <Navigate to={redirectURI} replace />
  ) : (
    <>
      <Outlet />
    </>
  );
}

export const authRoutes: RouteObject[] = [
  {
    path: authLinks.login,
    element: <LoginPage />,
  },
  {
    path: authLinks.register,
    element: <RegisterPage />,
  },
];

export default Authentication;
