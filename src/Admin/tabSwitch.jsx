import React, { useState } from 'react';
import { FaTachometerAlt, FaUsers, FaTicketAlt, FaMusic } from 'react-icons/fa';
import UserData from './userData';
import AllBookings from './allBookings';
import AllConcerts from './allConcerts';
import Dashboard from './dashboard';

const tabs = [
  { key: 'dashboard', icon: <FaTachometerAlt size={20} />, label: 'Dashboard' },
  { key: 'users', icon: <FaUsers size={20} />, label: 'User Data' },
  { key: 'bookings', icon: <FaTicketAlt size={20} />, label: 'Bookings' },
  { key: 'concerts', icon: <FaMusic size={20} />, label: 'Concerts' },
];

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
        return <Dashboard />;
      default:
        return (
          <div className="text-center mt-10 text-lg text-primary">
            Welcome to the Admin panel. Please select a tab.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-light px-4 py-6 sm:px-6 lg:px-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">
        🎛️ Admin Dashboard
      </h1>

      {/* Horizontal scrollable icon bar */}
      <div className="flex overflow-x-auto gap-4 justify-start sm:justify-center mb-6 pb-2 px-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-md transition-all duration-300 min-w-[64px]
              ${
                activeTab === tab.key
                  ? 'bg-primary text-light shadow'
                  : 'bg-white text-primary border border-secondary hover:bg-accent hover:text-white'
              }`}
            title={tab.label}
          >
            {tab.icon}
            <span className="text-xs hidden sm:block">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-accent">
        {renderTabContent()}
      </div>
    </div>
  );
}
