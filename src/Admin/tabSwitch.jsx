import React, { useState } from 'react';
import UserData from './userData';
import AllBookings from './allBookings';
import AllConcerts from './allConcerts';
import Dashboard from './dashboard';

export default function TabSwitch() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserData />;
      case 'bookings':
        return <AllBookings />;
      case 'concerts':
        return <AllConcerts />;
      case 'dashboard':
        return <Dashboard/>;
      default:
        return (
          <div className="text-center mt-10 text-lg text-gray-700">
            Welcome to the Admin panal. Please select a tab.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-white border'
          }`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-white border'
          }`}
          onClick={() => setActiveTab('users')}
        >
          User Data
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'bg-white border'
          }`}
          onClick={() => setActiveTab('bookings')}
        >
          All Bookings
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'concerts' ? 'bg-blue-600 text-white' : 'bg-white border'
          }`}
          onClick={() => setActiveTab('concerts')}
        >
          All Concerts
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">{renderTabContent()}</div>
    </div>
  );
}
