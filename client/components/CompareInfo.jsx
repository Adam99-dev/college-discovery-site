// CompareInfo.jsx
import { MapPin, Star, Calendar, Award, X, BadgePlus } from "lucide-react";
import { useState } from "react";
import { useCompare } from "../context/CompareContext";
import CollegeListPopup from "./CollegeListPopup";

const CompareInfo = ({ college, index, totalColleges }) => {
  const { removeCompare } = useCompare();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const isAddMoreCard = !college || college?.id === "add-more";

  // Color scheme based on position
  const getCardStyles = (idx) => {
    const scheme = idx % 3;
    if (scheme === 0) {
      return {
        cardBg: "bg-orange-50",
        accent: "from-orange-600 to-orange-500",
        badgeBorder: "border-orange-200",
      };
    }
    if (scheme === 1) {
      return {
        cardBg: "bg-blue-50",
        accent: "from-blue-600 to-blue-500",
        badgeBorder: "border-blue-200",
      };
    }
    return {
      cardBg: "bg-emerald-50",
      accent: "from-emerald-600 to-emerald-500",
      badgeBorder: "border-emerald-200",
    };
  };

  const styles = getCardStyles(index);

  const handleRemove = (e) => {
    e.stopPropagation();
    if (college?.id && college.id !== "add-more") {
      removeCompare(college.id);
    }
  };

  const handleAddMoreClick = () => setIsPopupOpen(true);
  const handlePopupClose = () => setIsPopupOpen(false);
  const handleCollegeAdded = () => setIsPopupOpen(false);


  if (isAddMoreCard) {
    if (totalColleges >= 3) return null;

    return (
      <>
        <div
          onClick={handleAddMoreClick}
          className="h-full min-h-[420px] bg-gray-100 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 hover:border-orange-400 group flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer hover:shadow-xl"
        >
          <div className="bg-white rounded-full p-6 mb-4 shadow-sm group-hover:scale-110 transition-transform">
            <BadgePlus className="w-14 h-14 text-gray-400 group-hover:text-orange-500 transition-colors" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">
            Add More Colleges
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {3 - totalColleges} slot{3 - totalColleges !== 1 ? "s" : ""}{" "}
            remaining
          </p>
        </div>

        <CollegeListPopup
          isOpen={isPopupOpen}
          onClose={handlePopupClose}
          onAddCollege={handleCollegeAdded}
        />
      </>
    );
  }

  return (
    <div
      className={`h-full min-h-[420px] ${styles.cardBg} rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col relative group`}
    >
      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white backdrop-blur-sm p-2 rounded-full shadow-md transition-all hover:scale-110 active:scale-95"
      >
        <X className="w-5 h-5 text-gray-700 hover:text-red-500" />
      </button>


      <div className="relative h-52 overflow-hidden bg-gray-200 flex-shrink-0">
        <img
          src={college.image || "/placeholder-college.jpg"}
          alt={college.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "/placeholder-college.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />


        <div
          className={`absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md border ${styles.badgeBorder}`}
        >
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span className="font-bold text-gray-900">
            {college.rating || "N/A"}
          </span>
        </div>


        {college.ranking && (
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-xs font-semibold text-white">
            <Award className="w-3.5 h-3.5 text-yellow-400" />#{college.ranking}{" "}
            Rank
          </div>
        )}


        <div
          className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${styles.accent}`}
        />
      </div>


      <div className="flex-1 flex flex-col p-5 min-h-0">

        <h3 className="font-bold text-[17px] leading-tight text-gray-900 line-clamp-2 mb-3 min-h-[42px]">
          {college.name}
        </h3>


        <div className="flex items-center justify-between text-sm text-gray-600 mt-auto">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">
              {college.city || "N/A"}, {college.state || ""}
            </span>
          </div>

          {college.establishedYear && (
            <div className="flex items-center gap-1.5 flex-shrink-0 ml-3">
              <Calendar className="w-4 h-4" />
              <span>Est. {college.establishedYear}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareInfo;
