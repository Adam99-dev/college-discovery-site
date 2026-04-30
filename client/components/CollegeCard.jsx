import {
  Star,
  MapPin,
  DollarSign,
  TrendingUp,
  Bookmark,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CollegeCard = ({
  college,
  isSaved = false,
  onSave,
}) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] =
    useState(false);

  // RANDOM IMAGE
  const imageUrl = `https://picsum.photos/id/${
    (college.id % 100) + 10
  }/600/300`;

  // SAVE / REMOVE
  const handleSave = async (e) => {
    e.stopPropagation();

    if (isLoading) return;

    setIsLoading(true);

    try {
      const url = isSaved
        ? import.meta.env.BACKEND_URL + "/api/saved_colleges/remove"
        : import.meta.env.BACKEND_URL + "/api/saved_colleges";

      const response = await fetch(url, {
        method: isSaved ? "DELETE" : "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          collegeId: college.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        onSave?.(college.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group">

      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden">

        <img
          src={imageUrl}
          alt={college.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://picsum.photos/id/1015/600/300";
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* RATING */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />

          <span className="font-bold text-gray-900">
            {college.rating}
          </span>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="absolute top-4 left-4 bg-white/90 hover:bg-white backdrop-blur-sm p-2 rounded-full shadow-md transition-all hover:scale-110 disabled:opacity-50"
        >
          <Bookmark
            className={`w-5 h-5 transition-all ${
              isSaved
                ? "fill-red-500 text-red-500"
                : "text-gray-700"
            }`}
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-5">

        {/* TITLE */}
        <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-2">
          {college.name}
        </h3>

        {/* LOCATION */}
        <div className="flex items-center gap-1.5 mt-2 text-gray-600">
          <MapPin className="w-4 h-4" />

          <span className="text-sm">
            {college.location}
          </span>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mt-6">

          {/* FEES */}
          <div className="text-center">

            <div className="flex items-center justify-center text-emerald-600">
              <DollarSign className="w-5 h-5" />
            </div>

            <span className="text-2xl font-bold text-gray-900 block">
              ₹
              {college.fees?.toLocaleString(
                "en-IN"
              )}
            </span>

            <p className="text-xs text-gray-500 mt-1">
              FEES/YEAR
            </p>
          </div>

          {/* PLACEMENTS */}
          <div className="text-center">

            <div className="flex items-center justify-center text-blue-600">
              <TrendingUp className="w-5 h-5" />
            </div>

            <span className="text-2xl font-bold text-gray-900 block">
              {college.placementPercentage}%
            </span>

            <p className="text-xs text-gray-500 mt-1">
              PLACEMENT
            </p>
          </div>

          {/* RATING */}
          <div className="text-center">

            <div className="flex items-center justify-center text-amber-600">
              <Star className="w-5 h-5" />
            </div>

            <span className="text-2xl font-bold text-gray-900 block">
              {college.rating} / 5
            </span>

            <p className="text-xs text-gray-500 mt-1">
              RATING
            </p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-5 text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {college.description}
        </p>

        {/* ACTION BUTTONS */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">

          <button
            onClick={() =>
              navigate(
                `/colleges/${college.id}`
              )
            }
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors text-sm"
          >
            View Details
          </button>

          <button className="flex-1 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl font-medium text-sm transition-colors">
            Compare
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;