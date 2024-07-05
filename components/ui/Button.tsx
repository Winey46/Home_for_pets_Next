'use client';

import {motion} from "framer-motion";
import React from "react";
import {useFormStatus} from "react-dom";
import {ButtonProps} from "@/utils/types";

const Button: React.FC = ({children, scrollTo, className, handleClick, ...props}: ButtonProps) => {
  const {pending} = useFormStatus()

  // const handleScroll = (): void => {
  //   const selector = document.querySelector(`#${scrollTo}`)
  //   selector.scrollIntoView({behavior: 'smooth'});
  // }

  return (
    <motion.button
      className={className}
      onClick={handleClick}
      {...props}
      disabled={pending}
    >
      {pending ? 'Submitting...' : children}
    </motion.button>
  )
}

export default Button;