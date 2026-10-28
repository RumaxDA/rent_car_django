export interface CarFilters {
  page?: number;
  search?: string;
  ordering?: string;
  engine_type?: string;
  car_status?: string;
  max_price?: number;
}

export const get_cars = async (filters: CarFilters = {}) => {
  const params = new URLSearchParams();
  params.append("page", (filters.page || 1).toString());

  if (filters.search?.trim()) {
    params.append("search", filters.search.trim());
  }
  if (filters.ordering && filters.ordering !== "default") {
    params.append("ordering", filters.ordering);
  }
  if (filters.engine_type && filters.engine_type !== "all") {
    params.append("engine_type", filters.engine_type);
  }
  if (filters.car_status && filters.car_status !== "all") {
    params.append("car_status", filters.car_status);
  }
  if (filters.max_price) {
    params.append("price__lte", filters.max_price.toString());
  }

  try {
    const response = await fetch(
      `http://localhost:8000/api/cars/?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error", error);
    throw error;
  }
};
