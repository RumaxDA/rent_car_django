import type { CarCardProps } from "../../types/Card";

export const CarCard = ({ car }: CarCardProps) => {
  return (
    <div className="mb-8 border">
      <h3>
        {car.brand} {car.model}
      </h3>
      <p>Year: {car.year}</p>
      <p>Horse Power: {car.hp}</p>
      <p>Engine: {car.engine_type}</p>
      <button>Zarezerwuj</button>
    </div>
  );
};
