import { useContext } from "react";
// import { use } from "../../../../backend/routes/hotels";
import "./Nav.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault;
    navigate("/login");
  };
  const handleSignup = (e) => {
    e.preventDefault;
    navigate("/signup");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">ViscousBookings</span>
        </Link>
        {user ? (
          user.userName
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={handleSignup}>
              Register
            </button>
            <button className="navButton" onClick={handleLogin}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
