"use client";

import { useEffect, useRef, useState } from "react";

export default function TextAreaComponent({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const partnerName = label.replaceAll(" ", "-").toLowerCase();
  const [touched, setTouched] = useState<boolean>(false);
  const [showAll, setShowAll] = useState<boolean>(false);

  // whenever value and show all change, change the height of the input
  useEffect(() => {
    if (textAreaRef.current && showAll) {
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [value, showAll]);
  return (
    <div
      className={`flex flex-col relative mt-8 ${showAll ? "h-fit" : "h-40"}`}
    >
      <label
        htmlFor={partnerName}
        className={`transition-all ease-in-out duration-150 absolute ${
          !touched && value === ""
            ? ` text-gray-700 inset-y-0 left-2 top-[10px]`
            : `text-white top-[-23px]`
        }`}
      >
        {!touched && value === "" ? label + "..." : label}
      </label>
      <textarea
        ref={textAreaRef}
        onFocus={() => {
          setTouched(true);
        }}
        name={partnerName}
        className={`bg-white text-black p-4 rounded ${!showAll && "h-full"}`}
        onChange={onChange}
        value={value}
      />
      <button
        className="w-full text-end"
        onClick={(e) => {
          e.preventDefault();
          setShowAll((prev) => !prev);
        }}
      >
        {showAll ? "Collapse Description" : "Show Full Description"}
      </button>
    </div>
  );
}
