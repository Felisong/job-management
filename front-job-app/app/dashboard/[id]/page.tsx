"use client";

import { ChangeUserPassword } from "@/app/actions/ChangePassword";
import { SendValidationEmail } from "@/app/actions/SendValidationEmail";
import BasicButtonComponent from "@/app/components/BasicButtonComponent";
import TextInputComponent from "@/app/components/TextInputComponent";
import { useToast } from "@/app/utils/context/ShowToastContext";
import { useUser } from "@/app/utils/context/UserDataContext";
import { getAuthToken } from "@/app/utils/cookies";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";

export default function UserDashBoard() {
  const toast = useToast();
  const user = useUser()
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEmailChange, setisEmailChange] = useState<boolean>(false);
  const [confirmInput, setConfirmInput] = useState<{
    email: { label: string; value: string };
    password: { label: string; value: string };
  }>({ email: { label: "", value: "" }, password: { label: "", value: "" } });

  // sets visibility of confirmation pop up
  async function triggerModal(clickedEmailChange: boolean) {
    setisEmailChange(clickedEmailChange);
    setShowModal((prev) => !prev);
  }
  // handles the state of the input.
  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    input: keyof typeof confirmInput
  ) {
    setConfirmInput((prev) => ({
      ...prev,
      [input]: {
        label: prev[input].label,
        value: e.target.value,
      },
    }));
  }
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
  async function changePassword() {
    try {
      if (confirmInput.email.value.toLowerCase() !== user.userData.user_email.toLowerCase()) {
        throw new Error(
          "Email entered does not match our records... Please double check or contact me directly."
        );
      }
      await ChangeUserPassword(
        user.userData.user_id,
        user.userData.user_email,
        getAuthToken()
      );
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
    } finally {
      setShowModal(false);
    }
  }
  // call to change user email
  async function changeEmail() {
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

  return (
    <>
      {showModal && (
        <div className="bg-blue-900 p-4 h-fit">
          <TextInputComponent
            label="Email"
            value={confirmInput.email.value}
            onChange={(e) => {
              handleInputChange(e, "email");
            }}
          />
          {isEmailChange && (
            <TextInputComponent
              label="Password"
              value={confirmInput.password.value}
              onChange={(e) => {
                handleInputChange(e, "password");
              }}
            />
          )}
          <BasicButtonComponent
            label="Submit"
            action={(e) => {
              e.preventDefault();
              if (isEmailChange) {
                changeEmail();
              } else {
                changePassword();
              }
            }}
          />
        </div>
      )}
      <div className="p-4">
        <h1>User Dashboard</h1>
        <div className="p-4 flex flex-col gap-8">
          {!user.userData.validated && (
            <button
              className="text-[clamp(1.5rem,_1.7rem,_2rem)] text-start"
              disabled={!user.initialized}
              onClick={ValidateUser}
            >
              Validate Account{" "}
            </button>
          )}
          <button
            className="text-[clamp(1.5rem,_1.7rem,_2rem)] text-start"
            disabled={!user.initialized}
            onClick={(e) => {
              e.preventDefault();
              triggerModal(false);
            }}
          >
            Change Password
          </button>
          <button
            className="text-[clamp(1.5rem,_1.7rem,_2rem)] text-start"
            disabled={!user.initialized}
            onClick={(e) => {
              e.preventDefault();
              triggerModal(true);
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
    </>
  );
}
