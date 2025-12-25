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
  async function ValidateUser() {
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
  async function ChangePassword() {
    try {
      // fetch
      console.log(`password change triggered`)
    } catch (err) {}
  }

  // pop up
  async function confirmAction(e: MouseEvent, action: string) {
    // pop up
    toast.triggerToast({
      message: "Are you sure?",
      isError: false,
      showToast: true,
      requiresConfirmation: true,
      onConfirm: async () => {
        switch (action) {
          case "change-pw":
            await ChangePassword();
            break;
          case "change-email":
            // change email function
            break;
          case "delete-acc":
            // delete acc function
            break;
          case "user-validation":
            await ValidateUser();
            break;
          default:
            break;
        }
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
            onClick={(e) => {
              confirmAction(e, "user-validation");
            }}
          >
            Validate Account{" "}
          </button>
        )}
        <button
          className="text-[clamp(1.5rem,_1.7rem,_2rem)] text-start"
          disabled={!user.initialized}
          onClick={(e) => {
            confirmAction(e, "change-pw");
          }}
        >
          Change Password
        </button>
        <button
          className="text-[clamp(1.5rem,_1.7rem,_2rem)] text-start"
          disabled={!user.initialized}
          onClick={(e) => {
            confirmAction(e, "change-email");
          }}
        >
          Change Email
        </button>
        <button
          className="text-[clamp(1.5rem,_1.7rem,_2rem)] text-start"
          disabled={!user.initialized}
          onClick={(e) => {
            confirmAction(e, "delete-acc");
          }}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
