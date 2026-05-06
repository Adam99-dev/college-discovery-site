import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext.jsx";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import CollegeDetails from "../pages/CollegeDetails.jsx";
import CollegesPage from "../pages/CollegesPage.jsx";
import NotFound from "../pages/NotFound.jsx";
import SavedColleges from "../pages/SavedColleges.jsx";
import ComparePage from "../pages/ComparePage.jsx";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";

import CollegesPageSkeleton from "../skeletons/CollegePage.s.jsx";

import "react-toastify/dist/ReactToastify.css";

// ================= PROTECTED ROUTE =================
const ProtectedRoute = ({ children, fallback = null }) => {
  const { user, loading } = useAuth();

  if (loading) return fallback || <PageLoader />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

// ================= PUBLIC AUTH ROUTE =================
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
};

// ================= FULL SCREEN LOADER =================
const PageLoader = () => (
  <div className="h-screen flex items-center justify-center bg-gray-100">
    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  const location = useLocation();
  const hideLayout = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100">
      <ScrollToTop />

      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/colleges" element={<CollegesPage />} />
        <Route path="/colleges/:slug" element={<CollegeDetails />} />
        <Route path="/compare" element={<ComparePage />} />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/saved_colleges"
          element={
            <ProtectedRoute fallback={<CollegesPageSkeleton />}>
              <SavedColleges />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideLayout && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;