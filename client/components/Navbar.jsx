import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  GraduationCap,
  TrendingUp,
  Bookmark,
  LogIn,
  Sparkles,
  Search,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import SearchBar from "../components/SearchBar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logoutUser, loading } = useAuth();   // Added loading from auth

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const secondaryRoutes = [
    { name: "Home", path: "/", icon: Home },
    { name: "Colleges", path: "/colleges", icon: GraduationCap },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      // Fallback: force logout
      navigate("/login", { replace: true });
    }
  };

  // Show loading state while auth is checking
  if (loading) {
    return (
      <nav className="sticky top-0 z-50 bg-white shadow-sm h-[72px]">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="animate-pulse flex-1 h-8 bg-gray-200 rounded" />
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-gray-200/40"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl overflow-hidden ring-2 ring-orange-100 group-hover:ring-orange-500 transition-all duration-300">
                <img
                  src="/logo.jpg"
                  alt="CollegeDekho"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>

            <div className="hidden sm:flex items-baseline gap-1">
              <span className="text-xl font-bold text-gray-900">COLLEGE</span>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                DEKHO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {secondaryRoutes.map((route) => {
              const Icon = route.icon;
              return (
                <Link
                  key={route.name}
                  to={route.path}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive(route.path)
                      ? "text-orange-600 bg-orange-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{route.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center sm:gap-3">
            {/* Desktop Search */}
            <div className="hidden md:block">
              <SearchBar />
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="md:hidden p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {!user ? (
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold rounded-xl transition-all active:scale-95 flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/saved_colleges")}
                    className="px-5 py-2.5 border border-orange-200 hover:border-orange-500 text-orange-600 bg-orange-50 rounded-xl flex items-center gap-2 transition-all font-medium"
                  >
                    <Bookmark className="w-4 h-4" />
                    Saved
                  </button>

                  <button
                    onClick={handleLogout}
                    className="px-5 py-2.5 border border-red-200 hover:border-red-500 text-red-600 rounded-xl flex items-center gap-2 transition-all font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isSearchExpanded ? "max-h-20 pb-4" : "max-h-0"
          }`}
        >
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-5 space-y-2">
          {secondaryRoutes.map((route) => {
            const Icon = route.icon;
            return (
              <Link
                key={route.name}
                to={route.path}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-base font-medium ${
                  isActive(route.path)
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                {route.name}
              </Link>
            );
          })}

          {/* Mobile Auth Section */}
          <div className="pt-4 border-t border-gray-100 mt-4">
            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="w-full py-3.5 bg-orange-600 text-white rounded-2xl font-semibold text-base"
              >
                Login / Register
              </button>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/saved_colleges")}
                  className="w-full py-3.5 border border-orange-300 text-orange-600 rounded-2xl flex items-center justify-center gap-2 font-medium"
                >
                  <Bookmark className="w-5 h-5" />
                  Saved Colleges
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full py-3.5 border border-red-300 text-red-600 rounded-2xl flex items-center justify-center gap-2 font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}