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
  updateUser: (data: userDataModel) => void;
  clearUser: () => void;
  refreshUser: () => Promise<void>;
};

const userDataContext = createContext<userContext | undefined>(undefined);
const defaultUserData: userDataModel = {
  user_id: "",
  user_token: "",
  user_role: "",
  token_expiration: "",
  validated: false,
};

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<userDataModel>(defaultUserData);

  const updateUser = (value: userDataModel) => {
    setUserData(value);
    setAuthToken(value.user_token);
  };
  // on load get user token if it exists and update user.
  const refreshUser = async () => {
    const token = getAuthToken();
    console.log(`token: `, token);
    if (!token) return;
    try {
      const user = await FetchUserData(token);
      if (!user.userData) {
          throw new Error('Token timed out, please sign in again.')
        }
      if (user.success) {      
        updateUser(user.userData);
      } else {
        removeAuthToken();
        throw new Error("Error: ", user.message);
      }
    } catch (err: unknown) {
      console.error("Error fetching user: ", err);
      // showtoast if I want to let the user know their token is bogues
      removeAuthToken();
    } 
  };

  const clearUser = () => {
    setUserData(defaultUserData);
    removeAuthToken();
  };

  return (
    <userDataContext.Provider value={{ userData, updateUser, clearUser, refreshUser }}>
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
