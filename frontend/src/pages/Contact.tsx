import ContactForm from "../components/organisms/ContactForm";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="relative min-h-[calc(100vh-97px)] flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background Decorative Elements */}

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Contact Info */}
        <div className="flex flex-col gap-8 text-left">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              Get in{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                Touch
              </span>
            </h1>
            <div className="h-1 w-20 bg-blue-500 rounded-full mb-6" />
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Have questions about our fleet or need help with a reservation?
              Our team is here to ensure your journey is perfect.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                icon: <FaEnvelope />,
                label: "Email us",
                value: "contact@rentcar.com",
                color: "text-blue-400",
              },
              {
                icon: <FaPhoneAlt />,
                label: "Call us",
                value: "+48 123 456 789",
                color: "text-indigo-400",
              },
              {
                icon: <FaMapMarkerAlt />,
                label: "Visit us",
                value: "Main Street 123, CarCity",
                color: "text-cyan-400",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:translate-x-2"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-xl ${item.color} group-hover:bg-blue-500 group-hover:text-white transition-all duration-300`}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wider font-medium">
                    {item.label}
                  </p>
                  <p className="text-white font-semibold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="relative">
          {/* Glassmorphism Container */}
          <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-2xl" />
          <div className="relative bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
