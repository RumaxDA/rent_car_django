import type { CarProps } from "./Car";

export interface Rental {
  id: number;
  car: CarProps;
  user: string;
  start_date: string;
  end_date: string;
  start_milegae: number;
  price_per_day: number;
  total_price: number;
}
