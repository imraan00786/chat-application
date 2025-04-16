import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice'; // Assuming you have a logout action in your authSlice
import { RootState } from '../../app/store'; // Assuming this is where you store global state
import { useAppDispatch, useAppSelector } from '../../app/store';

const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout()); // Dispatching logout action (you need to define this action in authSlice)
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/chat" className="text-xl font-bold">Chat App</Link>

          {user && (
            <nav className="space-x-4">
              <Link to="/chat" className="hover:text-gray-400">Chat</Link>
              <Link to="/groups" className="hover:text-gray-400">Groups</Link>
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span>Welcome, {user?.user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="hover:text-gray-400">Login</Link>
              <Link to="/register" className="hover:text-gray-400">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
