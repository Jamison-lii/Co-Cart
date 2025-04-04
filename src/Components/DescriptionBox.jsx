import React from 'react';
import { useEffect, useState } from 'react';

const DescriptionBox = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Safely get product from localStorage
    try {
      const storedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
      if (storedProduct) {
        setProduct(storedProduct);
      }
    } catch (error) {
      console.error("Error parsing product data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="p-8">Loading description...</div>;
  if (!product) return <div className="p-8">No product data available</div>;

  return (
    <div className='px-6 md:px-0 my-8'>
      <div className='flex'>
        <div className='border border-gray-400 font-semibold p-4 bg-gray-100'>Description</div>
        <div className='border border-gray-400 font-semibold p-4'>Reviews (122)</div>
      </div>
      <div className='border border-gray-400 p-8'>
        <p>{product.product?.description || product.description || "No description available"}</p>
      </div>
    </div>
  );
};

export default DescriptionBox;