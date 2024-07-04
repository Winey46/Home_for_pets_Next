'use client';

import React, {useContext, useState} from "react";
import {ModalContext} from "@/store/ModalContext";

interface InputProps {
  label: string,
  name: string,
  placeholder: string,
  type: string,
  error: string | null,
  textarea: boolean,
  className: string,
  defaultValue: string,
  onChange: () => void
}

const Input: React.FC<InputProps> = (
  {
    label,
    name,
    error,
    textarea,
    ...props
  }) => {
  // const {modalData} = useContext(ModalContext)
  //
  // const [value, setValue] = useState(modalData ? modalData.animalType : '')
  // const [error, setError] = useState<boolean>(false)
  // const inputsChange = (event: React.FormEvent) => setAnimalTypeValue(event.target.value)

  return (
    <div className="input-wrapper">
      <label className="label" htmlFor={name}>{label}</label>
      {!textarea ?
        <input
          name={name}
          {...props}
        /> :
        <textarea
          name={name}
          {...props} />
      }
      <div className="control-error">
        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  )
}

export default Input;