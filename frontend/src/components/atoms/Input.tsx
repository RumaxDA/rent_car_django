import React, { type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  error?: string;
}

const Input = ({
  icon: Icon,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  error,
  className = "",
}: InputProps) => {
  const borderStyle = error
    ? "border-red-500 focus:ring-red-500"
    : "border-slate-700 focus:border-indigo-500";

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="relative w-full flex items-center">
        {Icon && (
          <span className="absolute left-4 text-slate-400 flex items-center pointer-events-none z-10">
            <Icon size={18} />
          </span>
        )}

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full bg-slate-900 text-white rounded-xl border outline-none transition-colors py-3 ${
            Icon ? "pl-11 pr-4" : "px-4"
          } ${borderStyle} ${className}`}
        />
      </div>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
