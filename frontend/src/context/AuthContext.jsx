

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //  Load user from localStorage 
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  //  Register function
  const register = async (formData) => {
    const { data } = await api.post("/auth/register", formData);
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data)); 
  };

  //  Login function
  const login = async (formData) => {
    const { data } = await api.post("/auth/login", formData);
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  //  Logout function
  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    localStorage.removeItem("user"); 
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);