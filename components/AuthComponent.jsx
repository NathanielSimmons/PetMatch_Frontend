import React from 'react';
import LoginForm from '../forms/LoginForm';

const AuthComponent = ({ onLogin }) => {
  return (
    <div>
      <LoginForm onLogin={onLogin} />
    </div>
  );
};

export default AuthComponent;

