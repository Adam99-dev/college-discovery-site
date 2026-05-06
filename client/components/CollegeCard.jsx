import {
  Star,
  MapPin,
  IndianRupee,
  TrendingUp,
  Bookmark,
  LandPlot,
  Calendar,
  Award,
  GitCompareArrows,
  CheckCircle,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import { useCompare } from "../context/CompareContext";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const CollegeCard = ({ college, isSaved = false, onSave }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const {
    compareIds,
    toggleCompare,
    removeCompare,
    maxReached = false,
    MAX_COMPARE_ITEMS = 3,
  } = useCompare();
  const { user } = useAuth();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const SAVE_URL = `${BACKEND_URL}/api/saved_colleges`;

  // Helper: Safe number display
  const formatNumber = (value, isLakhs = false) => {
    if (!value && value !== 0) return "NA";
    if (isLakhs) return value.toLocaleString("en-IN");
    return value.toLocaleString("en-IN");
  };

  // Helper: Safe percentage display
  const formatPercentage = (value) => {
    if (!value && value !== 0) return "NA";
    return `${value}%`;
  };

  // Helper: Safe area display
  const formatArea = (value) => {
    if (!value && value !== 0) return "NA";
    return `${value} Acre`;
  };

  const checkAuth = () => {
    if (!user) {
      // Show toast notification
      toast.warning(
        <div>
          Please login to save colleges
          <button
            onClick={() => navigate("/login")}
            className="ml-3 text-orange-500 font-semibold hover:underline"
          >
            Login Now
          </button>
        </div>,
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        },
      );
      return false;
    }
    return true;
  };

  const handleSave = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    // Auth check with toast
    if (!checkAuth()) return;
    if (isLoading) return;

    setIsLoading(true);

    // update UI
    const newSavedState = !isSaved;
    onSave?.(college.id, newSavedState);

    try {
      const response = await fetch(SAVE_URL, {
        method: isSaved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ collegeId: college.id }),
      });

      const data = await response.json();

      if (!data.success) {
        // Revert on failure
        onSave?.(college.id, isSaved);
        toast.error(data.message || "Failed to save college");
      } else {
        // Success toast
        toast.success(
          isSaved ? "Removed from saved colleges" : "Added to saved colleges",
          {
            position: "top-right",
            autoClose: 2000,
          },
        );
      }
    } catch (error) {
      // Revert on error
      onSave?.(college.id, isSaved);
      toast.error("Something went wrong. Please try again.");
      console.error("Save operation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompareToggle = (e) => {
    e.stopPropagation();

    // Add toast for compare when not logged in
    if (!user) {
      toast.warning(
        <div>
          Please login to compare colleges
          <button
            onClick={() => navigate("/login")}
            className="ml-3 text-orange-500 font-semibold hover:underline"
          >
            Login Now
          </button>
        </div>,
        {
          position: "top-right",
          autoClose: 4000,
        },
      );
      return;
    }

    if (isCompared) {
      // If already in compare, remove it
      removeCompare(college.id);
      toast.info(`${college.name} removed from comparison`, {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      // If not in compare, try to add it
      toggleCompare(college);
      toast.success(`${college.name} added to comparison`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const isCompared = compareIds.includes(college.id);
  const showCompareButton = location.pathname !== "/saved_colleges";
  const isCompareDisabled = !isCompared && maxReached;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 group">

      <div className="relative h-48 overflow-hidden">
        <img
          src={college.image || "/placeholder-college.jpg"}
          alt={college.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "/placeholder-college.jpg";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />


        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span className="font-bold text-gray-900">
            {college.rating || "N/A"}
          </span>
        </div>


        <button
          onClick={handleSave}
          disabled={isLoading}
          className="absolute top-4 left-4 bg-white/90 hover:bg-white backdrop-blur-sm p-2 rounded-full shadow-md transition-all hover:scale-110 disabled:opacity-50"
        >
          <Bookmark
            className={`w-5 h-5 transition-all ${
              isSaved ? "fill-red-500 text-red-500" : "text-gray-700"
            }`}
          />
        </button>


        {college.ranking && (
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
            <Award className="w-3 h-3 text-yellow-400" />
            <span className="text-xs font-semibold text-white">
              #{college.ranking} Rank
            </span>
          </div>
        )}


        {showCompareButton && isCompared && (
          <div className="absolute bottom-4 right-4 bg-orange-600 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-lg animate-pulse">
            <CheckCircle className="w-3 h-3 text-white" />
            <span className="text-xs font-semibold text-white">
              Added to Compare
            </span>
          </div>
        )}
      </div>


      <div className="p-5">
        {/* TITLE */}
        <h3 className="text-[15px] font-bold text-gray-900 leading-tight line-clamp-2">
          {college.name}
        </h3>

        {/* LOCATION & ESTABLISHED YEAR */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1.5 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">
              {college.city || "N/A"}, {college.state || "N/A"}
            </span>
          </div>

          {college.establishedYear && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-semibold">
                Est. {college.establishedYear}
              </span>
            </div>
          )}
        </div>


        <div className="grid grid-cols-3 gap-4 mt-6">

          <div className="text-center">
            <div className="flex items-center justify-center text-emerald-600">
              <IndianRupee className="w-5 h-5" />
            </div>
            <span className="text-[15px] font-bold text-gray-900 block">
              ₹{formatNumber(college.feesMin / 100000)} - ₹
              {formatNumber(college.feesMax / 100000)}
            </span>
            <p className="text-xs text-gray-500 mt-1">(Lakhs) Fees/Year</p>
          </div>


          <div className="text-center">
            <div className="flex items-center justify-center text-orange-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[15px] font-bold text-gray-900 block">
              {formatPercentage(college.placementPercentage)}
            </span>
            <p className="text-xs text-gray-500 mt-1">Placement</p>
          </div>


          <div className="text-center">
            <div className="flex items-center justify-center text-amber-600">
              <LandPlot className="w-5 h-5" />
            </div>
            <span className="text-[15px] font-bold text-gray-900 block">
              {formatArea(college.campusArea)}
            </span>
            <p className="text-xs text-gray-500 mt-1">Campus Area</p>
          </div>
        </div>


        {(college.averagePackage || college.highestPackage) && (
          <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
            {college.averagePackage && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Avg Package:</span>
                <span className="text-sm font-semibold text-gray-900">
                  ₹{formatNumber(college.averagePackage, true)} LPA
                </span>
              </div>
            )}

            {college.highestPackage && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Highest Package:</span>
                <span className="text-sm font-semibold text-green-600">
                  ₹{formatNumber(college.highestPackage, true)} LPA
                </span>
              </div>
            )}
          </div>
        )}


        <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">
          <button
            onClick={() => navigate(`/colleges/${college.slug}`)}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-medium transition-colors text-sm"
          >
            View Details
          </button>

          {showCompareButton && (
            <button
              onClick={handleCompareToggle}
              disabled={isCompareDisabled}
              className={`
                flex-1 
                py-2.5 sm:py-3 
                px-2 sm:px-0
                rounded-lg sm:rounded-xl 
                font-medium 
                text-xs sm:text-sm 
                transition-all duration-300
                flex items-center justify-center gap-2
                ${
                  isCompared
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-md"
                    : "border-2 border-gray-300 bg-white text-gray-700 hover:border-orange-400 hover:bg-orange-50"
                }
                disabled:opacity-50 disabled:cursor-not-allowed
                transform hover:scale-[1.02] active:scale-[0.98]
              `}
            >
              {isCompared ? (
                <>
                  <X className="w-4 h-4" />
                  <span>Remove</span>
                </>
              ) : isCompareDisabled ? (
                <>
                  <GitCompareArrows className="w-4 h-4" />
                  <span>Max ({MAX_COMPARE_ITEMS})</span>
                </>
              ) : (
                <>
                  <GitCompareArrows className="w-4 h-4" />
                  <span>Compare</span>
                </>
              )}
            </button>
          )}
        </div>

        {isCompareDisabled && !isCompared && (
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-400">
              You can compare up to {MAX_COMPARE_ITEMS} colleges
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeCard;
