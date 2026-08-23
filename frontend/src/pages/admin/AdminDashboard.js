import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { usePortfolioContent } from '@/context/PortfolioContentContext';
import CustomCursor from '@/components/portfolio/CustomCursor';

const API_BASE = (process.env.REACT_APP_BACKEND_URL || '').replace(/\/$/, '');

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, checking, email, logout } = useAdminAuth();
  const {
    content,
    profile: ctxProfile,
    pricing: ctxPricing,
    skills: ctxSkills,
    projects: ctxProjects,
    experience: ctxExperience,
    education: ctxEducation,
    certifications: ctxCertifications,
    testimonials: ctxTestimonials,
    refreshContent,
  } = usePortfolioContent();

  const [activeTab, setActiveTab] = useState('pricing');
  const [saving, setSaving] = useState(false);

  // Local form states
  const [pricing, setPricing] = useState(ctxPricing);
  const [profile, setProfile] = useState(ctxProfile);
  const [education, setEducation] = useState(ctxEducation || []);
  const [skills, setSkills] = useState(ctxSkills || []);
  const [projects, setProjects] = useState(ctxProjects || []);
  const [experience, setExperience] = useState(ctxExperience || []);
  const [certifications, setCertifications] = useState(ctxCertifications || []);
  const [testimonials, setTestimonials] = useState(ctxTestimonials || []);

  // Inquiries / Leads Inbox
  const [contacts, setContacts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loadingInbox, setLoadingInbox] = useState(false);

  // Security / 2FA state
  const [twoFaData, setTwoFaData] = useState(null);
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Project Modal / Edit state
  const [editingProject, setEditingProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!checking && !isAuthenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [checking, isAuthenticated, navigate]);

  // Sync state when context loads
  useEffect(() => {
    if (content) {
      if (content.pricing) setPricing(content.pricing);
      if (content.profile) setProfile(content.profile);
      if (content.education) setEducation(content.education);
      if (content.skills) setSkills(content.skills);
      if (content.projects) setProjects(content.projects);
      if (content.experience) setExperience(content.experience);
      if (content.certifications) setCertifications(content.certifications);
      if (content.testimonials) setTestimonials(content.testimonials);
    }
  }, [content]);

  // Fetch Inbox Data
  const fetchInbox = useCallback(async () => {
    try {
      setLoadingInbox(true);
      const [cRes, lRes] = await Promise.all([
        axios.get(`${API_BASE}/api/admin/contacts`),
        axios.get(`${API_BASE}/api/admin/leads`),
      ]);
      setContacts(cRes.data || []);
      setLeads(lRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingInbox(false);
    }
  }, []);

  // Fetch 2FA Details
  const fetch2Fa = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/admin/2fa-setup`);
      setTwoFaData(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleRegenerateBackupCodes = async () => {
    if (!window.confirm('Are you sure you want to regenerate emergency recovery codes? Any previous unconsumed backup codes will be permanently invalidated.')) {
      return;
    }
    try {
      const res = await axios.post(`${API_BASE}/api/admin/regenerate-backup-codes`);
      setTwoFaData((prev) => ({ ...prev, backup_codes: res.data.backup_codes }));
      toast.success('Fresh emergency recovery codes generated!');
    } catch (err) {
      toast.error('Failed to regenerate recovery codes.');
    }
  };

  useEffect(() => {
    if (activeTab === 'inbox') fetchInbox();
    if (activeTab === 'security') fetch2Fa();
  }, [activeTab, fetchInbox, fetch2Fa]);

  // Generic Save Section Helper
  const saveSection = async (sectionKey, data, label) => {
    setSaving(true);
    try {
      await axios.put(`${API_BASE}/api/admin/content/${sectionKey}`, { data });
      toast.success(`${label || sectionKey} updated and published live!`);
      refreshContent();
    } catch (err) {
      const detail = err.response?.data?.detail || 'Failed to save changes.';
      toast.error(detail);
    } finally {
      setSaving(false);
    }
  };

  // Handlers for Projects
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.slug) {
      toast.error('Project Title and Slug are required.');
      return;
    }
    setSaving(true);
    try {
      if (editingProject.id && projects.some((p) => p.id === editingProject.id)) {
        await axios.put(`${API_BASE}/api/admin/projects/${editingProject.id}`, editingProject);
        toast.success(`Project "${editingProject.title}" updated!`);
      } else {
        await axios.post(`${API_BASE}/api/admin/projects`, editingProject);
        toast.success(`New project "${editingProject.title}" created!`);
      }
      setShowProjectModal(false);
      setEditingProject(null);
      refreshContent();
    } catch (err) {
      toast.error('Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await axios.delete(`${API_BASE}/api/admin/projects/${id}`);
      toast.success(`Project deleted.`);
      refreshContent();
    } catch (err) {
      toast.error('Failed to delete project.');
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/admin/contacts/${id}`);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      toast.success('Contact inquiry deleted.');
    } catch {
      toast.error('Could not delete contact.');
    }
  };

  const handleDeleteLead = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/admin/leads/${id}`);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      toast.success('Hire lead deleted.');
    } catch {
      toast.error('Could not delete lead.');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currPassword || !newPassword || newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long.');
      return;
    }
    try {
      await axios.post(`${API_BASE}/api/admin/change-password`, {
        current_password: currPassword,
        new_password: newPassword,
      });
      toast.success('Admin password updated successfully.');
      setCurrPassword('');
      setNewPassword('');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to change password.');
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#05070a] text-white flex items-center justify-center font-mono text-sm">
        Verifying Security Credentials...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070a] text-[#dfe7e0] flex flex-col font-sans">
      <CustomCursor />

      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-50 bg-[rgba(10,14,20,0.92)] backdrop-blur-xl border-b border-[rgba(224,35,28,0.2)] px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-[#e0231c] text-white font-mono font-bold text-xs flex items-center justify-center shadow-[0_0_16px_rgba(224,35,28,0.6)]">
            AP
          </div>
          <div>
            <h1 className="font-display text-sm font-medium tracking-wider text-white">
              Portfolio <span className="text-[#e0231c]">Command CMS</span>
            </h1>
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#78837c] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#32d278] shadow-[0_0_6px_#32d278]" />
              2FA Protected · {email}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-md font-mono text-[10px] uppercase tracking-wider text-[#aab4ad] border border-[rgba(223,231,224,0.14)] hover:text-white hover:border-[#e0231c] transition-colors inline-flex items-center gap-1.5"
          >
            Live Site ↗
          </Link>
          <button
            onClick={logout}
            className="px-3.5 py-1.5 rounded-md font-mono text-[10px] uppercase tracking-wider text-[#ff5a3c] bg-[rgba(224,35,28,0.1)] border border-[rgba(224,35,28,0.3)] hover:bg-[#e0231c] hover:text-white transition-all"
          >
            Log Out 🔒
          </button>
        </div>
      </header>

      {/* Main Admin Content Layout */}
      <div className="flex-1 flex flex-col md:flex-row max-w-[1600px] w-full mx-auto p-4 md:p-6 gap-6">
        {/* Navigation Sidebar Tabs */}
        <aside className="w-full md:w-64 flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0 shrink-0">
          {[
            { id: 'pricing', label: '💰 Pricing & Rates', icon: '₹' },
            { id: 'projects', label: '🚀 Selected Works', icon: '⛩️' },
            { id: 'about', label: '⛩️ The Threshold', icon: '👤' },
            { id: 'skills', label: '⚡ Sacred Craft', icon: '✨' },
            { id: 'experience', label: '📜 Career Journey', icon: '💼' },
            { id: 'certifications', label: '🏅 Credentials', icon: '🎓' },
            { id: 'testimonials', label: '💬 Kind Words', icon: '⭐' },
            { id: 'inbox', label: '📬 Inquiries & Leads', icon: '✉️' },
            { id: 'security', label: '🛡️ 2FA & Password', icon: '🔐' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 rounded-xl font-mono text-[11px] uppercase tracking-[0.16em] text-left whitespace-nowrap transition-all duration-200 flex items-center justify-between ${
                activeTab === tab.id
                  ? 'bg-[rgba(224,35,28,0.18)] text-white border border-[rgba(224,35,28,0.4)] shadow-[0_0_15px_rgba(224,35,28,0.15)] font-semibold'
                  : 'text-[#78837c] hover:text-[#dfe7e0] hover:bg-[rgba(255,255,255,0.03)] border border-transparent'
              }`}
            >
              <span>{tab.label}</span>
              {activeTab === tab.id && <span className="w-1.5 h-1.5 rounded-full bg-[#e0231c] shadow-[0_0_6px_#e0231c]" />}
            </button>
          ))}
        </aside>

        {/* Dynamic Tab Panes */}
        <main className="flex-1 bg-[rgba(10,14,20,0.6)] border border-[rgba(223,231,224,0.08)] rounded-2xl p-6 relative overflow-hidden backdrop-blur-xl">
          {/* TAB 1: PRICING & RATES */}
          {activeTab === 'pricing' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-[rgba(223,231,224,0.08)] pb-4">
                <div>
                  <h2 className="font-display text-xl text-white">Pricing & Rate Control</h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78837c] mt-1">
                    Manage hourly rates, retainers, and localized budget options (INR ₹ & USD $)
                  </p>
                </div>
                <button
                  onClick={() => saveSection('pricing', pricing, 'Pricing & Rates')}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#e0231c] hover:bg-[#ff3b2f] transition-all shadow-[0_0_16px_rgba(224,35,28,0.4)] disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Pricing Changes ✓'}
                </button>
              </div>

              {/* Rates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(223,231,224,0.08)] space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#ffd15c] flex items-center gap-2">
                    <span>🇮🇳</span> India Rates (INR ₹)
                  </h3>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Hourly Rate</label>
                    <input
                      type="text"
                      value={pricing?.hourly_rate_inr || ''}
                      onChange={(e) => setPricing({ ...pricing, hourly_rate_inr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#e0231c]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Monthly Retainer</label>
                    <input
                      type="text"
                      value={pricing?.monthly_retainer_inr || ''}
                      onChange={(e) => setPricing({ ...pricing, monthly_retainer_inr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#e0231c]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Budget Pills (Comma separated)</label>
                    <input
                      type="text"
                      value={(pricing?.budget_pills_inr || []).join(', ')}
                      onChange={(e) => setPricing({ ...pricing, budget_pills_inr: e.target.value.split(',').map((s) => s.trim()) })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#e0231c]"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(223,231,224,0.08)] space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#32d278] flex items-center gap-2">
                    <span>🌍</span> Global Rates (USD $)
                  </h3>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Hourly Rate</label>
                    <input
                      type="text"
                      value={pricing?.hourly_rate_usd || ''}
                      onChange={(e) => setPricing({ ...pricing, hourly_rate_usd: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#e0231c]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Monthly Retainer</label>
                    <input
                      type="text"
                      value={pricing?.monthly_retainer_usd || ''}
                      onChange={(e) => setPricing({ ...pricing, monthly_retainer_usd: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#e0231c]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Budget Pills (Comma separated)</label>
                    <input
                      type="text"
                      value={(pricing?.budget_pills_usd || []).join(', ')}
                      onChange={(e) => setPricing({ ...pricing, budget_pills_usd: e.target.value.split(',').map((s) => s.trim()) })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#e0231c]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS / SELECTED WORKS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[rgba(223,231,224,0.08)] pb-4">
                <div>
                  <h2 className="font-display text-xl text-white">Selected Works & Case Studies</h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78837c] mt-1">
                    Add future projects, update case study paragraphs, live links, and metrics
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingProject({
                      id: `proj-${Date.now().toString(36)}`,
                      slug: '',
                      title: '',
                      category: 'Agentic AI · Full-Stack',
                      tagline: '',
                      year: '2026',
                      featured: true,
                      color: '#e0231c',
                      emoji: '⚡',
                      stack: ['React', 'Python', 'FastAPI'],
                      summary: '',
                      github: 'https://github.com/anaita1999',
                      live: '',
                      sections: {
                        overview: '',
                        architecture: '',
                        problem: '',
                        solution: '',
                        metrics: ['100% Automated', 'High Performance'],
                      },
                    });
                    setShowProjectModal(true);
                  }}
                  className="px-4 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#e0231c] hover:bg-[#ff3b2f] transition-all shadow-[0_0_16px_rgba(224,35,28,0.4)]"
                >
                  + Add New Project
                </button>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((p) => (
                  <div
                    key={p.id || p.slug}
                    className="p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(223,231,224,0.08)] flex flex-col justify-between hover:border-[rgba(224,35,28,0.3)] transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{p.emoji || '⛩️'}</span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#78837c]">{p.year}</span>
                      </div>
                      <h3 className="font-display text-lg text-white font-medium">{p.title}</h3>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-[#e0231c] mt-0.5">{p.category}</p>
                      <p className="text-xs text-[#aab4ad] mt-2 line-clamp-2">{p.tagline || p.summary}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-5 pt-3 border-t border-[rgba(223,231,224,0.06)]">
                      <button
                        onClick={() => {
                          setEditingProject(p);
                          setShowProjectModal(true);
                        }}
                        className="px-3 py-1.5 rounded bg-[rgba(255,255,255,0.05)] hover:bg-[#e0231c] hover:text-white font-mono text-[10px] uppercase tracking-wider transition-colors"
                      >
                        Edit Details ✏️
                      </button>
                      <Link
                        to={`/work/${p.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 rounded bg-[rgba(255,255,255,0.05)] hover:bg-white/10 font-mono text-[10px] uppercase tracking-wider text-[#78837c] transition-colors"
                      >
                        Preview ↗
                      </Link>
                      <button
                        onClick={() => handleDeleteProject(p.id, p.title)}
                        className="ml-auto px-3 py-1.5 rounded text-[#ff5a3c] hover:bg-[rgba(224,35,28,0.15)] font-mono text-[10px] uppercase tracking-wider transition-colors"
                      >
                        Delete 🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: THE THRESHOLD (ABOUT & PROFILE) */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[rgba(223,231,224,0.08)] pb-4">
                <div>
                  <h2 className="font-display text-xl text-white">The Threshold (About & Profile)</h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78837c] mt-1">
                    Edit identity, bio, contact channels, and education timeline
                  </p>
                </div>
                <button
                  onClick={async () => {
                    await saveSection('profile', profile, 'Profile');
                    await saveSection('education', education, 'Education');
                  }}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#e0231c] hover:bg-[#ff3b2f] transition-all shadow-[0_0_16px_rgba(224,35,28,0.4)] disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Profile Changes ✓'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={profile?.name || ''}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#e0231c]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Headline Roles</label>
                    <input
                      type="text"
                      value={profile?.role || ''}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#e0231c]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Tagline</label>
                    <input
                      type="text"
                      value={profile?.tagline || ''}
                      onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#e0231c]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={profile?.email || ''}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#e0231c]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Phone Number</label>
                    <input
                      type="text"
                      value={profile?.phone || ''}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#e0231c]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Bio Paragraph</label>
                    <textarea
                      rows={6}
                      value={profile?.bio || ''}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#e0231c] leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Location</label>
                    <input
                      type="text"
                      value={profile?.location || ''}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#e0231c]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      value={profile?.linkedin || ''}
                      onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#e0231c]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SACRED CRAFT (SKILLS) */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[rgba(223,231,224,0.08)] pb-4">
                <div>
                  <h2 className="font-display text-xl text-white">Sacred Craft (Skills & Stack)</h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78837c] mt-1">
                    Manage mastery bars, skill cards, and technical descriptions
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const newSkill = {
                        name: 'New Core Skill',
                        category: 'AI & Data',
                        desc: 'Description of technical capabilities and tooling.',
                        mastery: '95%',
                      };
                      setSkills([newSkill, ...skills]);
                    }}
                    className="px-3.5 py-2 rounded-lg font-mono text-xs uppercase tracking-wider text-[#dfe7e0] bg-[rgba(255,255,255,0.06)] hover:bg-white/10"
                  >
                    + Add Skill Card
                  </button>
                  <button
                    onClick={() => saveSection('skills', skills, 'Skills')}
                    disabled={saving}
                    className="px-5 py-2 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#e0231c] hover:bg-[#ff3b2f] transition-all shadow-[0_0_16px_rgba(224,35,28,0.4)] disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Skills ✓'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(223,231,224,0.08)] space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <input
                        type="text"
                        value={typeof s === 'string' ? s : s.name}
                        onChange={(e) => {
                          const updated = [...skills];
                          if (typeof updated[idx] === 'string') {
                            updated[idx] = { name: e.target.value, category: 'Engineering', desc: '', mastery: '90%' };
                          } else {
                            updated[idx] = { ...updated[idx], name: e.target.value };
                          }
                          setSkills(updated);
                        }}
                        className="font-medium text-white bg-transparent border-b border-[rgba(223,231,224,0.14)] focus:border-[#e0231c] focus:outline-none text-sm w-1/2 py-1"
                      />
                      <input
                        type="text"
                        placeholder="Category"
                        value={s.category || 'Core'}
                        onChange={(e) => {
                          const updated = [...skills];
                          updated[idx] = { ...updated[idx], category: e.target.value };
                          setSkills(updated);
                        }}
                        className="font-mono text-[10px] uppercase text-[#ffd15c] bg-transparent border-b border-[rgba(223,231,224,0.14)] focus:border-[#e0231c] focus:outline-none w-1/4 py-1 text-center"
                      />
                      <input
                        type="text"
                        placeholder="Mastery"
                        value={s.mastery || '95%'}
                        onChange={(e) => {
                          const updated = [...skills];
                          updated[idx] = { ...updated[idx], mastery: e.target.value };
                          setSkills(updated);
                        }}
                        className="font-mono text-[10px] text-[#32d278] bg-transparent border-b border-[rgba(223,231,224,0.14)] focus:border-[#e0231c] focus:outline-none w-16 py-1 text-right"
                      />
                      <button
                        onClick={() => setSkills(skills.filter((_, i) => i !== idx))}
                        className="text-[#ff5a3c] hover:text-white text-xs px-1"
                      >
                        ✕
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Skill description..."
                      value={s.desc || ''}
                      onChange={(e) => {
                        const updated = [...skills];
                        updated[idx] = { ...updated[idx], desc: e.target.value };
                        setSkills(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded bg-[rgba(255,255,255,0.03)] border border-[rgba(223,231,224,0.06)] text-xs text-[#aab4ad] focus:outline-none focus:border-[#e0231c]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CAREER JOURNEY (EXPERIENCE) */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[rgba(223,231,224,0.08)] pb-4">
                <div>
                  <h2 className="font-display text-xl text-white">Career Journey (Experience)</h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78837c] mt-1">
                    Manage work timeline, company roles, and achievements
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const newExp = {
                        id: `exp-${Date.now().toString(36)}`,
                        year: '2026 →',
                        role: 'Agentic AI Developer',
                        company: 'Arisetek IT Solutions',
                        location: 'Kolkata',
                        track: 'design',
                        bullets: ['Architected autonomous LLM agents and web systems.'],
                      };
                      setExperience([newExp, ...experience]);
                    }}
                    className="px-3.5 py-2 rounded-lg font-mono text-xs uppercase tracking-wider text-[#dfe7e0] bg-[rgba(255,255,255,0.06)] hover:bg-white/10"
                  >
                    + Add Experience Role
                  </button>
                  <button
                    onClick={() => saveSection('experience', experience, 'Experience')}
                    disabled={saving}
                    className="px-5 py-2 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#e0231c] hover:bg-[#ff3b2f] transition-all shadow-[0_0_16px_rgba(224,35,28,0.4)] disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Experience ✓'}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div
                    key={exp.id || idx}
                    className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(223,231,224,0.08)] space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block font-mono text-[9px] uppercase text-[#78837c]">Role Title</label>
                        <input
                          type="text"
                          value={exp.role || ''}
                          onChange={(e) => {
                            const updated = [...experience];
                            updated[idx] = { ...updated[idx], role: e.target.value };
                            setExperience(updated);
                          }}
                          className="w-full font-medium text-white bg-transparent border-b border-[rgba(223,231,224,0.14)] focus:border-[#e0231c] focus:outline-none text-sm py-1"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase text-[#78837c]">Company Name</label>
                        <input
                          type="text"
                          value={exp.company || ''}
                          onChange={(e) => {
                            const updated = [...experience];
                            updated[idx] = { ...updated[idx], company: e.target.value };
                            setExperience(updated);
                          }}
                          className="w-full text-white bg-transparent border-b border-[rgba(223,231,224,0.14)] focus:border-[#e0231c] focus:outline-none text-sm py-1"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase text-[#78837c]">Year Range</label>
                        <input
                          type="text"
                          value={exp.year || ''}
                          onChange={(e) => {
                            const updated = [...experience];
                            updated[idx] = { ...updated[idx], year: e.target.value };
                            setExperience(updated);
                          }}
                          className="w-full font-mono text-xs text-[#ffd15c] bg-transparent border-b border-[rgba(223,231,224,0.14)] focus:border-[#e0231c] focus:outline-none py-1"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block font-mono text-[9px] uppercase text-[#78837c]">Track Type</label>
                          <select
                            value={exp.track || 'design'}
                            onChange={(e) => {
                              const updated = [...experience];
                              updated[idx] = { ...updated[idx], track: e.target.value };
                              setExperience(updated);
                            }}
                            className="bg-[#0a0e14] text-xs text-[#dfe7e0] border border-[rgba(223,231,224,0.14)] rounded px-2 py-1"
                          >
                            <option value="design">Design & Dev</option>
                            <option value="risk">Risk & Operations</option>
                          </select>
                        </div>
                        <button
                          onClick={() => setExperience(experience.filter((_, i) => i !== idx))}
                          className="text-[#ff5a3c] hover:text-white text-xs px-2"
                        >
                          Delete 🗑️
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] uppercase text-[#78837c] mb-1">Key Responsibilities (One per line)</label>
                      <textarea
                        rows={2}
                        value={(exp.bullets || []).join('\n')}
                        onChange={(e) => {
                          const updated = [...experience];
                          updated[idx] = { ...updated[idx], bullets: e.target.value.split('\n') };
                          setExperience(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-[rgba(255,255,255,0.03)] border border-[rgba(223,231,224,0.06)] text-xs text-[#aab4ad] focus:outline-none focus:border-[#e0231c]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CREDENTIALS (CERTIFICATIONS) */}
          {activeTab === 'certifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[rgba(223,231,224,0.08)] pb-4">
                <div>
                  <h2 className="font-display text-xl text-white">Credentials & Certifications</h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78837c] mt-1">
                    Manage professional credentials and verification badges
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const newCert = {
                        id: `cert-${Date.now().toString(36)}`,
                        title: 'New Professional Certificate',
                        issuer: 'Organization Name',
                        year: '2026',
                        url: '',
                      };
                      setCertifications([newCert, ...certifications]);
                    }}
                    className="px-3.5 py-2 rounded-lg font-mono text-xs uppercase tracking-wider text-[#dfe7e0] bg-[rgba(255,255,255,0.06)] hover:bg-white/10"
                  >
                    + Add Certificate
                  </button>
                  <button
                    onClick={() => saveSection('certifications', certifications, 'Certifications')}
                    disabled={saving}
                    className="px-5 py-2 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#e0231c] hover:bg-[#ff3b2f] transition-all shadow-[0_0_16px_rgba(224,35,28,0.4)] disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Credentials ✓'}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {certifications.map((c, idx) => (
                  <div
                    key={c.id || idx}
                    className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(223,231,224,0.08)] grid grid-cols-1 sm:grid-cols-4 gap-3 items-center"
                  >
                    <div>
                      <label className="block font-mono text-[9px] uppercase text-[#78837c]">Title</label>
                      <input
                        type="text"
                        value={c.title || ''}
                        onChange={(e) => {
                          const updated = [...certifications];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setCertifications(updated);
                        }}
                        className="w-full text-white bg-transparent border-b border-[rgba(223,231,224,0.14)] focus:border-[#e0231c] focus:outline-none text-sm py-1"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] uppercase text-[#78837c]">Issuer</label>
                      <input
                        type="text"
                        value={c.issuer || ''}
                        onChange={(e) => {
                          const updated = [...certifications];
                          updated[idx] = { ...updated[idx], issuer: e.target.value };
                          setCertifications(updated);
                        }}
                        className="w-full text-white bg-transparent border-b border-[rgba(223,231,224,0.14)] focus:border-[#e0231c] focus:outline-none text-sm py-1"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] uppercase text-[#78837c]">Credential URL</label>
                      <input
                        type="text"
                        value={c.url || ''}
                        onChange={(e) => {
                          const updated = [...certifications];
                          updated[idx] = { ...updated[idx], url: e.target.value };
                          setCertifications(updated);
                        }}
                        className="w-full font-mono text-xs text-[#32d278] bg-transparent border-b border-[rgba(223,231,224,0.14)] focus:border-[#e0231c] focus:outline-none py-1"
                      />
                    </div>
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => setCertifications(certifications.filter((_, i) => i !== idx))}
                        className="text-[#ff5a3c] hover:text-white text-xs px-2"
                      >
                        Delete 🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: KIND WORDS (TESTIMONIALS) */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[rgba(223,231,224,0.08)] pb-4">
                <div>
                  <h2 className="font-display text-xl text-white">Kind Words (Testimonials)</h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78837c] mt-1">
                    Manage client reviews, recommendations, and quotes
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const newTest = {
                        id: `test-${Date.now().toString(36)}`,
                        name: 'Client Name',
                        role: 'Co-Founder & CEO',
                        company: 'Company',
                        quote: 'Anaita delivered exceptional work with precision, speed, and creative elegance.',
                        rating: 5,
                      };
                      setTestimonials([newTest, ...testimonials]);
                    }}
                    className="px-3.5 py-2 rounded-lg font-mono text-xs uppercase tracking-wider text-[#dfe7e0] bg-[rgba(255,255,255,0.06)] hover:bg-white/10"
                  >
                    + Add Testimonial
                  </button>
                  <button
                    onClick={() => saveSection('testimonials', testimonials, 'Testimonials')}
                    disabled={saving}
                    className="px-5 py-2 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#e0231c] hover:bg-[#ff3b2f] transition-all shadow-[0_0_16px_rgba(224,35,28,0.4)] disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Testimonials ✓'}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {testimonials.map((t, idx) => (
                  <div
                    key={t.id || idx}
                    className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(223,231,224,0.08)] space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-mono text-[9px] uppercase text-[#78837c]">Author Name</label>
                        <input
                          type="text"
                          value={t.name || ''}
                          onChange={(e) => {
                            const updated = [...testimonials];
                            updated[idx] = { ...updated[idx], name: e.target.value };
                            setTestimonials(updated);
                          }}
                          className="w-full text-white font-medium bg-transparent border-b border-[rgba(223,231,224,0.14)] focus:border-[#e0231c] focus:outline-none text-sm py-1"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase text-[#78837c]">Role & Company</label>
                        <input
                          type="text"
                          value={t.role ? `${t.role} · ${t.company || ''}` : t.company || ''}
                          onChange={(e) => {
                            const updated = [...testimonials];
                            const parts = e.target.value.split('·');
                            updated[idx] = {
                              ...updated[idx],
                              role: parts[0]?.trim() || '',
                              company: parts[1]?.trim() || '',
                            };
                            setTestimonials(updated);
                          }}
                          className="w-full text-white bg-transparent border-b border-[rgba(223,231,224,0.14)] focus:border-[#e0231c] focus:outline-none text-sm py-1"
                        />
                      </div>
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => setTestimonials(testimonials.filter((_, i) => i !== idx))}
                          className="text-[#ff5a3c] hover:text-white text-xs px-2"
                        >
                          Delete 🗑️
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] uppercase text-[#78837c] mb-1">Quote Text</label>
                      <textarea
                        rows={2}
                        value={t.quote || ''}
                        onChange={(e) => {
                          const updated = [...testimonials];
                          updated[idx] = { ...updated[idx], quote: e.target.value };
                          setTestimonials(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-[rgba(255,255,255,0.03)] border border-[rgba(223,231,224,0.06)] text-xs text-[#aab4ad] focus:outline-none focus:border-[#e0231c] italic"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: INQUIRIES & LEADS INBOX */}
          {activeTab === 'inbox' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-[rgba(223,231,224,0.08)] pb-4">
                <div>
                  <h2 className="font-display text-xl text-white">Inquiries & Leads Inbox</h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78837c] mt-1">
                    Real-time messages received from Contact Form & Hire Me briefs
                  </p>
                </div>
                <button
                  onClick={fetchInbox}
                  disabled={loadingInbox}
                  className="px-3.5 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider text-[#dfe7e0] border border-[rgba(223,231,224,0.14)] hover:border-[#e0231c]"
                >
                  {loadingInbox ? 'Refreshing...' : 'Refresh Inbox 🔄'}
                </button>
              </div>

              {/* Hire Leads Table */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#e0231c] flex items-center gap-2">
                  <span>💼</span> Project Briefs & Hire Inquiries ({leads.length})
                </h3>
                {leads.length === 0 ? (
                  <p className="text-xs text-[#78837c] italic p-4 bg-[rgba(255,255,255,0.02)] rounded-lg">
                    No project briefs received yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {leads.map((l) => (
                      <div
                        key={l.id}
                        className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(223,231,224,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-white text-sm">{l.name}</span>
                            <span className="font-mono text-xs text-[#32d278]">{l.email}</span>
                            <span className="px-2 py-0.5 rounded bg-[rgba(255,209,92,0.15)] text-[#ffd15c] font-mono text-[9px] uppercase tracking-wider">
                              {l.budget}
                            </span>
                          </div>
                          <p className="text-xs text-[#aab4ad]">{l.message}</p>
                          <span className="font-mono text-[9px] text-[#78837c] block">
                            {new Date(l.created_at).toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteLead(l.id)}
                          className="text-[#ff5a3c] hover:text-white font-mono text-[10px] uppercase shrink-0"
                        >
                          Delete 🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Form Messages */}
              <div className="space-y-3 pt-4 border-t border-[rgba(223,231,224,0.08)]">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#ffd15c] flex items-center gap-2">
                  <span>✉️</span> Direct Contact Messages ({contacts.length})
                </h3>
                {contacts.length === 0 ? (
                  <p className="text-xs text-[#78837c] italic p-4 bg-[rgba(255,255,255,0.02)] rounded-lg">
                    No contact messages received yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {contacts.map((c) => (
                      <div
                        key={c.id}
                        className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(223,231,224,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-white text-sm">{c.name}</span>
                            <span className="font-mono text-xs text-[#32d278]">{c.email}</span>
                          </div>
                          <p className="text-xs text-[#aab4ad]">{c.message}</p>
                          <span className="font-mono text-[9px] text-[#78837c] block">
                            {new Date(c.created_at).toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteContact(c.id)}
                          className="text-[#ff5a3c] hover:text-white font-mono text-[10px] uppercase shrink-0"
                        >
                          Delete 🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 9: 2FA & SECURITY CONSOLE */}
          {activeTab === 'security' && (
            <div className="space-y-8">
              <div className="border-b border-[rgba(223,231,224,0.08)] pb-4">
                <h2 className="font-display text-xl text-white">2-Factor Authentication & Security</h2>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78837c] mt-1">
                  Manage RFC 6238 TOTP keys, Authenticator pairing, and admin password
                </p>
              </div>

              {/* 2FA Key Card */}
              <div className="p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(224,35,28,0.3)] space-y-5">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#e0231c] flex items-center gap-2">
                  <span>🛡️</span> Authenticator App Pairing (Google Authenticator / Authy / Apple Passwords)
                </h3>
                <p className="text-xs text-[#aab4ad] leading-relaxed">
                  Scan this QR code with your mobile camera or Authenticator app, or manually copy the Secret Key below:
                </p>

                {/* Visual QR Code Display */}
                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-[rgba(0,0,0,0.6)] border border-[rgba(223,231,224,0.08)]">
                  <div className="p-3 bg-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.15)] shrink-0">
                    <QRCodeSVG
                      value={twoFaData?.otpauth_uri || `otpauth://totp/Anaita%20Pal%20Portfolio%20Admin:anaita.pal.cse@gmail.com?secret=${twoFaData?.secret || 'JBSWY3DPEHPK3PXP'}&issuer=Anaita%20Pal%20Portfolio%20Admin`}
                      size={140}
                      level="M"
                      includeMargin={false}
                    />
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#32d278] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#32d278] shadow-[0_0_6px_#32d278]" />
                      RFC 6238 TOTP Protocol Active
                    </div>
                    <p className="text-xs text-[#dfe7e0]">
                      Open Google Authenticator, tap <strong>(+) Scan a QR code</strong>, and point your camera at the box on the left.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                      <input
                        type="text"
                        readOnly
                        value={twoFaData?.secret || 'JBSWY3DPEHPK3PXP'}
                        className="w-full font-mono text-xs px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.06)] border border-[rgba(223,231,224,0.12)] text-[#ffd15c]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(twoFaData?.secret || 'JBSWY3DPEHPK3PXP');
                          toast.success('2FA Secret Key copied to clipboard!');
                        }}
                        className="px-3.5 py-2 rounded-lg font-mono text-[11px] uppercase tracking-wider text-white bg-[#e0231c] hover:bg-[#ff3b2f] shrink-0"
                      >
                        Copy Key 📋
                      </button>
                    </div>
                  </div>
                </div>

                {twoFaData?.backup_codes && (
                  <div className="mt-4 pt-4 border-t border-[rgba(223,231,224,0.08)]">
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="block font-mono text-[10px] uppercase text-[#78837c]">
                        Emergency Backup Recovery Codes:
                      </label>
                      <button
                        type="button"
                        onClick={handleRegenerateBackupCodes}
                        className="font-mono text-[10px] uppercase tracking-wider text-[#ffd15c] hover:text-white underline decoration-dotted transition-colors flex items-center gap-1"
                      >
                        <span>🔄</span> Regenerate New Codes
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {twoFaData.backup_codes.map((code, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1.5 rounded bg-[rgba(255,255,255,0.04)] font-mono text-[10px] text-[#dfe7e0] text-center border border-[rgba(223,231,224,0.06)]"
                        >
                          {code}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Password Change Form */}
              <form onSubmit={handleChangePassword} className="p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(223,231,224,0.08)] space-y-4 max-w-md">
                <h3 className="font-mono text-xs uppercase tracking-wider text-white">Change Admin Password</h3>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1">Current Password</label>
                  <input
                    type="password"
                    required
                    value={currPassword}
                    onChange={(e) => setCurrPassword(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1">New Password (Min 8 chars)</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#e0231c] hover:bg-[#ff3b2f]"
                >
                  Update Password 🔒
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Project Add / Edit Modal Drawer */}
      {showProjectModal && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0a0e14] border border-[rgba(224,35,28,0.3)] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[rgba(223,231,224,0.08)] pb-4">
              <h3 className="font-display text-lg text-white">
                {editingProject.id ? 'Edit Project Details' : 'Add New Project'}
              </h3>
              <button
                onClick={() => setShowProjectModal(false)}
                className="font-mono text-xs text-[#78837c] hover:text-white"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1">URL Slug (e.g. quantum-ai) *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1">Category</label>
                  <input
                    type="text"
                    value={editingProject.category || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1">Year</label>
                  <input
                    type="text"
                    value={editingProject.year || '2026'}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1">Emoji Icon</label>
                  <input
                    type="text"
                    value={editingProject.emoji || '⚡'}
                    onChange={(e) => setEditingProject({ ...editingProject, emoji: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingProject.tagline || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1">Tech Stack (Comma separated)</label>
                <input
                  type="text"
                  value={(editingProject.stack || []).join(', ')}
                  onChange={(e) => setEditingProject({ ...editingProject, stack: e.target.value.split(',').map((s) => s.trim()) })}
                  className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1">Case Study Overview</label>
                <textarea
                  rows={2}
                  value={editingProject.sections?.overview || ''}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      sections: { ...editingProject.sections, overview: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-xs"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1">Architecture & Tech Details</label>
                <textarea
                  rows={2}
                  value={editingProject.sections?.architecture || ''}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      sections: { ...editingProject.sections, architecture: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-xs"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1">Impact Metrics (Comma separated)</label>
                <input
                  type="text"
                  value={(editingProject.sections?.metrics || []).join(', ')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      sections: {
                        ...editingProject.sections,
                        metrics: e.target.value.split(',').map((s) => s.trim()),
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[rgba(223,231,224,0.08)]">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 rounded font-mono text-xs uppercase text-[#78837c] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#e0231c] hover:bg-[#ff3b2f]"
                >
                  {saving ? 'Saving...' : 'Save Project ✓'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
