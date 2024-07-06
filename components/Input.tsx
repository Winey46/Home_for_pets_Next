'use client';

import React from "react";

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