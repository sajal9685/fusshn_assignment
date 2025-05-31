import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

export default function PrintReceipt() {
  const location = useLocation();
  const receiptRef = useRef();

  const orderData = location.state;

  useEffect(() => {
    if (!orderData) {
      // fallback if someone lands directly
      window.location.href = '/';
    }
  }, [orderData]);

  const handleDownload = () => {
    const element = receiptRef.current;
    html2pdf().from(element).save('order-receipt.pdf');
  };

  if (!orderData) return null;

  const { concert, user, totalAmount } = orderData;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-md shadow-md">
      <div ref={receiptRef}>
        <h2 className="text-2xl font-bold mb-4">🎟️ Order Confirmation</h2>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Concert:</strong> {concert?.artist_name}</p>
        <p><strong>Date:</strong> {concert?.date}</p>
        <p><strong>Location:</strong> {concert?.location}</p>
        <p><strong>Price Paid:</strong> ${totalAmount}</p>
        <p className="mt-4 text-green-600 font-semibold">✅ Order Successfully Confirmed!</p>
      </div>

      <button
        onClick={handleDownload}
        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Download Receipt
      </button>
    </div>
  );
}
