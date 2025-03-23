import React, { useContext, useState } from 'react'
import Logo from '../../assets/logo1.png'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from './ResponsiveMenu';
import { FaPersonBooth } from 'react-icons/fa';
// import { Shopcontext } from '../../Context/ShopContext';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const token = localStorage.getItem("token");

  //const {getTotalCartItems} = useContext(Shopcontext)

  const toggleMenu = () => {
    setShowMenu(!showMenu)   //it will toggle if the showmenu is false it will be true and if true it will be false
  }
  return (
    <div className='bg-white px-4 fixed w-full z-50 shadow-sm top-0 shadow-gray-400'>
      <div className='max-w-7xl mx-auto py-2 px-5 flex justify-between items-center'>
        <Link to='/'> <img src={Logo} alt="" className='md:w-24 w-20'/></Link>
       
        <div className='flex items-center gap-5'>
            <nav className='hidden md:block'>
                <ul className='flex items-center font-semibold text-xl gap-7'>
                    <Link to='/'><li>Home</li></Link>
                    <Link to='/products'><li>Products</li></Link>
                    <Link to='/campaigns'><li>Campaigns</li></Link>
                    <Link to='/about'><li>About</li></Link>
                    <Link to='/cart' className='relative w-10'>
            <ShoppingCart/> 
            <div className='bg-red-500 w-5 absolute -top-2 right-1 flex items-center justify-center rounded-full text-white'></div>
            </Link>
                    
                    
                </ul>
            </nav>
           {
            (token) ?
            <Link to='/profile'><button className='bg-red-500 text-white px-4 py-1 rounded-md'><FaPersonBooth/></button></Link>
            :<Link to='/login'><button className='bg-red-500 text-white px-4 py-1 rounded-md'>Login</button></Link>
            
           }   {/* mobile hamburger icon */}
            {showMenu ? (
              <HiMenuAlt1 onClick={toggleMenu} className='cursor-pointer transition-all md:hidden' size={30}/>
            ):(
              <HiMenuAlt3 onClick={toggleMenu} className='cursor-pointer transition-all md:hidden' size={30}/>
            )}
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu}/>
    </div>
  )
}

export default Navbar
