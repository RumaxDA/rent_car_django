import { FaCar, FaShieldAlt, FaUserCheck, FaClock } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-16 min-h-screen">
      {/* STORYTELLING */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-white/10 pb-16">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-block bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              About Our Rental
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Redefining your journey with{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
              comfort & trust.
            </span>
          </h1>

<<<<<<< HEAD
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Driven by{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                Passion
              </span>
              , <br />
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 830ef9d (frontend: implement Fleet page and integrate dynamic car listing)
              Built for{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                You
              </span>
<<<<<<< HEAD
=======
              Built for You
>>>>>>> 8d1a34f (style(frontend): refine global CSS glows, card layouts, and page styling (About, Contact, Auth))
=======
>>>>>>> 830ef9d (frontend: implement Fleet page and integrate dynamic car listing)
            </h1>
            <p className="text-slate-300 mb-8 text-lg sm:text-xl leading-relaxed font-light">
              We are redefining car rentals by combining a modern fleet,
              complete transparency, and seamless digital booking.
=======
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Founded with a vision to eliminate the friction from traditional car
            rentals. We combine a modern, meticulously maintained fleet with
            end-to-end digital booking and complete pricing transparency.
          </p>

          <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            Whether you need an efficient daily commuter for business trips or a
            spacious SUV for family weekend getaways, we ensure every mile is
            backed by top-tier safety, instant confirmations, and zero hidden
            costs.
          </p>
        </div>

        {/* Quote block */}
        <div className="lg:col-span-5">
          <div className="relative p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-2xl space-y-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            <span className="text-5xl font-serif text-blue-400/30 leading-none">
              “
            </span>
            <p className="text-slate-200 text-sm sm:text-base italic leading-relaxed relative z-10">
              Our goal is simple: make high-end mobility accessible,
              straightforward, and entirely stress-free for every driver.
>>>>>>> 88ad3c7 (refactor(ui): update general pages and cards to glassmorphic design with English comments)
            </p>
            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                CR
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Car Rental Team
                </p>
                <p className="text-xs text-slate-400">Drive with confidence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION*/}
      <section className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              label: "Modern Vehicles",
              value: "150+",
              color: "from-blue-400 to-blue-600",
            },
            {
              label: "Happy Drivers",
              value: "10k+",
              color: "from-indigo-400 to-indigo-600",
            },
            {
              label: "Roadside Support",
              value: "24/7",
              color: "from-cyan-400 to-blue-500",
            },
            {
              label: "Customer Rating",
              value: "4.9/5",
              color: "from-blue-400 to-indigo-500",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1"
            >
              <p
                className={`text-3xl sm:text-4xl font-black mb-2 bg-linear-to-r ${stat.color} bg-clip-text text-transparent`}
              >
                {stat.value}
              </p>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. VALUES / WHY CHOOSE US */}
      <section className="w-full pb-12">
        <div className="mb-10 text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
            Why Choose Our Rental
          </h2>
          <p className="text-slate-400 text-sm font-light">
            We prioritize safety, absolute transparency, and a seamless digital
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FaCar />,
              title: "Well-Maintained Fleet",
              desc: "Every car undergoes regular technical inspections to guarantee your safety and performance.",
            },
            {
              icon: <FaShieldAlt />,
              title: "Transparent Pricing",
              desc: "No hidden fees, strict deposit rules, or unexpected charges upon vehicle return.",
            },
            {
              icon: <FaClock />,
              title: "Fast Online Booking",
              desc: "Reserve your vehicle in less than two minutes with instant reservation confirmation.",
            },
            {
              icon: <FaUserCheck />,
              title: "Customer First",
              desc: "Dedicated support team ready to assist you before, during, and after your trip.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md hover:bg-slate-900/70 hover:border-blue-500/30 transition-all duration-300 flex flex-col items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xl group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
