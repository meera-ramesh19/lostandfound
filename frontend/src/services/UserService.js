import axios from 'axios';

const API_BASE_URL = 'http://localhost/3010/'; // Adjust this to your API's base URL

export const getUserProfile = async () => {
   const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token; // Assuming the JWT token is stored under the user key

  try {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
