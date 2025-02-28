import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // check if user is logged in by checking the presence of a token in localStorage
  const isLoggedIn = !!localStorage.getItem('token');

  // get user info from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.username || 'User';
  const role = user?.role || 'Member'; // default to 'Member' if role is not available

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // clear token
    localStorage.removeItem('user'); // clear user info
    navigate('/login'); // redirect to login
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Team Manager
        </Link>
        <div className="navbar-links">
          {isLoggedIn ? (
            <>
              <span className="navbar-user">
                {username} ({role}) {/* display username and role */}
              </span>
              <button onClick={handleLogout} className="navbar-link">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;