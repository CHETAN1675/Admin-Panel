import { createContext, useContext, useState } from "react";
import {signInWithEmailPassword,signUpWithEmailPassword,getUserRecord} from "../services/authServices";
import { FIREBASE_DB_URL } from "../firebase";

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

  // LOGIN
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await signInWithEmailPassword(email, password);
      if (res.error || res.errorMessage) throw res;

      const { localId, idToken } = res;
      const record = await getUserRecord(localId);

      if (!record || !record.isAdmin) throw { message: "Not an admin user" };

      const adminUser = {
        email: res.email,
        uid: localId,
        isAdmin: true,
        name: record.name || res.email.split("@")[0]
      };

      localStorage.setItem("adminUser", JSON.stringify(adminUser));
      localStorage.setItem("adminToken", idToken);

      setUser(adminUser);
      setToken(idToken);
      setLoading(false);
      return { success: true, user: adminUser };
    } catch (err) {
      setLoading(false);
      const message =
        err?.error?.message || err?.message || err?.errorMessage || "Login failed";
      return { success: false, message };
    }
  };

  // SIGNUP — CREATE ADMIN ACCOUNT
  const signup = async (email, password) => {
    setLoading(true);
    try {
      const res = await signUpWithEmailPassword(email, password);
      if (res.error || res.errorMessage) throw res;

      const { localId, idToken } = res;

      // Save admin profile in database
      await fetch(`${FIREBASE_DB_URL}/users/${localId}.json`, {
        method: "PATCH",
        body: JSON.stringify({
          email,
          name: email.split("@")[0],
          isAdmin: true
        }),
        headers: { "Content-Type": "application/json" }
      });

      const adminUser = {
        email,
        uid: localId,
        isAdmin: true,
        name: email.split("@")[0]
      };

      localStorage.setItem("adminUser", JSON.stringify(adminUser));
      localStorage.setItem("adminToken", idToken);

      setUser(adminUser);
      setToken(idToken);
      setLoading(false);
      return { success: true, user: adminUser };
    } catch (err) {
      setLoading(false);
      const message =
        err?.error?.message || err?.message || err?.errorMessage || "Signup failed";
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
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
