import React from 'react'
import banner from '../assets/MidBanner.jpg'
import togeva from '../assets/buy together.jpg'

const MidBanner = () => {
  return (
    <div className='bg-gray-100 py-24'>
      <div className='relative max-w-7xl mx-auto md:rounded-2xl pt-28 bg-cover bg-center h-[550px] md:h-[600px] ' style={{backgroundImage: `url(${togeva})`, backgroundPosition:'center', backgroundAttachment: 'fixed'}}>
        <div className='absolute inset-0  md:rounded-2xl bg-opacity-50 flex items-center justify-center'>
            <div className='text-center text-white px-4'>
                <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold mb-4'>On Demand Buying Campaigns</h1>
                <p className='text-lg md:text-xl mb-6'>Discover the most frequently created campaigns for the season.</p>
                <button className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg transition duration-300'>Shop Now</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MidBanner
