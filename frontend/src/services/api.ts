const BASE_URL = "http://localhost:8000/api";

export const apiClient = async <T>(
  endpoint: string,
  method: string,
  body?: any,
): Promise<T> => {
  const options: RequestInit = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, options);

    if (!response.ok) {
      throw new Error(
        `Internal Server Error: ${response.status} ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error: any) {
    console.error("An error occured during API request", error);
    throw error;
  }
};
