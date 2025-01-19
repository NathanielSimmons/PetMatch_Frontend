import React, { useState } from 'react';
import '../src/App.css';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../api';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    profilePic: '',
    aboutMe: ''
  });
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePic" && files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data: ', formData);
    const form = new FormData();

    form.append("username", formData.username);
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("aboutMe", formData.aboutMe);
    if (formData.profilePic) {
      form.append("profilePic", formData.profilePic);
    }
    try {
      const response = await signupUser(form, onProgress);
      navigate('/auth');
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
          <label htmlFor="username" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
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
            type="file"
            id="profilePic"
            name="profilePic"
            accept="image/*"
            onChange={handleChange}
            className="form-upload"
          />
        </div>
        {/* Display uploaded profile picture if it exists */}
        {formData.profilePic && (
          <div className="profile-pic-preview">
            <img
              src={URL.createObjectURL(formData.profilePic)}
              alt="Profile Preview"
              className="profile-pic-preview-img"
              style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: '50%' }}
            />
          </div>
        )}
        {progress ?
          progress === 100 ?
            <p>File Uploaded!</p>
            :
            <p>File Uploading... {progress}%</p>
          :
          ''
        }
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
        <button type="submit" className="form-button button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;