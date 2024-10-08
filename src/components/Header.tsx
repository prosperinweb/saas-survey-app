import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { toggleDarkMode } from '../store/slices/uiSlice';
import { LogOut, Moon, Sun } from 'lucide-react';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-gray-800 dark:text-white">
          SurveySaaS
        </Link>
        <nav className="flex items-center">
          <button
            onClick={handleToggleDarkMode}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white mr-4"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                <LogOut size={18} className="mr-1" />
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gray-800 dark:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-gray-500"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;