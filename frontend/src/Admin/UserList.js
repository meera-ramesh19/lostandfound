// src/components/Users.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const response = await axios.get('http:localhost:3010/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      {error && <p className='error'>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
