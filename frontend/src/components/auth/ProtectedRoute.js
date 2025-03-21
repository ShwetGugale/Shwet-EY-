import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from './AuthContext';

function ProtectedRoute({ children, roles = [] }) {
  const { token, user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Validate the token (e.g., check expiry or verify with the server)
  const validateToken = async () => {
    try {
      // Replace with actual token validation logic (e.g., API call)
      const isValid = true; // Simulate token validation
      if (!isValid) {
        logout(); // Logout if the token is invalid
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      logout(); // Logout if validation fails
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      validateToken();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  // Show a loading spinner while validating the token
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Redirect to login if there's no token
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if the user has the required role (if roles are specified)
  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />; // Redirect to an unauthorized page
  }

  // Render the protected component
  return children;
}

export default ProtectedRoute;