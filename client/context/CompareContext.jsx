import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareIds, setCompareIds] = useState([]);
  const [compareItems, setCompareItems] = useState({});
  const [initialized, setInitialized] = useState(false);
  const isUpdatingFromURL = useRef(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const isComparePage = location.pathname === "/compare";
  const MAX_COMPARE_ITEMS = 3;


  useEffect(() => {
    try {
      const stored = localStorage.getItem("compare");
      if (stored) {
        const ids = JSON.parse(stored);
        if (Array.isArray(ids) && ids.length <= MAX_COMPARE_ITEMS) {
          setCompareIds(ids);
        }
      }
    } catch (error) {
      console.error("Failed to load compare from localStorage:", error);
    }
  }, []);


  useEffect(() => {
    if (initialized) return;
    
    const params = new URLSearchParams(location.search);
    const idsParam = params.get("ids");
    
    if (idsParam) {
      const ids = idsParam
        .split(",")
        .map(Number)
        .filter(id => !isNaN(id) && Number.isInteger(id))
        .slice(0, MAX_COMPARE_ITEMS);
      
      if (ids.length > 0 && JSON.stringify(ids) !== JSON.stringify(compareIds)) {
        setCompareIds(ids);
      }
    }
    
    setInitialized(true);
  }, [location.search, initialized, compareIds]);


  useEffect(() => {
    if (!initialized) return;
    
    try {
      localStorage.setItem("compare", JSON.stringify(compareIds));
    } catch (error) {
      console.error("Failed to save compare to localStorage:", error);
    }
  }, [compareIds, initialized]);


  useEffect(() => {
    if (!initialized || !isComparePage || isUpdatingFromURL.current) return;
    
    const currentIds = new URLSearchParams(location.search).get("ids");
    const newIds = compareIds.length > 0 ? compareIds.join(",") : null;
    
    if (currentIds === newIds) return;
    
    if (compareIds.length === 0) {
      navigate("/compare", { replace: true });
    } else {
      navigate(`/compare?ids=${newIds}`, { replace: true });
    }
  }, [compareIds, initialized, isComparePage, location.search, navigate]);


  const toggleCompare = useCallback((college) => {

    const collegeId = typeof college === 'object' ? college.id : college;
    const collegeData = typeof college === 'object' ? college : null;
    
    setCompareIds((prev) => {
      if (prev.includes(collegeId)) {

        setCompareItems(items => {
          const newItems = { ...items };
          delete newItems[collegeId];
          return newItems;
        });
        return prev.filter(id => id !== collegeId);
      }
      
      // Add to compare (check limit)
      if (prev.length >= MAX_COMPARE_ITEMS) {
        console.warn(`Cannot add more than ${MAX_COMPARE_ITEMS} colleges`);
        return prev;
      }
      

      if (collegeData) {
        setCompareItems(items => ({ ...items, [collegeId]: collegeData }));
      }
      
      return [...prev, collegeId];
    });
  }, []);


  const addCollegeData = useCallback((id, collegeData) => {
    if (compareIds.includes(id) && !compareItems[id]) {
      setCompareItems(items => ({ ...items, [id]: collegeData }));
    }
  }, [compareIds, compareItems]);

  const isInCompare = useCallback((id) => {
    return compareIds.includes(id);
  }, [compareIds]);


  const removeCompare = useCallback((id) => {
    setCompareIds(prev => prev.filter(c => c !== id));
    setCompareItems(items => {
      const newItems = { ...items };
      delete newItems[id];
      return newItems;
    });
  }, []);


  const clearCompare = useCallback(() => {
    setCompareIds([]);
    setCompareItems({});
    localStorage.removeItem("compare");
  }, []);

  const value = {
    compareIds,
    compareItems,
    toggleCompare,
    removeCompare,
    clearCompare,
    isInCompare,
    addCollegeData,
    maxReached: compareIds.length >= MAX_COMPARE_ITEMS,
    count: compareIds.length,
    MAX_COMPARE_ITEMS,
  };

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};