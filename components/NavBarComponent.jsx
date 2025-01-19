import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButtonComponent from './LogOutButtonComponent';
import '../src/App.css'

const NavBarComponent = ({ isLoggedIn, user }) => {
  return (
    <nav className="navbar">
      <div className="nav-list">
        <div className="user-info">
          {isLoggedIn && user && (
            <>
              <img src={user.profilePic} alt="User" className="user-avatar" />
              <span className="welcome-msg">Welcome {user.name || user.username}!</span>
            </>
          )}
        </div>
        <div><Link to="/">Home</Link></div>
        {!isLoggedIn && (
          <>
            <div><Link to="/auth">Login</Link></div>
            <div><Link to="/signup">Sign Up</Link></div>
            <div><Link to="/about">About</Link></div>
          </>
        )}
        {isLoggedIn && (
          <>
            <div><Link to="/pet-list">Pets</Link></div>
            <div><Link to={`/update-profile`}>Update Profile</Link></div>
            <div><Link to="/match">Match</Link></div>
            <div><Link to="/about">About</Link></div>
            <div className="logout-btn"><LogOutButtonComponent /></div>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBarComponent;