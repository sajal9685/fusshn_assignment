import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import Booking from "./booking";

const Profile = () => {
  const { uid } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  const db = getDatabase();

  useEffect(() => {
    if (!uid) {
      navigate("/SignIn");
      return;
    }

    const fetchUserData = async () => {
      try {
        const userRef = ref(db, `Users/${uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid, navigate]);
  {userData?.photo ? (
  <img
    src={userData.photo}
    alt="User profile"
    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
  />
) : (
  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-500">
    👤
  </div>
)}


  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate("/signIn");
    });
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-500">
            👤
          </div>
          <h2 className="text-xl font-bold text-gray-800 mt-2">Hi, Guest</h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3">
          {["profile", "orders"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab === "profile" ? "Profile" : "Orders"}
            </button>
          ))}
          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-full text-sm bg-red-500 hover:bg-red-600 text-white transition"
          >
            Sign Out
          </button>
        </div>

        {/* Content */}
        {activeTab === "profile" && userData && (
          <div className="space-y-4 text-sm text-gray-700">
            <ProfileField label="Name" value={`${userData.firstName} ${userData.lastName}`} />
            <ProfileField label="Email" value={userData.email} />
            <ProfileField label="Phone" value={userData.phone} />
            <ProfileField label="Age" value={userData.age} />
          </div>
        )}

        {activeTab === "orders" && <Booking />}
      </div>
    </div>
  );
};

// Helper Component
const ProfileField = ({ label, value }) => (
  <div className="flex items-center justify-between border-b pb-2">
    <span className="font-semibold text-gray-600">{label}:</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

export default Profile;
