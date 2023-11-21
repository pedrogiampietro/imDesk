import React, { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../constants/auth";

import {
  getStorageModel,
  removeStorage,
  setStorageModel,
} from "../utils/storage";
import axios from "axios";
import { toast } from "react-toastify";
import { apiClient } from "../services/api";

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
  avatarUrl?: string;
  companies: {
    companyId: string;
    companyName: string;
  };
  currentLoggedCompany: {
    currentLoggedCompanyId: string;
    currentLoggedCompanyName: string;
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
      const response = await axios.post(
        "http://10.0.101.70:3333/authenticate/sign-in",
        login
      );

      const objToStrig = JSON.stringify({
        userId: response.data.id,
        email: response.data.email,
        name: response.data.name,
        isTechnician: response.data.isTechnician,
        avatarUrl: response.data.avatarUrl,
        companies: response.data.companies,
        currentLoggedCompany: {
          currentLoggedCompanyId:
            response.data.currentLogged.currentLoggedCompanyId,
          currentLoggedCompanyName:
            response.data.currentLogged.currentLoggedCompanyName,
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
      }, 1);

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

    // const timeOutRedirect = setTimeout(() => {
    //   window.location.href = "/login";
    // }, 1000);

    // return () => clearTimeout(timeOutRedirect);
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
