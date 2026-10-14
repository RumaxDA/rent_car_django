const About = () => {
  return (
    <div className="w-full flex flex-col gap-8 py-8">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div
          className="relative rounded-2xl py-8 px-6 sm:py-12 sm:px-12 border border-slate-700 text-center bg-cover bg-center overflow-hidden shadow-2xl"
          style={{
            backgroundImage: `url('/images/background/searchbar_bg.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-slate-950/60" />
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-5xl font-extrabold text-white mb-3">
              Find Your Perfect Drive
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
              Choose from hundreds of premium and affordable vehicles ready for
              your next journey.
            </p>

            <div className="bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 max-w-4xl mx-auto shadow-2xl">
              <input></input>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
