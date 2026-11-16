import { apiClient } from "./api";
export interface CarFilters {
  page?: number;
  search?: string;
  ordering?: string;
  engine_type?: string;
  car_status?: string;
  max_price?: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
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

  const endpoint = "cars/?${params.toString()}";

  return apiClient<PaginatedResponse<any>>(endpoint, "GET");
};
