import React from 'react';

const BtnSecondary = ({ children, ...props }) => {
  return (
    <button
      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      {...props}
    >
      {children}
    </button>
  );
};

export default BtnSecondary;