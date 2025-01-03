"use client";

import { motion } from "framer-motion";
import React from "react";

interface ButtonProps {
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  handleClick?:
    | (() => void)
    | ((event: React.FormEvent<HTMLButtonElement>) => void);
  scrollTo?: string;
  children?: React.ReactNode;
  type?: "reset" | "button" | "submit";
  disabled?: boolean;
  variants?: {
    initial: { scale?: number; rotate?: number };
    animate: { scale?: number; rotate?: number };
    exit?: { scale?: number; rotate?: number };
  };
  initial?: { scale?: number };
  whileHover?: { scale?: number };
  transition?: {
    type?: string;
    stiffness?: number;
    duration?: number;
    ease?: string;
  };
}

const Button = ({
  children,
  className,
  disabled,
  handleClick,
  scrollTo,
  ...props
}: ButtonProps) => {
  let buttonClass = className;
  if (disabled) {
    buttonClass = className.replace("yellow", "").replace("purple", "").trim();
    buttonClass += " bg-gray-500";
  }

  const handleScroll = (id: string | undefined): void => {
    if (id) {
      const selector: Element | null = document.querySelector(id);

      if (selector) {
        selector.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.button
      className={buttonClass}
      onClick={handleClick ? handleClick : () => handleScroll(scrollTo)}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
