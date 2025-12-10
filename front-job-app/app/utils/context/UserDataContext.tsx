"use client";

import { userDataModel } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

type userContext = {
  userData: userDataModel;
  updateUser: (data: userDataModel) => void;
};
const userDataContext = createContext<userContext | undefined>(undefined);

export const UserValuesProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<userDataModel>({
    user_id: "",
    user_token: "",
    user_role: "",
    token_expiration: '',
    validated: false
  });
  const updateUser = (value: userDataModel) => {
    setUserData(value);
  };

  return (
    <userDataContext.Provider value={{ userData, updateUser }}>
      {children}
    </userDataContext.Provider>
  );
};

// hook for user info
export const useUser = () => {
  const context = useContext(userDataContext);
  if (!context) throw new Error("needs to be used within the provider.");
  return context;
};
