import "./signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useState } from "react";
import { useContext } from "react";
import Navbar from "../../components/navbar/Nav";
import Header from "../../components/header/header";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    userName: undefined,
    Password: undefined,
    Email: undefined,
    country: undefined,
    city: undefined,
    phone: undefined,
  });

  const { user, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://reservation-api-hag5.onrender.com/api/auth/register",
        credentials
      );
      alert("Registration Successfull");
      navigate("/");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Registration failed. Please try again.";
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="signup">
        <div className="signupContainer">
          <input
            type="text"
            className="input"
            id="userName"
            onChange={handleChange}
            placeholder="userName"
          />
          <input
            type="text"
            className="input"
            id="Password"
            onChange={handleChange}
            placeholder="Password"
          />
          <input
            type="text"
            className="input"
            id="Email"
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            className="input"
            id="country"
            onChange={handleChange}
            placeholder="country"
          />
          <input
            type="text"
            className="input"
            id="city"
            onChange={handleChange}
            placeholder="city"
          />
          <input
            type="text"
            className="input"
            id="phone"
            onChange={handleChange}
            placeholder="phone"
          />
          <button
            disabled={loading}
            className="signupButton"
            onClick={handleSignup}
          >
            Register
          </button>
          {error && <span>{error.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
