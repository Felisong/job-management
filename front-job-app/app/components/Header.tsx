"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-primary flex justify-between p-4 px-6 items-center">
      <h1 className="text-secondary-text">
        <Link href={"/"}>Jobs Manager</Link>
      </h1>
      <div className="w-[50px] h-[50px] bg-red-600 rounded-full"></div>
    </header>
  );
}
