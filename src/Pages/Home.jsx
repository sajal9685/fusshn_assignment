import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#94B4C1] to-[#ECEFCA] text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#213448] drop-shadow-md">
        Welcome to EchoPass
      </h1>

      <p className="text-[#213448] text-lg md:text-xl mb-12 max-w-md">
        Book your favorite concerts, discover artists, and experience the thrill of live music!
      </p>

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <button
          onClick={() => navigate("/signIn")}
          className="bg-[#213448] hover:bg-[#547792] text-[#ECEFCA] px-6 py-3 rounded-lg text-lg shadow-lg transition duration-300 ease-in-out w-64 sm:w-auto"
        >
          Continue as User
        </button>

        <button
          onClick={() => navigate("/admin/login")}
          className="bg-[#94B4C1] hover:bg-[#547792] text-[#213448] px-6 py-3 rounded-lg text-lg shadow-lg transition duration-300 ease-in-out w-64 sm:w-auto"
        >
          Admin Login
        </button>
      </div>
    </div>
  );
}
