"use client";

import { userDataModel } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAuthToken, removeAuthToken, setAuthToken } from "../cookies";
import { FetchUserData } from "@/app/actions/FetchUserData";

type userContext = {
  userData: userDataModel;
  clearUser: () => void;
  refreshUser: () => Promise<void>;
  initialized: boolean;
};

const userDataContext = createContext<userContext | undefined>(undefined);
const defaultUserData: userDataModel = {
  user_id: "",
  user_role: "",
  validated: false,
  user_email: ""
};

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<userDataModel>(defaultUserData);
  const [initialized, setInitialized] = useState<boolean>(false);

  const updateUser = (value: userDataModel, token: string) => {
    setUserData(value);
    setAuthToken(token);
    setInitialized(true);
  };

  const refreshUser = async () => {
    const token = getAuthToken();
    if (!token) {
      setInitialized(true);
      return;
    };

    try {
      const user = await FetchUserData(token);
      if (!user.userData && user.success) {
          throw new Error('Token timed out, please sign in again.')
        }
      if (user.success) {      
        updateUser(user.userData, token);
      } else {
        throw new Error("Error: ", user.message);
      }
    } catch (err: unknown) {
      console.error(err);
      // showtoast if I want to let the user know their token is bogus
      removeAuthToken();
    } 
  };

  const clearUser = () => {
    setUserData(defaultUserData);
    removeAuthToken();
    setInitialized(true);
  };

  return (
    <userDataContext.Provider value={{ userData, clearUser, refreshUser, initialized }}>
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
