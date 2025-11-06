"use client";

export default function Spinner() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 49 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin flex w-full "
    >
      <g clipPath="url(#clip0_284_250)">
        <circle cx="24" cy="24" r="21" stroke="white" strokeWidth="6" />
        <mask
          id="mask0_284_250"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <circle cx="24" cy="24" r="21" stroke="white" strokeWidth="6" />
        </mask>
        <g mask="url(#mask0_284_250)">
          <path
            d="M2 5.19753e-05L42.5 0L34 11.5001H12L2 5.19753e-05Z"
            fill="#001A2E"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_284_250">
          <rect width="48" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
