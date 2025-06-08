import React from 'react';

export default function Contact() {
  return (
    <section className="bg-primary text-light px-6 py-12 md:px-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Contact Us</h2>
        <p className="text-center text-accent mb-10">
          We'd love to hear from you! Fill out the form below or reach us directly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form className="bg-secondary p-6 rounded-xl shadow-lg space-y-4">
            <div>
              <label className="block text-sm mb-1" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                className="w-full p-2 rounded bg-light text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="w-full p-2 rounded bg-light text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="4"
                className="w-full p-2 rounded bg-light text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-accent text-primary font-semibold py-2 px-4 rounded hover:bg-light hover:text-secondary transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-6 text-sm md:text-base">
            <div>
              <h4 className="text-accent font-semibold mb-1">Support Email</h4>
              <p>support@echopass.com</p>
            </div>
            <div>
              <h4 className="text-accent font-semibold mb-1">Phone</h4>
              <p>+91 98765 43210</p>
            </div>
            <div>
              <h4 className="text-accent font-semibold mb-1">Office Address</h4>
              <p>
                EchoPass HQ<br />
                123 Concert Lane,<br />
                Music City, India
              </p>
            </div>
            <div>
              <h4 className="text-accent font-semibold mb-1">Follow Us</h4>
              <p>Instagram | Twitter | Facebook</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
