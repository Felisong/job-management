"use client";

import { userDataModel } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

type userContext = {
  userData: userDataModel;
  updateUser: (data: userDataModel) => void;
};
const userValuesContext = createContext<userContext | undefined>(undefined);

export const UserValuesProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<userDataModel>({
    user_id: "",
    user_token: "",
    user_role: "",
  });
  const updateUser = (value: userDataModel) => {
    setUserData(value);
  };

  return (
    <userValuesContext.Provider value={{ userData, updateUser }}>
      {children}
    </userValuesContext.Provider>
  );
};

// hook for user info
export const useUser = () => {
  const context = useContext(userValuesContext);
  if (!context) throw new Error("needs to be used within the provider.");
  return context;
};
