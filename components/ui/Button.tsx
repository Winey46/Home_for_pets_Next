'use client';

import {motion} from "framer-motion";
import React from "react";

interface ButtonProps {
  className?: string;
  handleClick?: (() => void) | ((event: React.FormEvent<HTMLButtonElement>) => void);
  scrollTo?: string;
  children?: React.ReactNode;
  type?: string;
  disabled?: boolean;
}

const Button = ({children, className, disabled, handleClick, scrollTo}: ButtonProps) => {

  const handleScroll = (id: string | undefined): void => {
    if (id) {
      const selector: Element | null = document.querySelector(id)

      if (selector) {
        selector.scrollIntoView({behavior: 'smooth'});
      }
    }
  }

  return (
    <motion.button
      className={disabled ?
        'bg-gray-300 flex justify-center items-center py-[1rem] px-[1.5rem] rounded-[5px] text-[1rem] text-neutral-100 hover:bg-purple-700 max-md:text-[0.9rem] max-md:py-[0.6rem] max-md:px-[0.8rem]' :
        className}
      onClick={handleClick ? handleClick : () => handleScroll(scrollTo)}
      variants={{
        initial: {scale: 1},
        animate: {scale: 1.1}
      }}
      initial="initial"
      whileHover="animate"
      transition={{type: 'spring', stiffness: 500}}
      disabled={disabled}
    >
      {children}
    </motion.button>
  )
}

export default Button;