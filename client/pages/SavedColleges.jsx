import { useState, useEffect } from "react";
import CollegeCard from "../components/CollegeCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const SavedCollege = () => {
  const { loading: authLoading, logoutUser, isAuthenticated, user } = useAuth();

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH SAVED COLLEGES
  useEffect(() => {
    const fetchSavedColleges = async () => {
      if (!isAuthenticated) {
        setError("Please login to view saved colleges");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          import.meta.env.BACKEND_URL + `/api/saved_colleges/${user.id}`,
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
            },

            credentials: "include",
          },
        );

        if (!response.ok) {
          if (response.status === 401) {
            logoutUser();

            throw new Error("Session expired. Please login again.");
          }

          const errorData = await response.json().catch(() => ({}));

          throw new Error(
            errorData.message || "Failed to fetch saved colleges",
          );
        }

        const data = await response.json();

        setColleges(data.savedColleges || []);
      } catch (err) {
        console.log(err);

        setError(err.message || "Failed to load saved colleges");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchSavedColleges();
    }
  }, [authLoading, isAuthenticated, logoutUser]);

  // LOADING
  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Saved Colleges</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-[460px] animate-pulse shadow-sm"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Something Went Wrong
          </h2>

          <p className="text-red-600 text-lg mb-6">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Saved Colleges</h1>

            <p className="text-gray-600 mt-2">Your bookmarked colleges</p>
          </div>

          <p className="text-gray-600 font-medium">
            {colleges.length} saved colleges
          </p>
        </div>

        {/* COLLEGES */}
        {colleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((item) => (
              <CollegeCard
                key={item.college.id}
                college={item.college}
                isSaved={true}
                onSave={() => {
                  setColleges((prev) =>
                    prev.filter(
                      (savedItem) => savedItem.college.id !== item.college.id,
                    ),
                  );
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100">
            <div className="text-7xl mb-6">📚</div>

            <h2 className="text-3xl font-bold text-gray-900">
              No Saved Colleges
            </h2>

            <p className="text-gray-500 mt-4 text-lg max-w-md mx-auto">
              Start exploring colleges and bookmark your favorites to see them
              here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedCollege;
