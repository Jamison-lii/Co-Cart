import React, { useEffect, useState } from 'react';
import banner from '../assets/newHero.jpeg'; 
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null); // ✅ Store token in state

  useEffect(() => {
    setToken(localStorage.getItem("token")); // ✅ Retrieve token correctly
  }, []);

  const handleOnClick = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/createCampaign');
    }
  };

  return (
    <div className="bg-gray-100 lg:pt-24 pt-16 mt-13">
      <div
        className="relative max-w-7xl mx-auto md:rounded-2xl h-[550px] md:h-[600px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${banner})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 md:rounded-2xl bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              Benefit from bulk discounts
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Establish your own Buying Campaign, buy together, save money
            </p>
            <button
              onClick={handleOnClick} // ✅ No need for an extra arrow function
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg transition duration-300"
            >
              Create a Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
