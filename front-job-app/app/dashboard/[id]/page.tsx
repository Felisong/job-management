"use client";

import { ChangeUserPassword } from "@/app/actions/ChangePassword";
import { SendValidationEmail } from "@/app/actions/SendValidationEmail";
import { useToast } from "@/app/utils/context/ShowToastContext";
import { useUser } from "@/app/utils/context/UserDataContext";
import { getAuthToken } from "@/app/utils/cookies";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useEffect, useState } from "react";

export default function UserDashBoard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: paramId = "" } = React.use(params);
  const toast = useToast();
  const user = useUser();
  const router = useRouter();
  const [confirmationInputs, setConfirmationInputs] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

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
  // trigger Modal
  async function triggerModal(e: MouseEvent){
    e.preventDefault();
    // change variable to opposite of itself.
  }
  // call to change user password
  async function changePassword(e: MouseEvent) {
    e.preventDefault();
    try {
      if (confirmationInputs.email !== user.userData.user_email) {
        throw new Error(
          "email entered does not match our records... Please contact me directly."
        );
      };
      await ChangeUserPassword(user.userData.user_id, user.userData.user_email, getAuthToken());
      toast.triggerToast({
        message: "Sent email to reset password",
        isError: false,
        showToast: true,
      });
    } catch (err) {
      toast.triggerToast({
        message: String(err),
        isError: true,
        showToast: true,
      });
    }
  }
  // call to change user email
  async function ChangeEmail(e: MouseEvent) {
    e.preventDefault();
    try {
      // fetch
      console.log(`email change triggered`);
    } catch (err) {}
  }

  // call to delete account
  async function deleteAccount() {
    // pop up to get user confirmation
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
            onClick={changePassword}
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
