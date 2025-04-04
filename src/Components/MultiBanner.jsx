import React from 'react'
import controller  from '../assets/PS4.jpg'
import girl from '../assets/girl.jpg'
import together from '../assets/together.jpg'
import { Link } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MultiBanner = () => {

    const navigate = useNavigate()
    return (
        <div className='bg-gray-100'>
            <div className='grid grid-cols-1 px-4 md:px-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-6 max-w-7xl mx-auto'>
                {/* first banner */}
                <div className='relative h-[250px]'>
                    <img 
                    src="https://images.pexels.com/photos/6051248/pexels-photo-6051248.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
                    alt="New Arrivals" 
                    className='w-full h-full object-cover rounded-lg shadow-lg' 
                    />
                    <div className='absolute inset-0  rounded-lg bg-opacity-50 flex flex-col items-center justify-center'>
                        <h2 className='text-white text-2xl font-bold'>New Campaigns</h2>
                       <button onClick={()=>{navigate('/campaigns')}} className='mt-2 px-3 py-1 bg-white text-green-800 rounded-md shadow hover:bg-gray-200'>Discover</button>
                    </div>
                </div>
                {/* second banner */}
                <div className='relative h-[250px]'>
                    <img 
                    src={controller} 
                    alt="New Arrivals" 
                    className='w-full h-full object-cover rounded-lg shadow-lg' 
                    />
                    <div className='absolute inset-0 rounded-lg bg-opacity-50 flex flex-col items-center justify-center'>
                        <h2 onClick={()=>{navigate('/campaigns')}} className='text-white text-2xl font-bold'>Ending soon</h2>
                    </div>
                </div>
                {/* third banner */}
                <div className='relative h-[250px] col-span-1 sm:col-span-2'>
                    <img 
                    src={together} 
                    alt="season sale" 
                    className='w-full h-full object-cover rounded-lg shadow-lg' 
                    />
                    <div className='absolute inset-0  bg-opacity-50 flex flex-col items-center rounded-lg justify-center'>
                        <h2 className='text-white text-4xl font-bold'>Products</h2>
                        <p className='text-white my-2 text-lg'>Up to 70% Off</p>
                        <button onClick={()=>{navigate('/products')}} className='text-white bg-yellow-600 px-3 py-2 hover:bg-yellow-500 rounded-md'>Shop Now</button>
                    </div>
                </div>
                {/* fourth banner */}
                <div className='relative h-[250px] col-span-1 sm:col-span-2'>
                    <img 
                    src="https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=600" alt="season sale" 
                    className='w-full h-full object-cover rounded-lg shadow-lg' 
                    />
                    <div className='absolute inset-0  bg-opacity-50 flex flex-col items-center rounded-lg justify-center'>
                        <h2 className='text-white text-4xl font-bold'>Popular</h2>
                        <p className='text-white my-2 text-lg'>Populated Campaigns</p>
                        <button onClick={()=>{navigate('/campaigns')}} className='text-white bg-red-500 px-3 py-2 hover:bg-red-600 rounded-md'>Shop Now</button>
                    </div>
                </div>
                {/* fifth banner */}
                <div className='relative h-[250px]'>
                    <img 
                    src={girl} 
                    alt="New Arrivals" 
                    className='w-full h-full object-cover rounded-lg shadow-lg' 
                    />
                    <div className='absolute inset-0  rounded-lg bg-opacity-50 flex flex-col items-center justify-center'>
                        <h2 onClick={()=>{navigate('/campaigns')}} className='text-white text-2xl font-bold'>Ending soon</h2>
                    </div>
                </div>
                {/* sixth banner */}
                <div className='relative h-[250px]'>
                    <img 
                    src="https://images.pexels.com/photos/4210857/pexels-photo-4210857.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="New Arrivals" 
                    className='w-full h-full object-cover rounded-lg shadow-lg' 
                    />
                    <div className='absolute inset-0 rounded-lg bg-opacity-50 flex flex-col items-center justify-center'>
                        <h2 className='text-white text-2xl font-bold'>New Arrivals</h2>
                        <button onClick={()=>{navigate('/products')}} className='mt-2 px-3 py-1 bg-white text-green-800 rounded-md shadow hover:bg-gray-200'>Discover</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MultiBanner
