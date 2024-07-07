'use client';

import {motion} from "framer-motion";
import React from "react";
import {useFormStatus} from "react-dom";
import {ButtonProps} from "@/utils/types";

const Button = ({children, className, handleClick}: ButtonProps) => {
  const {pending} = useFormStatus()

  // const handleScroll = (): void => {
  //   const selector = document.querySelector(`#${scrollTo}`)
  //   selector.scrollIntoView({behavior: 'smooth'});
  // }

  return (
    <motion.button
      className={className}
      onClick={handleClick}
      disabled={pending}
      variants={{
        initial: {scale: 1},
        animate: {scale: 1.1}
      }}
      initial="initial"
      whileHover="animate"
      transition={{type: 'spring', stiffness: 500}}
    >
      {pending ? 'Submitting...' : children}
    </motion.button>
  )
}

export default Button;