import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LogOut, Edit, User, Mail, Phone, MapPin } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/auth");
      return;
    }

    try {
      const response = await fetch("https://rrn24.techchantier.com/buy_together/public/api/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.success("Successfully logged out");
        navigate("/");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-red-500 h-32 w-full"></div>
          
          <div className="px-6 py-4 relative">
            <div className="absolute -top-16 left-6">
              <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
                {user.profile_pic ? (
                  <img 
                    src={user.profile_pic} 
                    alt="Profile" 
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <User className="h-16 w-16 text-gray-400" />
                )}
              </div>
            </div>
            
            <div className="ml-40">
              <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
            <button 
              onClick={() => navigate('/edit-profile')}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <Edit className="w-5 h-5 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>
        
        {/* Profile Details */}
        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Personal Information</h2>
          </div>
          
          <div className="px-6 py-4 space-y-4">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-500 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-500 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-800">{user.phone_number || 'Not provided'}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-500 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-gray-800">{user.address || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Logout Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;