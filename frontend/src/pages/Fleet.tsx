import { useState, useEffect } from "react";
import { getCars } from "../api/car";
import { CarCard } from "../components/organisms/CarCard";
import type { CarProps } from "../types/Car";

export default function Fleet() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCars().then((data) => {
      setCars(data.results);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading fleet...</p>;

  return (
    <div className="mb-8 flex flex-cols">
      <h1>Our Fleet</h1>
      <div className="grid-cols-4">
        {cars.map((carItem) => (
          <CarCard key={carItem.id} car={carItem} />
        ))}
      </div>
    </div>
  );
}
