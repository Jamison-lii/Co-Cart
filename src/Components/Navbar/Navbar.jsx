import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo1.png';
import { ShoppingCart, User } from 'lucide-react';
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi';
import ResponsiveMenu from './ResponsiveMenu';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // Safely get and check auth status
  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem("token");
      const userString = localStorage.getItem("user");
      
      if (!token || !userString) {
        setIsAuthenticated(false);
        return false;
      }

      const user = JSON.parse(userString);
      setIsAuthenticated(!!user && !!token);
      return !!user && !!token;
    } catch (error) {
      console.error("Auth check error:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      return false;
    }
  };

  // Listen for storage changes (auth updates from other tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    // Initial check
    checkAuthStatus();

    // Set up event listener
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Also check auth when route changes
  useEffect(() => {
    checkAuthStatus();
  }, [location]);

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
          {isAuthenticated ? (
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
      <ResponsiveMenu 
        showMenu={showMenu} 
        setShowMenu={setShowMenu} 
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};

export default Navbar;