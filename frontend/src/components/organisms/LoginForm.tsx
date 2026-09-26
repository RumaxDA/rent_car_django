import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex flex-col w-full sm:max-w-md mx-auto p-8 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-800 gap-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

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
      <div className="mt-2">
        <Button text="Login" className="w-full"></Button>
      </div>
      <div className="mt-2">
        <p>
          If you don't have account yet:{" "}
          <a href="/Register" className="text-blue-500 hover:text-blue-700">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
