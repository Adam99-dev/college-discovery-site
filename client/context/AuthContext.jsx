import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


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


  const loginUser = (userData) => {
    setUser(userData);
  };


  const loginAndSync = async (userData) => {
    setUser(userData);
    await checkAuth();
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
        loginAndSync,
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
