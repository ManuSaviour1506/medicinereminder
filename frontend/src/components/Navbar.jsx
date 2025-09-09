// frontend/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold">
          MediCare
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/dashboard" className="hover:text-gray-300 transition-colors">
            Dashboard
          </Link>
          <Link to="/reminders" className="hover:text-gray-300 transition-colors">
            My Reminders
          </Link>
          <Link to="/caretaker" className="hover:text-gray-300 transition-colors">
            Caretaker
          </Link>
          {/* You can add more links here for future features */}
          {user && (
            <span className="text-gray-400">Welcome, {user.username}</span>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;