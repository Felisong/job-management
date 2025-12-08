"use client";

import { ChangeEvent, MouseEvent, useState } from "react";
import TextInputComponent from "../components/TextInputComponent";
import {
  isFieldEmpty,
  isMatchingPassword,
  isValidPassword,
} from "../utils/validation";
import BasicButtonComponent from "../components/BasicButtonComponent";
interface userValueModel {
  username: string;
  password: string;
  confirmPassword: string;
}

export default function SignInPage() {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [userValues, setUserValues] = useState<userValueModel>({
    username: "",
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
      username: "",
      password: "",
      confirmPassword: "",
    });
  }

  function handleSubmit(type: string) {
    return (e: MouseEvent) => {
      const action = type === "" ? "" : "";
      e.preventDefault();
      // handle sign in or registration submit
    };
  }
  return (
    <div className="p-4 h-fit py-4 flex flex-col">
      <h1 className="text-lg">Sign In</h1>
      {isRegistering ? (
        <>
          <TextInputComponent
            label="Username"
            onChange={textChange("username")}
            value={userValues.username}
            validation={isFieldEmpty(userValues.username, "username")}
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
            onChange={textChange("username")}
            value={userValues.username}
            validation={isFieldEmpty(userValues.username, "username")}
          />
          <TextInputComponent
            label="Password"
            onChange={textChange("password")}
            value={userValues.password}
            validation={isValidPassword(userValues.username)}
            type="password"
          />
        </>
      )}
      <BasicButtonComponent
        classes="text-xl py-4"
        label={isRegistering ? "Register" : "Sign In"}
        action={
          isRegistering ? handleSubmit("register") : handleSubmit("sign-in")
        }
      />
      <button onClick={handleSwitch}>
        {isRegistering
          ? "Click here to sign in."
          : "Click here to register for an account"}
      </button>
    </div>
  );
}
