"use client";

import { useEffect } from "react";
import Button from "./ui/Button";

export default function InformationPanel({ isSuccess, handleClose, children }) {
  let panelColor = "w-2 h-full rounded-l-md ";

  if (isSuccess) panelColor += "bg-green-600";
  else panelColor += "bg-red-500";

  useEffect(() => {
    const timer = setTimeout(handleClose, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <span className={panelColor}></span>
      <p className="text-xl">{children}</p>
      <Button
        className="text-3xl self-start"
        variants={{
          initial: { scale: 1, rotate: 45 },
          animate: { scale: 1.3, rotate: 45 },
        }}
        transition={{ type: "tween", ease: "easeInOut" }}
        handleClick={handleClose}
      >
        +
      </Button>
    </>
  );
}
