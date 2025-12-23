"use client";

import { useToast, showToastData } from "../utils/context/ShowToastContext";

export default function ToastComponent() {
  const { toastData } = useToast();

  return (
    <div className="fixed inset-0 w-full flex justify-center pointer-events-none glassmorphism mt-15">
      <div
        className={` w-5/6 transition ease-in-out duration-150 ${
          toastData.showToast ? "opacity-100" : "opacity-100"
        } ${toastData.isError ? "bg-red-500" : "bg-green-500"}`}
      >
        <p>{toastData.message}</p>
      </div>
    </div>
  );
}
