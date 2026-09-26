import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { useState } from "react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="flex flex-col w-full sm:max-w-md mx-auto p-8 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-800 gap-4">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <Input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={handleUsername}
      />
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
      <Input
        type="password"
        name="confirm password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={handleConfirmPassword}
      />
      <div className="mt-2">
        <Button text="Register" className="w-full"></Button>
      </div>
    </div>
  );
};

export default RegisterForm;
