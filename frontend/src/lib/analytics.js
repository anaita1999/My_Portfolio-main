// Lightweight in-memory analytics client that batches section-view events
// to the backend. Fire-and-forget; failures are silent.

import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

let queue = [];
let timer = null;

const flush = () => {
  if (queue.length === 0) return;
  const events = queue;
  queue = [];
  axios
    .post(`${API}/analytics/events`, { events })
    .catch(() => {
      /* silent */
    });
};

const enqueue = (event) => {
  queue.push({
    ...event,
    at: new Date().toISOString(),
    session: getSession(),
    referrer: document.referrer || null,
    path: window.location.pathname,
  });
  if (timer) clearTimeout(timer);
  timer = setTimeout(flush, 900);
};

const getSession = () => {
  const key = 'ap_session';
  let s = sessionStorage.getItem(key);
  if (!s) {
    s = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem(key, s);
  }
  return s;
};

export const track = (type, payload = {}) => {
  enqueue({ type, ...payload });
};

// Auto-flush on visibility change/unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', flush);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush();
  });
}
