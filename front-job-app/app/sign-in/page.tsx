"use client";

import { ChangeEvent, MouseEvent, useState } from "react";
import TextInputComponent from "../components/TextInputComponent";
import {
  isFieldEmpty,
  isMatchingPassword,
  isValidPassword,
} from "../utils/validation";
import type { userValueModel } from "@/types";
import { CreateUser } from "../actions/CreateUser";
import { SignInUser } from "../actions/SignInUser";

export default function SignInPage() {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [userValues, setUserValues] = useState<userValueModel>({
    email: "",
    password: "",
    confirmPassword: "",
    token: "",
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
      token: "",
    });
  }

  async function handleSubmit(type: string) {
      console.log(`meow??`);
      let result = {};
      if (type === "register") {
        result = await CreateUser(userValues);
      } else {
        result = await SignInUser(userValues);
      }
      console.log(`result: `, result);
      // add value to userContext so user stays signed in.
      // reroute to user Dashboard where there I check if the user is signed in
      
  };
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
          console.log(`CLICKED!`)
          const action = isRegistering ? "register" : "sign-in";
          handleSubmit(action);
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
