"use client";

import UserButtonComponent from "./UserButtonComponent";



export default function Header() {
  return (
    <header className="w-full bg-primary flex justify-between p-4 px-6 items-center relative">
      <h1 className="text-secondary-text">
        <a href={"/"}>Jobs Manager</a>
      </h1>
      <UserButtonComponent w={50} h={50}/>
    </header>
  );
}
