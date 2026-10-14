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
      className={`flex flex-col w-full bg-slate-900/90 border border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 ${className}`}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-6 py-4 bg-slate-800/50 hover:bg-slate-800 cursor-pointer group select-none transition-colors"
      >
        <span className="text-lg font-medium text-white/90 group-hover:text-white flex-1 min-w-0 wrap-break-word pr-4">
          {question}
        </span>
        <span
          className={`w-9 h-9 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-white transition-transform duration-300 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <FaChevronDown size={10} />
        </span>
      </div>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-4 pt-2 text-slate-300 text-sm sm:text-base border-t border-slate-800/60 wrap-break-word">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
