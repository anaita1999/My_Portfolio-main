import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE = (process.env.REACT_APP_BACKEND_URL || '').replace(/\/$/, '');
const TOKEN_KEY = 'ap_admin_token';
const EMAIL_KEY = 'ap_admin_email';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null);
  const [email, setEmail] = useState(() => localStorage.getItem(EMAIL_KEY) || null);
  const [checking, setChecking] = useState(true);

  // Configure global axios auth header if token exists
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  const verifySession = useCallback(async () => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (!savedToken) {
      setChecking(false);
      return false;
    }
    try {
      const res = await axios.get(`${API_BASE}/api/admin/verify`, {
        headers: { Authorization: `Bearer ${savedToken}` },
        timeout: 3000,
      });
      if (res.data && res.data.valid) {
        setToken(savedToken);
        setEmail(res.data.email);
        setChecking(false);
        return true;
      }
    } catch {
      setToken(null);
      setEmail(null);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(EMAIL_KEY);
    }
    setChecking(false);
    return false;
  }, []);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  // Step 1: Submit Email & Password -> returns { temp_token }
  const loginStep1 = async (adminEmail, password) => {
    const res = await axios.post(`${API_BASE}/api/admin/login-step1`, {
      email: adminEmail.trim(),
      password,
    });
    return res.data;
  };

  // Step 2: Submit 2FA Code -> returns { access_token }
  const loginStep2 = async (tempToken, code) => {
    const res = await axios.post(`${API_BASE}/api/admin/login-step2`, {
      temp_token: tempToken,
      code: code.trim(),
    });
    const data = res.data;
    if (data.access_token) {
      setToken(data.access_token);
      setEmail(data.email);
      localStorage.setItem(TOKEN_KEY, data.access_token);
      localStorage.setItem(EMAIL_KEY, data.email);
    }
    return data;
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AdminAuthContext.Provider
      value={{
        token,
        email,
        isAuthenticated: !!token,
        checking,
        loginStep1,
        loginStep2,
        logout,
        verifySession,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return ctx;
}
