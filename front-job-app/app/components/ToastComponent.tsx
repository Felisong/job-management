"use client";

import { useToast } from "../utils/context/ShowToastContext";

export default function ToastComponent() {
  const { toastData, triggerToast } = useToast();

  function handleConfirm() {
    if (toastData.onConfirm) {
      toastData.onConfirm();
    }
    triggerToast({ ...toastData, showToast: false });
  }
  function handleCancel() {
    if (toastData.onCancel) {
      toastData.onCancel();
    }
    triggerToast({ ...toastData, showToast: false });
  }

  if (!toastData.showToast) return null;

  return (
    <div className="fixed inset-0 w-full flex justify-center pointer-events-none glassmorphism mt-15">
      <div
        className={`h-fit w-5/6 transition ease-in-out duration-150 ${
          toastData.isError ? "bg-red-500" : "bg-green-500"
        }`}
      >
        <p>{toastData.message}</p>
        {toastData.requiresConfirmation && (
          <div>
            <button onClick={handleConfirm}>&#10004;</button>
            <button onClick={handleCancel}>X</button>
          </div>
        )}
      </div>
    </div>
  );
}
