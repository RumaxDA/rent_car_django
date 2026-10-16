import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { useState } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className="flex flex-col w-full sm:max-w-md mx-auto p-4 bg-transparent text-white gap-4">
      <div className="flex flex-col gap-4">
        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmail}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />
        
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900"
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
          </label>
          <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</a>
        </div>

        <div className="mt-2">
          <Button text="Login" className="w-full"></Button>
        </div>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-700"></span>
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-900 px-2 text-slate-500">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-6">
        <button 
          className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-all duration-300 flex items-center justify-center text-lg shadow-lg hover:scale-110"
          type="button"
        >
          <FaGoogle className="text-red-500" />
        </button>
        <button 
          className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-all duration-300 flex items-center justify-center text-lg shadow-lg hover:scale-110"
          type="button"
        >
          <FaFacebookF className="text-blue-500" />
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
