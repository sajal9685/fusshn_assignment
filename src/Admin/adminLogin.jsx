import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        if (user.uid === 'FigJlraDiNPgTtIByZtwH5IO4YD2') {
          localStorage.setItem('isAdmin', 'true');
          navigate('/admin/dashboard');
        } else {
          setError('You are not authorized as admin');
          auth.signOut();
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
