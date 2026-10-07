import Input from "../atoms/Input";
import { FaSearch } from "react-icons/fa";

export interface SearchbarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suggestions?: string[];
  onSelectSuggestion?: (suggestion: any) => void;
  className?: string;
}

const Searchbar = ({
  value,
  onChange,
  placeholder = "Search...",
  suggestions = [],
  onSelectSuggestion,
  className = "",
}: SearchbarProps) => {
  return (
    <div className={`relative w-full ${className}`}>
      <Input
        icon={FaSearch}
        type="text"
        name="searchbar"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl z-50">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() =>
                onSelectSuggestion && onSelectSuggestion(suggestion)
              }
              className="px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-colors border-b boder-slate-800 last:border-none"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
