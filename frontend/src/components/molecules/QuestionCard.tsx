import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

export interface QuestionCardProps {
  question?: string;
  answer?: string;
  className?: string;
}

const QuestionCard = ({
  question,
  answer,
  className = "",
}: QuestionCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`group flex flex-col w-full bg-slate-900/60 border backdrop-blur-md rounded-2xl overflow-hidden shadow-xl transition-all duration-300 ${
        isOpen
          ? "border-blue-500/40 shadow-blue-500/5"
          : "border-white/10 hover:border-white/20 hover:bg-slate-900/80"
      } ${className}`}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-6 py-4.5 cursor-pointer select-none transition-colors"
      >
        <span
          className={`text-base sm:text-lg font-semibold tracking-tight transition-colors duration-300 flex-1 min-w-0 pr-4 ${
            isOpen ? "text-blue-400" : "text-white group-hover:text-blue-400"
          }`}
        >
          {question}
        </span>

        <span
          className={`w-8 h-8  flex items-center justify-center transition-all duration-300 shrink-0 ${
            isOpen
              ? " text-blue-400 rotate-180"
              : " text-slate-400 group-hover:text-white "
          }`}
        >
          <FaChevronDown size={11} />
        </span>
      </div>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 pt-2 text-slate-300 text-sm sm:text-base font-light leading-relaxed border-t border-white/10 wrap-break-word">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
