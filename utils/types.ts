import React, {MouseEventHandler} from "react";

export interface ButtonProps {
  className?: string;
  scrollTo?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}