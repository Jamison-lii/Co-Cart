import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useSearch } from "../Context/SearchContext";

const ViewRequests = () => {
  const [activeTab, setActiveTab] = useState("approved"); // Default tab for View Requests
  const [loading, setLoading] = useState(true); // Loading state
  const [members, setMembers] = useState([]); // State to store members
  const [selectedSidebarItem, setSelectedSidebarItem] = useState("Dashboard"); // State to track selected sidebar item
  const { camp } = useSearch();
  const token = localStorage.getItem("token");
  const storedProduct = localStorage.getItem("selectedProduct");

  // Fetch members from the API
  useEffect(() => {
    if (storedProduct && selectedSidebarItem === "View Requests") {
      display();
    }
  }, [storedProduct, selectedSidebarItem]);

  const display = async () => {
    const url = `https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals/${storedProduct.id}/participants`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }

      const data = await response.json();
      setMembers(data.data); // Update members state with fetched data
    } catch (error) {
      console.error("Error fetching purchase goal:", error);
      toast.error("Failed to fetch members. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Function to handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Function to approve a pending member
  const handleApprove = async (id) => {
    try {
      const response = await fetch(
        `https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals/${storedProduct.id}/approve/${id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to approve member");
      }

      // Update the local state to reflect the change
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === id ? { ...member, status: "approved" } : member
        )
      );

      toast.success("Member approved successfully!");
    } catch (error) {
      console.error("Error approving member:", error);
      toast.error("Failed to approve member. Please try again.");
    }
  };

  // Function to decline a pending member
  const handleDecline = async (id) => {
    try {
      const response = await fetch(
        `https://rrn24.techchantier.site/buy-together-api/public/api/purchase-goals/${storedProduct.id}/decline/${id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to decline member");
      }

      // Update the local state to reflect the change
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === id ? { ...member, status: "declined" } : member
        )
      );

      toast.success("Member declined successfully!");
    } catch (error) {
      console.error("Error declining member:", error);
      toast.error("Failed to decline member. Please try again.");
    }
  };

  // Filter members based on the active tab
  const filteredMembers = members.filter((member) => member.status === activeTab);

  if (loading && selectedSidebarItem === "View Requests") {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Render content based on the selected sidebar item
  const renderContent = () => {
    switch (selectedSidebarItem) {
      case "Dashboard":
        return <div className="mt-28">Welcome to the Dashboard!</div>;
      case "View Requests":
        return (
          <div className="mt-28">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Members</h2>
            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "approved"
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-700 hover:bg-red-50"
                }`}
                onClick={() => handleTabChange("approved")}
              >
                Approved
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "pending"
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-700 hover:bg-red-50"
                }`}
                onClick={() => handleTabChange("pending")}
              >
                Pending
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "declined"
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-700 hover:bg-red-50"
                }`}
                onClick={() => handleTabChange("declined")}
              >
                Declined
              </button>
            </div>

            {/* Members List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {member.name}
                      </h3>
                      <span
                        className={`px-2 py-1 text-sm rounded-full ${
                          member.status === "approved"
                            ? "bg-green-100 text-green-600"
                            : member.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {member.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-600">
                      <p>
                        <strong>Email:</strong> {member.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {member.phone_number}
                      </p>
                      <p>
                        <strong>Address:</strong> {member.address}
                      </p>
                      <p>
                        <strong>Joined At:</strong> {member.joined_at}
                      </p>
                    </div>
                    {member.status === "pending" && (
                      <div className="flex space-x-2 mt-4">
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                          onClick={() => handleApprove(member.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          onClick={() => handleDecline(member.id)}
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No members found.</p>
              )}
            </div>
          </div>
        );
      case "Campaigns":
        return <div>Campaigns Content Here</div>;
      default:
        return <div>Select an item from the sidebar</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 ">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-6 mt-28">Dashboard</h2>
        <nav>
          <button
            onClick={() => setSelectedSidebarItem("Dashboard")}
            className={`block w-full text-left py-2 px-4 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg ${
              selectedSidebarItem === "Dashboard" ? "bg-red-50 text-red-600" : ""
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setSelectedSidebarItem("View Requests")}
            className={`block w-full text-left py-2 px-4 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg ${
              selectedSidebarItem === "View Requests" ? "bg-red-50 text-red-600" : ""
            }`}
          >
            View Requests
          </button>
          <button
            onClick={() => setSelectedSidebarItem("Campaigns")}
            className={`block w-full text-left py-2 px-4 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg ${
              selectedSidebarItem === "Campaigns" ? "bg-red-50 text-red-600" : ""
            }`}
          >
            Campaigns
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{renderContent()}</div>

      <ToastContainer />
    </div>
  );
};

export default ViewRequests;