import React, { useState, useEffect } from "react";
import { useSearch } from "../Context/SearchContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user",user);
  const { selectedProd } = useSearch();

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

  const [message, setMessage] = useState("");

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      product_name: formData.product_name,
      product_description: formData.product_description,
      product_unit_price: formData.product_unit_price,
      product_bulk_price: formData.product_bulk_price,
      product_quantity: formData.product_quantity,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value || "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        console.log("invalid file type");
      }
      setFormData({
        ...formData,
        product_image: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting");
    if (
      !formData.campaignName ||
      !formData.start_date ||
      !formData.product_quantity ||
      !formData.end_date
    ) {
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
    <div className="flex items-center mt-15 justify-center min-h-screen bg-gray-100 px-6 md:px-0">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create a Group Buying Campaign
        </h2>
        {message && <p className="text-sm text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Product Name
            </label>
            <input
              type="text"
              name="product_name"
              placeholder="Product Name"
              value={formData.product_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
            />
          </div>

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

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          >
            Create Campaign
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateCampaign;