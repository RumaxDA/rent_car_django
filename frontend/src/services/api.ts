export const BASE_URL = "http://localhost:8000/api";

export const apiClient = async <T>(
  endpoint: string,
  method: string,
  body?: any,
): Promise<T> => {
  const token = localStorage.getItem("access_token");
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    if (response.status === 204) {
      return {} as T;
    }
    return await response.json();
  } catch (error: any) {
    console.error("An error occured during API request", error);
    throw error;
  }
};
