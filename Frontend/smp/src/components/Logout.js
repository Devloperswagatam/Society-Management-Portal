import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  let navigate = useNavigate();

  sessionStorage.removeItem("token");
  sessionStorage.removeItem("username");
  sessionStorage.setItem("login", false);
  sessionStorage.removeItem("role");
  sessionStorage.removeItem("name");
  sessionStorage.removeItem("isLoggedIn");
  sessionStorage.removeItem("rid");
  // sessionStorage.removeItem("duo");

  toast.success("Logged out successfully", {
    position: "top-center",
    theme: "colored",
  });
  useEffect(() => {
    // setTimeout(() => {
    // }, 2000);

    navigate("/");
  }, []);

  return <div>Logged out</div>;
};
export default Logout;
