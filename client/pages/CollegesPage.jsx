import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import CollegeCard from "../components/CollegeCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import CollegePageSkeleton from "../skeletons/CollegePage.s.jsx";
import { School, Frown, RotateCcw } from "lucide-react";
import CompareBar from "../components/CompareBar.jsx";

const CollegesPage = () => {
  const { user } = useAuth();

  // MAIN STATES
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalColleges, setTotalColleges] = useState(0);

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

  // APPLIED FILTERS (used for actual fetching)
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedLocation, setAppliedLocation] = useState("");
  const [appliedMinFees, setAppliedMinFees] = useState("");
  const [appliedMaxFees, setAppliedMaxFees] = useState("");
  const [appliedMinRating, setAppliedMinRating] = useState("");

  // APPLY FILTERS
  const handleApplyFilters = () => {
    setPage(1);
    setAppliedSearch(search);
    setAppliedLocation(location);
    setAppliedMinFees(minFees);
    setAppliedMaxFees(maxFees);
    setAppliedMinRating(minRating);
  };

  // CLEAR ALL FILTERS
  const handleClearFilters = () => {
    setPage(1);
    setSearch("");
    setLocation("");
    setMinFees("");
    setMaxFees("");
    setMinRating("");

    setAppliedSearch("");
    setAppliedLocation("");
    setAppliedMinFees("");
    setAppliedMaxFees("");
    setAppliedMinRating("");
  };

  // FETCH COLLEGES
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        setError(null);

        const query = new URLSearchParams({ page, limit: 6 });

        if (appliedSearch) query.append("search", appliedSearch);
        if (appliedLocation) query.append("city", appliedLocation);
        if (appliedMinFees) query.append("minFees", appliedMinFees);
        if (appliedMaxFees) query.append("maxFees", appliedMaxFees);
        if (appliedMinRating) query.append("minRating", appliedMinRating);

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/colleges?${query.toString()}`,
          { credentials: "include" }
        );

        if (!response.ok) throw new Error("Failed to fetch colleges");

        const data = await response.json();

        setColleges(data.colleges || []);
        setTotalColleges(data.totalColleges || 0);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [page, appliedSearch, appliedLocation, appliedMinFees, appliedMaxFees, appliedMinRating]);

  // FETCH SAVED COLLEGES
  useEffect(() => {
    const fetchSavedColleges = async () => {
      if (!user) return;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/saved_colleges/${user.id}`,
          { credentials: "include" }
        );
        const data = await res.json();

        if (data.success && data.savedColleges) {
          const savedIds = new Set(data.savedColleges.map((item) => item.college.id));
          setSavedColleges(savedIds);
        }
      } catch (err) {
        console.error("Error fetching saved colleges:", err);
      }
    };

    fetchSavedColleges();
  }, [user]);

  const handleSave = (id, isSaved) => {
    setSavedColleges((prev) => {
      const newSet = new Set(prev);
      if (isSaved) newSet.add(id);
      else newSet.delete(id);
      return newSet;
    });
  };

  if (loading) return <CollegePageSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium"
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
            <h1 className="text-4xl font-bold text-gray-900">Discover Colleges</h1>
            <p className="text-gray-600 mt-2">Find the best colleges based on your preferences</p>
          </div>
          <p className="text-gray-600 font-medium">{totalColleges} colleges found</p>
        </div>

        {/* FILTERS */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl shadow-md mb-8 border border-orange-100">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-orange-200">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <h3 className="font-semibold text-gray-800">Filter Colleges</h3>
              </div>

              <button
                onClick={handleClearFilters}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Clear Filters
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Location */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="City or area"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 bg-white transition-all text-sm"
                />
              </div>

              {/* Min Fees */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</div>
                <input
                  type="number"
                  placeholder="Min fees"
                  value={minFees}
                  onChange={(e) => setMinFees(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-7 pr-4 py-2.5 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 bg-white transition-all text-sm"
                />
              </div>

              {/* Max Fees */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</div>
                <input
                  type="number"
                  placeholder="Max fees"
                  value={maxFees}
                  onChange={(e) => setMaxFees(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-7 pr-4 py-2.5 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 bg-white transition-all text-sm"
                />
              </div>

              {/* Rating */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <span className="text-lg">★</span>
                </div>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-8 py-2.5 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 bg-white appearance-none cursor-pointer transition-all text-sm"
                >
                  <option value="">Any rating</option>
                  <option value="1">1★ & above</option>
                  <option value="2">2★ & above</option>
                  <option value="3">3★ & above</option>
                  <option value="4">4★ & above</option>
                  <option value="5">5★ only</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleApplyFilters}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-2.5 font-medium transition-all shadow-sm"
                >
                  Apply Filters
                </button>

                <button
                  onClick={handleClearFilters}
                  className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl py-2.5 font-medium transition-all"
                >
                  Clear
                </button>
              </div>
            </div>
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

            <CompareBar />

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-6 py-2.5 bg-gray-200 rounded-xl disabled:opacity-50 hover:bg-gray-300 transition"
              >
                Previous
              </button>

              <span className="font-semibold text-lg px-4">
                {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-6 py-2.5 bg-orange-600 text-white rounded-xl disabled:opacity-50 hover:bg-orange-700 transition"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <School className="w-20 h-20 text-gray-300 mx-auto mb-6" strokeWidth={1.5} />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No colleges found</h3>
            <p className="text-gray-500 mb-8">Try adjusting your filters</p>
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium"
            >
              <RotateCcw className="w-5 h-5" />
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegesPage;