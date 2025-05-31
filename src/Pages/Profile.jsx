import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import Booking from './booking'; // import booking tab

const Profile = () => {
  const { uid } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  const db = getDatabase();

  useEffect(() => {
    if (!uid) {
      navigate('/SignIn');
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

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <div className="space-x-4">
          <button
            className={`px-4 py-2 rounded ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
        </div>
      </div>

      {activeTab === 'profile' && userData && (
        <div className="space-y-2">
          {userData.photo && (
            <img
              src={userData.photo}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mx-auto"
            />
          )}
          <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone Number:</strong> {userData.phone}</p>
          <p><strong>Age:</strong> {userData.age}</p>
        </div>
      )}

      {activeTab === 'orders' && <Booking />}
    </div>
  );
};

export default Profile;
