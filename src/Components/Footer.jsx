import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo1.png';
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa';
import Sponsor from '../assets/sponsorss.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Info Section (Restored) */}
        <div className="space-y-4">
          <Link to="/">
            <img src={Logo} alt="Co-Cart Logo" className="w-32" />
          </Link>
          <p className="text-sm leading-relaxed">
            Join group purchases and benefit from exclusive discounts.
          </p>
          <div className="space-y-1">
            <p className="text-sm flex items-start">
              <span className="mr-2">📍</span>
              <span>Bokwai, Buea, Cameroon</span>
            </p>
            <p className="text-sm flex items-center">
              <span className="mr-2">✉️</span>
              <a href="mailto:ntuvlii5@gmail.com" className="hover:text-red-400 transition">
                ntuvlii5@gmail.com
              </a>
            </p>
            <p className="text-sm flex items-center">
              <span className="mr-2">📞</span>
              <a href="tel:+237695425977" className="hover:text-red-400 transition">
                +237 695-425-977
              </a>
            </p>
          </div>
        </div>

        {/* Customer Service Links (Restored) */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
          <ul className="space-y-3 text-sm">
            {["Contact Us", "Shipping & Returns", "FAQs", "Order Tracking", "Size Guide"].map((item, index) => (
              <li key={index}>
                <a href="#" className="hover:text-red-400 transition duration-200 block">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Links (Restored) */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4 mt-4 text-2xl">
            {[
              { Icon: FaFacebook, name: "Facebook" },
              { Icon: FaInstagram, name: "Instagram" },
              { Icon: FaTwitterSquare, name: "Twitter" },
              { Icon: FaPinterest, name: "Pinterest" }
            ].map((social, index) => (
              <a 
                key={index} 
                href="#" 
                className="hover:text-red-400 transition duration-300"
                aria-label={social.name}
              >
                <social.Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter & Sponsors Section (Optimized) */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Stay in the Loop</h3>
            <p className="text-sm mb-4">
              Subscribe for special offers, free giveaways, and updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full p-3 rounded-l-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                required
              />
              <button 
                type="submit" 
                className="bg-red-600 text-white px-4 rounded-r-md hover:bg-red-700 transition whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
          
          {/* Sponsors Section - Now with minimal padding and max size */}
          <div className="mt-2">
            <h4 className="text-sm font-medium text-gray-400 mb-1">OUR TRUSTED PARTNERS</h4>
            <div className="w-full">
              <img 
                src={Sponsor} 
                alt="Our Sponsors" 
                className="w-full h-auto min-h-[100px] object-contain" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section (Restored) */}
      <div className="mt-12 border-t border-gray-800 pt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} <span className="text-red-500">Co-Cart</span>. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-400 hover:text-red-400 transition">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-red-400 transition">Terms of Service</a>
            <a href="#" className="text-sm text-gray-400 hover:text-red-400 transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;