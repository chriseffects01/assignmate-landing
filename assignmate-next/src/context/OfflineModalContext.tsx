'use client';

import { useContext, createContext, useState, ReactNode } from 'react';

interface OfflineModalContextType {
  isOpen: boolean;
  openOfflineModal: () => void;
  closeOfflineModal: () => void;
  isRetrying: boolean;
}

const OfflineModalContext = createContext<OfflineModalContextType | null>(null);

export function OFflineModalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRetrying, setisRetrying] = useState<boolean>(false);

  const openOfflineModal = () => {
    console.log('Modal is open');
    setIsOpen(true);
  };

  const closeOfflineModal = () => {
    console.log('Modal is closed');
    setIsOpen(false);
  };
  const handleRetry = async () => {
    
  }

  return (
    <OfflineModalContext.Provider
      value={{
        isOpen,
        closeOfflineModal,
        openOfflineModal,
        isRetrying,
      }}
    >
      {children}
    </OfflineModalContext.Provider>
  );
}

export const useOfflineModal = () => {
  const context = useContext(OfflineModalContext);

  if (!context) {
    throw new Error(
      'UseOfflineModal must be used within an offlineModalProvider'
    );
  }
  return context;
};
