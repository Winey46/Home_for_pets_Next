import { InputInterface } from "@/utils/interfaces";

const Input = (
  {
    label,
    name,
    error,
    textarea,
    handleChange,
    handleTextareaChange,
    ...props
  }: InputInterface) => {
  return (
    <div className="w-full">
      <label
        className="block text-[1.2rem] font-[500]"
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
          onChange={handleTextareaChange}
          {...props} />
      }
      <div className="text-red-500">
        {error && <p className="mt-[5px] mx-[5px]">{error}</p>}
      </div>
    </div>
  )
}

export default Input;