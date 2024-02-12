import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {!isLoggedIn && (
          <>
            <li><Link to="/auth">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/about">About</Link></li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li><Link to="/add-pet">Add Pet</Link></li>
            <li><Link to="/update-profile">Update Profile</Link></li>
            <li><Link to="/match">Match</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><button onClick={onLogout}>Log Out</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
