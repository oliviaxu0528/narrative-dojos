import { Navigate } from "react-router";
import { useToken } from "./Authentication";

function Logout(props) {
  const [token, login, logout, signup] = useToken();

  if (!token) {
    return <Navigate to="/token" />;
  } else {
    console.log("Logout unsuccesful")
  }
  return (
    <button onClick={() => logout()} className="btn btn-primary" type="submit">
      Logout
    </button>
  );
}

export default Logout;
