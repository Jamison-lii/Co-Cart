import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo1.png';
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        {/* Info Section */}
        <div>
          <Link to="/">
            <img src={Logo} alt="Co-Cart Logo" className="w-32" />
          </Link>
          <p className="mt-4 text-sm">Join group purchases and benefit from exclusive discounts.</p>
          <p className="mt-2 text-sm">📍 Bokwai, Buea, Cameroon</p>
          <p className="text-sm">✉️ Email: <a href="mailto:ntuvlii5@gmail.com" className="hover:text-red-400">ntuvlii5@gmail.com</a></p>
          <p className="text-sm">📞 Phone: <a href="tel:+237695425977" className="hover:text-red-400">+237 695-425-977</a></p>
        </div>

        {/* Customer Service Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            {["Contact Us", "Shipping & Returns", "FAQs", "Order Tracking", "Size Guide"].map((item, index) => (
              <li key={index} className="hover:text-red-400 cursor-pointer transition duration-200">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2 text-xl">
            {[FaFacebook, FaInstagram, FaTwitterSquare, FaPinterest].map((Icon, index) => (
              <Icon key={index} className="hover:text-red-400 transition duration-300 cursor-pointer" />
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Stay in the Loop</h3>
          <p className="text-sm">Subscribe for special offers, free giveaways, and updates.</p>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 rounded-l-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button type="submit" className="bg-red-600 text-white px-4 rounded-r-md hover:bg-red-700 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} <span className="text-red-500">Co-Cart</span>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
