import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);        // Added for easy access

  // Check if user is authenticated
  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/me", {
        method: "GET",
        credentials: "include",        // Important for cookies
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user || data);    // Handle both {user: {...}} and direct user object
        // If your backend also returns token in /me, you can set it here too
      } else {
        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Login User
  const loginUser = (userData, authToken = null) => {
    setUser(userData);
    if (authToken) {
      setToken(authToken);
      // Optional: store token in localStorage as backup
      localStorage.setItem("token", authToken);
    }
  };

  // Logout User
  const logoutUser = async () => {
    try {
      await fetch("http://localhost:3000/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  // Refresh auth (useful after login)
  const refreshAuth = () => {
    checkAuth();
  };

  const value = {
    user,
    token,           // ← Now easily accessible
    loading,
    isAuthenticated: !!user,
    loginUser,
    logoutUser,
    setUser,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};