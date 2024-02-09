// src/components/Admin.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const response = await axios.get(
          'http:localhost:3010/admin/found-items',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1> Welocme to Admin Dashboard</h1>
      
    </div>
  );
};

export default Dashboard;
