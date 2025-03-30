import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const UpdateCampaign = () => {
  const [message, setMessage] = useState("");
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

  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch selectedProduct from localStorage and populate form data
  useEffect(() => {
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    setSelectedProduct(selectedProduct);

    if (selectedProduct) {
      const startDate = selectedProduct.start_date
        ? selectedProduct.start_date.split("T")[0]
        : "";
      const endDate = selectedProduct.end_date
        ? selectedProduct.end_date.split("T")[0]
        : "";

      setFormData((prev) => ({
        ...prev,
        campaignName: selectedProduct.title || "",
        description: selectedProduct.description || "",
        target_amount: selectedProduct.target_amount || "",
        amount_per_person: selectedProduct.amount_per_person || "",
        group_link: selectedProduct.group_link || "",
        start_date: startDate || "",
        end_date: endDate || "",
        product_name: selectedProduct.product?.name || "",
        product_description: selectedProduct.product?.description || "",
        product_unit_price: selectedProduct.product?.unit_price || "",
        product_bulk_price: selectedProduct.product?.bulk_price || "",
        product_quantity: selectedProduct.product?.quantity || "",
        product_image: selectedProduct.product?.image || null,
      }));
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        console.log("invalid file type");
      }
      setFormData((prev) => ({
        ...prev,
        product_image: file,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value || "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting");

    if (
      !formData.campaignName ||
      !formData.start_date ||
      !formData.product_quantity ||
      !formData.end_date ||
      !formData.description ||
      !formData.target_amount ||
      !formData.amount_per_person ||
      !formData.product_name ||
      !formData.product_description ||
      !formData.product_unit_price ||
      !formData.product_bulk_price ||
      !formData.product_quantity ||
      !formData.product_image
    ) {
      setMessage("⚠️ All fields are required!");
      return;
    }

    await updatePurchaseGoal();
  };

  // Update purchase goal
  async function updatePurchaseGoal() {
    const Url = `https://rrn24.techchantier.com/buy_together/public/api/purchase-goals/${selectedProduct.id}`;
    const token = localStorage.getItem("token");

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

    try {
      const response = await fetch(Url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: campaignData,
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        setMessage("✅ Campaign Updated Successfully!");
        toast.success("Campaign updated successfully!");
      } else {
        setMessage(data.message || "❌ Failed to update campaign.");
        toast.error("Failed to update campaign.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Something went wrong. Try again.");
      toast.error("Something went wrong. Try again.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6 md:px-0">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Update Campaign</h2>
        {message && <p className="text-sm text-center text-red-500">{message}</p>}

        {/* Product Image */}
        {selectedProduct?.product?.image && (
          <div className="flex justify-center">
            <img
              src={selectedProduct.product.image}
              alt="Product"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campaign Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Campaign Name
            </label>
            <input
              type="text"
              name="campaignName"
              placeholder="Campaign Name"
              value={formData.campaignName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
            />
          </div>

          {/* Campaign Description */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Campaign Description
            </label>
            <textarea
              name="description"
              placeholder="Campaign Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Product Name
            </label>
            <input
              name="product_name"
              placeholder="Product Name"
              value={formData.product_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Product Description
            </label>
            <textarea
              name="product_description"
              placeholder="Product Description"
              value={formData.product_description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
            />
          </div>

          {/* Unit Price */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Unit Price
            </label>
            <input
              type="number"
              name="product_unit_price"
              placeholder="Unit Price"
              value={formData.product_unit_price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
            />
          </div>

          {/* Bulk Price */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Bulk Price
            </label>
            <input
              type="number"
              name="product_bulk_price"
              placeholder="Bulk Price"
              value={formData.product_bulk_price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
            />
          </div>

          {/* Total Amount */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Total Amount
            </label>
            <input
              type="number"
              name="target_amount"
              placeholder="Total Amount"
              value={formData.target_amount}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
            />
          </div>

          {/* Amount Per Person */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Amount Per Person
            </label>
            <input
              type="number"
              name="amount_per_person"
              placeholder="Amount Per Person"
              value={formData.amount_per_person}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
            />
          </div>

          {/* Product Quantity */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Product Quantity
            </label>
            <input
              type="number"
              name="product_quantity"
              placeholder="Product Quantity"
              value={formData.product_quantity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
            />
          </div>

          {/* Group Link */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Group Link
            </label>
            <input
              type="text"
              name="group_link"
              placeholder="Group Link"
              value={formData.group_link}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Start Date
            </label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              End Date
            </label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
            />
          </div>

          {/* Product Image Upload */}   
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Product Image
            </label>
            <input
              type="file"
              accept=".jpeg,.png,.jpg"
              name="product_image"
              onChange={handleFileChange}
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          >
            Update Campaign
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UpdateCampaign;