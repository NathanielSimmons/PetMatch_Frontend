import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButtonComponent from './LogOutButtonComponent';

const NavBar = ({ isLoggedIn }) => {
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
            <li><Link to="/pet-list">Pets</Link></li>
            <li><Link to={`/update-profile/${userId}`}>Update Profile</Link></li>
            <li><Link to="/match">Match</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><LogOutButtonComponent /></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;

