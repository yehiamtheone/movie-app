import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  // Use localStorage to initialize state on page load
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [username, setUsername] = useState("");
const navigate = useNavigate();
  // Use useEffect to decode the token and update the username state
  // This runs whenever the 'token' state changes
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.sub);
      } catch (error) {
        // If the token is invalid or expired, clear it
        localStorage.removeItem('authToken');
        setToken(null);
        setUsername(null);
      }
    } else {
      setUsername(null);
    }
  }, [token]);

  // Function to handle login
  const logIn = (newToken) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
  };

  // Function to handle logout
  const logOut = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUsername(null);
    navigate("/");
  };

  // The value object to be provided to consumers
  const value = {
    token,
    username,
    logOut,
    logIn
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create a custom hook for easy access
export const useAuth = () => {
  return useContext(AuthContext);
};