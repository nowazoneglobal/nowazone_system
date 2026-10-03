import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { apiUrl } from '../api/base';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  roles: string[];
  company?: string;
  phone?: string;
  jobTitle?: string;
  profileImage?: { url: string; publicId: string };
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  csrfToken: string | null;
  login: (user: AuthUser, csrf: string) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isCustomer: boolean;
  isStaff: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STAFF_ROLES = [
  'super_admin',
  'admin',
  'hr',
  'sales',
  'content_creator',
  'seo_manager',
  'support_executive',
  'finance_manager',
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch(apiUrl('/api/auth/profile'), { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success') {
          setUser(data.data.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback((userData: AuthUser, csrf: string) => {
    setUser(userData);
    setCsrfToken(csrf);
    try {
      if (csrf) window.sessionStorage?.setItem('csrf_token', csrf);
    } catch {}
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch(apiUrl('/api/auth/logout'), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
        },
      });
    } catch {
      // local logout anyway
    } finally {
      setUser(null);
      setCsrfToken(null);
      try {
        window.sessionStorage?.removeItem('csrf_token');
      } catch {}
    }
  }, [csrfToken]);

  const isCustomer = user?.role === 'customer';
  const isStaff = user ? STAFF_ROLES.includes(user.role) : false;

  return (
    <AuthContext.Provider
      value={{ user, loading, csrfToken, login, logout, refreshUser, isCustomer, isStaff }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
