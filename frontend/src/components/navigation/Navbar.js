import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">PMT</Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/login" className="hover:text-gray-300">Login</Link>
          <Link to="/signup" className="hover:text-gray-300">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;