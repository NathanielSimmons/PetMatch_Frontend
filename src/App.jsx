import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthComponent from '../components/AuthComponent';
import MatchComponent from '../components/MatchComponent';
import AboutComponent from '../components/AboutComponent';
import HomeComponent from '../components/HomeComponent';
import NavBarComponent from '../components/NavBarComponent';
import { logoutUser } from '../api';
import SignUpForm from '../forms/SignUpForm';
import AddPetForm from '../forms/AddPetForm';
import UpdatePetComponent from '../components/UpdatePetComponent';
import UpdateUserProfileComponent from '../components/UpdateUserProfileComponent';
import ProtectedRoute from '../components/ProtectedRoute';

const App = () => {
  const [user, setUser] = useState(null)

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserUpdated, setIsUserUpdated] = useState(false);

  const handleLogin = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData)
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {

    try {
      await logoutUser();
      localStorage.removeItem("user")
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
    console.log("user: ", userData);
    setUser(userData)
    if (userData) setIsLoggedIn(true)
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isUserUpdated) {
      const userData = JSON.parse(localStorage.getItem('user'))
      console.log("user updated: ", userData);
      setUser(userData)
    }
  }, [isUserUpdated]);

  return (
    <div>
      <NavBarComponent isLoggedIn={isLoggedIn} onLogout={handleLogout} user={user} />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/auth" element={<AuthComponent onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/pet-list" element={<ProtectedRoute isLoading={isLoading} isLoggedIn={isLoggedIn}><AddPetForm user={user} /></ProtectedRoute>} />
        <Route path="/match" element={<ProtectedRoute isLoading={isLoading} isLoggedIn={isLoggedIn}><MatchComponent user={user} /></ProtectedRoute>} />
        <Route path="/update-pet/:petId" element={<ProtectedRoute isLoading={isLoading} isLoggedIn={isLoggedIn}><UpdatePetComponent /></ProtectedRoute>} />
        <Route path="/update-profile" element={<ProtectedRoute isLoading={isLoading} isLoggedIn={isLoggedIn}><UpdateUserProfileComponent user={user} setIsUserUpdated={setIsUserUpdated} /></ProtectedRoute>} />
        <Route path="/about" element={<AboutComponent />} />
      </Routes>
    </div>
  );
};

export default App;