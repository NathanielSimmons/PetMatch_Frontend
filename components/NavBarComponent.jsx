import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButtonComponent from './LogOutButtonComponent';
import '../src/App.css'

const NavBarComponent = ({ isLoggedIn, user }) => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="user-info">
          {isLoggedIn && user && (
            <>
              <img src={user.profilePic} alt="User" className="user-avatar" />
              <span className="welcome-msg">Welcome {user.username}!</span>
            </>
          )}
        </li>
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
            <li><Link to={`/update-profile/${user?._id}`}>Update Profile</Link></li>
            <li><Link to="/match">Match</Link></li>
            <li><Link to="/about">About</Link></li>
            <li className="logout-btn"><LogOutButtonComponent /></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBarComponent;