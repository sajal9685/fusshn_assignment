import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";

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
    <div className="p-6 max-w-4xl mx-auto bg-light rounded-2xl shadow-lg border-2 border-accent">
      <h2 className="text-3xl font-bold text-primary mb-6 border-b border-accent pb-2">
        Your Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-secondary font-medium text-center py-8">
          No bookings found.
        </p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-md p-4 border border-accent hover:shadow-xl transition-shadow"
            >
              <img
                src={booking.concert.imageBase64}
                alt="Concert"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover border-2 border-primary"
              />
              <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 text-primary">
                <p className="text-xl font-semibold">{booking.concert.artist_name}</p>
                <p className="text-secondary mt-1">
                  {booking.concert.date} @ {booking.concert.location}
                </p>
                <p className="mt-2 font-semibold">
                  Total Paid: <span className="text-indigo-600">${booking.total}</span>
                </p>
                <p className="mt-1 text-sm text-gray-500 italic">
                  Booked on {new Date(booking.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Booking;
