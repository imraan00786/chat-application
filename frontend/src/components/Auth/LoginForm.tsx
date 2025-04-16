
// src/components/Auth/LoginForm.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { loginUser, selectAuthError, selectAuthLoading } from '../../features/auth/authSlice';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('start')
    e.preventDefault();
 
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
        console.log('Logged in:', resultAction.payload); // ← This is your user
        localStorage.setItem('user', JSON.stringify(resultAction.payload.user));
        localStorage.setItem('token', resultAction.payload.token);
        navigate('/chat'); // Navigate to chat on success
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <p className="text-sm mt-4 text-center text-gray-500">
        Already have an account?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
            Register here
        </Link>
        </p>

    </form>

    
  );
};

export default LoginForm;
