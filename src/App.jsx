import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthComponent from '../components/AuthComponent';
import MatchManagementComponent from '../components/MatchManagementComponent';
import AboutComponent from '../components/AboutComponent';
import HomeComponent from '../components/HomeComponent';
import NavBarComponent from '../components/NavBarComponent';
import { loginUser, logoutUser } from '../api';
import SignUpForm from '../forms/SignUpForm';
import AddPetForm from '../forms/AddPetForm';
import UpdatePetComponent from '../components/UpdatePetComponent';
import UpdateUserProfileComponent from '../components/UpdateUserProfileComponent';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <Route path="/signup" element={<SignUpForm />} />
        {isLoggedIn && (
          <>
            <Route path="/pet-list" element={<AddPetForm />} />
            <Route path="/match" element={<MatchManagementComponent />} />
            <Route path="/update-pet/:petId" element={<UpdatePetComponent />} />
            <Route path="/update-profile/:userId" element={UpdateUserProfileComponent} />

          </>
        )}
        <Route path="/about" element={<AboutComponent />} />
      </Routes>
    </div>
  );
};

export default App;