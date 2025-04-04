import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    address: "",
    phone_number: "",
    profile_pic: null,
  });

  // Toggle Password Visibility
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profile_pic: e.target.files[0] }));
  };

  // Validate Form Data
  const validateForm = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Invalid email format!";
    }
    if (!isLogin) {
      if (!/^6\d{8}$/.test(formData.phone_number)) {
        return "Phone number must start with 6 and be 9 digits long!";
      }
      if (formData.password !== formData.password_confirmation) {
        return "Passwords do not match!";
      }
    }
    return "";
  };

  // Handle Form Submission (Login/Register)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);

    if (!isLogin) {
      formDataToSend.append("name", formData.name);
      formDataToSend.append("password_confirmation", formData.password_confirmation);
      formDataToSend.append("phone_number", formData.phone_number);
      formDataToSend.append("address", formData.address);

      if (formData.profile_pic) {
        formDataToSend.append("profile_pic", formData.profile_pic);
      }
    }

    const url = isLogin
      ? "https://rrn24.techchantier.com/buy_together/public/api/login"
      : "https://rrn24.techchantier.com/buy_together/public/api/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.data.user));
        localStorage.setItem("token", data.data.token);
        toast.success("Success");
        navigate("/"); // Navigate to root for both login and register
      } else {
        setError(data.message || "Login failed");
        toast.error("Failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-25 bg-gray-100 px-6 md:px-0">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isLogin ? "Login to Your Account" : "Sign Up"}
        </h2>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6 mt-20">
          {/* Name Input (for Sign Up) */}
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
                required
              />
            </div>
          )}

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="items-center flex relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
                className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-red-300 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input (for Sign Up) */}
          {!isLogin && (
            <div>
              <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="Confirm Your Password"
                className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
                required
              />
            </div>
          )}

          {/* Address Input (for Sign Up) */}
          {!isLogin && (
            <div>
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-600">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Your Address"
                className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
                required
              />
            </div>
          )}

          {/* Phone Number Input (for Sign Up) */}
          {!isLogin && (
            <div>
              <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Enter Your Phone Number"
                className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
                required
                maxLength="9"
              />
            </div>
          )}

          {/* Profile Picture Input (for Sign Up) */}
          {!isLogin && (
            <div>
              <label htmlFor="profile_pic" className="block mb-2 text-sm font-medium text-gray-600">
                Profile Picture
              </label>
              <input
                type="file"
                id="profile_pic"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle between Login and Sign Up */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-red-500 hover:underline focus:outline-none"
            >
              {isLogin ? "Sign up here" : "Login here"}
            </button>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;