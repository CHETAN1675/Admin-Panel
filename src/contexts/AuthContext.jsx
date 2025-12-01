import { createContext, useContext, useEffect, useState } from "react";
import { signInWithEmailPassword, getUserRecord } from "../services/authServices";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("adminUser")) || null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("adminToken") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await signInWithEmailPassword(email, password);
      if (res.error || res.errorMessage) {
        throw res;
      }

      const { localId, idToken } = res;
     
      const record = await getUserRecord(localId);

      if (!record || !record.isAdmin) {
       
        throw { message: "Not an admin user" };
      }

      const adminUser = {
        email: res.email,
        uid: localId,
        isAdmin: !!record.isAdmin,
        name: record.name || null,
      };

      localStorage.setItem("adminUser", JSON.stringify(adminUser));
      localStorage.setItem("adminToken", idToken);

      setUser(adminUser);
      setToken(idToken);

      setLoading(false);
      return { success: true, user: adminUser };
    } catch (err) {
      setLoading(false);
    
      const message = (err && (err.error?.message || err.message || err.errorMessage)) || "Login failed";
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
