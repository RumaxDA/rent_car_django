import { Text } from "../components/atoms/Text";
import { Button } from "../components/atoms/Button";
import { Badge } from "../components/atoms/Badge";
import { getCars } from "../api/car";

export default function Home() {
  function handleClick() {
    console.log("Klik!");
  }

  return (
    <div className="min-h-screen text-black flex flex-col items-center">
      <div className="">
        <Text content="Halo halo" />
      </div>
      <div className="">
        <Button label="Potwierdź" type="submit" onClick={handleClick} />
      </div>
      <div>
        <Badge text="Active!"></Badge>
      </div>
      <Button label="get Cars" onClick={getCars}></Button>
    </div>
  );
}
