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
  // console.log(`date coming in: `, value);
  const date = value.split("T")[0];
  const partnerName = label.replaceAll(" ", "-").toLowerCase();
  const [touched, setTouched] = useState(false);
  // add value to be prepopulated here.
  return (
    <div className="h-fit">
      <div className="flex flex-col relative">
        <label htmlFor={partnerName}>{label}</label>
        <input
          onFocus={() => {
            setTouched(true);
          }}
          onChange={onChange}
          type="date"
          name={partnerName}
          value={date}
          className="bg-white h-full text-black p-4 rounded"
        />
      </div>
      {validation !== "" && touched && (
        <p className="text-red-600 text-sm">{validation}</p>
      )}
    </div>
  );
}
