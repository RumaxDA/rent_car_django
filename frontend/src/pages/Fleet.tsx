import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { get_cars } from "../services/car_service";
import FleetCard from "../components/molecules/FleetCard";
import {
  FaSortAmountDown,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaRedo,
} from "react-icons/fa";

const Fleet = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial filter and pagination states from URL params
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const statusFromUrl = searchParams.get("car_status") || "all";
  const engineFromUrl = searchParams.get("engine_type") || "all";
  const maxPriceFromUrl = parseInt(searchParams.get("max_price") || "1000", 10);
  const sortFromUrl = searchParams.get("ordering") || "default";

  const [cars, setCars] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Control states for backend requests & filters
  const [currentPage, setCurrentPage] = useState<number>(pageFromUrl);
  const [selectedStatus, setSelectedStatus] = useState<string>(statusFromUrl);
  const [selectedEngine, setSelectedEngine] = useState<string>(engineFromUrl);
  const [maxPrice, setMaxPrice] = useState<number>(maxPriceFromUrl);
  const [sortBy, setSortBy] = useState<string>(sortFromUrl);

  // Number of items per page (must match Django CustomPagination page_size, e.g., 10)
  const pageSize = 10;
  const totalPages = Math.ceil(totalCount / pageSize);

  // Sync internal state when URL parameters change externally (e.g., browser back/forward buttons)
  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get("page") || "1", 10));
    setSelectedStatus(searchParams.get("car_status") || "all");
    setSelectedEngine(searchParams.get("engine_type") || "all");
    setMaxPrice(parseInt(searchParams.get("max_price") || "1000", 10));

    // Map backend ordering back to frontend sort state if needed
    const orderingParam = searchParams.get("ordering");
    if (orderingParam === "price") setSortBy("price-asc");
    else if (orderingParam === "-price") setSortBy("price-desc");
    else if (orderingParam === "-year") setSortBy("year-desc");
    else setSortBy("default");
  }, [searchParams]);

  // Helper to dynamically update URL search parameters without losing other values
  const updateUrlParams = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "default" && value !== "1000") {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    updateUrlParams({ page: newPage.toString() });

    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll to top
    });
  };

  // --- FILTER HANDLERS ---
  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
    updateUrlParams({ car_status: status, page: "1" });
  };

  const handleEngineChange = (engine: string) => {
    setSelectedEngine(engine);
    setCurrentPage(1);
    updateUrlParams({ engine_type: engine, page: "1" });
  };

  const handlePriceChange = (price: number) => {
    setMaxPrice(price);
    setCurrentPage(1);
    updateUrlParams({ max_price: price.toString(), page: "1" });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);

    let djangoOrdering = "";
    if (value === "price-asc") djangoOrdering = "price";
    if (value === "price-desc") djangoOrdering = "-price";
    if (value === "year-desc") djangoOrdering = "-year";

    updateUrlParams({ ordering: djangoOrdering, page: "1" });
  };

  const resetFilters = () => {
    setSelectedStatus("all");
    setSelectedEngine("all");
    setMaxPrice(1000);
    setSortBy("default");
    setCurrentPage(1);
    setSearchParams({});
  };

  // Fetch data from backend whenever filters, page, or sorting changes
  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      try {
        let djangoOrdering = "";
        if (sortBy === "price-asc") djangoOrdering = "price";
        if (sortBy === "price-desc") djangoOrdering = "-price";
        if (sortBy === "year-desc") djangoOrdering = "-year";

        const data = await get_cars({
          page: currentPage,
          ordering: djangoOrdering,
          engine_type: selectedEngine,
          car_status: selectedStatus,
          max_price: maxPrice,
        });

        setCars(data.results || data);
        setTotalCount(data.count || (data.results ? data.results.length : 0));
      } catch (err: any) {
        setError(err.message || "Failed to load fleet.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [currentPage, selectedEngine, selectedStatus, maxPrice, sortBy]);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-red-400 max-w-md mx-auto backdrop-blur-xl shadow-2xl">
          <p className="font-semibold mb-1">Unable to load fleet</p>
          <p className="text-xs text-red-400/80">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      {/* Page Header */}
      <div className="mb-8 border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
              Fleet
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-1 font-light">
            Choose from our available selection of premium vehicles.
          </p>
        </div>

        {/* Total Vehicles Counter */}
        <div className="text-xs font-medium text-slate-400 bg-slate-900/60 border border-white/10 px-3.5 py-2 rounded-full w-fit backdrop-blur-md">
          Matching vehicles:{" "}
          <span className="text-white font-bold">{totalCount}</span>
        </div>
      </div>

      {/* Main Layout: Sidebar + Grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT SIDEBAR: FILTERS */}
        <aside className="w-full sticky top-20 lg:w-64 shrink-0 bg-slate-900/60 border border-white/10 backdrop-blur-xl rounded-3xl p-5 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <FaFilter className="text-blue-400 text-sm" />
              <span>Filters</span>
            </div>
            <button
              onClick={resetFilters}
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
                  onClick={() => handleStatusChange(status.id)}
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
                  onClick={() => handleEngineChange(eng.id)}
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
              <span className="text-blue-400 font-bold text-sm">
                ${maxPrice}
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={maxPrice}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="w-full accent-blue-500 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-light">
              <span>$100</span>
              <span>$550</span>
              <span>$1000+</span>
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT: SORTING & CAR GRID */}
        <main className="flex-1 w-full flex flex-col gap-6">
          {/* Top Bar with Sorting */}
          <div className="flex justify-end items-center bg-slate-900/60 border border-white/10 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <FaSortAmountDown className="text-slate-400 text-xs shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full sm:w-48 bg-transparent text-white text-xs sm:text-sm focus:outline-none cursor-pointer font-light [&>option]:bg-slate-900 [&>option]:text-white"
              >
                <option value="default">Sort by: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year-desc">Newest First (Year)</option>
              </select>
            </div>
          </div>

          {/* Grid cards or Loading Spinner */}
          {isLoading ? (
            <div className="min-h-[40vh] flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-slate-400 text-xs font-light tracking-wide animate-pulse">
                  Fetching filtered fleet...
                </p>
              </div>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">
              <p className="text-slate-400 text-sm font-light">
                No vehicles match your selected filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {cars.map((car) => (
                <FleetCard
                  key={car.id}
                  image={car.image || "/images/categories/sedan.jpg"}
                  title={`${car.brand} ${car.model}`}
                  tag={
                    car.car_status ? car.car_status.toUpperCase() : undefined
                  }
                  price={car.price}
                  text={`Year: ${car.year} • ${car.hp} HP • ${car.engine_type}`}
                  onClick={() => {
                    console.log(`Clicked car ID: ${car.id}`);
                  }}
                />
              ))}
            </div>
          )}

          {/* BACKEND PAGINATION CONTROLS */}
          {totalPages > 1 && !isLoading && (
            <div className="flex items-center justify-center gap-2 pt-6">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-white text-xs font-semibold backdrop-blur-md transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 hover:border-white/20 cursor-pointer"
              >
                <FaChevronLeft size={10} />
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  const isActive = pageNumber === currentPage;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-500"
                          : "bg-slate-900/60 text-slate-300 border border-white/10 hover:bg-slate-800 hover:text-white backdrop-blur-md"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() =>
                  handlePageChange(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-white text-xs font-semibold backdrop-blur-md transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 hover:border-white/20 cursor-pointer"
              >
                Next
                <FaChevronRight size={10} />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Fleet;
