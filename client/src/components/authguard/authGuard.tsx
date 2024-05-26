import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AuthGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user, isLoading } = useAuth();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && pathname !== "/login") {
      navigate("/auth/login");
    }
  }, [user, navigate, pathname]);

  if (isLoading) {
    return <span>Fetching details...</span>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export { AuthGuard };
