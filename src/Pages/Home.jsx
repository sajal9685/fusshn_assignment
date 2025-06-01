import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-100 to-blue-100 text-center px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome to Concert Booking</h1>
      
      <div className="flex gap-8">
        <button
          onClick={() => navigate("/signIn")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg shadow-md"
        >
          Continue as User
        </button>
        
        <button
          onClick={() => navigate("/admin/login")}
          className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg text-lg shadow-md"
        >
          Admin Login
        </button>
      </div>
    </div>
  );
}
