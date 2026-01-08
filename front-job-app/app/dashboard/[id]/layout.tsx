"use client";

import { useToast } from "@/app/utils/context/ShowToastContext";
import { useUser } from "@/app/utils/context/UserDataContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
export default function DashboardLayout({

  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id: id = "" } = React.use(params);
  const toast = useToast();
  const user = useUser();
  const router = useRouter();

  // auth check
  useEffect(() => {
    if (!user.initialized || !id) return;

    if (id !== user.userData.user_id) {
      toast.triggerToast({
        message: `This url does not match your user information.`,
        isError: true,
        showToast: true,
      });
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  }, [user.userData, user.initialized, id]);

  return <>{children}</>;
}
