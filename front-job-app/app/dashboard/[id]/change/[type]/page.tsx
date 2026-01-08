"use client";

import { useToast } from "@/app/utils/context/ShowToastContext";
import { useUser } from "@/app/utils/context/UserDataContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ChangeUserInformationPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type: type = "" } = React.use(params);
  const toast = useToast();
  const user = useUser();
  const router = useRouter();

  console.log(`do i see type?: `, type);

  if (type === "password") {
    return (
      <div className="p-4">
        <h1>Change information</h1>
        <p>Please fill out inputs below to change your information</p>
      </div>
    );
  } else {
    return (
      <div className="p-4">
        <h1>Change information</h1>
        <p>Please fill out inputs below to change your information</p>
      </div>
    );
  }
}
