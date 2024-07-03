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