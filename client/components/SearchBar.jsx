// SearchBar.jsx - Global Navigation Version
import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({
  placeholder = "Search colleges...",
  onSearch, // For backward compatibility (filter mode)
  mode = "global", // "global" or "filter"
  value = "", // For controlled component
}) => {
  const [query, setQuery] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Update query when value prop changes (for filter mode)
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setSuggestions([]);
        setIsFocused(false);
        return;
      }

      try {
        const response = await fetch(
          import.meta.env.BACKEND_URL + `/api/colleges?search=${query}&limit=5`,
          { credentials: "include" },
        );
        const data = await response.json();
        if (data.success) {
          setSuggestions(data.colleges || []);
          setIsFocused(true);
        }
      } catch (error) {
        console.log(error);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // For filter mode, update parent immediately
    if (mode === "filter" && onSearch) {
      onSearch(newQuery);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (mode === "global") {
      // GLOBAL MODE: Navigate to college page
      if (suggestions.length > 0) {
        navigate(`/colleges/${suggestions[0].id}`);
        setQuery("");
        setIsFocused(false);
      }
    } else {
      // FILTER MODE: Just trigger search
      onSearch?.(query);
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
    setIsFocused(false);

    if (mode === "global") {
      // GLOBAL MODE: Navigate to college detail page
      navigate(`/colleges/${suggestion.id}`);
    } else {
      // FILTER MODE: Just filter colleges
      onSearch?.(suggestion.name);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setIsFocused(false);
    if (mode === "filter" && onSearch) {
      onSearch("");
    }
  };

  return (
    <div className="relative w-full max-w-2xl" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setIsFocused(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg
          focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500
          outline-none text-sm transition-all placeholder:text-gray-400"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </form>

      {isFocused && suggestions.length > 0 && (
        <div
          className="absolute left-0 top-full mt-2 w-full bg-white
    border border-gray-200 rounded-lg shadow-xl z-[9999]
    overflow-hidden"
        >
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-4 py-3 text-sm text-gray-700
        hover:bg-orange-50 transition-colors flex items-center gap-3
        border-b border-gray-100 last:border-0"
            >
              <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />

              <div>
                <p className="font-medium">{suggestion.name}</p>
                <p className="text-xs text-gray-500">{suggestion.location}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
