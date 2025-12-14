"use client";

import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import TextInputComponent from "../components/TextInputComponent";
import {
  isFieldEmpty,
  isMatchingPassword,
  isValidPassword,
} from "../utils/validation";
import type { userDataModel, userValueModel } from "@/types";
import { CreateUser } from "../actions/CreateUser";
import { SignInUser } from "../actions/SignInUser";
import { useUser } from "../utils/context/UserDataContext";
import { useToast } from "../utils/context/ShowToastContext";
import { useRouter } from "next/navigation";
import { setAuthToken } from "../utils/cookies";

export default function SignInPage() {
  const userData = useUser();
  const toast = useToast();
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [userValues, setUserValues] = useState<userValueModel>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  function textChange(key: keyof userValueModel) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setUserValues((prev) => ({ ...prev, [key]: e.target.value }));
    };
  }
  // changes to sign in or registration
  function handleSwitch(e: MouseEvent) {
    e.preventDefault();
    setIsRegistering((prev) => !prev);
    setUserValues({
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  async function handleSubmit() {
    let result: {
      success: boolean;
      message: string;
      userData: userDataModel & {
        user_token: string;
        token_expiration: string;
      };
    } = {
      success: false,
      message: "",
      userData: {
        user_id: "",
        user_token: "",
        user_role: "",
        token_expiration: "",
        validated: false,
        user_email: ""
      },
    };
    try {
      if (isRegistering) {
        result = await CreateUser(userValues);
      } else {
        result = await SignInUser(userValues);
      }
      if (!result.success) throw new Error(result.message);
      // sets token as soon as it succeeds
      setAuthToken(result.userData.user_token);
      // immediately updates userData for immediate use
      await userData.refreshUser();

      toast.triggerToast({
        message: result.message,
        isError: false,
        showToast: true,
      });
      setTimeout(() => {
        const userId = result.userData.user_id;
        router.push(`/dashboard/${userId}`);
      }, 1500);
    } catch (err: unknown) {
      toast.triggerToast({ message: `${err}`, isError: true, showToast: true });
    }
  }

  return (
    <div className="p-4 h-fit py-4 flex flex-col">
      <h1 className="text-lg">Sign In</h1>
      {isRegistering ? (
        <>
          <TextInputComponent
            label="Email"
            onChange={textChange("email")}
            value={userValues.email}
            validation={isFieldEmpty(userValues.email, "email")}
            type="email"
          />
          <TextInputComponent
            label="Password"
            onChange={textChange("password")}
            value={userValues.password}
            validation={isValidPassword(userValues.password)}
            type="password"
          />
          <TextInputComponent
            label="Confirm Password"
            onChange={textChange("confirmPassword")}
            value={userValues.confirmPassword}
            validation={isMatchingPassword(
              userValues.confirmPassword,
              userValues.password
            )}
            type="password"
          />
        </>
      ) : (
        <>
          <TextInputComponent
            label="Email"
            onChange={textChange("email")}
            value={userValues.email}
            validation={isFieldEmpty(userValues.email, "email")}
            type="email"
          />
          <TextInputComponent
            label="Password"
            onChange={textChange("password")}
            value={userValues.password}
            validation={isValidPassword(userValues.password)}
            type="password"
          />
        </>
      )}
      <button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="text-xl py-4"
      >
        {isRegistering ? "Register" : "Sign In"}
      </button>

      <button onClick={handleSwitch}>
        {isRegistering
          ? "Click here to sign in."
          : "Click here to register for an account"}
      </button>
    </div>
  );
}
