"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "../utils/context/UserDataContext";

export default function UserButtonComponent({
  w = 100,
  h = 100,
}: {
  w: number;
  h: number;
}) {
  const user = useUser();
  // code here
  const route = useRouter();
  const [showDropdown, setShowDropDown] = useState<boolean>(false);
  const [list, setList] = useState<{ label: string; value: string }[]>([
    { label: "Sign In / Register", value: "sign-in" },
  ]);

  useEffect(() => {
    const u = user.userData;
    if (u.user_id !== "") {
      setList([
        { label: "User Dashboard", value: `dashboard/${u.user_id}` },
        { label: "Sign Out", value: "sign-out" },
      ]);
    } else {
      setList([{ label: "Sign In / Register", value: "sign-in" }]);
    }
  }, [user.userData]);
  return (
    <>
      <button
        onClick={() => {
          setShowDropDown((prev) => !prev);
        }}
        className="cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={w}
          height={h}
          fill="none"
          viewBox="0 0 196 196"
        >
          <g clipPath="url(#clip0_24_2)">
            <circle cx="98" cy="98" r="98" fill="#FFC9C9"></circle>
            <circle cx="98" cy="84" r="50" fill="#092742"></circle>
            <mask
              id="mask0_24_2"
              width="196"
              height="196"
              x="0"
              y="0"
              maskUnits="userSpaceOnUse"
              style={{ maskType: "alpha" }}
            >
              <circle cx="98" cy="98" r="98" fill="#FFC9C9"></circle>
            </mask>
            <g mask="url(#mask0_24_2)">
              <rect
                width="117"
                height="81"
                x="43"
                y="129"
                fill="#092742"
                rx="33.5"
              ></rect>
            </g>
          </g>
          <defs>
            <clipPath id="clip0_24_2">
              <path fill="#fff" d="M0 0h196v196H0z"></path>
            </clipPath>
          </defs>
        </svg>
      </button>
      {showDropdown && (
        <div
          className={`absolute left-0 top-[100%] w-full z-1 bg-secondary-backdrop flex flex-col`}
        >
          {list.map(({ label, value }, i) => (
            <div key={value}>
              {i === 0 && <hr></hr>}
              <button
                className="text-xl border-box p-4"
                onClick={(e) => {
                  e.preventDefault();
                  if (value === "sign-out") {
                    user.clearUser();
                    user.refreshUser();
                  } else {
                    route.push(`/${value}`);
                  }
                  setShowDropDown(false);
                }}
              >
                {label}
              </button>
              <hr />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
