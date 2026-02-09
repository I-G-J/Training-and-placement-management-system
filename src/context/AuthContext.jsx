import { createContext, useContext, useEffect, useState } from "react";
import api from "@/api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Update profile
  const updateProfile = async (data) => {
    try {
      await api.put("/auth/updatedetails", data, {
        withCredentials: true,
      });

      if (data.password) {
        await api.put(
          "/auth/updatepassword",
          { password: data.password },
          { withCredentials: true },
        );
      }

      // Refresh user data
      const res = await api.get("/auth/me", {
        withCredentials: true,
      });
      setUser(res.data.user);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || "Update failed",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, updateProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
