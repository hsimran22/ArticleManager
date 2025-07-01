import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Article Manager</h1>
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm">
            Welcome, <span className="font-semibold">{user.username}</span> ({user.role})
          </span>
        )}
        <button
          onClick={logout}
          className="bg-white text-blue-600 font-semibold px-4 py-1.5 rounded hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
