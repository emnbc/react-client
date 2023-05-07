import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { LocalStore } from "../utils/local-store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UserItem } from "../models/users";

const authorizedClient = axios.create();

authorizedClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = LocalStore.getToken();
    token && config.headers.set("Authorization", "Bearer " + token);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AxiosInterceptor = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => response;
    const errInterceptor = (error: AxiosError) => {
      if (error.response?.status === 401) {
        LocalStore.setToken("");
        navigate("/login");
      }
      return Promise.reject(error);
    };
    const interceptor = authorizedClient.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => authorizedClient.interceptors.response.eject(interceptor);
  }, [navigate]);

  return children;
};

export const Auth = {
  login: (payload: { username: string; password: string }) => {
    return axios.post("/api/auth/login", payload);
  },
  register: (data: any) => {
    // TODO: interface for register data
    return authorizedClient.post("/api/v1/logout", data);
  },
  me: () => {
    return authorizedClient.get("/api/auth/me");
  },
};

export const Users = {
  getList: () => {
    return authorizedClient.get<UserItem[]>("/api/users");
  },
};
