import { useNavigate } from "react-router-dom";
import ApiService from "./services/ApiService";
import { useState } from "react";

const Login = () => {
  const api = new ApiService();
  let navigate = useNavigate();
  const [enteredUserName, setUserName] = useState('');
  const [enteredPassword, setPassword] = useState('');

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
      password: enteredPassword
    };

    api.login(loginData)
      .then((response) => {
        console.log(response.data.jwttoken);

        console.log("HIIIIII");

        console.log(response.data);
        sessionStorage.setItem("token", "Bearer " + response.data.jwttoken);
        sessionStorage.setItem("username",response.data.userName);
        sessionStorage.setItem("login", true);
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <label>User Name</label>
        <input type="text" className="form-control" onChange={userNameHandler} />

        <label>Password</label>
        <input type="password" className="form-control" onChange={passwordHandler} />

        <button type="submit" className="btn btn-success">Login</button> &nbsp;
        <button type="button" className="btn btn-success">Back</button>
      </form>
    </div>
  );
};

export default Login;
