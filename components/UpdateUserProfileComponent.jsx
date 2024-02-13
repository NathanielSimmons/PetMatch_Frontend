import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { updateUserProfile } from '../api';

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
    <div>
      <h2>Update User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="profilePic">Profile Picture:</label>
          <input
            type="text"
            id="profilePic"
            name="profilePic"
            value={userData.profilePic}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="aboutMe">About Me:</label>
          <textarea
            id="aboutMe"
            name="aboutMe"
            value={userData.aboutMe}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateUserProfileComponent;
