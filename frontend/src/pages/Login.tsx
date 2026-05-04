import { Text } from "../components/atoms/Text";
import AuthForm from "../components/molecules/AuthForm";
import { Button } from "../components/atoms/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();

  function handleNavigateHome() {
    navigate("/");
  }
  return (
    <div className="flex  justify-center">
      <Button label="Home" type="button" onClick={handleNavigateHome}></Button>

      <Text content="Login page" />
      <div>
        <AuthForm type="login" />
      </div>
    </div>
  );
}
