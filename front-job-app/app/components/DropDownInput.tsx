"use client";

import { useState } from "react";

export default function DropDownInput({
  onChange,
  value = "",
  validation = "",
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  validation?: string;
}) {
  const [touched, setTouched] = useState(false);
  return (
    <div className="flex flex-col mt-4 h-fit">
      <label htmlFor="state">State of Application </label>
      <select
        id="state"
        name="state"
        onChange={onChange}
        className="bg-white rounded h-10 text-black pl-4"
        value={value}
        onFocus={() => {
          setTouched(true);
        }}
      >
        <option value="rejected">Rejected</option>
        <option value="awaiting_response">Awaiting Response</option>
        <option value="awaiting_interview">Awaiting Interview</option>
        <option value="offered">Offered</option>
      </select>
      {validation !== "" && touched && (
        <p className="text-red-600 text-sm">{validation}</p>
      )}
    </div>
  );
}
