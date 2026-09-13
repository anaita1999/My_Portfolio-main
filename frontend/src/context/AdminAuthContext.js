import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import API_BASE from '../apiConfig';

const EMAIL_KEY = 'ap_admin_email';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  // The session is held in an HttpOnly cookie; JavaScript never receives the token.
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(() => localStorage.getItem(EMAIL_KEY) || null);
  const [checking, setChecking] = useState(true);

  // Send the HttpOnly session cookie on API requests.
  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, [token]);

  const verifySession = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/admin/verify`, {
        timeout: 3000,
        withCredentials: true,
      });
      if (res.data && res.data.valid) {
        setToken('authenticated');
        setEmail(res.data.email);
        setChecking(false);
        return true;
      }
    } catch {
      setToken(null);
      setEmail(null);
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

  // Step 2: Submit 2FA Code -> server sets an HttpOnly session cookie.
  const loginStep2 = async (tempToken, code) => {
    const res = await axios.post(`${API_BASE}/api/admin/login-step2`, {
      temp_token: tempToken,
      code: code.trim(),
    }, { withCredentials: true });
    const data = res.data;
    if (data.success) {
      setToken('authenticated');
      setEmail(data.email);
      localStorage.setItem(EMAIL_KEY, data.email);
    }
    return data;
  };

  const logout = () => {
    axios.post(`${API_BASE}/api/admin/logout`, null, { withCredentials: true }).catch(() => {});
    setToken(null);
    setEmail(null);
    localStorage.removeItem(EMAIL_KEY);
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
