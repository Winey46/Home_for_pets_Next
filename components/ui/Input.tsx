import { forwardRef } from "react";

export interface InputProps {
  label?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  error?: string | null;
  textarea?: boolean;
  className?: string;
  defaultValue?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextareaChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onDragOver?: (event: React.DragEvent) => void;
  onDragLeave?: () => void;
  onDrop?: (event: React.DragEvent) => void;
}

const Input = forwardRef(
  (
    {
      label,
      name,
      error,
      textarea,
      handleChange,
      handleTextareaChange,
      className,
      ...props
    }: InputProps,
    ref: any
  ) => {
    if (className === "hidden") {
      return (
        <input
          name={name}
          onChange={handleChange}
          ref={ref}
          {...props}
          className={`hidden ${className}`}
        />
      );
    }

    return (
      <div className="w-full">
        {label && (
          <label className="block text-[1.2rem] font-[500]" htmlFor={name}>
            {label}
          </label>
        )}
        {!textarea ? (
          <input
            className={className}
            name={name}
            onChange={handleChange}
            ref={ref}
            {...props}
          />
        ) : (
          <textarea
            className={className}
            name={name}
            onChange={handleTextareaChange}
            {...props}
          />
        )}
        {error && (
          <div className="text-red-500">
            {error && <p className="mt-[5px] mx-[5px]">{error}</p>}
          </div>
        )}
      </div>
    );
  }
);

export default Input;
