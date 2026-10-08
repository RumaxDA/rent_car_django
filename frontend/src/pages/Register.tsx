import RegisterForm from "../components/organisms/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-[calc(100vh-97px)] flex items-center justify-center px-0 overflow-hidden">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 h-full min-h-[80vh] bg-slate-900/40 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-800 shadow-2xl mx-4 my-4">
        {/* Left Side: Visual Section */}
        <div className="relative hidden lg:flex flex-col justify-center p-12 text-white overflow-hidden">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage: `url('/images/background/register_bg.jpg')`,
            }}
          >
            <div className="absolute inset-0 bg-linear-to-br from-slate-950/80 via-slate-950/40 to-slate-950/80" />
          </div>

          <div className="relative z-10">
            <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight leading-tight">
              Start Your <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                Journey With Us
              </span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-md font-light">
              Join our community of drivers and get instant access to the best
              fleet in the city. Fast, easy, and transparent.
            </p>

            {/* Decorative element */}
            <div className="mt-12 flex gap-4">
              <div className="h-1 w-12 bg-blue-500 rounded-full" />
              <div className="h-1 w-4 bg-slate-600 rounded-full" />
              <div className="h-1 w-4 bg-slate-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="flex items-center justify-center p-8 sm:p-16 bg-slate-900/60">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-2">
                Create Account
              </h2>
              <p className="text-slate-400">
                Join us and find your perfect drive
              </p>
            </div>

            <div className="relative">
              <RegisterForm />
            </div>

            <p className="text-center text-slate-500 mt-8 text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Log in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
