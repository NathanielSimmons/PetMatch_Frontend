import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthComponent from '../components/AuthComponent';
import UserProfileComponent from '../components/UserProfileComponent';
import PetProfileComponent from '../components/PetProfileComponent';
import MatchManagementComponent from '../components/MatchManagementComponent';
import AboutComponent from '../components/AboutComponent';
import HomeComponent from '../components/HomeComponent';
import NavBarComponent from '../components/NavBarComponent';
import { loginUser, logoutUser } from '../api';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Since token authentication is removed, handleLogin can be simplified
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <NavBarComponent isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/auth" element={<AuthComponent onLogin={handleLogin} />} />
        {/* You can conditionally render other routes based on isLoggedIn */}
        {isLoggedIn && (
          <>
            <Route path="/profile" element={<UserProfileComponent />} />
            <Route path="/pet-profile" element={<PetProfileComponent />} />
            <Route path="/match" element={<MatchManagementComponent />} />
          </>
        )}
        <Route path="/about" element={<AboutComponent />} />
      </Routes>
    </div>
  );
};

export default App;