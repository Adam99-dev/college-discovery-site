// ComparePage.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CompareInfo from "../components/CompareInfo.jsx";
import CompareTable from "../components/CompareTable.jsx";
import { useCompare } from "../context/CompareContext.jsx";
import ComparePageSkeleton from "../skeletons/ComparePage.s.jsx";
import VerdictSection from "../components/VerdictSection.jsx";
import { Share, Check, Trash2 } from "lucide-react";

const ComparePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { compareIds, clearCompare } = useCompare();
  const [text, setText] = useState("Share");
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setText("Copied!");

    setTimeout(() => {
      setText("Share");
    }, 2000);
  };

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const idsParam = searchParams.get("ids");
  const urlIds = idsParam ? idsParam.split(",").map((id) => parseInt(id)) : [];

  // Use compareIds
  const activeIds = compareIds.length > 0 ? compareIds : urlIds;

  const fetchColleges = useCallback(async () => {
    if (!activeIds.length) {
      setColleges([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/compare?ids=${activeIds.join(",")}`,
        { credentials: "include" },
      );

      if (!response.ok) throw new Error("Failed to fetch colleges");

      const data = await response.json();

      if (data.success && Array.isArray(data.colleges)) {
        const orderedColleges = activeIds
          .map((id) => data.colleges.find((c) => c.id === id))
          .filter(Boolean);

        setColleges(orderedColleges);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [activeIds]);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  // Redirect if less than 2 colleges
  useEffect(() => {
    if (activeIds.length < 2) {
      navigate("/colleges");
    }
  }, [activeIds.length, navigate]);

  const handleClear = () => {
    clearCompare();
    navigate("/colleges");
  };

  if (loading) return <ComparePageSkeleton />;
  if (error) {
    return <div className="text-red-600 p-8">Error: {error}</div>;
  }

  const compareItemsArray = [...colleges];
  if (colleges.length === 2) {
    compareItemsArray.push({ id: "add-more", name: "Add More" });
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            ← Back
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition text-sm"
            >
              {text === "Share" ? (
                <Share size={16} />
              ) : (
                <Check size={16} className="text-green-500" />
              )}
              <span className="hidden sm:inline">{text}</span>
            </button>

            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition text-sm"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {compareItemsArray.map((college, idx) => (
            <CompareInfo
              key={college.id}
              college={college}
              index={idx}
              totalColleges={colleges.length}
            />
          ))}
        </div>

        <CompareTable colleges={colleges} />
        <div className="mt-5">
          <VerdictSection colleges={colleges} />
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
