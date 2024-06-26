import "./login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Nav.jsx";
import Header from "../../components/header/header.jsx";

const Login = () => {
  const [credentials, setCredentials] = useState({
    userName: undefined,
    Password: undefined,
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "https://reservation-api-hag5.onrender.com/api/auth/login",
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Login failed. Please try again.";
      dispatch({ type: "LOGIN_FAILED", payload: { message: errorMsg } });
    }
  };
  const handleSignupBtn = (e) => {
    e.preventDefault;
    navigate("/signup");
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="login">
        <div className="loginContainer">
          <input
            type="text"
            className="userName"
            id="userName"
            onChange={handleChange}
            placeholder="userName"
          />
          <input
            type="text"
            className="Password"
            id="Password"
            onChange={handleChange}
            placeholder="Password"
          />
          <button
            disabled={loading}
            className="lgnButton"
            onClick={handleLogin}
          >
            Login
          </button>
          <button className="signupButton" onClick={handleSignupBtn}>
            new user? Register
          </button>
          {error && <span>{error.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default Login;
