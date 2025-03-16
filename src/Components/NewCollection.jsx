import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import { useSearch } from "../Context/SearchContext";

const NewCollection = () => {
  const { setCamp } = useSearch();
  const navigate = useNavigate();
  const [purchaseGoals, setPurchaseGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPurchaseGoals();
  }, []);

  const fetchPurchaseGoals = async () => {
    const url = "https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data.data)) {
        setPurchaseGoals(data.data);
      } else {
        throw new Error("Unexpected data format");
      }
    } catch (error) {
      setError("❌ Failed to load purchase goals.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading purchase goals...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:pt-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 text-center font-serif">
          Some Campaigns Below
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 px-6 md:px-0 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {purchaseGoals.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setCamp(p); // Store in context
                localStorage.setItem("selectedProduct", JSON.stringify(p)); // Store in localStorage
                navigate(`/campaign/${p.id}`); // Navigate to details page
              }}
            >
              <Card prop={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewCollection;
