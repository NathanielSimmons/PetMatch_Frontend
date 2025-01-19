import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api'

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/'); 
    } catch (error) {
      console.error('Logout failed:', error);
      
    }
  };

  return (
    <button className='button' onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
