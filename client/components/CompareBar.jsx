import { useCompare } from "../context/CompareContext";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { GitCompareArrows, X } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";

const CompareBar = () => {
  const {
    compareIds,
    compareItems,
    clearCompare,
    removeCompare,
    addCollegeData,
    MAX_COMPARE_ITEMS = 3,
  } = useCompare();

  const { user } = useAuth();
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [colleges, setColleges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const abortControllerRef = useRef(null);

  // Fetch missing college data
  useEffect(() => {
    const fetchMissingColleges = async () => {
      const missingIds = compareIds.filter((id) => !compareItems[id]);

      if (missingIds.length === 0) return;

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setIsLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/colleges?ids=${missingIds.join(",")}`,
          {
            credentials: "include",
            signal: abortControllerRef.current.signal,
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch college data");
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.colleges)) {
          data.colleges.forEach((college) => {
            addCollegeData(college.id, college);
          });
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch college data:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMissingColleges();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [compareIds, compareItems, addCollegeData]);

  // Build college list from compareItems
  useEffect(() => {
    const collegeList = compareIds
      .map((id) => compareItems[id])
      .filter(Boolean);
    setColleges(collegeList);
  }, [compareIds, compareItems]);


  const handleCompare = useCallback(async () => {
    setErrorMessage("");


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
          pauseOnHover: true,
        }
      );
      return;
    }

    if (colleges.length < 2) {
      const needed = 2 - colleges.length;
      const msg = `Add ${needed} more college${needed > 1 ? "s" : ""} to compare`;
      setErrorMessage(msg);
      toast.info(msg, {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (colleges.length > MAX_COMPARE_ITEMS) {
      const msg = `Cannot compare more than ${MAX_COMPARE_ITEMS} colleges`;
      setErrorMessage(msg);
      toast.warning(msg, {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setIsNavigating(true);

    try {
      const ids = colleges.map((c) => c.id).join(",");
      await navigate(`/compare?ids=${ids}`);
    } catch (error) {
      const msg = "Failed to navigate. Please try again.";
      setErrorMessage(msg);
      toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Navigation error:", error);
    } finally {
      setIsNavigating(false);
    }
  }, [colleges, MAX_COMPARE_ITEMS, navigate, user]);

  const handleClearAll = useCallback(() => {
    clearCompare();
    toast.info("Comparison cleared", {
      position: "top-right",
      autoClose: 2000,
    });
  }, [clearCompare]);

  const handleRemoveCollege = useCallback(
    (collegeId, collegeName) => {
      removeCompare(collegeId);
      toast.info(`${collegeName} removed from comparison`, {
        position: "top-right",
        autoClose: 2000,
      });
    },
    [removeCompare],
  );

  if (colleges.length === 0 && !isLoading) return null;

  return (
    <div className="left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 animate-slide-up">
      <div className="px-3 py-3 max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <GitCompareArrows className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">
              {colleges.length} of {MAX_COMPARE_ITEMS} selected
            </span>
            {isLoading && (
              <div className="w-3 h-3 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            )}
          </div>
          {colleges.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-red-500 font-medium px-2 py-1 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              disabled={isNavigating}
            >
              Clear all
            </button>
          )}
        </div>


        {colleges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3 justify-center">
            {colleges.map((college, idx) => (
              <div
                key={college.id}
                className="flex items-center gap-1 bg-gray-100 rounded-full pl-2 pr-1 py-1 transition-all hover:bg-gray-200 group"
              >
                <span className="text-xs text-orange-600 font-medium">
                  {idx + 1}.
                </span>
                <span
                  className="text-xs text-gray-700 max-w-[150px] sm:max-w-[200px] truncate"
                  title={college.name}
                >
                  {college.name}
                </span>
                <button
                  onClick={() => handleRemoveCollege(college.id, college.name)}
                  className="p-0.5 hover:bg-gray-300 rounded-full transition-colors"
                  disabled={isNavigating}
                  aria-label={`Remove ${college.name}`}
                >
                  <X className="w-3 h-3 text-gray-500 hover:text-red-500 transition-colors" />
                </button>
              </div>
            ))}
          </div>
        )}


        {isLoading && colleges.length === 0 && (
          <div className="flex justify-center items-center gap-2 mb-3 py-2">
            <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-gray-500">Loading colleges...</span>
          </div>
        )}


        {errorMessage && (
          <div className="mb-2 text-center animate-pulse">
            <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded">
              {errorMessage}
            </span>
          </div>
        )}


        <button
          onClick={handleCompare}
          disabled={colleges.length < 2 || isNavigating || isLoading}
          className={`w-full py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
            colleges.length >= 2 && !isNavigating && !isLoading
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 active:from-orange-700 active:to-orange-800 shadow-md hover:shadow-lg"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isNavigating ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Navigating...
            </span>
          ) : isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              Loading...
            </span>
          ) : colleges.length >= 2 ? (
            `Compare Now (${colleges.length} colleges)`
          ) : (
            `Add ${2 - colleges.length} more college${2 - colleges.length > 1 ? "s" : ""} to compare`
          )}
        </button>


        {colleges.length === 1 && (
          <p className="text-center text-xs text-gray-400 mt-2">
            Add one more college to enable comparison
          </p>
        )}


        {!user && colleges.length >= 2 && (
          <p className="text-center text-xs text-orange-500 mt-2">
            🔐 Please login to compare colleges
          </p>
        )}
      </div>
    </div>
  );
};

export default CompareBar;