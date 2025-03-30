import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ResponsiveMenu = ({ showMenu, setShowMenu }) => {
    const navigate = useNavigate();
    
    // Get user data safely
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null; 

    return (
        <div className={`${showMenu ? "left-0" : "-left-[100%]"} fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all duration-300`}>
            
            {/* User Info */}
            <div>
                {user && Object.keys(user).length > 0 ? (
                    <div onClick={() => navigate('/profile')} className='flex items-center gap-3 cursor-pointer'>
                        <FaUserCircle size={50} />
                        <div>
                            <h1 className="font-semibold">Hello, {user?.name}</h1>
                            <h1 className='text-sm text-slate-500'>Welcome back</h1>
                        </div>
                    </div>
                ) : (
                    <Link to="/login" onClick={() => setShowMenu(false)}>
                        <button className='bg-red-500 text-white px-4 py-2 mt-2 rounded-md w-full'>Login</button>
                    </Link>
                )}
            </div>

            {/* Navigation Links */}
            <nav className='mt-12'>
                <ul className='flex flex-col space-y-6 text-lg font-semibold'>
                    <Link to='/' onClick={() => setShowMenu(false)}><li>Home</li></Link>
                    <Link to='/products' onClick={() => setShowMenu(false)}><li>Products</li></Link>
                    <Link to='/campaigns' onClick={() => setShowMenu(false)}><li>Campaigns</li></Link>
                    <Link to='/about' onClick={() => setShowMenu(false)}><li>About</li></Link>
                    <Link to='/cart' onClick={() => setShowMenu(false)} className='flex items-center gap-2'>
                        <ShoppingCart size={22} />
                        <span>Cart</span>
                    </Link>
                </ul>
            </nav>

            {/* Footer */}
            <div className='text-center text-gray-600 text-sm mt-auto'>
                <p>© {new Date().getFullYear()} React/React-Native BootCamp</p>
            </div>
        </div>
    );
};

export default ResponsiveMenu;
