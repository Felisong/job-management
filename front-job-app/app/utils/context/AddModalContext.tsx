"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  // provider to wrap around in the layout
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

// hook to use the modal context, i call this to have access to the values.

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("must be used within ModalProvider");
  }
  return context;
}
