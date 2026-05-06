import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  GraduationCap,
  GitCompareArrows,
  Bookmark,
  LogIn,
  Sparkles,
  Search,
  LogOut,
  Menu,
  X,
  ArrowUpNarrowWide,
} from "lucide-react";

import SearchBar from "../components/SearchBar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logoutUser } = useAuth();

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
        setIsSearchExpanded(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchExpanded(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const routes = [
    { name: "Home", path: "/", icon: Home },
    { name: "Colleges", path: "/colleges", icon: GraduationCap },
    { name: "Compare", path: "/compare", icon: GitCompareArrows },
    { name: "Predictors", path: "/predict", icon: ArrowUpNarrowWide },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    if (path === "/compare") return location.pathname.startsWith("/compare");
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Reusable button styles
  const buttonStyles = {
    primary: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg active:scale-95",
    secondary: "bg-white border-2 border-orange-200 hover:border-orange-400 text-orange-600 hover:text-orange-700",
    danger: "bg-white border-2 border-red-200 hover:border-red-400 text-red-500 hover:text-red-700",
  };

  const NavLink = ({ route }) => {
    const Icon = route.icon;
    return (
      <Link
        to={route.path}
        className={`px-5 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
          isActive(route.path)
            ? "bg-orange-50 text-orange-600"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}
      >
        <Icon className="w-4 h-4" />
        {route.name}
      </Link>
    );
  };

  const MobileNavLink = ({ route, onClick }) => {
    const Icon = route.icon;
    return (
      <Link
        to={route.path}
        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
          isActive(route.path)
            ? "bg-orange-50 text-orange-600"
            : "text-gray-700 hover:bg-gray-50"
        }`}
        onClick={onClick}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{route.name}</span>
      </Link>
    );
  };

  const AuthButton = ({ type, onClick, icon: Icon, label, customClass = "" }) => (
    <button
      onClick={onClick}
      className={`group relative px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all duration-200 active:scale-95 overflow-hidden ${customClass}`}
    >
      <Icon className={`w-4 h-4 transition-transform duration-200 ${
        type === "logout" ? "group-hover:-translate-x-0.5" : "group-hover:rotate-12"
      }`} />
      <span>{label}</span>
      {type === "primary" && (
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      )}
    </button>
  );

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
              <div className="w-11 h-11 rounded-xl overflow-hidden ring-2 ring-orange-100 group-hover:ring-orange-500 transition-all duration-200">
                <img
                  src="/logo.jpg"
                  alt="College Dekho Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div className="sm:flex gap-1">
              <span className="text-xl font-bold text-gray-900">COLLEGE</span>
              <span className="text-xl font-bold text-orange-500">DEKHO</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {routes.map((route) => (
              <NavLink key={route.name} route={route} />
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Desktop Search */}
            <div className="hidden md:block">
              <SearchBar />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {!user ? (
                <AuthButton
                  type="primary"
                  onClick={() => navigate("/login")}
                  icon={LogIn}
                  label="Login"
                  customClass={buttonStyles.primary}
                />
              ) : (
                <>
                  <AuthButton
                    type="secondary"
                    onClick={() => navigate("/saved_colleges")}
                    icon={Bookmark}
                    label="Saved"
                    customClass={buttonStyles.secondary}
                  />
                  <AuthButton
                    type="logout"
                    onClick={handleLogout}
                    icon={LogOut}
                    label="Logout"
                    customClass={buttonStyles.danger}
                  />
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchExpanded && (
          <div className="md:hidden py-3 border-t border-gray-100 animate-slideDown">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fadeIn"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="lg:hidden absolute top-[72px] left-0 right-0 bg-white border-t border-gray-100 shadow-xl z-50 max-h-[calc(100vh-72px)] overflow-y-auto animate-slideDown">
            <div className="p-4 space-y-2">
              {routes.map((route) => (
                <MobileNavLink
                  key={route.name}
                  route={route}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}

              <div className="pt-6 border-t border-gray-100 space-y-3">
                {!user ? (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/login");
                    }}
                    className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 group ${buttonStyles.primary}`}
                  >
                    <LogIn className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                    Login / Register
                  </button>
                ) : (
                  <div className="space-y-2.5">
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate("/saved_colleges");
                      }}
                      className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 group ${buttonStyles.secondary}`}
                    >
                      <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      Saved Colleges
                    </button>

                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 group ${buttonStyles.danger}`}
                    >
                      <LogOut className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}