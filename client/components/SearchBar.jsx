// SearchBar.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({
  placeholder = "Search colleges...",
  onSearch,
  mode = "global",
  value = "",
  onChange,
  className = "",
}) => {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);
  const abortControllerRef = useRef(null);
  const navigate = useNavigate();

  // Sync controlled value
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch suggestions
  const fetchSuggestions = useCallback(async (searchTerm) => {

    if (!searchTerm?.trim() || searchTerm.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/colleges?search=${encodeURIComponent(searchTerm)}`;
      

      const response = await fetch(url, {
        credentials: "include",
        signal: controller.signal,
      });

      

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      if (data.success) {
        const results = data.colleges || [];
        
        setSuggestions(results);
        setIsOpen(results.length > 0);
      } else {
        
        setSuggestions([]);
        setIsOpen(false);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        
        setSuggestions([]);
        setIsOpen(false);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, fetchSuggestions]);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (mode === "filter") {
      onSearch?.(newQuery);
      onChange?.(newQuery);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
    setIsOpen(false);

    if (mode === "global") {
      navigate(`/colleges/${suggestion.slug}`);
    } else {
      onSearch?.(suggestion.name);
      onChange?.(suggestion.name);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setIsOpen(false);

    if (mode === "filter") {
      onSearch?.("");
      onChange?.("");
    }
  };

  return (
    <div className={`relative w-full max-w-2xl ${className}`} ref={dropdownRef}>
      <form className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />

        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg
                     focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500
                     outline-none text-sm transition-all placeholder:text-gray-400"
          autoComplete="off"
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


      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] overflow-hidden max-h-[320px] overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-8 text-center text-gray-500">Searching...</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 flex items-center gap-3 border-b border-gray-100 last:border-0"
              >
                <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">{suggestion.name}</p>
                  <p className="text-xs text-gray-500">
                    {suggestion.city}, {suggestion.state}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-6 text-center text-gray-500 text-sm">
              No colleges found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;