"use client";

import { useState } from "react";

export default function DateInputComponent({
  label,
  value = new Date(),
}: {
  label: string;
  value: Date;
}) {
  const partnerName = label.replaceAll(" ", "-").toLowerCase();
  const [touched, setTouched] = useState(false);

  // add value to be prepopulated here.
  return (
    <div className="flex flex-col relative h-10 mt-8">
      <label htmlFor={partnerName}>{label}</label>
      <input
        onFocus={() => {
          setTouched(true);
        }}
        type="date"
        name={partnerName}
        className="bg-white h-full text-black p-4 rounded"
      />
    </div>
  );
}
