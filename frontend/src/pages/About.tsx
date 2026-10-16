// frontend/src/pages/About.tsx
import { FaCar, FaShieldAlt, FaUserCheck, FaClock } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-full flex flex-col gap-20 py-12">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div
          className="relative rounded-3xl py-20 px-6 sm:py-24 sm:px-12 border border-slate-700/50 text-center bg-cover bg-center overflow-hidden shadow-2xl group"
          style={{
            backgroundImage: `url('/images/background/about_bg.jpg')`,
          }}
        >
          {/* Dynamic Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90 transition-opacity group-hover:opacity-90" />

          {/* Decorative element */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Driven by{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                Passion
              </span>
              , <br />
<<<<<<< HEAD
              Built for{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                You
              </span>
=======
              Built for You
>>>>>>> 8d1a34f (style(frontend): refine global CSS glows, card layouts, and page styling (About, Contact, Auth))
            </h1>
            <p className="text-slate-300 mb-8 text-lg sm:text-xl leading-relaxed font-light">
              We are redefining car rentals by combining a modern fleet,
              complete transparency, and seamless digital booking.
            </p>
            <div className="inline-block bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl">
              <p className="text-slate-300 text-sm sm:text-base italic leading-relaxed">
                "Founded with a mission to make every journey effortless,
                whether you need a daily commuter or a premium SUV for a weekend
                getaway."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              label: "Modern Vehicles",
              value: "150+",
              color: "from-blue-500 to-blue-600",
            },
            {
              label: "Happy Drivers",
              value: "10k+",
              color: "from-indigo-500 to-indigo-600",
            },
            {
              label: "Roadside Support",
              value: "24/7",
              color: "from-cyan-500 to-cyan-600",
            },
            {
              label: "Customer Rating",
              value: "4.9/5",
              color: "from-blue-500 to-indigo-600",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-linear-to-br ${stat.color}`}
              />
              <p
                className={`text-4xl font-black mb-2 bg-linear-to-r ${stat.color} bg-clip-text text-transparent`}
              >
                {stat.value}
              </p>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. VALUES / WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why Choose Our Rental
          </h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-4 rounded-full" />
          <p className="text-slate-400 text-base sm:text-lg">
            We focus on quality, safety, and a smooth user experience at every
            step.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <FaCar />,
              title: "Well-Maintained Fleet",
              desc: "Every car undergoes regular technical inspections to guarantee your safety and comfort.",
            },
            {
              icon: <FaShieldAlt />,
              title: "Transparent Pricing",
              desc: "No hidden fees, strict deposit rules, or unexpected charges upon vehicle return.",
            },
            {
              icon: <FaClock />,
              title: "Fast Online Booking",
              desc: "Reserve your vehicle in less than two minutes with instant confirmation.",
            },
            {
              icon: <FaUserCheck />,
              title: "Customer First",
              desc: "Dedicated support team ready to assist you before, during, and after your trip.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800/50 transition-all duration-300 flex flex-col items-start gap-5 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-2xl group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
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
