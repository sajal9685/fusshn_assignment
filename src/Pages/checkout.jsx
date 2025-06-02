import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, push, set } from "firebase/database";

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
      get(ref(db, `Users/${user.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        }
      });

      get(ref(db, `concerts/${concertId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setConcert(snapshot.val());
        }
      });
    }
  }, [concertId]);

  // Pricing logic moved here for clarity
  if (!concert || !userData) {
    return (
      <p className="text-center mt-20 text-primary text-lg font-semibold">
        Loading...
      </p>
    );
  }

  const subtotal = parseFloat(concert.Orprice);
  const discount = parseFloat(concert.discount || 0);
  const shipping = 5;
  const taxes = ((subtotal - discount) * 0.1).toFixed(2);
  const total = (subtotal - discount + shipping + parseFloat(taxes)).toFixed(2);

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

  return (
    <div className="bg-light min-h-screen py-12 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* User Info */}
        <section className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-8 border-b border-accent pb-3">
            Contact Information
          </h2>
          <input
            type="email"
            value={userData.phone}
            disabled
            className="w-full p-3 mb-6 border border-accent rounded-md bg-[#f7fafc] text-secondary text-lg"
          />

          <h2 className="text-2xl font-bold text-primary mb-6 border-b border-accent pb-3">
            Shipping Information
          </h2>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              value={userData.firstName}
              disabled
              className="p-3 border border-accent rounded-md bg-[#f7fafc] text-secondary text-lg"
            />
            <input
              type="text"
              value={userData.lastName}
              disabled
              className="p-3 border border-accent rounded-md bg-[#f7fafc] text-secondary text-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <input
              type="text"
              value={userData.age}
              disabled
              className="p-3 border border-accent rounded-md bg-[#f7fafc] text-secondary text-lg"
            />
            <input
              type="text"
              value={userData.email}
              disabled
              className="p-3 border border-accent rounded-md bg-[#f7fafc] text-secondary text-lg"
            />
          </div>
        </section>

        {/* Order Summary */}
        <section className="bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between">
          <h2 className="text-2xl font-bold text-primary mb-6 border-b border-accent pb-3">
            Order Summary
          </h2>
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={concert.imageBase64}
              alt="Concert"
              className="w-20 h-20 rounded-lg object-cover border-2 border-secondary"
            />
            <div>
              <p className="text-xl font-semibold text-secondary">
                {concert.artist_name}
              </p>
              <p className="text-sm text-primary">
                {concert.date} @ {concert.location}
              </p>
              <p className="mt-1 text-lg font-bold text-primary">
                ${subtotal.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="border-t border-accent pt-4 space-y-3 text-secondary text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>- ${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>${taxes}</span>
            </div>
            <div className="flex justify-between font-bold text-primary text-lg mt-2">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          <button
            onClick={handleConfirmOrder}
            className="mt-8 w-full bg-primary hover:bg-secondary transition-colors text-light font-semibold py-3 rounded-lg shadow-lg"
          >
            Confirm Order
          </button>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
