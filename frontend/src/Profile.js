// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { getUserProfile } from './services/UserService';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setProfile(userProfile);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch profile.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          {/* Display more profile information here */}
        </div>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  );
};

export default Profile;
