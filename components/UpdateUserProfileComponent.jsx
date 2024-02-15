import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { updateUserProfile } from '../api';
import '../src/App.css'

const UpdateUserProfileComponent = ({ user }) => {
 
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    profilePic: '',
    aboutMe: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/${user?._id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user?._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(user?._id, userData);
      console.log('User profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div className="update-profile">
      <h2 className="form-title">Update User Profile</h2>
      <form onSubmit={handleSubmit} className="update-profile-form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="profilePic" className="form-label">Profile Picture:</label>
          <input
            type="text"
            id="profilePic"
            name="profilePic"
            value={userData.profilePic}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="aboutMe" className="form-label">About Me:</label>
          <textarea
            id="aboutMe"
            name="aboutMe"
            value={userData.aboutMe}
            onChange={handleChange}
            className="form-textarea"
          ></textarea>
        </div>
        <button type="submit" className="form-button">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateUserProfileComponent;