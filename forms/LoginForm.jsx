import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/users/login';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await loginUser(userData);
      if (response.success) {
        navigate('/home'); // Use navigate instead of history.push
      } else {
        setError('Unable to login. Please check your credentials.'); 
      }
    } catch (error) {
      setError('Internal server error. Please try again later.'); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter your email" 
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Enter your password" 
        />
      </div>
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}


export default LoginForm;
