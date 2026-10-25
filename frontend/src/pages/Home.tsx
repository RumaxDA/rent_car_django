import CategoryCard from "../components/molecules/CategoryCard";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Searchbar from "../components/organisms/Searchbar";
import { useState } from "react";
import FleetCard from "../components/molecules/FleetCard";

const Home = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 1;

      scrollContainerRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
      });
    }
  };
  return (
    <div className="w-full flex flex-col gap-8 py-8">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div
          className="relative rounded-3xl py-16 px-6 sm:py-24 sm:px-12 border border-slate-700/50 text-center bg-cover bg-center overflow-hidden shadow-2xl group"
          style={{
            backgroundImage: `url('/images/background/searchbar_bg.jpg')`,
          }}
        >
          {/* Dynamic Overlay & Glow */}
          <div className="absolute inset-0 bg-linear-to-b from-slate-950/70 via-slate-950/50 to-slate-950/80 transition-opacity group-hover:opacity-90" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Find Your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                Perfect Drive
              </span>
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto mb-10 text-base sm:text-lg leading-relaxed font-light">
              Choose from hundreds of premium and affordable vehicles ready for
              your next journey. Experience luxury and comfort in every mile.
            </p>

            <div className="bg-slate-900/40 backdrop-blur-xl p-3 rounded-2xl border border-white/10 w-full mx-auto shadow-2xl transition-all duration-300 hover:border-blue-500/30">
              <Searchbar value={search} onChange={handleSearch} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION (Kafelki kategorii) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              Browse by Category
            </h2>
            <div className="h-1 w-12 bg-blue-500 rounded-full" />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-600 transition-all cursor-pointer"
              aria-label="Previous categories"
            >
              <FaChevronLeft size={14} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-600 transition-all cursor-pointer"
              aria-label="Next categories"
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="carousel-container flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="min-w-65 sm:min-w-[calc(50%-8px)] lg:min-w-[calc(25%-12px)] shrink-0">
            <CategoryCard
              title="All Vehicles"
              image="/images/categories/car_r.png"
              count="120+ cars"
            />
          </div>
          <div className="min-w-65 sm:min-w-[calc(50%-8px)] lg:min-w-[calc(25%-12px)] shrink-0">
            <CategoryCard
              title="Hatchback"
              image="/images/categories/hatchback_remove.png"
              count="12 cars"
            />
          </div>
          <div className="min-w-65 sm:min-w-[calc(50%-8px)] lg:min-w-[calc(25%-12px)] shrink-0">
            <CategoryCard
              title="SUV & 4x4"
              image="/images/categories/SUV_remove.png"
              count="35 cars"
            />
          </div>
          <div className="min-w-65 sm:min-w-[calc(50%-8px)] lg:min-w-[calc(25%-12px)] shrink-0">
            <CategoryCard
              title="Combi"
              image="/images/categories/combi_r.png"
              count="45 cars"
            />
          </div>
          <div className="min-w-65 sm:min-w-[calc(50%-8px)] lg:min-w-[calc(25%-12px)] shrink-0">
            <CategoryCard
              title="Sedan"
              image="/images/categories/sedan_r.png"
              count="20 cars"
            />
          </div>
          <div className="min-w-65 sm:min-w-[calc(50%-8px)] lg:min-w-[calc(25%-12px)] shrink-0">
            <CategoryCard
              title="Electric & Hybrid"
              image="/images/categories/hybrid_r.png"
              count="18 cars"
            />
          </div>
          <div className="min-w-65 sm:min-w-[calc(50%-8px)] lg:min-w-[calc(25%-12px)] shrink-0">
            <CategoryCard
              title="Sport Cars"
              image="/images/categories/sports_car_r.png"
              count="12 cars"
            />
          </div>
        </div>
      </section>

      {/* 3. FEATURED FLEET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">Featured Vehicles</h2>

            <div className="h-1 w-12 bg-blue-500 rounded-full" />
          </div>
        </div>
        <div className="flex justify-end mb-6">
          <a
            href="/fleet"
            className="group flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors"
          >
            View All
            <span className="group-hover:translate-x-2 transition-transform duration-300">
              →
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FleetCard
            image="https://carnet.pl/app/uploads/2025/05/7-1.png"
            title="Toyota Hilux"
            price={350}
            tag="Popular"
            text="Reliable pickup truck perfect for difficult terrain and heavy tasks."
          />
          <FleetCard
            image="https://carnet.pl/app/uploads/2025/05/7-1.png"
            title="Toyota Hilux"
            price={350}
            tag="Available"
            text="Reliable pickup truck perfect for difficult terrain and heavy tasks."
          />
          <FleetCard
            image="https://carnet.pl/app/uploads/2025/05/7-1.png"
            title="Toyota Hilux"
            price={350}
            tag="Selected"
            text="Reliable pickup truck perfect for difficult terrain and heavy tasks."
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
