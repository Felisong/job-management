"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type showToastData = {
  message: string;
  isError: boolean;
  showToast: boolean;
};

type toastContextType = {
  toastData: showToastData;
  triggerToast: (data: showToastData) => void;
};

const ShowToastContext = createContext<toastContextType | undefined>(undefined);

// provider
export const ShowToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastData, setToastData] = useState<{
    message: string;
    isError: boolean;
    showToast: boolean;
  }>({
    message: "",
    isError: false,
    showToast: false,
  });

  const triggerToast = (data: showToastData) => {
    setToastData(data);
    setTimeout(() => setToastData({ ...toastData, showToast: false }), 3000);
  };

  return (
    <ShowToastContext.Provider value={{ toastData, triggerToast }}>
      {children}
    </ShowToastContext.Provider>
  );
};

// the hook to use it easily
export const useToast = () => {
  const context = useContext(ShowToastContext);
  if (!context) {
    throw new Error("Must be used within ShowToastProvider");
  }
  return context;
};
