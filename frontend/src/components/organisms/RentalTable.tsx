import { useEffect, useState } from "react";
import type { Rental } from "../../types/Rental";
import { getRentals } from "../../api/rental";

export default function RentalTable() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRentals().then((data) => {
      setRentals(data.results);
      setLoading(false);
    });
  }, []);

  console.log(rentals);

  if (loading) return <p>Loading rentals...</p>;

  const columns = [
    { key: "id", label: "ID" },
    { key: "car", label: "Car" },
    { key: "start_date", label: "Start Date" },
    { key: "end_date", label: "End Date" },
    { key: "price_per_day", label: "Price per day" },
    { key: "total_price", label: "Total price" },
  ];

  return (
    <div className="w-screen max-w-4xl mt-12 bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-blue-400">Rentals</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {rentals.map((rental) => (
              <tr
                key={rental.id}
                className="hover:bg-gray-700 transition-colors"
              >
                <td className="px-4 py-3 text-gray-300">{rental.id}</td>
                <td className="px-4 py-3 text-white font-medium">
                  {rental.car.brand} {rental.car.model}
                </td>
                <td className="px-4 py-3 text-gray-400">
                  {rental.start_date.toString()}
                </td>
                <td className="px-4 py-3 text-gray-400">
                  {rental.end_date.toString()}
                </td>
                <td className="px-4 py-3 text-green-400">
                  {rental.price_per_day}
                </td>
                <td className="px-4 py-3 font-bold text-blue-400">
                  {rental.total_price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
