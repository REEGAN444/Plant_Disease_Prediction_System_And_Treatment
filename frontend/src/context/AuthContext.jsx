import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('plant_ai_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('plant_ai_token') || null);

  const login = (authData) => {
    const userInfo = {
      id: authData.id,
      name: authData.name,
      email: authData.email,
      role: authData.role
    };
    setUser(userInfo);
    setToken(authData.token);
    localStorage.setItem('plant_ai_user', JSON.stringify(userInfo));
    localStorage.setItem('plant_ai_token', authData.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('plant_ai_user');
    localStorage.removeItem('plant_ai_token');
  };

  const isAdmin = user?.role?.toUpperCase() === 'ADMIN';
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
