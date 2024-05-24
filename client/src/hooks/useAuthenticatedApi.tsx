import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, Method } from "axios";
import { getCookie } from "../utils/getCookie";
import { FetchState, UseAuthenticatedApiResult } from "../types/api.interface";

interface ApiRequestParams<T> {
  url: string;
  method: Method;
  data?: Record<string, any>;
  config?: AxiosRequestConfig;
}

export const useAuthenticatedApi = <T,>({
  url,
  method = "GET",
  data,
  config,
}: ApiRequestParams<T>): UseAuthenticatedApiResult<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, loading: true }));
    const token = getCookie("SESSION");

    if (!token) {
      setState({ data: null, loading: false, error: "No token found" });
      return;
    }

    try {
      const response = await axios.request<T>({
        url: `${process.env.REACT_APP_SERVER_URL}${url}`,
        method,
        data,
        headers: {
          ...config?.headers,
          Authorization: `Bearer ${token}`,
        },
      });
      setState({ data: response.data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: (error as Error).message,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    ...state,
    refetch: fetchData,
  };
};
