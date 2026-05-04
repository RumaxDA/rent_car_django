export interface CarProps {
  id: number;
  brand: string;
  model: string;
  year: number;
  hp: number;
  engine_type: string;
  number_plate: string;
  vin: string;
  image?: string;
  price?: number;
  mileage?: number;
}
