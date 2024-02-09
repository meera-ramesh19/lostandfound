import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed for HTTP requests

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          // Replace 'http://example.com/api/validate_token' with your actual API endpoint
          const response = await axios.get(
            'http://localhost:3010/validate_token',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // Assuming the response includes the user data on successful validation
          setUser(response.data.user);
        } catch (error) {
          console.error('Token validation error:', error);
          // Handle invalid token, e.g., by removing it from storage
          localStorage.removeItem('authToken');
        }
      }
    };

    validateToken();
  }, []);

  const logIn = async (loginData, callback) => {
    try {
      // Replace with your login API endpoint
      const response = await axios.post(
        'http://localhost:3010/login',
        loginData
      );
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      setUser(user);
      callback();
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error
    }
  };
  const logOut = async () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {
        // Make a request to the backend to invalidate the JWT
        // Replace '/api/logout' with your actual backend endpoint for invalidating tokens
        await axios.post(
          '/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log('Token invalidated on the backend');
      } catch (error) {
        console.error('Error invalidating token:', error);
        // Handle error (e.g., token might already be invalid or network error)
      }
    }

    // Clear user from context and remove the token from localStorage regardless of backend success
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
