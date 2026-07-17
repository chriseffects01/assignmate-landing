'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { IUser } from '@/src/types/user.types';
import { LoginPayload, RegisterPayload } from '@/src/types/auth.types';
import LoadingScreen from '@/src/components/shared/LoadingScreen';
import { authService } from '@/src/services/auth.service';
import { storage } from '@/src/lib/storage';

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  authenticated: boolean;

  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  // logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await authService.me();
        setUser(response.user);
      } catch (e: any) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const login = async (data: LoginPayload) => {
    await authService.login(data);
    // console.log(response);

    const currentUser = await authService.me();

    setUser(currentUser.user);
  };

  const register = async (data: RegisterPayload) => {
    await authService.register(data);

    const currentUser = await authService.me();

    setUser(currentUser.user);
  };

  // const logout = async () => {
  //   try {
  //     await logout();
  //     // setToken(null);

  //     storage.clearAuth();
  //   } catch (err) {
  //     console.error("Backend logout failed", err);
  //   } finally {
  //     setUser(null);
  //   }
  // };

  if (loading) {
    return <LoadingScreen message="Loading your Screen..." />;
  }

  return (
    <>
      {/* {loading && <LoadingScreen message="Loading your Screen..." />} */}
      <AuthContext.Provider
        value={{
          user,

          loading,
          authenticated: !!user,
          login,
          register,
          // logout,
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
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};
