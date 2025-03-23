import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import { useSearch } from "../Context/SearchContext";

const TopSellers = () => {
  const { setCamp } = useSearch();
  const navigate = useNavigate();

  const [purchaseGoals, setPurchaseGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPurchaseGoals();
  }, []);

  const fetchPurchaseGoals = async () => {
    const url =
      "https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals";

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
      console.log("Fetched Purchase Goals:", data); // Debugging log

      if (data && Array.isArray(data.data)) {
        setPurchaseGoals(data.data);
      } else {
        throw new Error("Unexpected data format");
      }
    } catch (error) {
      console.error("Error fetching purchase goals:", error);
      setError("❌ Failed to load purchase goals.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center text-lg">Loading top sellers...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:pt-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 text-center font-serif">
        Top Campaigns
      </h2>
      <p className="text-center mt-3 md:px-56">
        Discover our top campaigns, hand picked just for you
      </p>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 px-6 md:px-0 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {purchaseGoals.length > 0 ? (
          purchaseGoals.map((p) => {
            const imageUrl = p.product?.image || "/placeholder-image.jpg"; // Add fallback image
            return (
              <div
                key={p.id}
                onClick={() => {
                  console.log("Setting camp:", p);
                  setCamp(p);
                  navigate(`/campaign/${p.id}`);
                }}
              >
                <Card 
                  prop={p}
                />
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No top campaigns found.</p>
        )}
      </div>
    </div>
  );
};

export default TopSellers;
