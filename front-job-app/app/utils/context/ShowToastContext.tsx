"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type showToastData = {
  message: string;
  isError: boolean;
  showToast: boolean;
  requiresConfirmation?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type toastContextType = {
  toastData: showToastData;
  triggerToast: (data: showToastData) => void;
};

const ShowToastContext = createContext<toastContextType | undefined>(undefined);

// provider
export const ShowToastProvider = ({ children }: { children: ReactNode }) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [toastData, setToastData] = useState<showToastData>({
    message: "",
    isError: false,
    showToast: false,
  });

  const triggerToast = (data: showToastData) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setToastData(data);

    if (!data.requiresConfirmation) {
      setTimeout(() => setToastData({ ...toastData, showToast: false }), 3000);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current){
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

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
