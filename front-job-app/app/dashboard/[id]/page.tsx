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

  async function ValidateUserPage(e: MouseEvent) {
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
      <h1>Hello</h1>
      <button disabled={!user.initialized} onClick={ValidateUserPage}>
        Validate Account{" "}
      </button>
      <p>omg meow</p>
    </div>
  );
}
