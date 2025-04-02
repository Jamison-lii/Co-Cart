import React from 'react';
import { X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';


const Cart = () => {
    
  const navigate = useNavigate();
  const [purchaseGoals, setPurchaseGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user  = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
      fetchMyGoals();

    }, []);

  const fetchMyGoals = async () => {
    const url = `https://rrn24.techchantier.com/buy_together/public/api/${user.id}/purchase-goals`;
    
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { 
        Accept: "application/json" ,
         Authorization: `Bearer ${token}`,
        },
        
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data.data)) {
        setPurchaseGoals(data.data);
      } else {
        throw new Error("Unexpected data format");
      }
    } catch (error) {
      setError("❌ Failed to load purchase goals.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading purchase goals...</p>;
  if (error) return <p>{error}</p>;
  
 


  return (
    <div className='mt-32'>
      <div className='max-w-7xl mx-auto my-10 p-4'>
        <div>
          {console.log("user", user)}
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-[0.5fr,2fr,1fr,1fr,1fr,1fr] items-center px-4'>
            <p>Products</p>
            <p>Title</p>
            <p className='hidden md:block'>Price</p>
            <p className='hidden md:block'>Quantity</p>
            <p className='hidden md:block'>Total</p>
            <p className='hidden md:block'>Remove</p>
          </div>
          <hr className='bg-gray-300 border-0 h-[2px] my-2' />
          <div>
            <div className='text-gray-500 font-semibold text-sm sm:text-base grid grid-cols-2 sm:grid-cols-3 md:grid-cols-[0.5fr,2fr,1fr,1fr,1fr,1fr] items-center px-4 gap-2'>
              <img src="../assets/logo1.png" className='h-16 w-16 object-cover' alt="product" />
              <p>Product Name</p>
              <p className='hidden md:block'>$50.00</p>
              <button className='w-16 h-12 bg-white border border-gray-300'>1</button>
              <p className='hidden md:block'>$50.00</p>
              <X className='cursor-pointer' />
            </div>
            <hr className='bg-gray-300 border-0 h-[2px] my-2' />
          </div>
          <div className='flex flex-col lg:flex-row my-12 gap-10 md:gap-32'>
            <div className='flex-1 flex flex-col gap-4'>
              <h1 className='text-lg font-bold'>Cart Totals</h1>
              <div>
                <div className='flex justify-between py-2'>
                  <p>Subtotal</p>
                  <p>$50.00</p>
                </div>
                <hr className='bg-gray-300 border-0 h-[2px] mt-2' />
                <div className='flex justify-between py-2'>
                  <p>Shipping Fee</p>
                  <p>Free</p>
                </div>
                <hr className='bg-gray-300 border-0 h-[2px] my-2' />
                <div className='flex justify-between text-xl font-semibold py-2'>
                  <h3>Total</h3>
                  <h3>$50.00</h3>
                </div>
              </div>
              <Link to='/login'>
                <button className='w-full lg:w-64 h-14 bg-red-500 text-white font-semibold text-lg'>PROCEED TO CHECKOUT</button>
              </Link>
            </div>
            <div className='flex-1 w-full text-lg font-semibold'>
              <p className='text-gray-600'>If you have a promo code, enter it here:</p>
              <div className='w-full lg:w-80 mt-2 flex'>
                <input type="text" placeholder='Promo Code' className='flex-1 h-14 p-2 bg-gray-200' />
                <button className='h-14 w-32 bg-black text-white'>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;