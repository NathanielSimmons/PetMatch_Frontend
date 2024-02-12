import React, { useState } from 'react';
import axios from 'axios';

const SignUpComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profilePic: '',
    aboutMe: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/users/signup', formData);
      // Handle successful signup (e.g., redirect user to login page)
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle signup error (e.g., display error message to user)
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
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
            value={formData.email}
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
            value={formData.password}
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
            value={formData.profilePic}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="aboutMe">About Me:</label>
          <textarea
            id="aboutMe"
            name="aboutMe"
            value={formData.aboutMe}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpComponent;
