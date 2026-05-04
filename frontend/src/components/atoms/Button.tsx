import type { ButtonProps } from "../../types/Button";

export const Button = ({
  label,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className="bg-blue-800 w-24 h-10 text-white rounded shadow-md hover:bg-blue-500 cursor-pointer
      active:scale-95
      transition-all duration-150 ease-in-out
      active:shadow-inner"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
