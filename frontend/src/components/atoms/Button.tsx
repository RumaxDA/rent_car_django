export interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const Button = ({ text, onClick, className = "" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md transition-colors ${className}`}
    >
      {text}
    </button>
  );
};
export default Button;
