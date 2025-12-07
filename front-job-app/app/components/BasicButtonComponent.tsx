"use client";

import { useState } from "react";
import Spinner from "./utils/Spinner";

export default function BasicButtonComponent({
  label,
  action,
  classes = ''
}: {
  label: string;
  action: (e: React.MouseEvent<HTMLButtonElement>) => void;
  classes?: string;
}) {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <>
      {clicked ? (
        <Spinner />
      ) : (
        <button
        className={classes && `${classes}`}
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
