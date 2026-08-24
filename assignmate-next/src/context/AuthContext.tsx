'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IUser } from '@/src/types/user.types';
import { LoginPayload, RegisterPayload } from '@/src/types/auth.types';
import LoadingScreen from '@/src/components/shared/LoadingScreen';
import { authService } from '@/src/services/auth.service';
import { OfflineError, UnathourizedError } from '../errors/appError';
import { storage } from '../lib/storage';
import { useNotification } from './NotificationContext';
import { UpdateProfile } from '@/src/services/profileService';
import { UpdateProfileData } from '../types/profile';

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  authenticated: boolean;
  isOffline: boolean;

  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  updateUser: (data: UpdateProfileData) => Promise<IUser | undefined>;
  // logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const { toast } = useNotification();

  useEffect(() => {
    const cachedUser = storage.getUser();
    if (cachedUser) {
      setUser(cachedUser);
    }
  }, []);

  const load = useCallback(async () => {
    try {
      const response = await authService.me();
      const user = response.user;

      storage.setUser(user);
      setUser(user);

      if (isOffline) {
        setIsOffline(false);
        toast.success("You're back online");
      }
    } catch (e: any) {
      if (e instanceof OfflineError) {
        if (!isOffline) {
          setIsOffline(true);
          toast.warning("You're Offline");
        }
        return;
      }

      if (e instanceof UnathourizedError) {
        storage.removeUser();
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, [isOffline, toast]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const handleOnline = () => {
      load();
    };

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [load]);

  const login = async (data: LoginPayload) => {
    await authService.login(data);

    const currentUser = await authService.me();
    const user = currentUser.user;
    setUser(user);
    storage.setUser(user);
    toast.success('Logged in successfully');
  };

  const register = async (data: RegisterPayload) => {
    await authService.register(data);

    const currentUser = await authService.me();
    const user = currentUser.user;

    setUser(user);
    storage.setUser(user);
    toast.success('Signed up successfully');
  };

  const updateUser = async (data: UpdateProfileData) => {
    const response = await UpdateProfile(data);
    console.log('Update Profile Response:', response);
    if (!response) return;
    const updatedUser = response.user;

    console.log('Updated user:', updatedUser);
    setUser(updatedUser);
    storage.setUser(updatedUser);

    if (response.message) {
      toast.success(response.message);
    }

    return updatedUser;
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
          isOffline,

          loading,
          authenticated: !!user,
          login,
          register,
          updateUser,
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
