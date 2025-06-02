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
    <footer className="bg-[#213448] text-[#ECEFCA] py-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Logo & Mission */}
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <img src={Logo} alt="EchoPass" className="h-8 w-auto" />
            <span className="text-xl font-bold text-white">EchoPass</span>
          </div>
          <p className="text-sm text-[#94B4C1]">
            Bringing live music closer to you. Book your next concert in seconds!
          </p>
          <div className="flex gap-4 mt-4 text-[#ECEFCA]">
            <FaFacebookF className="hover:text-[#94B4C1] cursor-pointer" />
            <FaInstagram className="hover:text-[#94B4C1] cursor-pointer" />
            <FaXTwitter className="hover:text-[#94B4C1] cursor-pointer" />
            <FaYoutube className="hover:text-[#94B4C1] cursor-pointer" />
          </div>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/help" className="hover:text-[#94B4C1]">Help Center</Link></li>
            <li><Link to="/contact" className="hover:text-[#94B4C1]">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-[#94B4C1]">FAQs</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-[#94B4C1]">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-[#94B4C1]">Blog</Link></li>
            <li><Link to="/careers" className="hover:text-[#94B4C1]">Careers</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/terms" className="hover:text-[#94B4C1]">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-[#94B4C1]">Privacy Policy</Link></li>
            <li><Link to="/license" className="hover:text-[#94B4C1]">License</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#547792] mt-10 pt-4 text-sm text-center text-[#94B4C1]">
        © {new Date().getFullYear()} EchoPass. All rights reserved.
      </div>
    </footer>
  );
}
