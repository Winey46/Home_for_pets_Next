'use client';

import React from "react";
import {InputProps} from "@/utils/types";

const Input: React.FC<InputProps> = (
  {
    label,
    name,
    error,
    textarea,
    handleChange,
    ...props
  }) => {
  return (
    <div className="w-[80%] my-0 mx-[100px]">
      <label
        className="block mb-2 text-[1.2rem] font-[500]"
        htmlFor={name}
      >
        {label}
      </label>
      {!textarea ?
        <input
          name={name}
          onChange={handleChange}
          {...props}
        /> :
        <textarea
          name={name}
          {...props} />
      }
      <div className="text-red-500">
        {error && <p className="mt-[5px] mx-[5px]">{error}</p>}
      </div>
    </div>
  )
}

export default Input;