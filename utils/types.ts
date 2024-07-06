import React, {MouseEventHandler} from "react";

export interface ButtonProps {
  className?: string;
  handleClick?: () => void;
  children?: React.ReactNode;
}