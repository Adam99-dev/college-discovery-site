import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      localStorage.setItem("token", data.token);
      toast.success(data.message);

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row relative">
        
        {/* Close Button - Top Right */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-2 right-0 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Left Side */}
        <div className="hidden lg:flex lg:w-1/3 bg-orange-500 p-8 flex-col justify-between text-white">
          <div>
            <h2 className="text-2xl font-bold mb-2">Join CollegeDekho</h2>
            <p className="text-orange-100 text-sm">
              Create an account to access personalized guidance and resources.
            </p>
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-2 text-sm text-orange-100">
              <span className="h-px flex-1 bg-orange-200"></span>
              <span className="font-semibold">Start your journey</span>
              <span className="h-px flex-1 bg-orange-200"></span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:w-2/3 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex border-b border-gray-200">
              <button className="pb-2 px-4 cursor-pointer font-medium text-orange-600 border-b-2 border-orange-600">
                Sign Up
              </button>

              <button
                onClick={() => navigate("/login")}
                className="pb-2 cursor-pointer px-4 font-medium text-gray-500 hover:text-gray-700"
              >
                Login
              </button>
            </div>

            <button className="flex cursor-pointer items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-full text-sm font-medium transition w-full sm:w-auto">
              <img
                src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </div>

          {/* Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
              placeholder="johndoe@gmail.com"
            />
          </div>

          {/* Password */}
          <div className="relative mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition pr-10"
                placeholder="*********"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="text-orange-500 cursor-pointer" size={20} />
                ) : (
                  <Eye className="text-orange-500 cursor-pointer" size={20} />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2 mb-6">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 accent-orange-500"
              defaultChecked
            />
            <p className="text-xs text-gray-500 leading-relaxed">
              I agree to CollegeDekho's{" "}
              <a href="#" className="text-orange-600 hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-orange-600 hover:underline">
                Terms
              </a>
              , and consent to be contacted.
            </p>
          </div>

          {/* Register Button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl text-base transition active:scale-[0.98]"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="text-center mt-5 text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-600 font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;