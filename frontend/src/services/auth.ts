import { apiClient } from "./api";

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export const login = (body: LoginBody) => {
  const endpoint = "token/";
  return apiClient<LoginResponse>(endpoint, "POST", body);
};
