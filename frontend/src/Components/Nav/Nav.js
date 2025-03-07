import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";

function Nav() {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  return (
    <div>
      <ul className="home-ul">
        <li className="home-li">
          <Link to="/mainhome" className="active-home-a">
            <h1>Home</h1>
          </Link>
        </li>
        <li className="home-li">
          <Link to="/adduser" className="active-home-a">
            <h1>Add User</h1>
          </Link>
        </li>
        <li className="home-li">
          <Link to="/userdetails" className="active-home-a">
            <h1>User Details</h1>
          </Link>
        </li>
        <li className="home-li logout-li">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
