import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthenticatedApi } from "../../hooks/useAuthenticatedApi";
import { IUser } from "../../types/user.interface";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const { data, loading, error, refetch } = useAuthenticatedApi<IUser>({
    url: "/api/v1/auth/me",
    method: "GET",
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }

    return () => {
      setUser(null);
      refetch();
    };
  }, [data, error]);

  if (loading) {
    return <span>Fetching details...</span>;
  }

  if (!user) {
    console.log("No token found");
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
