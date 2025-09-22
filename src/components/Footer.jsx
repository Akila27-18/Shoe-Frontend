import React, { useState } from "react";
import logo from '../assets/logo.jpg';
const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/newsletter/subscribe/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        alert("Subscribed successfully!");
        setEmail("");
      } else {
        const data = await res.json();
        alert("Error: " + JSON.stringify(data));
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  return (
    <footer className="bg-[#214145] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0 lg:space-x-8">

          {/* Left Section: Logo + Contact */}
          <div className="flex flex-col items-start w-full lg:w-1/4">
            <img
              src={logo}
              alt="Logo"
              className="h-20 w-20 rounded-full mb-4"
            />
            <p className="font-bold text-lg mb-4">Contact Us</p>
            <ul className="text-sm space-y-1">
              <li>Landline: 044-1234567</li>
              <li>WhatsApp: +91-9876543210</li>
              <li>Email: stepup@gmail.com</li>
              <li>Address: 2/38,West Cross Street</li>
              <li>Tenkasi, TamilNadu, India</li>
            </ul>
          </div>

          {/* Middle Section: Shop & Info */}
          <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-12 lg:space-x-24 w-full lg:w-auto">
            {/* Shop Links */}
            <nav aria-label="Shop Links">
              <p className="font-bold text-lg mb-4">Shop</p>
              <ul className="space-y-2 text-sm">
                <li><a href="/kids" className="hover:text-gray-300 transition-colors">New In</a></li>
                <li><a href="/women" className="hover:text-gray-300 transition-colors">Women</a></li>
                <li><a href="/men" className="hover:text-gray-300 transition-colors">Men</a></li>
                <li><a href="/" className="hover:text-gray-300 transition-colors">Accessories</a></li>
                <li><a href="/women" className="hover:text-gray-300 transition-colors">Heels</a></li>
                <li><a href="/about" className="hover:text-gray-300 transition-colors">About Us</a></li>
              </ul>
            </nav>

            {/* Info Links */}
            <nav aria-label="Info Links">
              <p className="font-bold text-lg mb-4">Info</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-gray-300 transition-colors">Search</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Return & Exchange Policy</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Blogs</a></li>
              </ul>
            </nav>
          </div>

          {/* Right Section: Social Media & Newsletter */}
          <div className="flex flex-col items-start w-full lg:w-1/3 space-y-6">
            {/* Social Media */}
            <div>
              <p className="font-bold text-lg mb-4">Social Media</p>
              <div className="flex space-x-4">
                <a href="#" aria-label="Facebook" className="hover:text-gray-300">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2c0-2 1-3 3-3h2v3h-2c-1 0-1 .5-1 1v1h3l-1 3h-2v7A10 10 0 0022 12z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-gray-300">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M7 2C4.8 2 3 3.8 3 6v12c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4H7zm10 2c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-gray-300">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M22 5.9c-.8.4-1.7.6-2.6.8a4.5 4.5 0 001.9-2.5 9 9 0 01-2.8 1.1 4.5 4.5 0 00-7.7 4.1 12.9 12.9 0 01-9.4-4.8 4.5 4.5 0 001.4 6 4.5 4.5 0 01-2-.6v.1a4.5 4.5 0 003.6 4.4 4.5 4.5 0 01-2 .1 4.5 4.5 0 004.2 3.1 9 9 0 01-5.6 1.9A12.7 12.7 0 0012 21c8.3 0 12.9-6.9 12.9-12.9 0-.2 0-.5 0-.7a9.2 9.2 0 002.3-2.3z" />
                  </svg>
                </a>
                <a href="#" aria-label="Website" className="hover:text-gray-300">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 2c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8zm0 2a6 6 0 100 12 6 6 0 000-12zm0 2a4 4 0 110 8 4 4 0 010-8z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="w-full max-w-sm">
              <p className="font-bold text-lg mb-2">Let's stay in touch!</p>
              <p className="text-sm mb-2">Sign up for exclusive offers, original stories, events and more.</p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow p-2 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#24b8d0] bg-[#1a3233]"
                />
                <button type="submit" className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
