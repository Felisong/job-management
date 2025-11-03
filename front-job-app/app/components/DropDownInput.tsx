"use client";

import { useState } from "react";

export default function DropDownInput({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="flex flex-col mt-4">
      <label htmlFor="state">State of Application </label>
      <select
        id="state"
        name="state"
        onChange={onChange}
        className="bg-white rounded h-10 text-black pl-4"
      >
        <option value="rejected">Rejected</option>
        <option value="awaiting_response">Awaiting Response</option>
        <option value="awaiting_interview">Awaiting Interview</option>
        <option value="offered">Offered</option>
      </select>
    </div>
  );
}
