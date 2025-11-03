"use client";

import { useState } from "react";

export default function DateInputComponent({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const date = value.split("T")[0];
  const partnerName = label.replaceAll(" ", "-").toLowerCase();
  const [touched, setTouched] = useState(false);
  // add value to be prepopulated here.
  return (
    <div className="flex flex-col relative h-10">
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
  );
}
