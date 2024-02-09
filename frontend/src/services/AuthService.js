import axios from 'axios';

const API_URL = 'http://localhost:3010'; // Change to your API URL

export const loginWithGoogle = async (tokenId) => {
  const response = await axios.post(`${API_URL}/google`, { token: tokenId });
  return response.data; // This should include the JWT token and user info
};

export const logout = async () => {
  // Optionally, call the backend to invalidate the JWT token
  localStorage.removeItem('user');
};
