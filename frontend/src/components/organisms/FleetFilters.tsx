import { FaFilter, FaRedo } from "react-icons/fa";

interface FleetFiltersProps {
  selectedStatus: string;
  selectedEngine: string;
  maxPrice: number;
  onStatusChange: (status: string) => void;
  onEngineChange: (engine: string) => void;
  onPriceChange: (price: number) => void;
  onReset: () => void;
}

export const FleetFilters = ({
  selectedStatus,
  selectedEngine,
  maxPrice,
  onStatusChange,
  onEngineChange,
  onPriceChange,
  onReset,
}: FleetFiltersProps) => {
  return (
    <aside className="w-full sticky top-20 lg:w-64 shrink-0 bg-slate-900/60 border border-white/10 backdrop-blur-xl rounded-3xl p-5 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <FaFilter className="text-blue-400 text-sm" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <FaRedo size={10} />
          Reset all
        </button>
      </div>

      {/* 1. Car Status Filter */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Vehicle Status
        </label>
        <div className="flex flex-col gap-1.5">
          {[
            { id: "all", label: "All Statuses" },
            { id: "available", label: "Available" },
            { id: "rented", label: "Rented" },
          ].map((status) => (
            <button
              key={status.id}
              onClick={() => onStatusChange(status.id)}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                selectedStatus === status.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Engine Type Filter */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Engine Type
        </label>
        <div className="flex flex-col gap-1.5">
          {[
            { id: "all", label: "All Engines" },
            { id: "petrol", label: "Petrol" },
            { id: "diesel", label: "Diesel" },
            { id: "hybrid", label: "Hybrid" },
            { id: "electric", label: "Electric" },
            { id: "gas", label: "Gas" },
          ].map((eng) => (
            <button
              key={eng.id}
              onClick={() => onEngineChange(eng.id)}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                selectedEngine === eng.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {eng.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Price Range Slider */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Max Price / Day
          </label>
          <span className="text-blue-400 font-bold text-sm">${maxPrice}</span>
        </div>
        <input
          type="range"
          min="100"
          max="1000"
          step="50"
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-blue-500 bg-slate-800 rounded-lg cursor-pointer h-2"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-light">
          <span>$100</span>
          <span>$550</span>
          <span>$1000+</span>
        </div>
      </div>
    </aside>
  );
};
