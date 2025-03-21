import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


const ProductDisplay = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [person, setPerson] = useState(null);
  

  // Fetch user data from localStorage inside useEffect
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setPerson(JSON.parse(user));
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProduct");

    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
      setLoading(false);
    } else {
      fetchProductDetails();
    }
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        `https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }

      const data = await response.json();
      setProduct(data);
      localStorage.setItem("selectedProduct", JSON.stringify(data)); // Store in localStorage
    } catch (error) {
      setError("Error fetching product details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;


  const handleStatus = async () => {
    const Url = `https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals/${campaignData.data.id}/change-status`;
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
      } else {
        toast.error("Error on changing campaign status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  return (
    <div className="grid grid-cols-1 md:grid-cols-2 my-20 md:gap-10 px-6 md:px-0">
      {console.log("person:", person)}
      {console.log("product", product)}
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
            ${product.product?.bulk_price}
          </div>
          <div className="text-red-500 text-3xl">
            ${product.product?.unit_price}
          </div>
        </div>

        <div className="">
          {product.description ||
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam dolore voluptatem nesciunt facere totam suscipit illum laboriosam nulla, corporis amet consequuntur, fugiat modi voluptate libero"}
        </div>

        <div>
          <h1 className="font-semibold text-gray-400 text-2xl mt-4">
            Select Size
          </h1>
          <div className="flex gap-4 items-center my-4">
            <div className="border bg-gray-100 p-4">S</div>
            <div className="border bg-gray-100 p-4">M</div>
            <div className="border bg-gray-100 p-4">L</div>
            <div className="border bg-gray-100 p-4">XL</div>
            <div className="border bg-gray-100 p-4">XXL</div>
          </div>
        </div>



        {person.id === product.created_by.id ? (
          <>
          <Link to='/viewRequests'>
            <button  className="bg-red-500 text-white px-6 py-3 my-4 w-max">
              View Requests
            </button>
            </Link>
            {product.status === "open" ? (
              <button onClick={handleStatus} className="bg-red-500 text-white px-6 py-3 my-4 w-max">
                Close Campaign
              </button>
            ) : (
              <button onClick={handleStatus} className="bg-red-500 text-white px-6 py-3 my-4 w-max">
                Open Campaign
              </button>
            )}
          </>
        ) : (
          <Link to="/cart">
          <button className="bg-red-500 text-white px-6 py-3 my-4 w-max">
            JOIN CAMPAIGN
          </button>
        </Link>
        )}





       
        <p>
          <span className="font-semibold">Category:</span> Women, T-shirt, Crop
          top
        </p>
        <p>
          <span className="font-semibold">Tags:</span> Modern, Latest
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ProductDisplay;