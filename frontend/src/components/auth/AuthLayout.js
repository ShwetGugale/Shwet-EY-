// AuthLayout.js
const AuthLayout = ({ children }) => {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          {children}
        </div>
      </div>
    );
  };
  
  export default AuthLayout;