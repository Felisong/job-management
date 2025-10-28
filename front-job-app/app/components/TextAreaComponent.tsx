"use client";

import { useState } from "react";

export default function TextAreaComponent({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  const partnerName = label.replaceAll(" ", "-").toLowerCase();
  const [touched, setTouched] = useState<boolean>(false);
  const [showAll, setShowAll] = useState<boolean>(false);

  // add value to be prepopulated here.
  return (
    <div
      className={`flex flex-col relative mt-8 ${showAll ? "h-fit" : "h-40"}`}
    >
      <label
        htmlFor={partnerName}
        className={`transition-all ease-in-out duration-150 absolute ${
          !touched
            ? ` text-gray-700 inset-y-0 left-2 top-[10px]`
            : `text-white bottom-[103%]`
        }`}
      >
        {!touched ? label + "..." : label}
      </label>
      <textarea
        onFocus={() => {
          setTouched(true);
        }}
        name={partnerName}
        className={`bg-white text-black p-4 rounded ${
          showAll ? "h-fit" : "h-full"
        }`}
      />
      <button
        className="w-full text-end"
        onClick={() => {
          setShowAll((prev) => !prev);
        }}
      >
        {showAll ? "Collapse Description" : "Show Full Description"}
      </button>
    </div>
  );
}
