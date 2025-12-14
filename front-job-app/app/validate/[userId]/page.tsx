"use client";

import { useToast } from "@/app/utils/context/ShowToastContext";
import { useUser } from "@/app/utils/context/UserDataContext";
import { userDataModel } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ValidateUserPage({
  parameters,
}: {
  parameters: Promise<{ userId: string }>;
}) {
  const { userId: userId = "" } = React.use(parameters);
  const user = useUser();
  const toast = useToast();
  const router = useRouter();
  const [isValidated, setIsValided] = useState<boolean>(false);

  async function verifyAccount(userData: userDataModel, paramId: string) {
    try {
      if (paramId !== userData.user_id)
        throw new Error("User ID does not match page ID.");

      // fetch here
      // else fetch

      // validate here

      // change message on page when finished
    } catch (err: unknown) {
      console.log(`err: `, err);
      toast.triggerToast({
        message: String(err),
        isError: true,
        showToast: true,
      });
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  }
  // sent fetch to update user to validated here
  useEffect(() => {
    if (!user.initialized || !userId) return;
  }, [user.initialized, userId]);

  if (isValidated) {
    return (
      <div className="p-4">
        <div className="p-4">
          <h1>You are now validated!</h1>
          <p>Thank you!</p>
          <p>
            {" "}
            Now you have full access to the{" "}
            <Link href={`/${user.userData.user_id}/resume`}>
              resume
            </Link> and{" "}
            <Link href={`/${user.userData.user_id}/cover`}>cover letter</Link>{" "}
            pages{" "}
          </p>
          <p>{`Z('w' / Z)_`}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="p-4">
      <h1>Sending Update to validated...</h1>
      <p>Loading...</p>
    </div>
  );
}
