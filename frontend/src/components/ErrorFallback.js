import React from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Something went wrong!</h1>
        <p className="text-gray-300 mb-4">
          An unexpected error occurred. Please try again or contact support if the issue persists.
        </p>
        <pre className="text-sm text-gray-400 mb-6 overflow-auto">
          {error.message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;