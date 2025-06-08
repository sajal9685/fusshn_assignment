import React, { useState } from 'react';

const faqs = [
  {
    question: "How do I book a concert ticket?",
    answer: "Go to the concert listing page, choose your event, and click 'Book Now'. You'll be guided through the booking process.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer: "Currently, tickets are non-refundable and non-transferable. For emergencies, contact support.",
  },
  {
    question: "Where can I view my booked tickets?",
    answer: "Your booked tickets appear in the 'My Bookings' tab on your profile page.",
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes. All payments are processed through a secure gateway using encryption protocols.",
  },
  {
    question: "Can I book multiple tickets at once?",
    answer: "Yes, you can book up to 5 tickets per user per concert.",
  },
  {
    question: "What should I bring to the event?",
    answer: "Just bring your digital ticket (with QR code) and a valid ID for verification at the venue.",
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="bg-primary text-light px-6 py-12 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-accent pb-4 cursor-pointer"
              onClick={() => toggle(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <span className="text-accent text-xl">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </div>
              {activeIndex === index && (
                <p className="text-sm mt-2 text-light transition-all duration-300">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
