import { useEffect, useState } from 'react';

const KEY = 'ap_currency';

function detectDefault() {
  try {
    const lang = (navigator.language || 'en-US').toLowerCase();
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (lang.endsWith('-in') || lang === 'hi' || lang.startsWith('hi-')) return 'INR';
    if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') return 'INR';
    return 'USD';
  } catch {
    return 'INR';
  }
}

export default function useCurrency() {
  const [currency, setCurrencyState] = useState('INR');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === 'INR' || saved === 'USD') {
        setCurrencyState(saved);
        return;
      }
    } catch {
      /* ignore */
    }
    setCurrencyState(detectDefault());
  }, []);

  const setCurrency = (c) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(KEY, c);
    } catch {
      /* ignore */
    }
  };

  return [currency, setCurrency];
}

export const BUDGET_PILLS = {
  INR: ['< ₹1L', '₹1L – ₹3L', '₹3L – ₹6L', '₹6L+'],
  USD: ['< $1.2k', '$1.2k – $3.5k', '$3.5k – $7k', '$7k+'],
};

export const DEFAULT_BUDGET = { INR: '₹1L – ₹3L', USD: '$1.2k – $3.5k' };
