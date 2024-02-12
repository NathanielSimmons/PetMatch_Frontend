import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/users/logout'

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Call your logout API function
      // Redirect the user to the home page or any other desired page after logout
      navigate('/'); // Redirect to the home page
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout error (display error message, etc.)
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
