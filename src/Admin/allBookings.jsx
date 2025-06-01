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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow rounded">
          <thead className="bg-gray-100">
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
                <tr className="hover:bg-gray-50">
                  <td className="p-3 border">{booking.bookingId}</td>
<td className="p-3 border">{booking.concert?.artist_name || 'N/A'}</td>
                  <td className="p-3 border">₹{booking.total}</td>
                  <td className="p-3 border">{new Date(booking.createdAt).toLocaleString()}</td>
                  <td className="p-3 border">{booking.user?.email || 'No Email'}</td>
                  <td className="p-3 border">
                    <button
                      onClick={() => toggleExpand(index)}
                      className="text-blue-600 hover:underline"
                    >
                      {expanded === index ? 'Hide' : 'View'} User
                    </button>
                  </td>
                </tr>

                {expanded === index && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="p-4 border">
                      <div className="text-sm space-y-2">
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
      )}
    </div>
  );
}
