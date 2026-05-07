'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  authenticateUser,
  clearCurrentUser,
  createUser as createUserStorage,
  getCurrentUser,
  setCurrentUser,
  userExists,
} from '@/lib/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const authenticated = authenticateUser(email, password);
    if (!authenticated) {
      return { success: false, error: 'Invalid email or password' };
    }

    setCurrentUser(authenticated);
    setUser(authenticated);
    return { success: true };
  };

  const logout = () => {
    clearCurrentUser();
    setUser(null);
  };

  const register = ({ name, email, password, userType = 'seeker' }) => {
    if (!name || !email || !password) {
      return { success: false, error: 'Name, email and password are required' };
    }

    if (userExists(email)) {
      return { success: false, error: 'This email is already registered' };
    }

    createUserStorage({ name, email, password, userType });
    return { success: true };
  };

  const value = useMemo(
    () => ({ user, loading, login, logout, register }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
