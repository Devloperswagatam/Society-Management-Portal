import { Link, useNavigate } from "react-router-dom";
import ApiService from "./services/ApiService";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const api = new ApiService();
  let navigate = useNavigate();
  const [enteredUserName, setUserName] = useState("");
  const [enteredPassword, setPassword] = useState("");

  const userNameHandler = (event) => {
    setUserName(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const loginData = {
      username: enteredUserName,
      password: enteredPassword,
    };

    api
      .login(loginData)
      .then((response) => {
        // alert("Logged in successfully");
        sessionStorage.setItem("token", "Bearer " + response.data.jwttoken);
        sessionStorage.setItem("username", response.data.userName);
        if(sessionStorage.getItem('token')==='Bearer undefined' && sessionStorage.getItem('username')==='undefined'){
          toast.error("Invalid credentials !!",{
            position: "top-center",
            theme: "colored"
          });
        }else{
          toast.success("Logged in successfully !!",{
            position: "top-center",
            autoClose: 2000,
            theme: "colored"
          });
        sessionStorage.setItem("login", true);
        navigate("/home");
        }
      })
      .catch((error) => {
        alert(error.response.data);
        console.error(error);
      });
  };

  return (
    <div className="container">
      <div className="row" style={{marginTop:"10rem"}}>
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">
                User Name
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="form-control"
                onChange={userNameHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Your password"
                className="form-control"
                onChange={passwordHandler}
              />
            </div>
            <button type="submit" className="btn btn-outline-success">
              Login
            </button>{" "}
            &nbsp;
            <button style={{border:"none"}}>
            <Link  className="btn btn-outline-primary mx-2" to="/register">
                Register
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
