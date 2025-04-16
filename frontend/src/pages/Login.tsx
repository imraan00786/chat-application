import React from 'react';
import LoginForm from '../components/Auth/LoginForm';

const Login = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-6 rounded shadow w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <LoginForm />
    </div>
  </div>
);

export default Login;