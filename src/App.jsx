import React, { useState, useEffect } from 'react';
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
  const [user,setUser] = useState(null)

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
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
    setUser(userData)
    if (userData) setIsLoggedIn(true)
}, [isLoggedIn])
console.log("user: ", user)
  return (
    <div>
      <NavBarComponent isLoggedIn={isLoggedIn} onLogout={handleLogout} user={user} />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/auth" element={<AuthComponent onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUpForm />} />
        {isLoggedIn && (
          <>
            <Route path="/pet-list" element={<AddPetForm user={user}/>} />
            <Route path="/match" element={<MatchManagementComponent />} />
            <Route path="/update-pet/:petId" element={<UpdatePetComponent />} />
            <Route path="/update-profile/:userId" element={<UpdateUserProfileComponent user={user}/>} />

          </>
        )}
        <Route path="/about" element={<AboutComponent />} />
      </Routes>
    </div>
  );
};

export default App;