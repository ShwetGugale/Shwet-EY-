import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Project Management Tool</h1>
        <p className="text-lg text-gray-300 mb-8">
          Streamline your project planning, execution, and monitoring with our comprehensive tool.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;