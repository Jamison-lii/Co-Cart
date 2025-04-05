import { ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const Breadcrumb = () => {
  const { id } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    // Get product from localStorage
    const storedProduct = localStorage.getItem("selectedProduct");

    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
  }, [id]);

  if (!product) return null; // Don't render if no product is found

  return (
    <div className="flex items-center md:gap-2 gap-1 px-6 md:px-0 text-[#5e5e5e] font-semibold md:text-lg capitalize mt-4 text-sm">
      <Link to="/" className="hover:underline">HOME</Link>
      <ChevronRight />
      <div onClick={()=>{navigate(-1)}}  className="hover:underline">
        Back
      </div>
      <ChevronRight />
      <span className="text-gray-900">{product.title || "Product"}</span>
    </div>
  );
};

export default Breadcrumb;
