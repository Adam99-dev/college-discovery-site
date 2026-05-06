import { useState, useEffect } from "react";
import CollegeCard from "../components/CollegeCard.jsx";
import CollegePage from "../skeletons/CollegePage.s.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const SavedCollege = () => {
  const { loading: authLoading, logoutUser, isAuthenticated, user } = useAuth();

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // FETCH SAVED COLLEGES
  const fetchSavedColleges = async (isRefresh = false) => {
    if (!isAuthenticated) {
      setError("Please login to view saved colleges");
      setLoading(false);
      return;
    }

    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setError(null);
        setLoading(true);
      }

      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + `/api/saved_colleges/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          logoutUser();
          throw new Error("Session expired. Please login again.");
        }

        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Failed to fetch saved colleges"
        );
      }

      const data = await response.json();
      setColleges(data.savedColleges || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching saved colleges:", err);
      setError(err.message || "Failed to load saved colleges");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Handle remove college from saved list
  const handleRemoveCollege = (collegeId) => {
    setColleges((prev) =>
      prev.filter((savedItem) => savedItem.college.id !== collegeId)
    );
  };

  // Handle retry
  const handleRetry = () => {
    fetchSavedColleges();
  };

  useEffect(() => {
    if (!authLoading) {
      fetchSavedColleges();
    }
  }, [authLoading, isAuthenticated, user?.id]);

  // LOADING STATE
  if (loading || authLoading) {
    return <CollegePage />;
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <div className="text-center max-w-md w-full">
          <div className="text-6xl sm:text-7xl mb-6">⚠️</div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            Something Went Wrong
          </h2>

          <p className="text-red-500 text-base sm:text-lg mb-8 px-4">
            {error}
          </p>

          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md w-full sm:w-auto"
            >
              Try Again
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all w-full sm:w-auto ml-0 sm:ml-3"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  // NO SAVED COLLEGES
  if (colleges.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Saved Colleges
            </h1>
            <p className="text-gray-500 mt-2">
              Your bookmarked colleges
            </p>
          </div>

          {/* EMPTY STATE */}
          <div className="bg-white rounded-3xl p-12 sm:p-16 text-center shadow-sm border border-gray-100">
            <div className="text-7xl sm:text-8xl mb-6">
              📚
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              No Saved Colleges Yet
            </h2>

            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Start exploring colleges and bookmark your favorites to see them here.
            </p>
            
            <button
              onClick={() => window.location.href = '/'}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
            >
              Explore Colleges
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN RENDER WITH COLLEGES
  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Saved Colleges
            </h1>
            <p className="text-gray-500 mt-2">
              Your bookmarked colleges
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Refresh Button */}
            <button
              onClick={() => fetchSavedColleges(true)}
              disabled={isRefreshing}
              className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 hover:border-orange-200 transition-all disabled:opacity-50"
            >
              {isRefreshing ? (
                <svg className="animate-spin h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
            </button>

            {/* Count Badge */}
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm font-semibold text-gray-700">
                {colleges.length} {colleges.length === 1 ? 'College' : 'Colleges'} Saved
              </p>
            </div>
          </div>
        </div>

        {/* COLLEGES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((item) => (
            <CollegeCard
              key={item.college.id}
              college={item.college}
              isSaved={true}
              onSave={() => handleRemoveCollege(item.college.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedCollege;