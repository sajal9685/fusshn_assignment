import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, db } from "../firebase";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = ref(db, `Users/${user.uid}`);
      const snapshot = await get(userRef);

      const redirectTo =
        new URLSearchParams(location.search).get("redirectTo") || `/profile/${user.uid}`;

      if (snapshot.exists()) {
        navigate(redirectTo);
      } else {
        alert("User record not found in database.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECEFCA] px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <img
            className="h-16 w-16"
            src="/src/assets/tickets.svg"
            alt="Booking App Logo"
          />
          <h2 className="mt-6 text-center text-2xl font-bold text-[#213448]">
            Welcome to the Booking App!
          </h2>
          <p className="mt-1 text-center text-sm text-[#547792]">
            Sign in to your account
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#213448]">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-[#94B4C1] px-3 py-2 text-[#213448] placeholder-gray-400 shadow-sm focus:outline-none focus:ring-[#547792] focus:border-[#547792] sm:text-sm"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#213448]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-[#94B4C1] px-3 py-2 text-[#213448] placeholder-gray-400 shadow-sm focus:outline-none focus:ring-[#547792] focus:border-[#547792] sm:text-sm"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-[#213448] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#547792] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#547792]"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-[#547792]">
          Not a member?{" "}
          <a
            href="/Register"
            className="font-semibold text-[#213448] hover:underline"
          >
            Register Yourself
          </a>
        </p>
      </div>
    </div>
  );
}
