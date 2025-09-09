// frontend/src/components/Layout.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-8">MediCare</h1>
        <nav className="space-y-4">
          <Link to="/dashboard" className="block p-2 rounded-lg hover:bg-gray-700 transition-colors">
            Dashboard
          </Link>
          <Link to="/reminders" className="block p-2 rounded-lg hover:bg-gray-700 transition-colors">
            My Reminders
          </Link>
          <Link to="/caretaker" className="block p-2 rounded-lg hover:bg-gray-700 transition-colors">
            Caretaker
          </Link>
          {/* Add more links for other features like inventory, reports, etc. */}
        </nav>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;