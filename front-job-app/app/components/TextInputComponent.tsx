"use client";

import { useState } from "react";

export default function TextInputComponent({
  label,
  value,
  onChange,
  validation = "",
  type = 'text'
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation?: string;
  type?: string
}) {
  const partnerName = label.replaceAll(" ", "-").toLowerCase();
  const [touched, setTouched] = useState(false);

  // add value to be prepopulated here.
  return (
    <div className="h-fit">
      <div className="flex flex-col relative h-10 mt-8">
        <label
          htmlFor={partnerName}
          className={`transition-all ease-in-out duration-150 absolute ${
            !touched && value === ""
              ? ` text-gray-700 inset-y-0 left-2 flex items-center`
              : `text-white bottom-[110%]`
          }`}
        >
          {!touched && value === "" ? label + "..." : label}
        </label>
        <input
          onFocus={() => {
            setTouched(true);
          }}
          type={type}
          name={partnerName}
          className="bg-white h-full text-black p-4 rounded"
          onChange={onChange}
          value={value}
        />
      </div>
      {validation !== "" && touched && (
        <p className="text-red-600 text-sm">{validation}</p>
      )}
    </div>
  );
}
