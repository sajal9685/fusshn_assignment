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

  const { concert, user, total } = orderData;

  return (
    <div className="p-8 max-w-2xl mx-auto bg-light rounded-lg shadow-lg border border-accent">
      <div ref={receiptRef} className="text-primary">
        <h2 className="text-3xl font-extrabold mb-6 border-b border-accent pb-3 flex items-center gap-3">
          <span role="img" aria-label="ticket">🎟️</span> Order Confirmation
        </h2>
        <p className="mb-2">
          <strong className="text-secondary">Name:</strong> {user?.name}
        </p>
        <p className="mb-2">
          <strong className="text-secondary">Email:</strong> {user?.email}
        </p>
        <p className="mb-2">
          <strong className="text-secondary">Concert:</strong> {concert?.artist_name}
        </p>
        <p className="mb-2">
          <strong className="text-secondary">Date:</strong> {concert?.date}
        </p>
        <p className="mb-2">
          <strong className="text-secondary">Location:</strong> {concert?.location}
        </p>
        <p className="mb-4 text-lg font-semibold">
          <strong className="text-secondary">Price Paid:</strong> ${concert?.discount}
        </p>
        <p className="mt-6 text-green-600 font-semibold text-center">
          ✅ Order Successfully Confirmed!
        </p>
      </div>

      <button
        onClick={handleDownload}
        className="mt-8 w-full bg-primary hover:bg-secondary text-light font-semibold py-3 rounded-lg shadow-md transition-colors"
      >
        Download Receipt
      </button>
    </div>
  );
}
