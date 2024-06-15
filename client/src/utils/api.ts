import axios, { AxiosResponse } from "axios";
import { IUser } from "../types/user.interface";
import { getCookie } from "./cookie";

export const getAuthStatus = async <T>() => {
  const token = getCookie("SESSION");

  return await axios.get<IUser>(`${process.env.REACT_APP_SERVER_URL}/auth/me`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const login = async <T>(data: {
  userName: string;
  password: string;
}) => {
  return await axios.post<T>(
    `${process.env.REACT_APP_SERVER_URL}/auth/login`,
    data,
    {
      withCredentials: true,
    },
  );
};

export const register = async <T>(data: {
  userName: string;
  password: string;
}) => {
  return await axios.post<T>(
    `${process.env.REACT_APP_SERVER_URL}/auth/register`,
    data,
    {
      withCredentials: true,
    },
  );
};

export const getUserById = async <T extends IUser>(id: string) => {
  return await axios.get<T>(`${process.env.REACT_APP_SERVER_URL}/user/${id}`, {
    withCredentials: true,
  });
};

export const getAllBooks = async <T>() => {
  const token = getCookie("SESSION");

  return await axios.get<T>(`${process.env.REACT_APP_SERVER_URL}/books/all`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });
};
