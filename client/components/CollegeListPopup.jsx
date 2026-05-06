// CollegeListPopup.jsx
import React, { useState, useEffect } from "react";
import { useCompare } from "../context/CompareContext.jsx";
import CollegeListPopupSkeleton from "../skeletons/CollegeListPopup.s.jsx";

const CollegeListPopup = ({ isOpen, onClose, onAddCollege }) => {
  const { toggleCompare, isInCompare, compareIds, MAX_COMPARE_ITEMS } =
    useCompare();
  const [colleges, setColleges] = useState([]);
  const [allColleges, setAllColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState(""); // Temporary input state
  const [addingCollegeId, setAddingCollegeId] = useState(null);
  const [removingCollegeId, setRemovingCollegeId] = useState(null);

  // Fetch initial colleges
  const fetchColleges = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + `/api/colleges?page=1&limit=20`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      let collegesArray = [];
      if (Array.isArray(data)) {
        collegesArray = data;
      } else if (data.colleges && Array.isArray(data.colleges)) {
        collegesArray = data.colleges;
      } else if (data.data && Array.isArray(data.data)) {
        collegesArray = data.data;
      } else if (data.items && Array.isArray(data.items)) {
        collegesArray = data.items;
      }

      setAllColleges(collegesArray);
      setColleges(collegesArray);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Search colleges
  const searchColleges = async () => {
    const query = searchInput.trim();
    setSearchQuery(query);

    if (!query) {
      setColleges(allColleges);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL +
          `/api/colleges?search=${encodeURIComponent(query)}&limit=20`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      let searchResults = [];
      if (Array.isArray(data)) {
        searchResults = data;
      } else if (data.colleges && Array.isArray(data.colleges)) {
        searchResults = data.colleges;
      } else if (data.data && Array.isArray(data.data)) {
        searchResults = data.data;
      } else if (data.items && Array.isArray(data.items)) {
        searchResults = data.items;
      }

      setColleges(searchResults);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchColleges();
    }
  };

  // Handle reset/clear search
  const clearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
    setColleges(allColleges);
  };

  // Handle add/toggle 
  const handleToggleCollege = async (college) => {
    const isSelected = isInCompare(college.id);

    if (isSelected) {
      setRemovingCollegeId(college.id);
    } else {
      if (compareIds.length >= MAX_COMPARE_ITEMS) {
        alert(
          `You can only compare up to ${MAX_COMPARE_ITEMS} colleges at a time.`,
        );
        return;
      }
      setAddingCollegeId(college.id);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      toggleCompare(college);

      if (!isSelected && onAddCollege) {
        onAddCollege(college);
      }

      if (!isSelected && compareIds.length + 1 >= MAX_COMPARE_ITEMS) {
        setTimeout(() => {
          onClose();
        }, 500);
      }
    } catch (error) {
      console.error("Error toggling college:", error);
      alert("Failed to update comparison. Please try again.");
    } finally {
      setAddingCollegeId(null);
      setRemovingCollegeId(null);
    }
  };



  useEffect(() => {
    if (isOpen) {
      fetchColleges();
      setSearchInput("");
      setSearchQuery("");
      return () => {
        setAddingCollegeId(null);
        setRemovingCollegeId(null);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Select Colleges to Compare
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {compareIds.length >= MAX_COMPARE_ITEMS
                  ? "Maximum colleges selected"
                  : `${MAX_COMPARE_ITEMS - compareIds.length} slot${MAX_COMPARE_ITEMS - compareIds.length !== 1 ? "s" : ""} remaining`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-50 rounded-full"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-5 border-b border-gray-100">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search colleges..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-gray-50/50"
                disabled={loading}
              />
              <button
                onClick={searchColleges}
                disabled={loading}
                className="px-6 py-3 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition-all font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search
              </button>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="px-4 py-3 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-all font-medium"
                >
                  Clear
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-xs text-gray-500 mt-2">
                Showing results for: "{searchQuery}"
              </p>
            )}
          </div>

          <div className="px-5 py-3 text-sm bg-gray-50/30 border-b border-gray-100">
            {!loading && colleges.length > 0 && (
              <span className="text-gray-500">
                Showing {colleges.length} college
                {colleges.length !== 1 ? "s" : ""}
              </span>
            )}
            {compareIds.length > 0 && (
              <span className="ml-4 text-orange-600 font-medium">
                Selected: {compareIds.length}/{MAX_COMPARE_ITEMS}
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {loading ? (
              <CollegeListPopupSkeleton />
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-400 mb-3 text-sm">Error: {error}</div>
                <button
                  onClick={fetchColleges}
                  className="px-6 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all shadow-sm hover:shadow-md"
                >
                  Retry
                </button>
              </div>
            ) : colleges.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-sm">
                  No colleges found matching your search.
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {colleges.map((college) => {
                  const isSelected = isInCompare(college.id);
                  const isMaxReached =
                    compareIds.length >= MAX_COMPARE_ITEMS && !isSelected;
                  const isAdding = addingCollegeId === college.id;
                  const isRemoving = removingCollegeId === college.id;
                  const isProcessing = isAdding || isRemoving;

                  return (
                    <div
                      key={college.id}
                      className={`p-4 rounded-2xl transition-all duration-200 ${
                        isSelected
                          ? "bg-orange-50/80 border-2 border-orange-200"
                          : "bg-white border border-gray-100 hover:border-orange-200 hover:shadow-md"
                      } ${isProcessing ? "opacity-60" : ""}`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg mb-1">
                            {college.name}
                          </h3>
                          {college.location && (
                            <p className="text-gray-500 text-sm mb-1">
                              {college.location}
                            </p>
                          )}
                          {college.type && (
                            <p className="text-gray-400 text-xs">
                              {college.type}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleToggleCollege(college)}
                          disabled={isMaxReached || isProcessing}
                          className={`
                            px-5 py-2.5 rounded-xl font-medium transition-all min-w-[130px] flex items-center justify-center gap-2 shadow-sm
                            ${
                              isSelected
                                ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                : isMaxReached
                                  ? "bg-gray-100 cursor-not-allowed text-gray-400"
                                  : "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20"
                            }
                            ${isProcessing ? "cursor-wait" : ""}
                          `}
                        >
                          {isAdding ? (
                            <>
                              <svg
                                className="animate-spin h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              <span>Adding...</span>
                            </>
                          ) : isRemoving ? (
                            <>
                              <svg
                                className="animate-spin h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              <span>Removing...</span>
                            </>
                          ) : isSelected ? (
                            "Remove"
                          ) : (
                            "Add to Compare"
                          )}
                        </button>
                      </div>
                      {isMaxReached && !isSelected && !isProcessing && (
                        <p className="text-xs text-orange-500 mt-3">
                          Max {MAX_COMPARE_ITEMS} colleges reached
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-gray-100 bg-gray-50/30 flex justify-between">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-gray-500 hover:text-gray-700 font-medium transition-colors rounded-xl hover:bg-gray-100"
              disabled={addingCollegeId || removingCollegeId}
            >
              Cancel
            </button>
            {compareIds.length > 0 && (
              <button
                onClick={() => {
                  onClose();
                }}
                className="px-6 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 font-medium transition-all shadow-sm hover:shadow-md"
                disabled={addingCollegeId || removingCollegeId}
              >
                View Comparison ({compareIds.length})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeListPopup;
