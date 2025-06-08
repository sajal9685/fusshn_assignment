import React from 'react';

const faqs = [
  {
    question: "How do I book a concert ticket?",
    answer: "Go to the concert listing, select your concert, and click 'Book Now'. You'll be guided through checkout.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer: "Currently, cancellations or reschedules are not supported. Please contact support for urgent issues.",
  },
  {
    question: "How many tickets can I book at once?",
    answer: "You can book up to 5 tickets per concert per user.",
  },
  {
    question: "Where can I see my booked tickets?",
    answer: "Head to your profile and click on the 'My Bookings' tab to see all your booked concerts.",
  },
  {
    question: "Do I need to print my ticket?",
    answer: "No, a digital ticket is enough. Just show your ticket QR code at the venue entrance.",
  },
  {
    question: "Is payment secure?",
    answer: "Yes, we use a secure payment gateway to protect your information.",
  },
];

export default function Help() {
  return (
    <section className="bg-primary text-light px-6 py-12 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <p className="text-center text-accent mb-10">
          Need help? Browse the common questions below. Still stuck? Reach out via our contact page.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-secondary text-light p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-sm text-light">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
