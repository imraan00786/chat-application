import React, { useState } from 'react';
import { registerUser } from '../../features/auth/authSlice'; 
import { useNavigate, Link } from 'react-router-dom';
import  Loader from '../Shared/Loader'; 
import { useAppDispatch } from '../../app/store';



const validateForm = (email: string, password: string, confirmPassword: string) => {
  if (!email || !password || !confirmPassword) {
    return 'All fields are required';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return '';
};

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm(email, password, confirmPassword);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
        await dispatch(registerUser({ email, password }));
      navigate('/login'); 
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-form">
      <h2>Create an Account</h2>

     

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader /> : 'Register'}
        </button>
      </form>

      <p className="text-sm mt-4 text-center text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
            Login here
        </Link>
        </p>

    </div>
  );
};

export default RegisterForm;
