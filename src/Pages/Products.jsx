import React, { useContext } from 'react'
import all_product from '../1RenderingAssets/all_product.js'
//import Item from '../components/Item'
import banner from '../assets/MensBanner.png'
import Card from '../Components/Card'

const Product = () => {
  
  
  return (
    <div className='md:mt-32 mt-20 max-w-7xl mx-auto'>
      <div>
        <img src={banner} alt="" className='w-screen px-6'/>
      </div>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:pt-24 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900 text-center md:text-start'>Product Collections</h2>
        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 px-6 md:px-0 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {all_product.map((p) => (
            <div
              key={p.id}
              onClick={() => {
              //  setCamp(p); // Store in context
                localStorage.setItem("selectedProduct", JSON.stringify(p)); // Store in localStorage
                navigate(`/campaign/${p.id}`); // Navigate to details page
              }}
            >
              <Card prop={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Product;
