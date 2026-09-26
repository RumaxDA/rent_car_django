import React from "react";

export interface InputProps {
  type?: "text" | "email" | "password" | "number";
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  error,
}: InputProps) => {
  const borderStyle = error
    ? "border-red-500 focus:ring-red-500"
    : "border-slate-700 focus:border-blue-500";

  return (
    <div className="flex flex-col gap-1 w-full">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`px-4 py-2 bg-slate-900 text-white rounded-md border outline-none transition-colors ${borderStyle}`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
