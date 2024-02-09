import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser } from './api';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await loginUser(userData);
      if (response.success) {
        history.push('/about');
      } else {
        setError('Unable to login. Please check your credentials.'); 
      }
    } catch (error) {
      setError('Internal server error. Please try again later.'); 
  }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default LoginForm;