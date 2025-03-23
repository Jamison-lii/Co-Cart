import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../Context/SearchContext";
import Card from "../Components/Card";
import banner from "../assets/WomensBanner.png";
import { toast, ToastContainer } from "react-toastify";

const Campaigns = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { camp, setCamp } = useSearch();
  const [menu, setMenu] = useState("ForYou");

  // Fetch all campaigns
  const fetchPurchaseGoal = async () => {
    const url = `https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Purchase Goals:", data);
      setAllCampaigns(data.data);
    } catch (error) {
      console.error("Error fetching purchase goals:", error);
      setError("❌ Failed to load campaign details.");
    } finally {
      setLoading(false);
    }
  };

  // Handle campaign deletion
  const handleDelete = async () => {
    const Url = `https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals/${camp.id}`;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(Url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Campaign deleted successfully");
        console.log(data);
        // Refresh the campaigns list after deletion
        fetchPurchaseGoal();
        toast.success("Campaign deleted successfully!");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to delete campaign.");
    }
  };

  useEffect(() => {
    fetchPurchaseGoal();
  }, []);

  if (loading) return <p>Loading campaign details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="md:mt-32 mt-20 max-w-7xl mx-auto">
      {/* Banner */}
      <div>
        <img src={banner} alt="Women's Collection" className="w-screen px-6" />
      </div>

      {/* Campaigns Section */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:pt-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center md:text-start">
          Campaigns
        </h2>

        {/* Menu Tabs */}
        <div className="flex justify-center md:justify-start space-x-6 mt-6">
          <button
            onClick={() => setMenu("ForYou")}
            className={`text-lg font-medium ${
              menu === "ForYou" ? "text-red-500 border-b-2 border-red-500" : "text-gray-500"
            }`}
          >
            For You
          </button>
          <button
            onClick={() => setMenu("InProcess")}
            className={`text-lg font-medium ${
              menu === "InProcess" ? "text-red-500 border-b-2 border-red-500" : "text-gray-500"
            }`}
          >
            In Process
          </button>
          <button
            onClick={() => setMenu("MyCampaigns")}
            className={`text-lg font-medium ${
              menu === "MyCampaigns" ? "text-red-500 border-b-2 border-red-500" : "text-gray-500"
            }`}
          >
            My Campaigns
          </button>
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
                <Card
                  prop = {product}
                />
              </div>
            ))}

          {menu === "InProcess" && <div>In Process Campaigns Coming Soon...</div>}

          {menu === "MyCampaigns" &&
            allCampaigns.map((product) => {
              if (user.name === product.created_by?.name) {
                return (
                  <div key={product.id}>
                    <div
                      onClick={() => {
                        setCamp(product);
                        navigate(`/campaign/${product.id}`);
                      }}
                    >
                      <Card
                       prop = {product}
                      />
                    </div>
                    {/* Action Buttons for My Campaigns */}
                    <div className="flex justify-between mt-2">
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        onClick={() => {
                          setCamp(product);
                          localStorage.setItem("selectedProduct",JSON.stringify(product));
                          navigate(`/updateCampaign`);
                          
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        onClick={() => {
                          setCamp(product);
                          handleDelete();
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              } else {
                return null; // Skip rendering for campaigns not created by the user
              }
            })}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Campaigns;