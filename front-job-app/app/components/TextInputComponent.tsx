"use client";

import { useState } from "react";

export default function TextInputComponent({
  label,
  value,
  onChange,
  validation = "",
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation?: string;
  type?: string;
}) {
  const partnerName = label.replaceAll(" ", "-").toLowerCase();
  const [touched, setTouched] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
          type={
            showPassword
              ? "text"
              : type === "password" && !showPassword
              ? "password"
              : "text"
          }
          name={partnerName}
          className="bg-white h-full text-black p-4 rounded"
          onChange={onChange}
          value={value}
          autoComplete={`${type === "password" && "current-password"}`}
        />
        {type === "password" && (
          <button
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
            className="absolute inset-y-0 right-3"
          >
            {showPassword ? (
              <p className="text-xl text-black text-center">X </p>
            ) : (
              <svg
                width="30"
                height="30"
                viewBox="0 0 180 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 87C62.9019 33.1362 120.263 31.5363 176 87"
                  stroke="black"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M6 88C63.2247 141.864 119.915 143.464 175 88"
                  stroke="black"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <circle cx="90" cy="87" r="41" fill="black" />
              </svg>
            )}
          </button>
        )}
      </div>
      {validation !== "" && touched && (
        <p className="text-red-600 text-sm">{validation}</p>
      )}
    </div>
  );
}
