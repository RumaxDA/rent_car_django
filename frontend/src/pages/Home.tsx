import Card from "../components/molecules/Card";
import CategoryCard from "../components/molecules/CategoryCard";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Home = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;

      const scrollAmount = clientWidth * 1;

      scrollContainerRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="w-full flex flex-col gap-16 py-8">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Find Your Perfect Drive
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8 text-sm sm:text-base">
            Choose from hundreds of premium and affordable vehicles ready for
            your next journey.
          </p>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 max-w-4xl mx-auto">
            <span className="text-slate-400 text-sm">
              [ Searchbar Component Placeholder ]
            </span>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION (Kafelki kategorii) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Browse by Category
          </h2>

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

        {/* Siatka kafelków kategorii */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Ukrywanie paska przewijania w przeglądarkach
        >
          {/* Każdy kafelek musi mieć stałą minimalną szerokość, żeby nie zgniatały się w flexie */}
          <div className="min-w-65 sm:min-w-[calc(50%-8px)] lg:min-w-[calc(25%-12px)] shrink-0">
            <CategoryCard
              title="All Vehicles"
              image="/images/categories/hatchback_remove.png"
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Featured Vehicles</h2>
          <a href="/fleet" className="text-sm text-blue-500 hover:underline">
            View All →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            image="https://carnet.pl/app/uploads/2025/05/7-1.png"
            title="Toyota Hilux"
            price={350}
            tag="Popular"
            text="Reliable pickup truck perfect for difficult terrain and heavy tasks."
          />
          <Card
            image="https://carnet.pl/app/uploads/2025/05/7-1.png"
            title="Toyota Hilux"
            price={350}
            tag="Available"
            text="Reliable pickup truck perfect for difficult terrain and heavy tasks."
          />
          <Card
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
