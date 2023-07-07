import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  let navigate = useNavigate();

  sessionStorage.removeItem("token");
  sessionStorage.removeItem("username");
  sessionStorage.setItem("login", false);
  sessionStorage.removeItem("role");
  sessionStorage.removeItem("name");
  sessionStorage.removeItem("isLoggedIn");

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);

  return <div>Logged out</div>;
};
export default Logout;
