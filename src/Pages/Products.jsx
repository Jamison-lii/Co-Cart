import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import wig from '../assets/wig.jpg'
import blender from '../assets/blender.jpg'
import iphone from '../assets/iphone.jpg'

const products = [
  {
    id: 1,
    name: "Brazilian Wig",
    description: "High-quality 100% human hair wig, perfect for all occasions.",
    unit_price: "25000",
    bulk_price: "20000",
    quantity: 15,
    image: `${wig}`,
  },
  {
    id: 2,
    name: "High-Speed Blender",
    description: "Durable blender for all your kitchen needs.",
    unit_price: "18000",
    bulk_price: "15000",
    quantity: 10,
    image: `${blender}`
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max",
    description: "Latest Apple smartphone with advanced features.",
    unit_price: "950000",
    bulk_price: "900000",
    quantity: 5,
    image: `${iphone}`
  },
];

const ProductCard = ({ product, onSelect }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-105"
      onClick={() => onSelect(product)}
    >
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
        <p className="text-gray-600 text-sm mt-2">{product.description}</p>
        <div className="mt-4">
          <span className="block text-gray-800 font-semibold">Unit Price: {product.unit_price} FCFA</span>
          <span className="block text-gray-800 font-semibold">Bulk Price: {product.bulk_price} FCFA</span>
        </div>
        <Link to="/createprodcamp">
          <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full font-semibold transition-opacity hover:opacity-90">
            Create Campaign
          </button>
        </Link>
      </div>
    </div>
  );
};

const ProductPage = () => {
  const navigate = useNavigate();

  const handleOnClick = (product) => {
    console.log("Selected Product:", product);
    localStorage.setItem("prod", JSON.stringify(product));
    navigate("/createprodcamp");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 mt-20">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Group Buy Products in Cameroon
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onSelect={handleOnClick} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
