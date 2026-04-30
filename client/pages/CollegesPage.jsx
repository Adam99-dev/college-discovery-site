import { useState, useEffect } from "react";
import CollegeCard from "../components/CollegeCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const CollegesPage = () => {
  const { loading: authLoading, logoutUser, isAuthenticated, user } = useAuth();

  // MAIN STATES
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [showCompareBar, setShowCompareBar] = useState(false);
  const [error, setError] = useState(null);

  // SAVED COLLEGES
  const [savedColleges, setSavedColleges] = useState(new Set());

  // PAGINATION
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  // FILTER STATES
  const [search, setSearch] = useState("");

  const [location, setLocation] = useState("");

  const [minFees, setMinFees] = useState("");

  const [maxFees, setMaxFees] = useState("");

  const [minRating, setMinRating] = useState("");

  // DEBOUNCED FEES
  const [debouncedMinFees, setDebouncedMinFees] = useState("");

  const [debouncedMaxFees, setDebouncedMaxFees] = useState("");

  // DEBOUNCE
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedMinFees(minFees);

      setDebouncedMaxFees(maxFees);
    }, 500);

    return () => clearTimeout(timer);
  }, [minFees, maxFees]);

  // FETCH SAVED COLLEGES
  useEffect(() => {
    const fetchSavedColleges = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/saved_colleges/${user.id}`,
          {
            credentials: "include",
          },
        );

        const data = await response.json();

        if (data.success) {
          const savedIds = data.savedColleges.map((item) => item.college.id);

          setSavedColleges(new Set(savedIds));
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (isAuthenticated) {
      fetchSavedColleges();
    }
  }, [isAuthenticated]);

  // FETCH COLLEGES
  useEffect(() => {
    const fetchColleges = async () => {
      if (!isAuthenticated) {
        setError("Please login to view colleges");

        setLoading(false);

        return;
      }

      try {
        setLoading(true);

        setError(null);

        // QUERY PARAMS
        const query = new URLSearchParams({
          page,
          limit: 6,
        });

        if (search) query.append("search", search);

        if (location) query.append("location", location);

        if (debouncedMinFees) query.append("minFees", debouncedMinFees);

        if (debouncedMaxFees) query.append("maxFees", debouncedMaxFees);

        if (minRating) query.append("minRating", minRating);

        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/colleges?${query.toString()}`,
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

          throw new Error(errorData.message || "Failed to fetch colleges");
        }

        const data = await response.json();

        setColleges(data.colleges || []);

        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.log(err);

        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchColleges();
    }
  }, [
    page,
    search,
    location,
    debouncedMinFees,
    debouncedMaxFees,
    minRating,
    isAuthenticated,
    authLoading,
    logoutUser,
  ]);

  // SAVE / UNSAVE
  const handleSave = (id) => {
    setSavedColleges((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return newSet;
    });
  };

  const handleCompare = (id) => {
    setSelectedColleges((prev) => {
      // REMOVE
      if (prev.includes(id)) {
        const updated = prev.filter((collegeId) => collegeId !== id);

        if (updated.length === 0) {
          setShowCompareBar(false);
        }

        return updated;
      }

      // MAX 3
      if (prev.length >= 3) {
        return prev;
      }

      // SHOW BAR
      setShowCompareBar(true);

      return [...prev, id];
    });
  };

  // LOADING
  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Discover Colleges</h1>

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
            Access Denied
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
            <h1 className="text-4xl font-bold text-gray-900">
              Discover Colleges
            </h1>

            <p className="text-gray-600 mt-2">
              Find the best colleges based on your preferences
            </p>
          </div>

          <p className="text-gray-600 font-medium">
            {colleges.length} colleges found
          </p>
        </div>

        {/* SEARCH */}
        <div className="mb-6 hidden">
          <SearchBar
            onSearch={(value) => {
              setPage(1);
              setSearch(value);
            }}
          />
        </div>

        {/* FILTERS */}
        <div className="bg-white p-5 rounded-2xl shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* LOCATION */}
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => {
                setPage(1);

                setLocation(e.target.value);
              }}
              className="border rounded-xl px-4 py-3 outline-none"
            />

            {/* MIN FEES */}
            <input
              type="number"
              placeholder="Min Fees"
              value={minFees}
              onChange={(e) => {
                setPage(1);

                setMinFees(e.target.value);
              }}
              className="border rounded-xl px-4 py-3 outline-none"
            />

            {/* MAX FEES */}
            <input
              type="number"
              placeholder="Max Fees"
              value={maxFees}
              onChange={(e) => {
                setPage(1);

                setMaxFees(e.target.value);
              }}
              className="border rounded-xl px-4 py-3 outline-none"
            />

            {/* RATING */}
            <select
              value={minRating}
              onChange={(e) => {
                setPage(1);

                setMinRating(e.target.value);
              }}
              className="border rounded-xl px-4 py-3 outline-none"
            >
              <option value="">Minimum Rating</option>

              <option value="1">1+</option>

              <option value="2">2+</option>

              <option value="3">3+</option>

              <option value="4">4+</option>

              <option value="5">5</option>
            </select>
          </div>
        </div>

        {/* COLLEGES GRID */}
        {colleges.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colleges.map((college) => (
                <CollegeCard
                  key={college.id}
                  college={college}
                  isSaved={savedColleges.has(college.id)}
                  onSave={handleSave}
                />
              ))}
            </div>

            {/* COMPARE BAR */}
            {showCompareBar && selectedColleges.length > 0 && (
              <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-2xl z-50 px-4 py-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* LEFT */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {selectedColleges.length} College
                      {selectedColleges.length > 1 ? "s" : ""} Selected
                    </h3>

                    <p className="text-sm text-gray-500">
                      Select up to 3 colleges to compare
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-3">
                    {/* CLOSE */}
                    <button
                      onClick={() => {
                        setSelectedColleges([]);
                        setShowCompareBar(false);
                      }}
                      className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                    >
                      Clear
                    </button>

                    {/* COMPARE */}
                    <button
                      disabled={selectedColleges.length < 2}
                      onClick={() =>
                        navigate(`/compare?ids=${selectedColleges.join(",")}`)
                      }
                      className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                    >
                      Compare Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-5 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
              >
                Prev
              </button>

              <span className="font-semibold text-lg">
                {page} / {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-5 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 text-6xl mb-4">🏫</div>

            <h3 className="text-xl font-semibold text-gray-700">
              No colleges found
            </h3>

            <p className="text-gray-500 mt-2">Please try different filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegesPage;
