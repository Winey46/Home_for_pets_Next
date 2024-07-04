'use client';

import {motion} from "framer-motion";
import React, {MouseEventHandler} from "react";
import {useFormStatus} from "react-dom";

interface ButtonProps {
  className: string;
  scrollTo: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({children, scrollTo, className, handleClick, ...props}: ButtonProps) => {
  const {pending} = useFormStatus()

  const handleScroll = (): void => {
    document.querySelector(`#${scrollTo}`)
      .scrollIntoView({behavior: 'smooth'});
  }

  return (
    <motion.button
      className={className}
      onClick={scrollTo ? handleScroll : handleClick}
      {...props}
      disabled={pending}
    >
      {pending ? 'Submitting...' : children}
    </motion.button>
  )
}

export default Button;