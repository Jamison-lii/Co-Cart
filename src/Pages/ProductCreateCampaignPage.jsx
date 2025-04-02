import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProductCampaign = () => {
  const [message, setMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    campaignName: "",
    description: "",
    target_amount: "",
    amount_per_person: "",
    group_link: "",
    start_date: "",
    end_date: "",
    product_name: "",
    product_description: "",
    product_unit_price: "",
    product_bulk_price: "",
    product_quantity: "",
    product_image: null,
  });

  useEffect(() => {
    const prod = localStorage.getItem("prod");
    if (prod) {
      const parsedProduct = JSON.parse(prod);
      setSelectedProduct(parsedProduct);

      setFormData((prev) => ({
        ...prev,
        campaignName: parsedProduct.title || "",
        description: parsedProduct.description || "",
        target_amount: parsedProduct.target_amount || "",
        amount_per_person: parsedProduct.amount_per_person || "",
        group_link: parsedProduct.group_link || "",
        start_date: parsedProduct.start_date ? parsedProduct.start_date.split("T")[0] : "",
        end_date: parsedProduct.end_date ? parsedProduct.end_date.split("T")[0] : "",
        product_name: parsedProduct.name || "",
        product_description: parsedProduct.description || "",
        product_unit_price: parsedProduct.unit_price || "",
        product_bulk_price: parsedProduct.bulk_price || "",
        product_quantity: parsedProduct.quantity || "",
        product_image: parsedProduct.image || null,
      }));
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setFormData((prev) => ({ ...prev, product_image: file }));
    } else {
      toast.error("Invalid file type. Please upload a PNG or JPEG image.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((val) => val === "" || val === null)) {
      setMessage("⚠️ All fields are required!");
      return;
    }

    await createPurchaseGoal();
  };

  async function createPurchaseGoal() {
     const Url =
       "https://rrn24.techchantier.com/buy_together/public/api/purchase-goals";
     const token = localStorage.getItem("token");
 
     console.log("creating");
 
     if (!token) {
       setMessage("⚠️ User not authenticated. Please log in.");
       return;
     }
 
     const campaignData = new FormData();
     campaignData.append("title", formData.campaignName);
     campaignData.append("description", formData.description);
     campaignData.append("target_amount", formData.target_amount);
     campaignData.append("amount_per_person", formData.amount_per_person);
     campaignData.append("group_link", formData.group_link);
     campaignData.append("start_date", formData.start_date);
     campaignData.append("end_date", formData.end_date);
     campaignData.append("product_quantity", formData.product_quantity);
 
     if (formData.product_name)
       campaignData.append("product_name", formData.product_name);
     if (formData.product_description)
       campaignData.append("product_description", formData.product_description);
     if (formData.product_unit_price)
       campaignData.append("product_unit_price", formData.product_unit_price);
     if (formData.product_bulk_price)
       campaignData.append("product_bulk_price", formData.product_bulk_price);
 
     if (formData.product_image) {
       campaignData.append("product_image", formData.product_image);
     }
 
     campaignData.forEach((value, key) => {
       console.log(key, value);
     });
 
     try {
       const response = await fetch(Url, {
         method: "POST",
         headers: {
           Authorization: `Bearer ${token}`,
           Accept: "application/json",
         },
         body: campaignData,
       });
 
       const data = await response.json();
       console.log("API Response:", data);
 
       if (response.ok) {
         setMessage("✅ Campaign Created Successfully!");
         toast.success("Campaign Created Successfully!");
         setFormData({
           campaignName: "",
           description: "",
           target_amount: "",
           amount_per_person: "",
           group_link: "",
           start_date: "",
           end_date: "",
           product_name: "",
           product_description: "",
           product_unit_price: "",
           product_bulk_price: "",
           product_quantity: "",
           product_image: "",
         });
 
         navigate('/');
       } else {
         setMessage(data.message || "❌ Failed to create campaign.");
         toast.error("Failed to create campaign");
       }
     } catch (error) {
       console.error("Error:", error);
       setMessage("❌ Something went wrong. Try again.");
     }
   }
  return (
    <div className="flex items-center justify-center mt-10 min-h-screen bg-gray-100 px-6 md:px-0">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Update Campaign</h2>
        {message && <p className="text-sm text-center text-red-500">{message}</p>}
        {selectedProduct?.image && (
          <div className="flex justify-center">
            <img src={selectedProduct.image} alt="Product" className="w-32 h-32 object-cover rounded-lg" />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            key !== "product_image" && (
              <div key={key}>
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  {key.replace(/_/g, " ").toUpperCase()}
                </label>
                <input
                  type={key.includes("date") ? "date" : key.includes("amount") || key.includes("price") || key.includes("quantity") ? "number" : "text"}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
                />
              </div>
            )
          ))}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Product Image</label>
            <input
              type="file"
              accept=".jpeg,.png,.jpg"
              name="product_image"
              onChange={handleFileChange}
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300">
            Update Campaign
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateProductCampaign;
