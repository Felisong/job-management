"use client";

import BasicButtonComponent from "@/app/components/BasicButtonComponent";
import TextInputComponent from "@/app/components/TextInputComponent";
import { useToast } from "@/app/utils/context/ShowToastContext";
import { useUser } from "@/app/utils/context/UserDataContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ChangeUserInformationPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type: type = "" } = React.use(params);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [capitalizedType, setCapitalizedType] = useState<string>("");
  const toast = useToast();
  const user = useUser();
  const router = useRouter();
  const [values, setValues] = useState({
    oldValue: "",
    newValue: "",
    confirmValue: "",
  });

  // state change handler for text inputs
  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    input: keyof typeof values
  ) {
    setValues((prev) => ({ ...prev, [input]: e.target.value }));
  }

  // submit function to update user info
  async function changeUserInformation(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    // meow
    // submit the user
  }

  // sets loading to false once the type is read so that the user can fill what they need
  useEffect(() => {
    if (type !== "") {
      setIsLoading(false);
      setCapitalizedType(
        type.substring(0, 1).toUpperCase() + type.substring(1)
      );
    }
  }, [type]);

  if (isLoading) {
    return (
      <div className="p-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1>Change {capitalizedType}</h1>
      <p>Please fill out inputs below to change your {type}</p>
      <TextInputComponent
        label={`Old ${capitalizedType}`}
        value={values.oldValue}
        onChange={(e) => {
          handleInputChange(e, "oldValue");
        }}
      />
      <TextInputComponent
        label={`New ${capitalizedType}`}
        value={values.newValue}
        onChange={(e) => {
          handleInputChange(e, "newValue");
        }}
      />
      <TextInputComponent
        label={`Confirm New ${capitalizedType}`}
        value={values.confirmValue}
        onChange={(e) => {
          handleInputChange(e, "confirmValue");
        }}
      />
      <BasicButtonComponent label="Submit" action={changeUserInformation} />
    </div>
  );
}
