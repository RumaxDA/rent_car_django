import RentalTable from "../components/organisms/RentalTable";

export default function Rentals() {
  return (
    <div className="min-h-screen text-white p-8 flex flex-col items-center">
      <h1>Your Rentals</h1>
      <div>
        <RentalTable></RentalTable>
      </div>
    </div>
  );
}
