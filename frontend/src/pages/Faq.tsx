import { useState } from "react";
import QuestionCard from "../components/molecules/QuestionCard";
import Searchbar from "../components/organisms/Searchbar";
import { faqData } from "../data/faqData";
import { FaHeadset, FaEnvelope } from "react-icons/fa";

const Faq = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaq = faqData.filter(
    (item) =>
      item.question?.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      item.answer?.toLowerCase().includes(searchQuery.toLowerCase().trim()),
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10 min-h-screen">
      {/* 1. HEADER & SEARCH BAR SECTION */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Frequently Asked{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
            Questions
          </span>
        </h1>

        {/* Reusable Searchbar Organism */}
        <div className="max-w-xl mx-auto pt-4">
          <Searchbar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search for questions (e.g. deposit, license, insurance)..."
          />
        </div>
      </div>

      {/* 2. FAQ ACCORDION LIST */}
      <section className="w-full space-y-4">
        {filteredFaq.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">
            <p className="text-slate-400 text-sm font-light">
              No matching questions found for "{searchQuery}".
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredFaq.map((item) => (
              <QuestionCard
                key={item.id}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        )}
      </section>

      {/* 3. STILL HAVE QUESTIONS / SUPPORT BANNER */}
      <section className="pt-6 border-t border-white/10">
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Still have questions?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm font-light">
              Can’t find the answer you’re looking for? Please reach out to our
              support team.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/contact"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20"
            >
              <FaHeadset className="text-sm" />
              Contact Support
            </a>
            <a
              href="mailto:support@rentcar.com"
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold px-5 py-3 rounded-xl transition-all"
            >
              <FaEnvelope className="text-sm" />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
