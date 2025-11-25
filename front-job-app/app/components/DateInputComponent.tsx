"use client";

import { useState } from "react";

export default function DateInputComponent({
  label,
  value,
  onChange,
  validation = "",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation?: string;
}) {
  let date = value;
  if (value.includes('T')){
    date = value.split("T")[0];
  }
  const partnerName = label.replaceAll(" ", "-").toLowerCase();
  return (
    <div className="h-fit">
      <div className="flex flex-col relative">
        <label htmlFor={partnerName}>{label}</label>
        <input
          onChange={onChange}
          type="date"
          name={partnerName}
          value={date}
          className="bg-white h-full text-black p-4 rounded"
        />
      </div>
      {validation !== "" && (
        <p className="text-red-600 text-sm">{validation}</p>
      )}
    </div>
  );
}
