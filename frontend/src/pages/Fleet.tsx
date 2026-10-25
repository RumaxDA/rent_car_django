import { useEffect, useState } from "react";
import { get_cars } from "../services/car_service";
import FleetCard from "../components/molecules/FleetCard";

const Fleet = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await get_cars();
        setCars(data.results);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (isLoading) return <div>Fleet Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-white">Our Fleet</h1>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {cars.map((car) => (
            <div key={car.id}>
              <FleetCard
                image="/images/categories/sedan.jpg"
                title={`${car.brand} ${car.model}`}
                price={car.price}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Fleet;
