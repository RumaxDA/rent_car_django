import QuestionCard from "../components/molecules/QuestionCard";
import { faqData } from "../data/faqData";

const Faq = () => {
  return (
    <div className="w-full flex flex-col gap-8 py-8">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="flex flex-col gap-4">
          {faqData.map((item) => (
            <QuestionCard
              key={item.id}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Faq;
