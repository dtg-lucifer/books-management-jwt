import { createContext, Dispatch, SetStateAction } from "react";
import { IUser } from "../types/user.interface";

interface IAuthContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
});

const { Provider: AuthProvider } = AuthContext;

export { AuthContext, AuthProvider };
