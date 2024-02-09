import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
  googleLogout,
} from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { Button, Box } from '@mui/material';

const Login = () => {
  // const { login } = useAuth();
  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => handleLoginSuccess(tokenResponse),
    onError: () => handleLoginFailure(),
    // Optionally, specify the scopes
    flow: 'auth-code',
    scope: 'profile email',
    // theme: 'filled_blue',
    // shape: 'circle',
  });

  const handleLoginFailure = (response) => {
    console.error('Login Failed:', response);
    // Handle login failure (e.g., displaying a notification to the user)
  };

  const handleLoginSuccess = (tokenResponse) => {
    console.log('Login Success:TokenResponse', tokenResponse);

    // Example:
    fetch('http://localhost:3010/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: tokenResponse.code }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Process the backend response
        console.log('Login successful, user:', data.user);
        // Example of storing the JWT in localStorage
        localStorage.setItem('token', data.jwtToken);
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  };

  const handleError = (errorResponse) => {
    console.error('Google login failed', errorResponse);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh', // This ensures that the Box takes at least the full viewport height
        }}
      >
        <p>Login</p>
        <button onClick={() => googleLogin()}>Login with Google</button>
      </Box>
    </>
  );
};

export default Login;
