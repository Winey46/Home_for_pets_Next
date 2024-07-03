'use client';

import {motion} from "framer-motion";
import React, {MouseEventHandler} from "react";

interface ButtonProps {
  className: string;
  scrollTo: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({children, scrollTo, className, handleClick}: ButtonProps) => {

  const handleScroll = (): void => {
    document.querySelector(`#${scrollTo}`)
      .scrollIntoView({behavior: 'smooth'});
  }

  return (
    <motion.button className={className} onClick={scrollTo ? handleScroll : handleClick}>
      {children}
    </motion.button>
  )
}

export default Button;