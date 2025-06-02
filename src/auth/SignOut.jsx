import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('Signed out successfully!');
      navigate('/SignIn');
    } catch (error) {
      console.error('Sign out error:', error);
      alert('Failed to sign out. Please try again.');
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-5 py-2 rounded-md bg-[#213448] text-white text-sm font-medium shadow-md hover:bg-[#547792] transition-colors duration-200"
    >
      Sign Out
    </button>
  );
};

export default SignOut;
