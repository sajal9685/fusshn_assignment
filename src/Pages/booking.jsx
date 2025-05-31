import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

const Booking = () => {
  const { uid } = useParams();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const bookingsRef = ref(db, `Bookings/${uid}`);

    const unsubscribe = onValue(bookingsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const bookingsArray = Object.values(data);
        setBookings(bookingsArray);
      } else {
        setBookings([]);
      }
    });

    return () => unsubscribe();
  }, [uid]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4">
                <img
                  src={booking.concert.imageBase64}
                  alt="Concert"
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <p><strong>Artist:</strong> {booking.concert.artist_name}</p>
                  <p><strong>Date:</strong> {booking.concert.date}</p>
                  <p><strong>Location:</strong> {booking.concert.location}</p>
                  <p><strong>Total Paid:</strong> ${booking.total}</p>
                  <p className="text-sm text-gray-500">Booked on {new Date(booking.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Booking;
