import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { push, set } from "firebase/database";

const Checkout = () => {
  const { concertId } = useParams();
  const [concert, setConcert] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
    const user = auth.currentUser;

    if (user) {
      // Fetch user info
      get(ref(db, `Users/${user.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        }
      });

      // Fetch concert info
      get(ref(db, `concerts/${concertId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setConcert(snapshot.val());
        }
      });
    }
  }, [concertId]);
  const handleConfirmOrder = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getDatabase();

    if (user) {
      const orderRef = push(ref(db, `Bookings/${user.uid}`)); 
      const orderData = {
        user: {
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          phone: userData.phone,
          age: userData.age,
        },
        concert: {
          artist_name: concert.artist_name,
          date: concert.date,
          location: concert.location,
          price: concert.Orprice,
          discount: concert.discount || 0,
          imageBase64: concert.imageBase64,
        },
        total: total,
        createdAt: new Date().toISOString(),
      };

      await set(orderRef, orderData);

      navigate("/printReceipt", {
        state: orderData,
      });
    }
  };

  if (!concert || !userData) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // Pricing logic
  const subtotal = parseFloat(concert.Orprice);
  const discount = parseFloat(concert.discount || 0);
  const shipping = 5;
  const taxes = ((subtotal - discount) * 0.1).toFixed(2);
  const total = (subtotal - discount + shipping + parseFloat(taxes)).toFixed(2);

  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* User Info */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold">Contact Information</h2>
          <input
            type="email"
            value={userData.phone}
            disabled
            className="w-full p-2 border rounded"
          />

          <h2 className="text-xl font-semibold">Shipping Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={userData.firstName}
              disabled
              className="p-2 border rounded"
            />
            <input
              type="text"
              value={userData.lastName}
              disabled
              className="p-2 border rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={userData.age}
              disabled
              className="p-2 border rounded"
            />
            <input
              type="text"
              value={userData.email}
              disabled
              className="p-2 border rounded"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="flex items-center space-x-4">
            <img
              src={concert.imageBase64}
              alt="Concert"
              className="w-16 h-16 rounded"
            />
            <div>
              <p>{concert.artist_name}</p>
              <p className="text-sm text-gray-500">
                {concert.date} @ {concert.location}
              </p>
              <p>${concert.Orprice}</p>
            </div>
          </div>
          <div className="pt-4 border-t space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>${taxes}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
          <button
            onClick={handleConfirmOrder}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
