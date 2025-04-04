import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ProductDisplay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // First try to get from localStorage
    const storedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    if (storedProduct && storedProduct.id == id) {
      setProduct(storedProduct);
      setLoading(false);
    } else {
      // Fallback to API if not in localStorage
      fetchProductDetails();
    }
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        `https://rrn24.techchantier.com/buy_together/public/api/purchase-goals/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }

      const data = await response.json();
      setProduct(data);
      localStorage.setItem("selectedProduct", JSON.stringify(data));
    } catch (error) {
      setError("Error fetching product details");
      toast.error("Failed to load product details");
      navigate("/campaigns");
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async () => {
    if (!product) return;
    
    const Url = `https://rrn24.techchantier.com/buy_together/public/api/purchase-goals/${product.id}/change-status`;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(Url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Status changed successfully");
        const updatedProduct = {
          ...product,
          status: product.status === "open" ? "closed" : "open"
        };
        setProduct(updatedProduct);
        localStorage.setItem("selectedProduct", JSON.stringify(updatedProduct));
      } else {
        toast.error(data.message || "Error changing campaign status");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to change status");
    }
  };

  const handleJoinCampaign = async () => {
    if (!product) return;
    
    const token = localStorage.getItem("token");
    const today = new Date();
    const endDate = new Date(product.end_date);

    if (today > endDate) {
      toast.error("Sorry, this campaign has ended");
      return;
    }

    try {
      const response = await fetch(
        `https://rrn24.techchantier.com/buy_together/public/api/purchase-goals/${product.id}/join`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Successfully joined the campaign!");
        // Store the product and navigate to cart
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        navigate("/cart");
      } else {
        toast.error(data.message || "Failed to join campaign");
      }
    } catch (error) {
      console.error("Error joining campaign:", error);
      toast.error("Failed to join campaign");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center py-20 text-red-500">
      <p>{error}</p>
      <button 
        onClick={() => navigate("/campaigns")}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Back to Campaigns
      </button>
    </div>
  );

  if (!product) return (
    <div className="text-center py-20">
      <p>Product not found</p>
      <button 
        onClick={() => navigate("/campaigns")}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Back to Campaigns
      </button>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 my-20 md:gap-10 px-6 md:px-0">
      {/* Large Product Image */}
      <div className="flex justify-center">
        <img
          src={product.product?.image}
          alt={product.title}
          className="w-full max-w-lg h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col mt-8 md:mt-0">
        <h1 className="text-[#3d3d3d] text-4xl font-bold">{product.title}</h1>
        <div className="flex items-center gap-1 text-[#1c1c1c] text-lg mt-4">
          <Star fill="red" />
          <Star fill="red" />
          <Star fill="red" />
          <Star fill="red" />
          <Star fill="gray" />
          <p>(122)</p>
        </div>

        <div className="flex gap-5 font-semibold items-center my-5">
          <div className="text-gray-500 text-2xl line-through">
            FCFA{product.product?.unit_price}
          </div>
          <div className="text-red-500 text-3xl">
            FCFA{product.product?.bulk_price}
          </div>
        </div>

        <div className="text-gray-700">
          {product.description}
        </div>

        <div>
          <h1 className="font-semibold text-gray-400 text-2xl mt-4">
            Select Size
          </h1>
          <div className="flex gap-4 items-center my-4">
            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
              <div key={size} className="border bg-gray-100 p-4 hover:bg-gray-200 cursor-pointer">
                {size}
              </div>
            ))}
          </div>
        </div>

        {user?.id === product.created_by?.id ? (
          <>
            <Link to='/viewRequests'>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 my-4 w-max transition-colors">
                View Requests
              </button>
            </Link>
            <button 
              onClick={handleStatus} 
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 my-4 w-max transition-colors"
            >
              {product.status === "open" ? "Close Campaign" : "Open Campaign"}
            </button>
          </>
        ) : (
          <button
            onClick={handleJoinCampaign}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 my-4 w-max transition-colors"
          >
            JOIN CAMPAIGN
          </button>
        )}

        <div className="mt-4">
          <p className="text-gray-700">
            <span className="font-semibold">Category:</span> Women, T-shirt, Crop top
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Tags:</span> Modern, Latest
          </p>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default ProductDisplay;