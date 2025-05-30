import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';

const Profile = () => {
  const { uid } = useParams(); // <-- Get UID from URL
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const db = getDatabase();

  useEffect(() => {
    if (!uid) {
      navigate('/login'); // If no UID in URL, redirect
      return;
    }

    const fetchUserData = async () => {
      try {
        const userRef = ref(db, `Users/${uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          console.warn('User data not found.');
          setUserData(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid, db, navigate]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">User Profile</h1>
      {userData ? (
        <>
          <p><strong>Name:</strong> {userData.firstName} {userData.lastName} </p>
          <p><strong>Email:</strong> {userData.email}</p>
          

        </>
      ) : (
        <p>User not found or data missing.</p>
      )}
    </div>
  );
};

export default Profile;
