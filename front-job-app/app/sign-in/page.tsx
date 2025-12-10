"use client";

import { ChangeEvent, MouseEvent, useState } from "react";
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
    let result: { success: boolean; message: string; userData: userDataModel } =
      {
        success: false,
        message: "",
        userData: {
          user_id: "",
          user_token: "",
          user_role: "",
          token_expiration: "",
          validated: false,
        },
      };
   try {
     if (isRegistering) {
      result = await CreateUser(userValues);
    } else {
      // result = await SignInUser(userValues);
    }
    if (!result.success) throw new Error(result.message);
    // update user context and sign in.
    userData.updateUser(result.userData);
    toast.triggerToast({message: 'Successfully created user, rerouting...', isError: false, showToast: true});
    setTimeout(() => {
      const userId = result.userData.user_id;
      router.push(`/dashboard/${userId}`);
    }, 1500)
   } catch (err: unknown){
    toast.triggerToast({message: `${err}`, isError: true, showToast: true})
   }
    // add value to userContext so user stays signed in.
    // reroute to user Dashboard where there I check if the user is signed in
  }
  return (
    <div className="p-4 h-fit py-4 flex flex-col">
      <h1 className="text-lg">Sign In</h1>
      {isRegistering ? (
        <>
          <TextInputComponent
            label="email"
            onChange={textChange("email")}
            value={userValues.email}
            validation={isFieldEmpty(userValues.email, "email")}
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
            label="Username"
            onChange={textChange("email")}
            value={userValues.email}
            validation={isFieldEmpty(userValues.email, "email")}
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
          console.log(`CLICKED!`);
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
