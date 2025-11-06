"use client";

import { useState } from "react";
import Spinner from "./utils/Spinner";

export default function BasicButtonComponent({
  label,
  action,
}: {
  label: string;
  action: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <>
      {clicked ? (
        <Spinner />
      ) : (
        <button
          onClick={(e) => {
            action(e);
            setClicked(true);
          }}
        >
          {label}
        </button>
      )}
    </>
  );
}
