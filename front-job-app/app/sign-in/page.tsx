"use client";

import { ChangeEvent, useState } from "react";
import TextInputComponent from "../components/TextInputComponent";
import { isFieldEmpty } from "../utils/validation";
import Link from "next/link";
import BasicButtonComponent from "../components/BasicButtonComponent";
interface userValueModel {
  username: string;
  password: string;
}

export default function SignInPage() {
  const [userValues, setUserValues] = useState<userValueModel>({
    username: "",
    password: "",
  });

  function textChange(key: keyof userValueModel) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      userValues[key] = e.target.value;
    };
  }
  function handleSwitch() {
    return (e: MouseEvent) => {
    }
  }
  return (
    <div className="p-4 h-fit py-4 flex flex-col">
      <h1 className="text-lg">Sign In</h1>
      <TextInputComponent
        label="Username"
        onChange={textChange("username")}
        value={userValues.username}
        validation={isFieldEmpty(userValues.username, 'username')}
      />
      <TextInputComponent
        label="Password"
        onChange={textChange("password")}
        value={userValues.password}
        validation={isFieldEmpty(userValues.username, 'username')}
      />
      <BasicButtonComponent label="Sign In" action={handleSwitch} />
      <button>Click here to Register for an account</button>
    </div>
  );
}
