import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import '../src/App.css'

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      await loginUser(userData);
      onLogin(); // Notify parent component about successful login
      navigate('/'); // Navigate to the home page
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2 className="form-title">Login</h2>
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="form-input"
        />
      </div>
      <button type="submit" className="form-button">Login</button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
};

export default LoginForm;
