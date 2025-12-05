import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // 🔥 Load user from localStorage when app starts
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data)); // Save user
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user on logout
    localStorage.removeItem("token"); // Token bhi hatayenge
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
