import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import CollegeDetails from "../pages/CollegeDetails.jsx";
import CollegesPage from "../pages/CollegesPage.jsx";
import NotFound from "../pages/NotFound.jsx";
import SavedColleges from "../pages/SavedColleges.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function App() {
  const location = useLocation();

  const { user } = useAuth();

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  const hideFooter =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="min-h-screen bg-gray-100">
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />

        <Route path="/colleges" element={<CollegesPage />} />
        <Route path="/saved_colleges" element={<SavedColleges />} />
        <Route path="/colleges/:id" element={<CollegeDetails />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
