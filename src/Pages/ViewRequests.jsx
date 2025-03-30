import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Home, List, ClipboardList } from "lucide-react"; // Import icons

const ViewRequests = () => {
  const [activeTab, setActiveTab] = useState("approved");
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  
  const token = localStorage.getItem("token");
  const storedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

  useEffect(() => {
    if (storedProduct) {
      fetchMembers();
    }
  }, [storedProduct]);

  const fetchMembers = async () => {
    if (!storedProduct?.id) return;

    try {
      const response = await fetch(
        `https://rrn24.techchantier.com/buy_together/public/api/purchase-goals/${storedProduct.id}/participants`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch members");

      const data = await response.json();
      setMembers(data.data || []);
    } catch (error) {
      toast.error("Error fetching members. Try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(
        `https://rrn24.techchantier.com/buy_together/public/api/purchase-goals/${storedProduct.id}/approve/${id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to approve member");

      setMembers((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, status: "approved" } : m
        )
      );

      toast.success("Member approved!");
    } catch (error) {
      toast.error("Failed to approve member. Try again.");
    }
  };

  const handleDecline = async (id) => {
    try {
      const response = await fetch(
        `https://rrn24.techchantier.com/buy_together/public/api/purchase-goals/${storedProduct.id}/decline/${id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to decline member");

      setMembers((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, status: "declined" } : m
        )
      );

      toast.success("Member declined!");
    } catch (error) {
      toast.error("Failed to decline member. Try again.");
    }
  };

  const filteredMembers = members.filter((m) => m.status === activeTab);

  return (
    <div className="max-w-6xl mx-auto mt-40 p-6 pb-15 mb-20 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800">Manage Requests</h2>

      {/* Tabs */}
      <div className="flex space-x-4 mt-4 border-b pb-2">
        {["approved", "pending", "declined"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium ${
              activeTab === tab ? "border-b-2 border-red-500 text-red-600" : "text-gray-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div key={member.id} className="bg-gray-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.email}</p>
                <p className="text-sm text-gray-600">{member.phone_number}</p>

                {/* Status */}
                <span
                  className={`inline-block px-2 py-1 text-xs mt-2 rounded-full ${
                    member.status === "approved"
                      ? "bg-green-100 text-green-600"
                      : member.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {member.status}
                </span>

                {/* Actions */}
                {member.status === "pending" && (
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => handleApprove(member.id)}
                      className="px-3 py-1 text-white bg-green-500 rounded-md hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecline(member.id)}
                      className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No {activeTab} requests.</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default ViewRequests;
