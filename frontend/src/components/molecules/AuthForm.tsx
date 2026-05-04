import { Button } from "../atoms/Button";
import { useState } from "react";
import { authService } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import type { FormProps } from "../../types/Form";

export default function AuthForm({ type }: FormProps) {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleNavigateHome() {
    navigate("/");
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const payload =
      type === "register"
        ? { username, password, email }
        : { username, password };

    try {
      const result = await authService(type, payload);
      if (result.access) {
        localStorage.setItem("accessToken", result.access);
        localStorage.setItem("refreshToken", result.refresh);
        console.log("Tokens saved successfully");
      }
      console.log("Logged Successfully", result);
      handleNavigateHome();
    } catch (err: any) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Something went wrong. Try again later.";
      setError(message);
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">
            {type == "login" ? "Login" : "Create Account"}
          </h1>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
              {error}
            </div>
          )}
          <input
            onChange={function (e) {
              setUsername(e.target.value);
            }}
            className="input border-2 border-slate-200 transition-all duration-150 ease-in-out hover:shadow"
            placeholder="Login"
            required
          />
          {type === "register" && (
            <input
              type="email"
              onChange={function (e) {
                setEmail(e.target.value);
              }}
              className="input border-2 border-slate-200"
              placeholder="Email"
              required
            />
          )}

          <input
            type="password"
            onChange={function (e) {
              setPassword(e.target.value);
            }}
            className="input border-2 border-slate-200 hover:shadow"
            placeholder="Password"
          />
          <Button
            label={type == "login" ? "Login" : "Register"}
            type="submit"
          />
        </form>
      </div>
    </>
  );
}
