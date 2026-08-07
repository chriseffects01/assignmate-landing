'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

import {
  ConfirmOptions,
  NotificationContextType,
  Toast,
  ToastType,
} from '../types/niotification.types';

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmState, setConfirmState] = useState<ConfirmOptions | null>(null);

  // Toast handlers

  const addToast = (
    type: ToastType,
    message: string,
    duration: number = 4000
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message, duration }]);

    //Commented out for debugging purposes
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toast = {
    success: (msg: string, duration?: number) =>
      addToast('success', msg, duration),
    error: (msg: string, duration?: number) => addToast('error', msg, duration),
    info: (msg: string, duration?: number) => addToast('info', msg, duration),
    warning: (msg: string, duration?: number) =>
      addToast('warning', msg, duration),
  };

  // -- Confirm Popup Handlers ---

  const confirm = (options: ConfirmOptions) => {
    setConfirmState(options);
  };

  const closeConfirm = () => {
    setConfirmState(null);
  };

  return (
    <NotificationContext.Provider
      value={{
        toasts,
        toast,
        removeToast,
        confirmState,
        confirm,
        closeConfirm,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'UseNotification must be used within a Notification Provider'
    );
  }

  return context;
};
