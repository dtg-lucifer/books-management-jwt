import React, { useContext, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AuthGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user, isLoading } = useAuth();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  console.log("Pathname:", pathname);

  if (isLoading) {
    return <span>Fetching details...</span>;
  }

  if (!user) {
    if (
      pathname.split("/").includes("login") ||
      pathname.split("/").includes("register")
    ) {
      return <>{children}</>;
    }
    return <Navigate to="/auth/login" state={{ from: pathname }} replace />;
  }

  if (pathname.split("/").includes("auth")) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export { AuthGuard };
