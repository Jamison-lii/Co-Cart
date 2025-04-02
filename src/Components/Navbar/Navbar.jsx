import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo1.png';
import { ShoppingCart, User } from 'lucide-react';
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi';
import ResponsiveMenu from './ResponsiveMenu';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation(); // Get current route

  // Safely get user data from localStorage
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null; 

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="bg-white px-4 fixed w-full z-50 shadow-sm top-0 shadow-gray-400">
      <div className="max-w-7xl mx-auto py-2 px-5 flex justify-between items-center">
        {/* Logo */}
        <Link className="flex items-center" to="/">
          <img src={Logo} alt="Logo" className="md:w-18 w-10"/>
          <p className="ml-2 font-bold text-2xl">Co-Cart</p>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-5">
          <nav className="hidden md:block">
            <ul className="flex items-center font-semibold text-xl gap-7">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "Campaigns", path: "/campaigns" },
                { name: "About", path: "/about" },
              ].map((link) => (
                <Link key={link.path} to={link.path}>
                  <li
                    className={`transition duration-300 ${
                      location.pathname === link.path ? "text-red-500" : "hover:text-red-400"
                    }`}
                  >
                    {link.name}
                  </li>
                </Link>
              ))}
              {/* Cart Icon */}
              <Link to="/cart" className="relative w-10">
                <ShoppingCart />
                <div className="bg-red-500 w-5 absolute -top-2 right-1 flex items-center justify-center rounded-full text-white"></div>
              </Link>
            </ul>
          </nav>

          {/* Profile or Login Button */}
          {user && Object.keys(user).length > 0 ? (
            <Link to="/profile">
              <button className="bg-black text-white p-2 rounded-md">
                <User size={32} />
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="bg-red-500 text-white px-4 py-1 rounded-md">Login</button>
            </Link>
          )}

          {/* Mobile Menu Icon */}
          {showMenu ? (
            <HiMenuAlt1 onClick={toggleMenu} className="cursor-pointer transition-all md:hidden" size={30} />
          ) : (
            <HiMenuAlt3 onClick={toggleMenu} className="cursor-pointer transition-all md:hidden" size={30} />
          )}
        </div>
      </div>

      {/* Responsive Menu Component */}
      <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} />
    </div>
  );
};

export default Navbar;
