// Centralized API Base Configuration
// In production unified deployment, relative requests (/api/...) ensure same-origin routing with zero CORS/Mixed-Content issues.

export const getApiBase = () => {
  const envUrl = process.env.REACT_APP_BACKEND_URL;
  
  // If running in production or served from web host
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
      return envUrl.replace(/\/$/, '');
    }
    return '';
  }

  // Local development fallback
  return (envUrl || 'http://127.0.0.1:8001').replace(/\/$/, '');
};

export const API_BASE = getApiBase();
export default API_BASE;
