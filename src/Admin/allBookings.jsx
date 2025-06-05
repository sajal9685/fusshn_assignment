import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import app from '../firebase';

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const db = getDatabase(app);
    const bookingsRef = ref(db, 'Bookings');

    onValue(bookingsRef, (snapshot) => {
      const data = snapshot.val();
       console.log("Bookings raw data:", data); 
      if (!data) return setBookings([]);

      const allBookings = [];
      Object.entries(data).forEach(([userId, userBookings]) => {
        Object.entries(userBookings).forEach(([bookingId, booking]) => {
          allBookings.push({
            userId,
            bookingId,
            ...booking,
          });
        });
      });

      setBookings(allBookings);
    });
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-4 md:p-6 bg-light min-h-screen">
      <h2 className="text-2xl font-bold text-primary mb-6">All Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-secondary">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto hidden md:block">
          <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
            <thead className="bg-secondary text-white">
              <tr>
                <th className="p-3 border">Booking ID</th>
                <th className="p-3 border">Concert</th>
                <th className="p-3 border">Total</th>
                <th className="p-3 border">Created At</th>
                <th className="p-3 border">User Email</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <React.Fragment key={booking.bookingId}>
                  <tr className="hover:bg-accent/10">
                    <td className="p-3 border">{booking.bookingId}</td>
                    <td className="p-3 border">{booking.concert?.artist_name || 'N/A'}</td>
                    <td className="p-3 border">₹{booking.total}</td>
                    <td className="p-3 border">{new Date(booking.createdAt).toLocaleString()}</td>
                    <td className="p-3 border">{booking.user?.email || 'No Email'}</td>
                    <td className="p-3 border">
                      <button
                        onClick={() => toggleExpand(index)}
                        className="text-primary hover:underline"
                      >
                        {expanded === index ? 'Hide' : 'View'} User
                      </button>
                    </td>
                  </tr>
                  {expanded === index && (
                    <tr className="bg-light">
                      <td colSpan={6} className="p-4 border">
                        <div className="text-sm space-y-2 text-primary">
                          <p><strong>Name:</strong> {booking.user?.name || 'N/A'}</p>
                          <p><strong>Age:</strong> {booking.user?.age || 'N/A'}</p>
                          <p><strong>Phone:</strong> {booking.user?.phone || 'N/A'}</p>
                          <p><strong>Email:</strong> {booking.user?.email || 'N/A'}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 📱 Mobile View */}
      <div className="md:hidden space-y-4">
        {bookings.map((booking, index) => (
          <div key={booking.bookingId} className="bg-white border rounded shadow p-4">
            <div className="text-primary font-semibold">{booking.concert?.artist_name || 'N/A'}</div>
            <div className="text-sm text-gray-600 mt-1">Booking ID: {booking.bookingId}</div>
            <div className="text-sm text-gray-600">Total: ₹{booking.total}</div>
            <div className="text-sm text-gray-600">
              Created: {new Date(booking.createdAt).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Email: {booking.user?.email || 'N/A'}</div>

            <button
              onClick={() => toggleExpand(index)}
              className="mt-2 text-secondary text-sm font-medium"
            >
              {expanded === index ? 'Hide' : 'View'} User Info
            </button>

            {expanded === index && (
              <div className="mt-2 text-sm space-y-1 text-primary">
                <p><strong>Name:</strong> {booking.user?.name || 'N/A'}</p>
                <p><strong>Age:</strong> {booking.user?.age || 'N/A'}</p>
                <p><strong>Phone:</strong> {booking.user?.phone || 'N/A'}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
