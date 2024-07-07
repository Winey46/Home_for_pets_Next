import React from "react";

export interface ButtonProps {
  className?: string;
  handleClick?: () => void;
  children?: React.ReactNode;
  type?: string;
}

export interface ModalProps {
  modalClose?: () => void;
  children?: React.ReactNode;
}

export interface NewPostProps {
  modalClose?: () => void;
}

export interface InputProps {
  label?: string,
  name?: string,
  placeholder?: string,
  type?: string,
  error?: string | null,
  textarea?: boolean,
  className?: string,
  defaultValue?: string,
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}