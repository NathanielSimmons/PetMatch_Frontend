import React, { useState } from 'react';
import axios from 'axios';
import '../src/App.css'

const SignUpForm = () => {
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
      const response = await axios.post('http://localhost:4000/api/users/signup', formData);
      if (response.status === 201) {
        window.location.href = '/auth';
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-form">
      <h2 className="form-title">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
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
            value={formData.email}
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
            value={formData.password}
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
            value={formData.profilePic}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="aboutMe" className="form-label">About Me:</label>
          <textarea
            id="aboutMe"
            name="aboutMe"
            value={formData.aboutMe}
            onChange={handleChange}
            className="form-textarea"
          ></textarea>
        </div>
        <button type="submit" className="form-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;