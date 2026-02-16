'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, AuthState } from '@/lib/types';
import { loginUser, logoutUser, getCurrentUser, isAuthenticated } from '@/lib/auth';

interface AuthContextType {
  auth: AuthState;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = useCallback(() => {
    const user = getCurrentUser();
    const authenticated = isAuthenticated();

    setAuth({
      user: authenticated ? user : null,
      isAuthenticated: authenticated,
      isLoading: false,
      error: null,
    });
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    setAuth((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 500));

      const user = loginUser(username, password);

      if (user) {
        setAuth({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return true;
      } else {
        setAuth({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Invalid username or password',
        });
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setAuth({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setAuth({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
