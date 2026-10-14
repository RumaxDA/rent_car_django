import React, { type TextareaHTMLAttributes } from "react";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  error?: string;
}

const TextArea = ({
  name,
  placeholder,
  value,
  onChange,
  error,
  className = "",
  ...rest
}: TextAreaProps) => {
  const borderStyle = error
    ? "border-red-500 focus:ring-red-500"
    : "border-slate-700 focus:border-indigo-500";

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="relative w-full flex items-start">
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
          className={`w-full bg-slate-900 text-white rounded-xl border outline-none transition-colors p-3 resize-y $ ${borderStyle} ${className}`}
        />
      </div>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

// Poprawiono eksport z Input na TextArea
export default TextArea;
