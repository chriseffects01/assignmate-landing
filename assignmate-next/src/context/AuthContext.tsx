"use client";
import { createContext, useContext, useEffect, useState } from "react";

import { IUser } from "@/src/types/user.types";
import { LoginPayload, RegisterPayload } from "@/src/types/auth.types";

import LoadingScreen from "@/src/components/shared/LoadingScreen";

import { authService } from "@/src/services/auth.load.services";

import { storage } from "@/src/lib/storage";

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  authenticated: boolean;

  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  const [token, setToken] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = storage.getToken();

    const storedUser = storage.getUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  const login = async (data: LoginPayload) => {
    const response = await authService.login(data);

    setUser(response.user);
    setToken(response.token);

    storage.setUser(response.user);
    storage.setToken(response.token);
  };

  const register = async (data: RegisterPayload) => {
    const response = await authService.register(data);

    setUser(response.user);
    setToken(response.token);

    storage.setUser(response.user);
    storage.setToken(response.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    storage.clearAuth();
  };

  if (loading) {
    return <LoadingScreen message="Loading your Screen..." />;
  }

  return (
    <>
      {/* {loading && <LoadingScreen message="Loading your Screen..." />} */}
      <AuthContext.Provider
        value={{
          user,
          token,
          loading,
          authenticated: !!token,
          login,
          register,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth muset be used inside AuthProvider");
  }

  return context;
};
