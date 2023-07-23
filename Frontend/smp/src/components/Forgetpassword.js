import React, { useState } from "react";
import ApiService from "./services/ApiService";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Forgetpassword() {
  const api = new ApiService();
  const [resident, setResident] = useState({ email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setResident((prevResident) => ({
      ...prevResident,
      [name]: value,
    }));
  };

  const handlePasswordChange = async () => {
    if (resident.password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-center",
        theme: "colored",
        autoClose: 1000,
      });
      return;
    }

    // Call the forgetpassword() method from ApiService.js with the resident object
    api
      .forgetPassword(resident)
      .then((response) => {
        toast.success("Password changed successfully", {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
        });
        setResident({ email: "", password: "" });
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
        });
      });
  };

  return (
    <div
      className="container"
      style={{
        width: "30rem",
        padding: "2rem",
        marginTop: "10rem",
        borderRadius: "3em",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
      }}
    >
      <Form
        style={{
          display: "grid",
          gap: "1rem",
          marginBottom: "1rem",
          marginTop: "0",
        }}
      >
        <h2>Forget Password</h2>
        <div>
          <label>Email:</label>
          <br />
          <input
            style={{
              width: "20rem",
              height: "2.5rem",
              borderRadius: "3em",
              border: "#74b9ff solid",
            }}
            type="email"
            name="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            value={resident.email}
            placeholder="Registered email...."
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>New Password:</label>
          <br />
          <input
            style={{
              width: "20rem",
              height: "2.5rem",
              borderRadius: "3em",
              border: "#74b9ff solid",
            }}
            type="password"
            name="password"
            minLength="8"
            value={resident.password}
            placeholder="password..."
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <br />
          <input
            style={{
              width: "20rem",
              height: "2.5rem",
              borderRadius: "3em",
              border: "#74b9ff solid",
            }}
            type="password"
            name="confirmPassword"
            minLength="8"
            value={confirmPassword}
            placeholder="password..."
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </Form>
      <button
        className="btn btn-outline-primary"
        onClick={handlePasswordChange}
      >
        Change Password
      </button>
      <Link className="btn btn-outline-danger mx-2" to="/">
        Back
      </Link>
    </div>
  );
}

export default Forgetpassword;
