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
  async function ValidateUser(e: MouseEvent) {
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
  // call to change user password
  async function ChangePassword(e: MouseEvent) {
    e.preventDefault()
    try {
      // fetch
      console.log(`password change triggered`)
    } catch (err) {}
  }
  async function ChangeEmail(e: MouseEvent) {
    e.preventDefault();
    try {
      // fetch
      console.log(`email change triggered`)
    } catch (err) {}
  }

  async function deleteAccount(e: MouseEvent) {
    e.preventDefault();
    // pop up
    toast.triggerToast({
      message: "Are you sure?",
      isError: false,
      showToast: true,
      requiresConfirmation: true,
      onConfirm: async () => {
       // send delete account
      },
      onCancel: () => {
        return;
      },
    });
  }

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
            onClick={ChangePassword}
          >
            Validate Account{" "}
          </button>
        )}
        <button
          className="text-[clamp(1.5rem,_1.7rem,_2rem)] text-start"
          disabled={!user.initialized}
          onClick={(e) => {
            e.preventDefault();
            // mark to show input

          }}
        >
          Change Password
        </button>
        <button
          className="text-[clamp(1.5rem,_1.7rem,_2rem)] text-start"
          disabled={!user.initialized}
          onClick={(e) => {
           e.preventDefault();
           // mark to show inputs
          }}
        >
          Change Email
        </button>
        <button
          className="text-[clamp(1.5rem,_1.7rem,_2rem)] text-start"
          disabled={!user.initialized}
          onClick={deleteAccount}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
