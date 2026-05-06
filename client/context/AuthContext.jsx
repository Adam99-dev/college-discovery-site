import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Check auth from backend
  const checkAuth = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/user/me",
        {
          credentials: "include",
        },
      );

      if (!res.ok) throw new Error();

      const data = await res.json();
      setUser(data.user || data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // 🔥 FIX 1: instant UI update
  const loginUser = (userData) => {
    setUser(userData); // immediate update
  };

  // 🔥 FIX 2: optional re-sync (background)
  const loginAndSync = async (userData) => {
    setUser(userData); // instant UI
    await checkAuth(); // sync with backend (optional)
  };

  const logoutUser = async () => {
    try {
      await fetch(import.meta.env.VITE_BACKEND_URL + "/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error(e);
    } finally {

      setUser(null);

      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        loginUser,
        loginAndSync, // 🔥 new
        logoutUser,
        refreshAuth: checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
