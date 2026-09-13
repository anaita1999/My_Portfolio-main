import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  PROFILE as DEFAULT_PROFILE,
  SKILLS as DEFAULT_SKILLS,
  PROJECTS as DEFAULT_PROJECTS,
  EXPERIENCE as DEFAULT_EXPERIENCE,
  EDUCATION as DEFAULT_EDUCATION,
  CERTIFICATIONS as DEFAULT_CERTIFICATIONS,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
} from '@/lib/portfolioData';

import API_BASE from '../apiConfig';

const DEFAULT_PRICING = {
  hourly_rate_inr: '₹2,500 / hr',
  hourly_rate_usd: '$35 / hr',
  monthly_retainer_inr: '₹1,20,000 / mo',
  monthly_retainer_usd: '$1,500 / mo',
  budget_pills_inr: ['< ₹1L', '₹1L – ₹3L', '₹3L – ₹6L', '₹6L+'],
  budget_pills_usd: ['< $1.2k', '$1.2k – $3.5k', '$3.5k – $7k', '$7k+'],
  default_budget_inr: '₹1L – ₹3L',
  default_budget_usd: '$1.2k – $3.5k',
};

const PortfolioContentContext = createContext(null);

export function PortfolioContentProvider({ children }) {
  const [content, setContent] = useState({
    profile: DEFAULT_PROFILE,
    pricing: DEFAULT_PRICING,
    skills: DEFAULT_SKILLS,
    projects: DEFAULT_PROJECTS,
    experience: DEFAULT_EXPERIENCE,
    education: DEFAULT_EDUCATION,
    certifications: DEFAULT_CERTIFICATIONS,
    testimonials: DEFAULT_TESTIMONIALS,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [arisetekContent, setArisetekContent] = useState({});

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      const [res, arisetekRes] = await Promise.allSettled([
        axios.get(`${API_BASE}/api/content`, { timeout: 4000 }),
        axios.get(`${API_BASE}/api/arisetek-content`, { timeout: 4000 })
      ]);
      
      if (res.status === 'fulfilled' && res.value.data && typeof res.value.data === 'object') {
        setContent((prev) => ({
          ...prev,
          ...res.value.data,
          profile: res.value.data.profile || prev.profile,
          pricing: res.value.data.pricing || prev.pricing,
          skills: res.value.data.skills || prev.skills,
          projects: res.value.data.projects || prev.projects,
          experience: res.value.data.experience || prev.experience,
          education: res.value.data.education || prev.education,
          certifications: res.value.data.certifications || prev.certifications,
          testimonials: res.value.data.testimonials || prev.testimonials,
        }));
        setError(null);
      }
      
      if (arisetekRes.status === 'fulfilled' && arisetekRes.value.data && typeof arisetekRes.value.data === 'object') {
        setArisetekContent(arisetekRes.value.data);
      }
    } catch (err) {
      console.warn('Using default offline portfolio content:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const updateSectionLocally = useCallback((section, data, isArisetek = false) => {
    if (isArisetek) {
      setArisetekContent((prev) => ({
        ...prev,
        [section]: data,
      }));
    } else {
      setContent((prev) => ({
        ...prev,
        [section]: data,
      }));
    }
  }, []);

  return (
    <PortfolioContentContext.Provider
      value={{
        content,
        arisetekContent,
        profile: content.profile || DEFAULT_PROFILE,
        pricing: content.pricing || DEFAULT_PRICING,
        skills: content.skills || DEFAULT_SKILLS,
        projects: content.projects || DEFAULT_PROJECTS,
        experience: content.experience || DEFAULT_EXPERIENCE,
        education: content.education || DEFAULT_EDUCATION,
        certifications: content.certifications || DEFAULT_CERTIFICATIONS,
        testimonials: content.testimonials || DEFAULT_TESTIMONIALS,
        loading,
        error,
        refreshContent: fetchContent,
        updateSectionLocally,
      }}
    >
      {children}
    </PortfolioContentContext.Provider>
  );
}

export function usePortfolioContent() {
  const ctx = useContext(PortfolioContentContext);
  if (!ctx) {
    throw new Error('usePortfolioContent must be used within PortfolioContentProvider');
  }
  return ctx;
}
