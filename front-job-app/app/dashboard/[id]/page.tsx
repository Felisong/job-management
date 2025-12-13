"use client";

import { useToast } from "@/app/utils/context/ShowToastContext";
import { useUser } from "@/app/utils/context/UserDataContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function UserDashBoard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  console.log(`greetings`);
  const paramId = React.use(params).id || "";
  const toast = useToast();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user.initialized) return;

    if (paramId !== user.userData.user_id) {
      toast.triggerToast({
        message: `This url does not match your user information.}`,
        isError: true,
        showToast: true,
      });
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }

    // now on load, and after the user is initialized get any data I would want to here
  }, [user.userData, user.initialized]);

  return (
    <div className="p-4">
      <h1>Hello</h1>
      <p>omg meow</p>
    </div>
  );
}
