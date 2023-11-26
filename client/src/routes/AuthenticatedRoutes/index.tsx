import { NavBar } from "@/components/NavBar";
import AuthService from "@/service/AuthService";
import { Navigate, Outlet } from "react-router-dom";

export function AuthenticatedRoutes() {
  const isAuthenticated = AuthService.isAuthenticated();

  return isAuthenticated ? (
    <>
        <NavBar />
        <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}
