import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { getAuthStatus } from "../utils/api";
import { IUser } from "../types/user.interface";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);

  const token = document.cookie;

  console.log({ token });

  const controller = new AbortController();

  useEffect(() => {
    getAuthStatus<IUser>()
      .then(({ data }) => {
        console.log("Use Auth Success:", data);
        setUser(data);
      })
      .catch((err: Error) => {
        console.log("Use Auth Error:", err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return { user, isLoading };
};
