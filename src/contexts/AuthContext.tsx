import React, { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../constants/auth";

import {
  getStorageModel,
  removeStorage,
  setStorageModel,
} from "../utils/storage";
import { apiClient } from "../services/api";
import { toast } from "react-toastify";

interface AuthProviderProps {
  children: ReactNode;
}

type User = {
  email: string;
  password: string;
};

type UserAuth = {
  userId: string;
  name: string;
  email: string;
  isTechnician: boolean;
  companies: {
    companyId: string;
    companyName: string;
  };
};

interface AuthContextData {
  loading: boolean;
  isAuthenticated: boolean;
  signIn: any;
  signOut: () => void;
  user: UserAuth | undefined;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserAuth>();

  useEffect(() => {
    const token = getStorageModel(auth.TOKEN);
    const checkUser = getStorageModel(auth.USER);

    if (token) {
      setIsAuthenticated(true);
      setUser(JSON.parse(checkUser));
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function signIn(login: User) {
    try {
      const response = await apiClient().post("/authenticate/sign-in", login);

      console.log("response", response);

      const objToStrig = JSON.stringify({
        userId: response.data.id,
        email: response.data.email,
        name: response.data.name,
        isTechnician: response.data.isTechnician,
        companies: {
          companyId: response.data.companies.companyId,
          companyName: response.data.companies.companyName,
        },
      });

      setStorageModel(auth.TOKEN, response.data.tokens.token);
      setStorageModel(auth.REFRESH_TOKEN, response.data.tokens.refreshToken);
      setStorageModel(auth.USER, objToStrig);
      setIsAuthenticated(true);

      apiClient().defaults.headers[
        "Authorization"
      ] = `Bearer ${response.data?.token}`;

      toast.success(
        "Olá! Que bom te ver por aqui, seu login foi um sucesso! 😍",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      const timeOutRedirect = setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);

      return () => clearTimeout(timeOutRedirect);
    } catch (err: any) {
      toast.error(err.response.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  async function signOut() {
    setIsAuthenticated(false);
    removeStorage(auth.TOKEN);
    removeStorage(auth.REFRESH_TOKEN);
    removeStorage(auth.USER);

    toast.success("Ahhh, você já está indo? Isso será um até logo! 😁", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    const timeOutRedirect = setTimeout(() => {
      window.location.href = "/login";
    }, 1000);

    return () => clearTimeout(timeOutRedirect);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        signIn,
        signOut,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
