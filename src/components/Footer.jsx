import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/tickets.svg";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-primary text-light pt-12 pb-6 px-4 md:px-10 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand */}
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img src={Logo} alt="EchoPass" className="h-10 w-10" />
            <span className="text-2xl font-bold text-white">EchoPass</span>
          </div>
          <p className="text-sm text-accent leading-relaxed">
            Bringing live music closer to you. Discover, book, and vibe with your favorite artists.
          </p>
          <div className="flex gap-4 mt-5 text-xl text-light">
            <FaFacebookF className="hover:text-accent cursor-pointer transition duration-200" />
            <FaInstagram className="hover:text-accent cursor-pointer transition duration-200" />
            <FaXTwitter className="hover:text-accent cursor-pointer transition duration-200" />
            <FaYoutube className="hover:text-accent cursor-pointer transition duration-200" />
          </div>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/help" className="hover:text-accent transition">Help Center</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-accent transition">FAQs</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-accent transition">About Us</Link></li>
          </ul>
        </div>


       
      </div>

      <div className="border-t border-secondary mt-10 pt-4 text-sm text-center text-accent">
        © {new Date().getFullYear()} EchoPass. All rights reserved.
      </div>
    </footer>
  );
}
