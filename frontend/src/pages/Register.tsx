import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';

const Register = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-6 rounded shadow w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <RegisterForm />
    </div>
  </div>
);

export default Register;