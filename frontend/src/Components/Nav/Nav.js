import React from 'react';
import './nav.css';
import { Link, useNavigate } from 'react-router-dom';

function Nav({ isAdmin, setIsAdmin }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <div className="nav">
      <div className="nav-logo">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgxZXvrVzJ3s3hc-XGzM9-_jhj98CdhUcM4w&s"  
          className="logo" 
        />
        <h1 className="title"> NO.ZERO EDUCATION CENTER  </h1>
      </div>
      <ul className="nav-list">
        
        
        {/* Show these only if user is logged in as Admin */}
        {isAdmin && (
          <>
            <li className="nav-item">
              <Link to="/addUser" className="nav-link">
                <h1>Add User</h1>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/userDetails" className="nav-link">
                <h1>User Details</h1>
              </Link>
            </li>
          </>
        )}

        {/* Show "Login" if user is not logged in, else show "Logout" */}
        {!isAdmin ? (
          <></>
        ) : (
          <li className="nav-item">
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Nav;
