"use client";

import { useState } from "react";

export default function TextInputComponent({ label }: { label: string }) {
  const partnerName = label.replaceAll(" ", "-").toLowerCase();
  const [touched, setTouched] = useState(false);

  // add value to be prepopulated here.
  return (
    <div className="flex flex-col relative h-10 mt-8">
      <label
        htmlFor={partnerName}
        className={`transition-all ease-in-out duration-150 absolute ${
          !touched
            ? ` text-gray-700 inset-y-0 left-2 flex items-center`
            : `text-white bottom-[110%]`
        }`}
      >
        {!touched ? label + "..." : label}
      </label>
      <input
        onFocus={() => {
          setTouched(true);
        }}
        type="text"
        name={partnerName}
        className="bg-white h-full text-black p-4"
      />
    </div>
  );
}
