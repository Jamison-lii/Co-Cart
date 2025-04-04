import React from 'react';
import { ShoppingCart, Calendar, Users, DollarSign, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate();
  const [purchaseGoals, setPurchaseGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMyGoals();
  }, []);

  const fetchMyGoals = async () => {
    const url = `https://rrn24.techchantier.com/buy_together/public/api/user/purchase-goals`;
    
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { 
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
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
      setError("Failed to load purchase goals");
      toast.error("Failed to load your campaigns");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center py-20 text-gray-600">
      <p>{error}</p>
      <button 
        onClick={fetchMyGoals}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md text-sm"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Your Campaigns</h1>
          <p className="text-gray-500 mt-1">
            {purchaseGoals.length} {purchaseGoals.length === 1 ? 'campaign' : 'campaigns'}
          </p>
        </div>

        {purchaseGoals.length === 0 ? (
          <div className="text-center py-16 border border-gray-200 rounded-lg">
            <ShoppingCart className="mx-auto h-10 w-10 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No campaigns yet</h3>
            <p className="mt-1 text-gray-500">
              Join a campaign to see it here
            </p>
            <div className="mt-6">
              <Link
                to="/campaigns"
                className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600"
              >
                Browse Campaigns
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {purchaseGoals.map((campaign) => (
              <div 
                key={campaign.id} 
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
              >
                <div className="p-4 flex items-start">
                  <div className="flex-shrink-0 h-16 w-16 overflow-hidden rounded-md">
                    <img
                      src={campaign.product.image}
                      alt={campaign.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-medium text-gray-900">
                        {campaign.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        campaign.status === 'open' 
                          ? 'bg-green-50 text-green-700' 
                          : 'bg-gray-50 text-gray-700'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    
                    <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                      {campaign.description}
                    </p>
                    
                    <div className="mt-3 flex items-center text-xs text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <DollarSign className="h-3 w-3 mr-1 text-red-500" />
                        <span>FCFA {campaign.product.bulk_price}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1 text-red-500" />
                        <span>{campaign.amount_per_person ? `FCFA ${campaign.amount_per_person}/person` : 'Flexible'}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-red-500" />
                        <span>Ends {formatDate(campaign.end_date)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      localStorage.setItem("selectedProduct", JSON.stringify(campaign));
                      navigate(`/campaign/${campaign.id}`);
                    }}
                    className="ml-2 text-gray-400 hover:text-gray-500"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
                  <a
                    href={campaign.group_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-red-500 hover:text-red-600"
                  >
                    Join group chat →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;