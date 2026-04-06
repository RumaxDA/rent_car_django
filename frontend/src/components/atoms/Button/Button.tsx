interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

export const Button = ({
  label,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className="bg-blue-600 cursor-pointer"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
