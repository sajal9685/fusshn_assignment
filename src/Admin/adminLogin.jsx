import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const user_uid = import.meta.env.VITE_ADMIN_UID || "";
const handleLogin = (e) => {
  e.preventDefault();

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const db = getDatabase();

      // Read isAdmin flag from Realtime Database
      const adminRef = ref(db, `Users/${user.uid}/isAdmin`);
      const snapshot = await get(adminRef);

      if (snapshot.exists() && snapshot.val() === true) {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      } else {
        setError("You are not authorized as admin");
        localStorage.setItem("isAdmin", "false");
        auth.signOut();
      }
    })
    .catch((err) => {
      setError(err.message);
    });
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light px-4">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        Welcome to EchoPass Admin Panel 🎟️
      </h1>

      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-sm md:max-w-md p-6 rounded-2xl shadow-xl space-y-5"
      >
        <h2 className="text-xl font-semibold text-primary text-center">
          Admin Login
        </h2>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-primary mb-1">
            Admin Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-light py-2 rounded-xl font-semibold hover:bg-secondary transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}
