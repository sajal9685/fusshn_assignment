import React from 'react';
import image from '../assets/concert-illustration.jpg'

export default function About() {
  return (
    <section className="bg-primary text-light px-6 py-12 md:px-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">About EchoPass</h2>
        <p className="text-accent text-center mb-12 text-base md:text-lg">
          Your ultimate destination to discover, book, and experience live music like never before.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-light">Who We Are</h3>
            <p className="text-light text-sm md:text-base leading-relaxed">
              EchoPass is a platform built for music lovers, by music lovers. We help you find the best concerts in your city and make booking tickets easier than ever.
              Our mission is to bring people closer to their favorite artists and unforgettable live experiences.
            </p>

            <h3 className="text-2xl font-semibold text-light">What We Do</h3>
            <p className="text-light text-sm md:text-base leading-relaxed">
              From intimate acoustic sets to grand arena shows, we curate a wide range of concerts and events across India.
              Whether you're into rock, indie, EDM, or classical, there's something here for everyone.
            </p>
          </div>

          {/* Image or Illustration */}
          <div className="flex justify-center">
            <img
              src={image}
              alt="Concert illustration"
              className="max-w-xs md:max-w-sm w-full"
            />
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-light mb-4">Our Vision</h3>
          <p className="text-light text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
            We envision a future where live music is more accessible, more personal, and more magical.
            EchoPass strives to create that bridge between artists and fans, one concert at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
