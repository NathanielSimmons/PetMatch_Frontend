import React, { useState, useEffect } from 'react';
import { getUserById, updateUserProfile } from '../api';
import '../src/App.css';

const UpdateUserProfileComponent = ({ user, setIsUserUpdated }) => {

  const [userData, setUserData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    profilePic: '',
    aboutMe: ''
  });
  const [updatedPic, setUpdatedPic] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserById(user?._id);
        setUserData({ ...data, password: '' });
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

  const handlePicChange = (e) => {
    setUpdatedPic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data: ', userData);
    const form = new FormData();

    form.append("username", userData.username);
    form.append("name", userData.name);
    form.append("email", userData.email);
    form.append("aboutMe", userData.aboutMe);
    if (userData.password) {
      form.append("password", userData.password);
    }
    if (updatedPic) {
      form.append("profilePic", updatedPic);
    }

    try {
      await updateUserProfile(user?._id, form);
      setIsUserUpdated(true);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div>
      <h2 className="form-title">Update User Profile</h2>
      <div className="update-profile">
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
            <label htmlFor="username" className="form-label">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name || ''}
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
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="profilePic" className="form-label">Profile Picture:</label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              onChange={handlePicChange}
              className="form-upload"
            />
          </div>
          {(userData.profilePic || updatedPic) && (
            <div className="profile-pic-preview">
              <img
                src={!updatedPic ? userData.profilePic : URL.createObjectURL(updatedPic)}
                alt="Profile Preview"
                className="profile-pic-preview-img"
                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: '50%' }}
              />
            </div>
          )}
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
          <button type="submit" className="form-button button">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserProfileComponent;
