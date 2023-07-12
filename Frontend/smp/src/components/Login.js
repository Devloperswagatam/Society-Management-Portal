import { Link, useNavigate } from "react-router-dom";
import ApiService from "./services/ApiService";
import { useState } from "react";
import { toast } from "react-toastify";
import "./componentCSS/Login.css";

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
        if (
          sessionStorage.getItem("token") === "Bearer undefined" &&
          sessionStorage.getItem("username") === "undefined"
        ) {
          toast.error("Invalid credentials !!", {
            position: "top-center",
            theme: "colored",
          });
        } else {
          toast.success("Logged in successfully !!", {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
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
    <>
      {/* <div class="ripple-background">
        <div class="circle xxlarge shade1"></div>
        <div class="circle xlarge shade2"></div>
        <div class="circle large shade3"></div>
        <div class="circle mediun shade4"></div>
        <div class="circle small shade5"></div>
      </div> */}

      <div className="container">
        <div className="row" style={{ marginTop: "10rem" }}>
          <div
            className="col-md-6 offset-md-3 mt-2 loginform"
            style={{ backgroundColor: "#dfe6e9" }}
          >
            <h1>Log In Form</h1>
            <form
              onSubmit={submitHandler}
              style={{ backgroundColor: "#dfe6e9" }}
            >
              <div className="mb-3">
                <label htmlFor="userName" className="form-label">
                  User Name
                </label>
                <input
                  style={{ borderRadius: "3em" }}
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
                  style={{ borderRadius: "3em" }}
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
              <button style={{ border: "none", backgroundColor: "#dfe6e9" }}>
                <Link className="btn btn-outline-primary mx-2" to="/register">
                  Register
                </Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
