import {
  type LoginRequest,
  type RegisterRequest,
  type TokenResponse,
} from "./types";

export async function login(data: LoginRequest) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Błąd logowania");
  }
  console.log(result);
  return result;
}

export async function register(data: RegisterRequest): Promise<TokenResponse> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(response.json());
  return response.json();
}

export async function authService(type: "login" | "register", data: any) {
  return type === "login" ? login(data) : register(data);
}
