// src/context/StrapiContext.jsx
// Global context for Strapi auth state — wraps your whole app

import { createContext, useContext, useState, useEffect } from 'react';
import { strapiLogin, strapiRegister, strapiLogout, getCurrentUser } from '../services/api';

const StrapiContext = createContext(null);

export const StrapiProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // On mount, restore user from localStorage
  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) setUser(savedUser);
    setAuthLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await strapiLogin(email, password);
    setUser(data.user);
    return data;
  };

  const register = async (username, email, password) => {
    const data = await strapiRegister(username, email, password);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    strapiLogout();
    setUser(null);
  };

  const isLoggedIn = !!user;

  return (
    <StrapiContext.Provider value={{ user, isLoggedIn, authLoading, login, register, logout }}>
      {children}
    </StrapiContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => {
  const ctx = useContext(StrapiContext);
  if (!ctx) throw new Error('useAuth must be used inside StrapiProvider');
  return ctx;
};

export default StrapiContext;