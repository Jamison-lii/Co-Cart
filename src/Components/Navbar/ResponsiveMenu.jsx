import React, { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ResponsiveMenu = ({ showMenu, setShowMenu, isAuthenticated }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Safely get and sync user data
    useEffect(() => {
        const getUserData = () => {
            try {
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
                localStorage.removeItem("user");
                setUser(null);
            }
        };

        getUserData();

        // Listen for storage changes
        const handleStorageChange = () => {
            getUserData();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [isAuthenticated]);

    const handleProfileClick = () => {
        setShowMenu(false);
        navigate('/profile');
    };

    const handleLinkClick = () => {
        setShowMenu(false);
    };

    return (
        <div className={`${showMenu ? "left-0" : "-left-[100%]"} fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all duration-300`}>
            
            {/* User Info Section */}
            <div className='border-b pb-4'>
                {isAuthenticated && user ? (
                    <div 
                        onClick={handleProfileClick}
                        className='flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors'
                    >
                        <div className='relative'>
                            <FaUserCircle size={50} className="text-gray-700" />
                            {user.profile_pic && (
                                <img 
                                    src={user.profile_pic} 
                                    alt="Profile" 
                                    className="absolute inset-0 w-full h-full object-cover rounded-full"
                                />
                            )}
                        </div>
                        <div>
                            <h1 className="font-semibold">Hello, {user.name}</h1>
                            <h1 className='text-sm text-slate-500'>{user.email}</h1>
                        </div>
                    </div>
                ) : (
                    <Link 
                        to="/login" 
                        onClick={handleLinkClick}
                        className="block"
                    >
                        <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 mt-2 rounded-md w-full transition-colors'>
                            Login / Register
                        </button>
                    </Link>
                )}
            </div>

            {/* Navigation Links */}
            <nav className='mt-4 flex-1'>
                <ul className='flex flex-col space-y-4 text-lg'>
                    <Link 
                        to='/' 
                        onClick={handleLinkClick}
                        className={`p-2 rounded-lg ${location.pathname === '/' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100'}`}
                    >
                        <li className='flex items-center gap-2'>
                            <span>🏠</span> Home
                        </li>
                    </Link>
                    <Link 
                        to='/products' 
                        onClick={handleLinkClick}
                        className={`p-2 rounded-lg ${location.pathname === '/products' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100'}`}
                    >
                        <li className='flex items-center gap-2'>
                            <span>🛍️</span> Products
                        </li>
                    </Link>
                    <Link 
                        to='/campaigns' 
                        onClick={handleLinkClick}
                        className={`p-2 rounded-lg ${location.pathname === '/campaigns' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100'}`}
                    >
                        <li className='flex items-center gap-2'>
                            <span>🎯</span> Campaigns
                        </li>
                    </Link>
                    <Link 
                        to='/about' 
                        onClick={handleLinkClick}
                        className={`p-2 rounded-lg ${location.pathname === '/about' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100'}`}
                    >
                        <li className='flex items-center gap-2'>
                            <span>ℹ️</span> About
                        </li>
                    </Link>
                    <Link 
                        to='/cart' 
                        onClick={handleLinkClick}
                        className={`p-2 rounded-lg ${location.pathname === '/cart' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100'}`}
                    >
                        <li className='flex items-center gap-2'>
                            <ShoppingCart size={22} />
                            <span>Cart</span>
                        </li>
                    </Link>
                </ul>
            </nav>

            {/* Footer Section */}
            <div className='text-center text-gray-600 text-sm mt-4 pt-4 border-t'>
                <p>© {new Date().getFullYear()} Co-Cart</p>
                {isAuthenticated && (
                    <button 
                        onClick={() => {
                            localStorage.removeItem("user");
                            localStorage.removeItem("token");
                            window.dispatchEvent(new Event('storage'));
                            handleLinkClick();
                            navigate('/');
                        }}
                        className="mt-2 text-red-500 text-xs hover:underline"
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default ResponsiveMenu;