"use client";

import { SendValidationEmail } from "@/app/actions/SendValidationEmail";
import { useToast } from "@/app/utils/context/ShowToastContext";
import { useUser } from "@/app/utils/context/UserDataContext";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useEffect } from "react";

export default function UserDashBoard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: paramId = "" } = React.use(params);
  const toast = useToast();
  const user = useUser();
  const router = useRouter();

  // call to send an email to the user.
  async function SubmitEmail(e: MouseEvent) {
    e.preventDefault();
    try {
      const validate = await SendValidationEmail(
        user.userData.user_id,
        user.userData.user_email
      );
      toast.triggerToast({
        message: validate.message,
        isError: false,
        showToast: true,
      });
    } catch (err: unknown) {
      toast.triggerToast({
        message: String(err),
        isError: true,
        showToast: true,
      });
    }
  }

  // pop up to avoid misclicks
  function userConfirm() {
    // return true or false
    
  }
  //TODO:
  //FIX JOB DATA DISPLAY

  // TODO:
  /* 
  1. Hide Validate Account Button if user is valid.
  2. Add Change Password Button and add it to sign in
  3. Add Change Email Button 
  4. Create a Contact Me Page? Should it be a page? 
      Might make it a Modal. Or Just in the footer
  5. Create Delete Account Function
  6. == Test User Auth some. ===
  */

  // auth check
  useEffect(() => {
    if (!user.initialized || !paramId) return;

    if (paramId !== user.userData.user_id) {
      toast.triggerToast({
        message: `This url does not match your user information.`,
        isError: true,
        showToast: true,
      });
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  }, [user.userData, user.initialized, paramId]);

  return (
    <div className="p-4">
      <h1>User Dashboard</h1>
      <div className="p-4 flex flex-col gap-8">
        {!user.userData.validated && (
          <button
            className="text-[clamp(1.5rem,_1.7rem,_2rem)] text-start"
            disabled={!user.initialized}
            onClick={SubmitEmail}
          >
            Validate Account{" "}
          </button>
        )}
        <button
          className="text-[clamp(1.5rem,_1.7rem,_2rem)] text-start"
          disabled={!user.initialized}
          onClick={() => {}}
        >
          Change Password
        </button>
          <button
          className="text-[clamp(1.5rem,_1.7rem,_2rem)] text-start"
          disabled={!user.initialized}
          onClick={() => {}}
        >
          Change Email
        </button>
          <button
          className="text-[clamp(1.5rem,_1.7rem,_2rem)] text-start"
          disabled={!user.initialized}
          onClick={() => {}}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
