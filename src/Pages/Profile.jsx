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

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate("/signIn");
    });
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-secondary font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg p-8 space-y-8 border-2 border-accent">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          {userData?.photo ? (
            <img
              src={userData.photo}
              alt="User profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-accent shadow-md"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-accent flex items-center justify-center text-6xl text-primary font-extrabold shadow-md">
              👤
            </div>
          )}
          <h2 className="text-3xl font-bold text-primary mt-4">
            Hi, {userData.firstName}
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4">
          {["profile", "orders"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-base font-semibold transition-shadow ${
                activeTab === tab
                  ? "bg-primary text-light shadow-lg"
                  : "bg-accent text-primary hover:bg-secondary hover:text-light"
              }`}
            >
              {tab === "profile" ? "Profile" : "Orders"}
            </button>
          ))}
          <button
            onClick={handleSignOut}
            className="px-6 py-2 rounded-full text-base font-semibold bg-red-600 hover:bg-red-700 text-light shadow-md transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Content */}
        {activeTab === "profile" && userData && (
          <div className="space-y-5 text-primary text-lg font-medium">
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
  <div className="flex items-center justify-between border-b border-accent pb-3">
    <span className="font-semibold text-secondary">{label}:</span>
    <span className="text-primary">{value}</span>
  </div>
);

export default Profile;
