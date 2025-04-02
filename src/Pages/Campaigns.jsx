import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../Context/SearchContext";
import Card from "../Components/Card";
import banner from "../assets/campBanner.jpg";
import { toast, ToastContainer } from "react-toastify";

const Campaigns = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorage.getItem("token");
  const { camp, setCamp } = useSearch();
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [menu, setMenu] = useState("ForYou");

  // Fetch all campaigns
  useEffect(() => {
    const fetchPurchaseGoals = async () => {
      try {
        const response = await fetch(
          "https://rrn24.techchantier.com/buy_together/public/api/purchase-goals"
        );

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setAllCampaigns(data.data);
      } catch (error) {
        setError("❌ Failed to load campaign details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseGoals();
  }, []);

  // Handle campaign deletion
  const handleDelete = async (campaignId) => {
    try {
      const response = await fetch(
        `https://rrn24.techchantier.com/buy_together/public/api/purchase-goals/${campaignId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        }
      );

      if (response.ok) {
        setAllCampaigns((prev) => prev.filter((campaign) => campaign.id !== campaignId));
        toast.success("Campaign deleted successfully!");
      } else {
        toast.error("Failed to delete campaign.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting.");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading campaign details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="md:mt-32 mt-20 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="relative w-full h-[300px] md:h-[400px]">
        <img src={banner} alt="Campaigns" className="w-full h-full object-cover rounded" />
        <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="text-3xl md:text-5xl font-bold mr-160">Join a Campaign Today!</h1>
          <p className="text-lg md:text-xl mr-160">Benefit from bulk purchases and save more.</p>
        </div>
      </div>

      {/* Campaigns Section */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:pt-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center md:text-start">
          Campaigns
        </h2>

        {/* Menu Tabs */}
        <div className="flex justify-center md:justify-start space-x-6 mt-6">
          {["ForYou", "InProcess", "MyCampaigns"].map((tab) => (
            <button
              key={tab}
              onClick={() => setMenu(tab)}
              className={`text-lg font-medium ${
                menu === tab ? "text-red-500 border-b-2 border-red-500" : "text-gray-500"
              }`}
            >
              {tab.replace(/([A-Z])/g, " $1").trim()}
            </button>
          ))}
        </div>

        {/* Campaign Cards */}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 px-6 md:px-0 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {menu === "ForYou" &&
            allCampaigns.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setCamp(product);
                  navigate(`/campaign/${product.id}`);
                }}
              >
                <Card prop={product} />
              </div>
            ))}

          {menu === "InProcess" && <div>In Process Campaigns Coming Soon...</div>}

          {menu === "MyCampaigns" &&
            allCampaigns
              .filter((product) => user.name === product.created_by?.name)
              .map((product) => (
                <div key={product.id}>
                  <div
                    onClick={() => {
                      setCamp(product);
                      navigate(`/campaign/${product.id}`);
                    }}
                  >
                    <Card prop={product} />
                  </div>
                  {/* Action Buttons for My Campaigns */}
                  <div className="flex justify-between mt-2">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      onClick={() => {
                        setCamp(product);
                        localStorage.setItem("selectedProduct", JSON.stringify(product));
                        navigate(`/updateCampaign`);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Campaigns;
