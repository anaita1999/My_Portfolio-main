import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { usePortfolioContent } from '@/context/PortfolioContentContext';
import CustomCursor from '@/components/portfolio/CustomCursor';
import API_BASE from '@/apiConfig';

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
    arisetekContent,
    refreshContent,
  } = usePortfolioContent();

  const [activeTab, setActiveTab] = useState('corporate_pricing');
  const [saving, setSaving] = useState(false);
  const [workspace, setWorkspace] = useState('corporate'); // 'corporate' or 'portfolio'

  // Local form states
  const [pricing, setPricing] = useState(ctxPricing);
  const [profile, setProfile] = useState(ctxProfile);
  const [education, setEducation] = useState(ctxEducation || []);
  const [skills, setSkills] = useState(ctxSkills || []);
  const [projects, setProjects] = useState(ctxProjects || []);
  const [experience, setExperience] = useState(ctxExperience || []);
  const [certifications, setCertifications] = useState(ctxCertifications || []);
  const [testimonials, setTestimonials] = useState(ctxTestimonials || []);

  const [corpPricing, setCorpPricing] = useState({});
  const [corpCategoryAddons, setCorpCategoryAddons] = useState({});
  const [corpSpecializedAddons, setCorpSpecializedAddons] = useState({});
  const [corpServices, setCorpServices] = useState([]);
  const [corpProjects, setCorpProjects] = useState([]);

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
    if (arisetekContent) {
      if (arisetekContent.pricing) setCorpPricing(arisetekContent.pricing);
      if (arisetekContent.category_addons) setCorpCategoryAddons(arisetekContent.category_addons);
      if (arisetekContent.specialized_addons) setCorpSpecializedAddons(arisetekContent.specialized_addons);
      if (arisetekContent.services) setCorpServices(arisetekContent.services);
      if (arisetekContent.projects) setCorpProjects(arisetekContent.projects);
    }
  }, [content, arisetekContent]);

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

  const allMessages = useMemo(() => {
    const combined = [
      ...leads.map(l => ({ ...l, type: 'lead' })),
      ...contacts.map(c => ({ ...c, type: 'contact' }))
    ];
    return combined.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [leads, contacts]);

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

  const saveArisetekSection = async (sectionKey, data, label) => {
    setSaving(true);
    try {
      await axios.put(`${API_BASE}/api/admin/arisetek-content/${sectionKey}`, { data });
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
    <div className="min-h-screen bg-[#05070a] text-[#dfe7e0] flex flex-col font-sans relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(255,107,0,0.08)_0%,transparent_70%)] blur-[100px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle,rgba(50,210,120,0.05)_0%,transparent_70%)] blur-[100px]" />
      </div>
      <CustomCursor />

      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-50 bg-[rgba(10,14,20,0.96)] backdrop-blur-2xl border-b border-[rgba(255,107,0,0.2)] px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
        <Link to="/admin" className="flex items-center gap-2.5 group shrink-0 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[rgba(255,107,0,0.12)] border border-[rgba(255,107,0,0.35)] p-1 sm:p-1.5 flex items-center justify-center shadow-[0_0_16px_rgba(255,107,0,0.35)] group-hover:scale-105 transition-transform shrink-0">
            <img src="/arisetek-mark-dark.svg" alt="Arisetek Logo" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-sm sm:text-base font-semibold tracking-wider text-white flex items-center gap-1">
              Arisetek <span className="text-[#FF6B00] font-normal">CMS</span>
            </h1>
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#78837c] flex items-center gap-1 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-[#32d278] shadow-[0_0_6px_#32d278] shrink-0" />
              <span className="hidden md:inline">2FA ·</span> admin
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Top Nav Global Tabs */}
          {[
            { id: 'inbox', label: 'Inbox', icon: '📬' },
            { id: 'security', label: '2FA', icon: '🛡️' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1 ${
                activeTab === tab.id
                  ? 'bg-[rgba(50,210,120,0.15)] text-[#32d278] border border-[rgba(50,210,120,0.4)] shadow-[0_0_15px_rgba(50,210,120,0.2)] font-bold'
                  : 'text-[#78837c] hover:text-[#32d278] border border-transparent hover:bg-[rgba(255,255,255,0.03)]'
              }`}
              title={tab.label}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
          <div className="w-[1px] h-3.5 bg-[rgba(255,255,255,0.1)] mx-0.5" />
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 sm:px-3 py-1.5 rounded-lg font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#aab4ad] border border-[rgba(223,231,224,0.14)] hover:text-white hover:border-[#FF6B00] transition-colors inline-flex items-center gap-1"
          >
            <span className="hidden sm:inline">Live</span>
            <span>↗</span>
          </Link>
          <button
            onClick={logout}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#ff5a3c] bg-[rgba(255,107,0,0.1)] border border-[rgba(255,107,0,0.3)] hover:bg-[#FF6B00] hover:text-white transition-all shadow-[0_0_10px_rgba(255,107,0,0.2)] flex items-center gap-1"
          >
            <span className="hidden sm:inline">Exit</span>
            <span className="text-[10px]">🔒</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content Layout */}
      <div className="flex-1 flex flex-col md:flex-row max-w-[1600px] w-full mx-auto p-3 sm:p-4 md:p-6 gap-4 md:gap-6 relative z-10">
        {/* Navigation Sidebar Tabs */}
        <aside className="w-full md:w-64 flex flex-col gap-3 md:gap-6 shrink-0">
          
          {/* Workspace Switcher */}
          <div className="bg-[rgba(10,14,20,0.7)] border border-[rgba(255,107,0,0.2)] rounded-xl p-1.5 flex shadow-lg backdrop-blur-md">
            <button
              onClick={() => { setWorkspace('corporate'); setActiveTab('corporate_pricing'); }}
              className={`flex-1 py-2 text-[10px] sm:text-[11px] uppercase tracking-widest font-mono font-medium rounded-lg transition-all ${
                workspace === 'corporate' 
                  ? 'bg-[#FF6B00] text-white shadow-[0_0_12px_rgba(255,107,0,0.5)]' 
                  : 'text-[#78837c] hover:text-white'
              }`}
            >
              Corporate
            </button>
            <button
              onClick={() => { setWorkspace('portfolio'); setActiveTab('pricing'); }}
              className={`flex-1 py-2 text-[10px] sm:text-[11px] uppercase tracking-widest font-mono font-medium rounded-lg transition-all ${
                workspace === 'portfolio' 
                  ? 'bg-[rgba(255,107,0,0.85)] text-white shadow-[0_0_12px_rgba(255,107,0,0.5)]' 
                  : 'text-[#78837c] hover:text-white'
              }`}
            >
              Portfolio
            </button>
          </div>

          {/* Tabs Rail */}
          <div className="flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none snap-x touch-pan-x">
          {(workspace === 'portfolio' ? [
              { id: 'pricing', label: '💰 Portfolio Pricing' },
              { id: 'projects', label: '🚀 Selected Works' },
              { id: 'about', label: '⛩️ The Threshold' },
              { id: 'skills', label: '⚡ Sacred Craft' },
              { id: 'experience', label: '📜 Career Journey' },
              { id: 'certifications', label: '🏅 Credentials' },
              { id: 'testimonials', label: '💬 Kind Words' },
            ] : [
              { id: 'corporate_pricing', label: '💰 Corporate Pricing' },
              { id: 'corporate_services', label: '⚙️ Core Capabilities' },
              { id: 'corporate_projects', label: '🚀 Arisetek Projects' },
          ]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-left whitespace-nowrap transition-all duration-300 flex items-center justify-between gap-3 group backdrop-blur-sm shrink-0 md:shrink ${
                activeTab === tab.id
                  ? 'bg-[rgba(255,107,0,0.18)] text-white border border-[rgba(255,107,0,0.4)] shadow-[0_0_20px_rgba(255,107,0,0.2)] font-semibold'
                  : 'text-[#78837c] hover:text-white hover:bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.02)]'
              }`}
            >
              <span>{tab.label}</span>
              {activeTab === tab.id && <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00] animate-pulse" />}
            </button>
          ))}
          </div>

        </aside>

        {/* Dynamic Tab Panes */}
        <main className="flex-1 w-full min-w-0 max-w-full bg-[rgba(5,7,10,0.65)] border border-[rgba(255,107,0,0.15)] rounded-2xl p-3.5 sm:p-5 md:p-6 relative overflow-x-hidden backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
          {/* TAB: CORPORATE PRICING */}
          {activeTab === 'corporate_pricing' && (
            <div className="space-y-6 sm:space-y-8 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(223,231,224,0.08)] pb-4">
                <div>
                  <h2 className="font-display text-lg sm:text-xl text-white">Arisetek Pricing Data</h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78837c] mt-1">
                    Manage the JSON data for Arisetek's 4-tier pricing model and add-ons.
                  </p>
                </div>
                <button
                  onClick={() => saveArisetekSection('pricing', corpPricing, 'Corporate Pricing')}
                  disabled={saving}
                  className="px-4 sm:px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#FF6B00] hover:bg-[#ff3b2f] transition-all shadow-[0_0_16px_rgba(255,107,0,0.4)] disabled:opacity-50 w-full sm:w-auto"
                >
                  {saving ? 'Saving...' : 'Save Pricing ✓'}
                </button>
              </div>
              <div className="space-y-6">
                {Object.keys(corpPricing || {}).map((category) => (
                  <div key={category} className="space-y-4">
                    <h3 className="font-mono text-sm uppercase tracking-wider text-[#FF6B00] mb-2 border-b border-[rgba(255,107,0,0.2)] pb-2">{category}</h3>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                      {(corpPricing[category] || []).map((tier, idx) => (
                        <div key={idx} className="p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(223,231,224,0.08)] space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Tier Name</label>
                              <input
                                type="text"
                                value={tier.name || ''}
                                onChange={(e) => {
                                  const updated = { ...corpPricing };
                                  updated[category][idx].name = e.target.value;
                                  setCorpPricing(updated);
                                }}
                                className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                              />
                            </div>
                            <div>
                              <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Price / Range</label>
                              <input
                                type="text"
                                value={tier.price || ''}
                                onChange={(e) => {
                                  const updated = { ...corpPricing };
                                  updated[category][idx].price = e.target.value;
                                  setCorpPricing(updated);
                                }}
                                className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Description</label>
                            <textarea
                              rows={2}
                              value={tier.desc || ''}
                              onChange={(e) => {
                                const updated = { ...corpPricing };
                                updated[category][idx].desc = e.target.value;
                                setCorpPricing(updated);
                              }}
                              className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5 flex items-center justify-between">
                              Features
                              <label className="flex items-center gap-2 cursor-pointer text-[#32d278] hover:text-white">
                                <input 
                                  type="checkbox" 
                                  checked={tier.highlight || false} 
                                  onChange={(e) => {
                                    const updated = { ...corpPricing };
                                    updated[category][idx].highlight = e.target.checked;
                                    setCorpPricing(updated);
                                  }}
                                  className="accent-[#FF6B00]" 
                                />
                                Highlighted Tier
                              </label>
                            </label>
                            <textarea
                              rows={4}
                              value={(tier.features || []).join('\n')}
                              placeholder="One feature per line"
                              onChange={(e) => {
                                const updated = { ...corpPricing };
                                updated[category][idx].features = e.target.value.split('\n');
                                setCorpPricing(updated);
                              }}
                              className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00] leading-relaxed whitespace-pre-wrap"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(223,231,224,0.08)] pb-4 pt-8">
                <div>
                  <h2 className="font-display text-lg sm:text-xl text-white">Category & Specialized Add-ons</h2>
                </div>
                <button
                  onClick={() => {
                    saveArisetekSection('category_addons', corpCategoryAddons, 'Category Addons');
                    saveArisetekSection('specialized_addons', corpSpecializedAddons, 'Specialized Addons');
                  }}
                  disabled={saving}
                  className="px-4 sm:px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#FF6B00] hover:bg-[#ff3b2f] transition-all shadow-[0_0_16px_rgba(255,107,0,0.4)] disabled:opacity-50 w-full sm:w-auto"
                >
                  {saving ? 'Saving...' : 'Save Add-ons ✓'}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-3 border-b border-[rgba(223,231,224,0.08)] pb-2">Category Addons</label>
                    <div className="space-y-6">
                      {Object.keys(corpCategoryAddons || {}).map((category) => (
                        <div key={category} className="space-y-2">
                          <h4 className="font-mono text-[11px] uppercase text-white mb-2">{category}</h4>
                          {(corpCategoryAddons[category] || []).map((addon, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row gap-2 bg-[rgba(255,255,255,0.02)] p-3 rounded border border-[rgba(223,231,224,0.04)]">
                              <input 
                                type="text"
                                placeholder="Label"
                                value={addon.label || ''}
                                onChange={(e) => {
                                  const updated = { ...corpCategoryAddons };
                                  updated[category][idx].label = e.target.value;
                                  setCorpCategoryAddons(updated);
                                }}
                                className="flex-1 min-w-[120px] px-2 py-1.5 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-xs focus:outline-none focus:border-[#FF6B00]"
                              />
                              <input 
                                type="text"
                                placeholder="Price String"
                                value={addon.price || ''}
                                onChange={(e) => {
                                  const updated = { ...corpCategoryAddons };
                                  updated[category][idx].price = e.target.value;
                                  setCorpCategoryAddons(updated);
                                }}
                                className="flex-1 min-w-[100px] px-2 py-1.5 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-xs focus:outline-none focus:border-[#FF6B00]"
                              />
                              <input 
                                type="number"
                                placeholder="Min Val"
                                value={addon.min || ''}
                                onChange={(e) => {
                                  const updated = { ...corpCategoryAddons };
                                  updated[category][idx].min = parseInt(e.target.value) || 0;
                                  setCorpCategoryAddons(updated);
                                }}
                                className="w-24 px-2 py-1.5 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-xs focus:outline-none focus:border-[#FF6B00]"
                              />
                              <button
                                onClick={() => {
                                  const updated = { ...corpCategoryAddons };
                                  updated[category] = updated[category].filter((_, i) => i !== idx);
                                  setCorpCategoryAddons(updated);
                                }}
                                className="px-2 text-[#ff5a3c] hover:text-white"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              const updated = { ...corpCategoryAddons };
                              if (!updated[category]) updated[category] = [];
                              updated[category].push({ label: '', price: '', min: 0 });
                              setCorpCategoryAddons(updated);
                            }}
                            className="text-[10px] font-mono text-[#32d278] hover:text-white px-2 py-1 rounded bg-[rgba(50,210,120,0.1)] border border-[rgba(50,210,120,0.2)]"
                          >
                            + Add Item
                          </button>
                        </div>
                      ))}
                    </div>
                 </div>

                 <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-3 border-b border-[rgba(223,231,224,0.08)] pb-2">Specialized Addons</label>
                    <div className="space-y-6">
                      {Object.keys(corpSpecializedAddons || {}).map((category) => (
                        <div key={category} className="space-y-2">
                          <h4 className="font-mono text-[11px] uppercase text-white mb-2">{category}</h4>
                          {(corpSpecializedAddons[category] || []).map((addon, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row gap-2 bg-[rgba(255,255,255,0.02)] p-3 rounded border border-[rgba(223,231,224,0.04)]">
                              <input 
                                type="text"
                                placeholder="Label"
                                value={addon.label || ''}
                                onChange={(e) => {
                                  const updated = { ...corpSpecializedAddons };
                                  updated[category][idx].label = e.target.value;
                                  setCorpSpecializedAddons(updated);
                                }}
                                className="flex-1 min-w-[120px] px-2 py-1.5 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-xs focus:outline-none focus:border-[#FF6B00]"
                              />
                              <input 
                                type="text"
                                placeholder="Price String"
                                value={addon.price || ''}
                                onChange={(e) => {
                                  const updated = { ...corpSpecializedAddons };
                                  updated[category][idx].price = e.target.value;
                                  setCorpSpecializedAddons(updated);
                                }}
                                className="flex-1 min-w-[100px] px-2 py-1.5 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-xs focus:outline-none focus:border-[#FF6B00]"
                              />
                              <input 
                                type="number"
                                placeholder="Min Val"
                                value={addon.min || ''}
                                onChange={(e) => {
                                  const updated = { ...corpSpecializedAddons };
                                  updated[category][idx].min = parseInt(e.target.value) || 0;
                                  setCorpSpecializedAddons(updated);
                                }}
                                className="w-24 px-2 py-1.5 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-xs focus:outline-none focus:border-[#FF6B00]"
                              />
                              <button
                                onClick={() => {
                                  const updated = { ...corpSpecializedAddons };
                                  updated[category] = updated[category].filter((_, i) => i !== idx);
                                  setCorpSpecializedAddons(updated);
                                }}
                                className="px-2 text-[#ff5a3c] hover:text-white"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              const updated = { ...corpSpecializedAddons };
                              if (!updated[category]) updated[category] = [];
                              updated[category].push({ label: '', price: '', min: 0 });
                              setCorpSpecializedAddons(updated);
                            }}
                            className="text-[10px] font-mono text-[#32d278] hover:text-white px-2 py-1 rounded bg-[rgba(50,210,120,0.1)] border border-[rgba(50,210,120,0.2)]"
                          >
                            + Add Item
                          </button>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* TAB: CORPORATE SERVICES */}
          {activeTab === 'corporate_services' && (
            <div className="space-y-6 sm:space-y-8 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(223,231,224,0.08)] pb-4">
                <div>
                  <h2 className="font-display text-lg sm:text-xl text-white">Core Capabilities</h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78837c] mt-1">
                    Manage Arisetek's 3 Pillars (App Dev, Web Dev, AI Automation)
                  </p>
                </div>
                <button
                  onClick={() => saveArisetekSection('services', corpServices, 'Services')}
                  disabled={saving}
                  className="px-4 sm:px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#FF6B00] hover:bg-[#ff3b2f] transition-all shadow-[0_0_16px_rgba(255,107,0,0.4)] disabled:opacity-50 w-full sm:w-auto"
                >
                  {saving ? 'Saving...' : 'Save Capabilities ✓'}
                </button>
              </div>
              <div className="space-y-6">
                {(corpServices || []).map((service, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(223,231,224,0.08)] space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Number</label>
                        <input
                          type="text"
                          value={service.number || ''}
                          onChange={(e) => {
                            const updated = [...corpServices];
                            updated[idx].number = e.target.value;
                            setCorpServices(updated);
                          }}
                          className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Title</label>
                        <input
                          type="text"
                          value={service.title || ''}
                          onChange={(e) => {
                            const updated = [...corpServices];
                            updated[idx].title = e.target.value;
                            setCorpServices(updated);
                          }}
                          className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Badge</label>
                        <input
                          type="text"
                          value={service.badge || ''}
                          onChange={(e) => {
                            const updated = [...corpServices];
                            updated[idx].badge = e.target.value;
                            setCorpServices(updated);
                          }}
                          className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Glyph</label>
                          <input
                            type="text"
                            value={service.glyph || ''}
                            onChange={(e) => {
                              const updated = [...corpServices];
                              updated[idx].glyph = e.target.value;
                              setCorpServices(updated);
                            }}
                            className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Color</label>
                          <input
                            type="text"
                            value={service.color || ''}
                            onChange={(e) => {
                              const updated = [...corpServices];
                              updated[idx].color = e.target.value;
                              setCorpServices(updated);
                            }}
                            className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Description</label>
                      <textarea
                        rows={3}
                        value={service.description || ''}
                        onChange={(e) => {
                          const updated = [...corpServices];
                          updated[idx].description = e.target.value;
                          setCorpServices(updated);
                        }}
                        className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00] leading-relaxed"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Stack</label>
                        <textarea
                          rows={4}
                          value={(service.stack || []).join('\n')}
                          placeholder="One item per line"
                          onChange={(e) => {
                            const updated = [...corpServices];
                            updated[idx].stack = e.target.value.split('\n');
                            setCorpServices(updated);
                          }}
                          className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00] leading-relaxed whitespace-pre-wrap"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Features</label>
                        <textarea
                          rows={4}
                          value={(service.features || []).join('\n')}
                          placeholder="One feature per line"
                          onChange={(e) => {
                            const updated = [...corpServices];
                            updated[idx].features = e.target.value.split('\n');
                            setCorpServices(updated);
                          }}
                          className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00] leading-relaxed whitespace-pre-wrap"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setCorpServices([...corpServices, { number: '', title: '', badge: '', glyph: '', color: '', description: '', stack: [], features: [] }])}
                  className="px-4 py-2 font-mono text-xs text-[#32d278] hover:text-white border border-[rgba(50,210,120,0.3)] rounded hover:bg-[rgba(50,210,120,0.1)] transition-colors"
                >
                  + Add Service
                </button>
              </div>
            </div>
          )}

          {/* TAB: CORPORATE PROJECTS */}
          {activeTab === 'corporate_projects' && (
            <div className="space-y-6 sm:space-y-8 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(223,231,224,0.08)] pb-4">
                <div>
                  <h2 className="font-display text-lg sm:text-xl text-white">Arisetek Portfolio</h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78837c] mt-1">
                    Manage corporate flagship case studies & live demos
                  </p>
                </div>
                <button
                  onClick={() => saveArisetekSection('projects', corpProjects, 'Corporate Projects')}
                  disabled={saving}
                  className="px-4 sm:px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#FF6B00] hover:bg-[#ff3b2f] transition-all shadow-[0_0_16px_rgba(255,107,0,0.4)] disabled:opacity-50 w-full sm:w-auto"
                >
                  {saving ? 'Saving...' : 'Save Projects ✓'}
                </button>
              </div>
              <div className="space-y-6">
                {(corpProjects || []).map((project, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(223,231,224,0.08)] space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-mono text-[11px] uppercase text-white">Project {idx + 1}</h4>
                      <button
                        onClick={() => {
                          const updated = [...corpProjects];
                          updated.splice(idx, 1);
                          setCorpProjects(updated);
                        }}
                        className="text-[#ff5a3c] hover:text-white text-xs"
                      >
                        ✕ Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Title</label>
                        <input
                          type="text"
                          value={project.title || ''}
                          onChange={(e) => {
                            const updated = [...corpProjects];
                            updated[idx].title = e.target.value;
                            setCorpProjects(updated);
                          }}
                          className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Link / URL</label>
                        <input
                          type="text"
                          value={project.link || ''}
                          onChange={(e) => {
                            const updated = [...corpProjects];
                            updated[idx].link = e.target.value;
                            setCorpProjects(updated);
                          }}
                          className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Description</label>
                      <textarea
                        rows={2}
                        value={project.description || ''}
                        onChange={(e) => {
                          const updated = [...corpProjects];
                          updated[idx].description = e.target.value;
                          setCorpProjects(updated);
                        }}
                        className="w-full px-3 py-2 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00] leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setCorpProjects([...(corpProjects || []), { title: '', description: '', link: '' }])}
                  className="px-4 py-2 font-mono text-xs text-[#32d278] hover:text-white border border-[rgba(50,210,120,0.3)] rounded hover:bg-[rgba(50,210,120,0.1)] transition-colors"
                >
                  + Add Project
                </button>
              </div>
            </div>
          )}

          {/* TAB 1: PORTFOLIO PRICING & RATES */}
          {activeTab === 'pricing' && (
            <div className="space-y-6 sm:space-y-8 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(223,231,224,0.08)] pb-4">
                <div>
                  <h2 className="font-display text-lg sm:text-xl text-white">Pricing & Rate Control</h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78837c] mt-1">
                    Manage hourly rates, retainers, and localized budget options (INR ₹ & USD $)
                  </p>
                </div>
                <button
                  onClick={() => saveSection('pricing', pricing, 'Pricing & Rates')}
                  disabled={saving}
                  className="px-4 sm:px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#FF6B00] hover:bg-[#ff3b2f] transition-all shadow-[0_0_16px_rgba(255,107,0,0.4)] disabled:opacity-50 w-full sm:w-auto"
                >
                  {saving ? 'Saving...' : 'Save Pricing Changes ✓'}
                </button>
              </div>

              {/* Rates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="p-4 sm:p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(223,231,224,0.08)] space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#ffd15c] flex items-center gap-2">
                    <span>🇮🇳</span> India Rates (INR ₹)
                  </h3>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Hourly Rate</label>
                    <input
                      type="text"
                      value={pricing?.hourly_rate_inr || ''}
                      onChange={(e) => setPricing({ ...pricing, hourly_rate_inr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Monthly Retainer</label>
                    <input
                      type="text"
                      value={pricing?.monthly_retainer_inr || ''}
                      onChange={(e) => setPricing({ ...pricing, monthly_retainer_inr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Budget Pills (Comma separated)</label>
                    <input
                      type="text"
                      value={(pricing?.budget_pills_inr || []).join(', ')}
                      onChange={(e) => setPricing({ ...pricing, budget_pills_inr: e.target.value.split(',').map((s) => s.trim()) })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(223,231,224,0.08)] space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#32d278] flex items-center gap-2">
                    <span>🌍</span> Global Rates (USD $)
                  </h3>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Hourly Rate</label>
                    <input
                      type="text"
                      value={pricing?.hourly_rate_usd || ''}
                      onChange={(e) => setPricing({ ...pricing, hourly_rate_usd: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Monthly Retainer</label>
                    <input
                      type="text"
                      value={pricing?.monthly_retainer_usd || ''}
                      onChange={(e) => setPricing({ ...pricing, monthly_retainer_usd: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Budget Pills (Comma separated)</label>
                    <input
                      type="text"
                      value={(pricing?.budget_pills_usd || []).join(', ')}
                      onChange={(e) => setPricing({ ...pricing, budget_pills_usd: e.target.value.split(',').map((s) => s.trim()) })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS / SELECTED WORKS */}
          {activeTab === 'projects' && (
            <div className="space-y-6 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(223,231,224,0.08)] pb-4">
                <div>
                  <h2 className="font-display text-lg sm:text-xl text-white">Selected Works & Case Studies</h2>
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
                      color: '#FF6B00',
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
                  className="px-4 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#FF6B00] hover:bg-[#ff3b2f] transition-all shadow-[0_0_16px_rgba(255,107,0,0.4)] w-full sm:w-auto"
                >
                  + Add New Project
                </button>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((p) => (
                  <div
                    key={p.id || p.slug}
                    className="p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(223,231,224,0.08)] flex flex-col justify-between hover:border-[rgba(255,107,0,0.3)] transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{p.emoji || '⛩️'}</span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#78837c]">{p.year}</span>
                      </div>
                      <h3 className="font-display text-lg text-white font-medium">{p.title}</h3>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-[#FF6B00] mt-0.5">{p.category}</p>
                      <p className="text-xs text-[#aab4ad] mt-2 line-clamp-2">{p.tagline || p.summary}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-5 pt-3 border-t border-[rgba(223,231,224,0.06)]">
                      <button
                        onClick={() => {
                          setEditingProject(p);
                          setShowProjectModal(true);
                        }}
                        className="px-3 py-1.5 rounded bg-[rgba(255,255,255,0.05)] hover:bg-[#FF6B00] hover:text-white font-mono text-[10px] uppercase tracking-wider transition-colors"
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
                        className="ml-auto px-3 py-1.5 rounded text-[#ff5a3c] hover:bg-[rgba(255,107,0,0.15)] font-mono text-[10px] uppercase tracking-wider transition-colors"
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
            <div className="space-y-6 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(223,231,224,0.08)] pb-4">
                <div>
                  <h2 className="font-display text-lg sm:text-xl text-white">The Threshold (About & Profile)</h2>
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
                  className="px-4 sm:px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#FF6B00] hover:bg-[#ff3b2f] transition-all shadow-[0_0_16px_rgba(255,107,0,0.4)] disabled:opacity-50 w-full sm:w-auto"
                >
                  {saving ? 'Saving...' : 'Save Profile Changes ✓'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={profile?.name || ''}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Headline Roles</label>
                    <input
                      type="text"
                      value={profile?.role || ''}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Tagline</label>
                    <input
                      type="text"
                      value={profile?.tagline || ''}
                      onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={profile?.email || ''}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Phone Number</label>
                    <input
                      type="text"
                      value={profile?.phone || ''}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
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
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00] leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">Location</label>
                    <input
                      type="text"
                      value={profile?.location || ''}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-[#78837c] mb-1.5">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      value={profile?.linkedin || ''}
                      onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SACRED CRAFT (SKILLS) */}
          {activeTab === 'skills' && (
            <div className="space-y-6 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(223,231,224,0.08)] pb-4">
                <div>
                  <h2 className="font-display text-lg sm:text-xl text-white">Sacred Craft (Skills & Stack)</h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78837c] mt-1">
                    Manage mastery bars, skill cards, and technical descriptions
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
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
                    className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg font-mono text-xs uppercase tracking-wider text-[#dfe7e0] bg-[rgba(255,255,255,0.06)] hover:bg-white/10 text-center"
                  >
                    + Add Skill Card
                  </button>
                  <button
                    onClick={() => saveSection('skills', skills, 'Skills')}
                    disabled={saving}
                    className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#FF6B00] hover:bg-[#ff3b2f] transition-all shadow-[0_0_16px_rgba(255,107,0,0.4)] disabled:opacity-50 text-center"
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
                        className="font-medium text-white bg-transparent border-b border-[rgba(223,231,224,0.14)] focus:border-[#FF6B00] focus:outline-none text-sm w-1/2 py-1"
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
                        className="font-mono text-[10px] uppercase text-[#ffd15c] bg-transparent border-b border-[rgba(223,231,224,0.14)] focus:border-[#FF6B00] focus:outline-none w-1/4 py-1 text-center"
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
                        className="font-mono text-[10px] text-[#32d278] bg-transparent border-b border-[rgba(223,231,224,0.14)] focus:border-[#FF6B00] focus:outline-none w-16 py-1 text-right"
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
                      className="w-full px-2.5 py-1.5 rounded bg-[rgba(255,255,255,0.03)] border border-[rgba(223,231,224,0.06)] text-xs text-[#aab4ad] focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CAREER JOURNEY (EXPERIENCE) */}
          {activeTab === 'experience' && (
            <div className="space-y-6 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(223,231,224,0.08)] pb-4">
                <div>
                  <h2 className="font-display text-lg sm:text-xl text-white">Career Journey (Experience)</h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78837c] mt-1">
                    Manage work timeline, company roles, and achievements
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
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
                    className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg font-mono text-xs uppercase tracking-wider text-[#dfe7e0] bg-[rgba(255,255,255,0.06)] hover:bg-white/10 text-center"
                  >
                    + Add Role
                  </button>
                  <button
                    onClick={() => saveSection('experience', experience, 'Experience')}
                    disabled={saving}
                    className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#FF6B00] hover:bg-[#ff3b2f] transition-all shadow-[0_0_16px_rgba(255,107,0,0.4)] disabled:opacity-50 text-center"
                  >
                    {saving ? 'Saving...' : 'Save Experience ✓'}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div
                    key={exp.id || idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(223,231,224,0.08)] space-y-3 min-w-0"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div>
                        <label className="block font-mono text-[9px] uppercase text-[#78837c] mb-1">Role Title</label>
                        <input
                          type="text"
                          value={exp.role || ''}
                          onChange={(e) => {
                            const updated = [...experience];
                            updated[idx] = { ...updated[idx], role: e.target.value };
                            setExperience(updated);
                          }}
                          className="w-full font-medium text-white bg-[rgba(255,255,255,0.03)] px-2.5 py-1.5 rounded border border-[rgba(223,231,224,0.1)] focus:border-[#FF6B00] focus:outline-none text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase text-[#78837c] mb-1">Company Name</label>
                        <input
                          type="text"
                          value={exp.company || ''}
                          onChange={(e) => {
                            const updated = [...experience];
                            updated[idx] = { ...updated[idx], company: e.target.value };
                            setExperience(updated);
                          }}
                          className="w-full text-white bg-[rgba(255,255,255,0.03)] px-2.5 py-1.5 rounded border border-[rgba(223,231,224,0.1)] focus:border-[#FF6B00] focus:outline-none text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase text-[#78837c] mb-1">Year Range</label>
                        <input
                          type="text"
                          value={exp.year || ''}
                          onChange={(e) => {
                            const updated = [...experience];
                            updated[idx] = { ...updated[idx], year: e.target.value };
                            setExperience(updated);
                          }}
                          className="w-full font-mono text-xs text-[#ffd15c] bg-[rgba(255,255,255,0.03)] px-2.5 py-1.5 rounded border border-[rgba(223,231,224,0.1)] focus:border-[#FF6B00] focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1">
                          <label className="block font-mono text-[9px] uppercase text-[#78837c] mb-1">Track</label>
                          <select
                            value={exp.track || 'design'}
                            onChange={(e) => {
                              const updated = [...experience];
                              updated[idx] = { ...updated[idx], track: e.target.value };
                              setExperience(updated);
                            }}
                            className="w-full bg-[#0a0e14] text-xs text-[#dfe7e0] border border-[rgba(223,231,224,0.14)] rounded px-2 py-1.5"
                          >
                            <option value="design">Design & Dev</option>
                            <option value="risk">Risk & Operations</option>
                          </select>
                        </div>
                        <button
                          onClick={() => setExperience(experience.filter((_, i) => i !== idx))}
                          className="text-[#ff5a3c] hover:text-white text-xs px-2 mt-4 shrink-0"
                        >
                          🗑️
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
                        className="w-full px-2.5 py-1.5 rounded bg-[rgba(255,255,255,0.03)] border border-[rgba(223,231,224,0.06)] text-xs text-[#aab4ad] focus:outline-none focus:border-[#FF6B00]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CREDENTIALS (CERTIFICATIONS) */}
          {activeTab === 'certifications' && (
            <div className="space-y-6 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(223,231,224,0.08)] pb-4">
                <div>
                  <h2 className="font-display text-lg sm:text-xl text-white">Credentials & Certifications</h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78837c] mt-1">
                    Manage professional credentials and verification badges
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
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
                    className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg font-mono text-xs uppercase tracking-wider text-[#dfe7e0] bg-[rgba(255,255,255,0.06)] hover:bg-white/10 text-center"
                  >
                    + Add Certificate
                  </button>
                  <button
                    onClick={() => saveSection('certifications', certifications, 'Certifications')}
                    disabled={saving}
                    className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#FF6B00] hover:bg-[#ff3b2f] transition-all shadow-[0_0_16px_rgba(255,107,0,0.4)] disabled:opacity-50 text-center"
                  >
                    {saving ? 'Saving...' : 'Save Credentials ✓'}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {certifications.map((c, idx) => (
                  <div
                    key={c.id || idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(223,231,224,0.08)] space-y-3 min-w-0"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-mono text-[9px] uppercase text-[#78837c] mb-1">Title</label>
                        <input
                          type="text"
                          value={c.title || ''}
                          onChange={(e) => {
                            const updated = [...certifications];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            setCertifications(updated);
                          }}
                          className="w-full text-white bg-[rgba(255,255,255,0.03)] px-2.5 py-1.5 rounded border border-[rgba(223,231,224,0.1)] focus:border-[#FF6B00] focus:outline-none text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase text-[#78837c] mb-1">Issuer</label>
                        <input
                          type="text"
                          value={c.issuer || ''}
                          onChange={(e) => {
                            const updated = [...certifications];
                            updated[idx] = { ...updated[idx], issuer: e.target.value };
                            setCertifications(updated);
                          }}
                          className="w-full text-white bg-[rgba(255,255,255,0.03)] px-2.5 py-1.5 rounded border border-[rgba(223,231,224,0.1)] focus:border-[#FF6B00] focus:outline-none text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase text-[#78837c] mb-1">Credential URL</label>
                        <input
                          type="text"
                          value={c.url || ''}
                          onChange={(e) => {
                            const updated = [...certifications];
                            updated[idx] = { ...updated[idx], url: e.target.value };
                            setCertifications(updated);
                          }}
                          className="w-full font-mono text-xs text-[#32d278] bg-[rgba(255,255,255,0.03)] px-2.5 py-1.5 rounded border border-[rgba(223,231,224,0.1)] focus:border-[#FF6B00] focus:outline-none break-all"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-end pt-1 border-t border-[rgba(255,255,255,0.03)]">
                      <button
                        onClick={() => setCertifications(certifications.filter((_, i) => i !== idx))}
                        className="text-[#ff5a3c] hover:text-white font-mono text-[10px] uppercase flex items-center gap-1"
                      >
                        <span>Delete</span> 🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: KIND WORDS (TESTIMONIALS) */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(223,231,224,0.08)] pb-4">
                <div>
                  <h2 className="font-display text-lg sm:text-xl text-white">Kind Words (Testimonials)</h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78837c] mt-1">
                    Manage client reviews, recommendations, and quotes
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
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
                    className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg font-mono text-xs uppercase tracking-wider text-[#dfe7e0] bg-[rgba(255,255,255,0.06)] hover:bg-white/10 text-center"
                  >
                    + Add Testimonial
                  </button>
                  <button
                    onClick={() => saveSection('testimonials', testimonials, 'Testimonials')}
                    disabled={saving}
                    className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#FF6B00] hover:bg-[#ff3b2f] transition-all shadow-[0_0_16px_rgba(255,107,0,0.4)] disabled:opacity-50 text-center"
                  >
                    {saving ? 'Saving...' : 'Save Testimonials ✓'}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {testimonials.map((t, idx) => (
                  <div
                    key={t.id || idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(223,231,224,0.08)] space-y-3 min-w-0"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[9px] uppercase text-[#78837c] mb-1">Author Name</label>
                        <input
                          type="text"
                          value={t.name || ''}
                          onChange={(e) => {
                            const updated = [...testimonials];
                            updated[idx] = { ...updated[idx], name: e.target.value };
                            setTestimonials(updated);
                          }}
                          className="w-full text-white font-medium bg-[rgba(255,255,255,0.03)] px-2.5 py-1.5 rounded border border-[rgba(223,231,224,0.1)] focus:border-[#FF6B00] focus:outline-none text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase text-[#78837c] mb-1">Role & Company</label>
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
                          className="w-full text-white bg-[rgba(255,255,255,0.03)] px-2.5 py-1.5 rounded border border-[rgba(223,231,224,0.1)] focus:border-[#FF6B00] focus:outline-none text-xs"
                        />
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
                        className="w-full px-2.5 py-1.5 rounded bg-[rgba(255,255,255,0.03)] border border-[rgba(223,231,224,0.06)] text-xs text-[#aab4ad] focus:outline-none focus:border-[#FF6B00] italic"
                      />
                    </div>
                    <div className="flex items-center justify-end pt-1 border-t border-[rgba(255,255,255,0.03)]">
                      <button
                        onClick={() => setTestimonials(testimonials.filter((_, i) => i !== idx))}
                        className="text-[#ff5a3c] hover:text-white font-mono text-[10px] uppercase flex items-center gap-1"
                      >
                        <span>Delete</span> 🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: INQUIRIES & LEADS INBOX */}
          {activeTab === 'inbox' && (
            <div className="space-y-6 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(223,231,224,0.08)] pb-4">
                <div>
                  <h2 className="font-display text-lg sm:text-xl text-white">Inquiries & Leads Inbox</h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78837c] mt-1">
                    Real-time messages received from Contact Form & Hire Me briefs
                  </p>
                </div>
                <button
                  onClick={fetchInbox}
                  disabled={loadingInbox}
                  className="px-3.5 py-2 rounded-lg font-mono text-xs uppercase tracking-wider text-[#dfe7e0] border border-[rgba(223,231,224,0.14)] hover:border-[#FF6B00] w-full sm:w-auto text-center"
                >
                  {loadingInbox ? 'Refreshing...' : 'Refresh Inbox 🔄'}
                </button>
              </div>

              {/* Unified Inbox List */}
              <div className="space-y-3 min-w-0">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#00E5FF] flex items-center gap-2">
                  <span>📬</span> All Inquiries & Messages ({allMessages.length})
                </h3>
                {allMessages.length === 0 ? (
                  <p className="text-xs text-[#78837c] italic p-4 bg-[rgba(255,255,255,0.02)] rounded-lg">
                    No messages received yet.
                  </p>
                ) : (
                  <div className="space-y-3 min-w-0">
                    {allMessages.map((msg) => (
                      <div
                        key={`${msg.type}-${msg.id}`}
                        className={`p-3.5 sm:p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] flex flex-col gap-2.5 transition-all duration-300 hover:bg-[rgba(255,255,255,0.04)] min-w-0 max-w-full overflow-hidden ${
                          msg.type === 'lead' 
                            ? 'hover:border-[#FF6B00] hover:shadow-[0_0_15px_rgba(255,107,0,0.1)]' 
                            : 'hover:border-[#ffd15c] hover:shadow-[0_0_15px_rgba(255,209,92,0.1)]'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(255,255,255,0.04)] pb-2 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 min-w-0">
                            <span className="font-semibold text-white text-sm">{msg.name}</span>
                            <span className="font-mono text-xs text-[#32d278] break-all">{msg.email}</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            {/* Lead-specific budget badge */}
                            {msg.type === 'lead' && msg.budget && (
                              <span className="px-2 py-0.5 rounded bg-[rgba(255,209,92,0.15)] text-[#ffd15c] font-mono text-[9px] uppercase tracking-wider">
                                {msg.budget}
                              </span>
                            )}
                            
                            {/* Message Type Badge */}
                            <span className={`px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider ${
                              msg.type === 'lead'
                                ? 'bg-[rgba(255,107,0,0.15)] text-[#ff5a3c] border border-[rgba(255,107,0,0.3)]'
                                : 'bg-[rgba(255,209,92,0.15)] text-[#ffd15c] border border-[rgba(255,209,92,0.3)]'
                            }`}>
                              {msg.type === 'lead' ? 'Project Brief' : 'Contact Form'}
                            </span>

                            {/* Source Badge */}
                            <span className={`px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider max-w-full truncate ${
                              msg.source?.includes('Arisetek')
                                ? 'bg-[rgba(0,229,255,0.15)] text-[#00E5FF] border border-[rgba(0,229,255,0.3)]'
                                : msg.source?.includes('Demo')
                                ? 'bg-[rgba(50,210,120,0.15)] text-[#32d278] border border-[rgba(50,210,120,0.3)]'
                                : 'bg-[rgba(255,255,255,0.05)] text-[#dfe7e0] border border-[rgba(255,255,255,0.1)]'
                            }`}>
                              {msg.source || 'Portfolio Direct'}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-xs text-[#aab4ad] leading-relaxed break-words whitespace-pre-wrap">{msg.message}</p>
                        
                        <div className="flex items-center justify-between pt-1 border-t border-[rgba(255,255,255,0.03)]">
                          <span className="font-mono text-[9px] text-[#78837c]">
                            {new Date(msg.created_at).toLocaleString()}
                          </span>
                          <button
                            onClick={() => msg.type === 'lead' ? handleDeleteLead(msg.id) : handleDeleteContact(msg.id)}
                            className="text-[#ff5a3c] hover:text-white font-mono text-[10px] uppercase flex items-center gap-1"
                          >
                            <span>Delete</span> 🗑️
                          </button>
                        </div>
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
              <div className="p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,107,0,0.3)] space-y-5">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#FF6B00] flex items-center gap-2">
                  <span>🛡️</span> Authenticator App Pairing (Google Authenticator / Authy / Apple Passwords)
                </h3>
                <p className="text-xs text-[#aab4ad] leading-relaxed">
                  Scan this QR code with your mobile camera or Authenticator app, or manually copy the Secret Key below:
                </p>

                {/* Visual QR Code Display */}
                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-[rgba(0,0,0,0.6)] border border-[rgba(223,231,224,0.08)]">
                  <div className="p-3 bg-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.15)] shrink-0">
                    <QRCodeSVG
                      value={twoFaData?.otpauth_uri || ''}
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
                        value={twoFaData?.secret || ''}
                        className="w-full font-mono text-xs px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.06)] border border-[rgba(223,231,224,0.12)] text-[#ffd15c]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(twoFaData?.secret || '');
                          toast.success('2FA Secret Key copied to clipboard!');
                        }}
                        className="px-3.5 py-2 rounded-lg font-mono text-[11px] uppercase tracking-wider text-white bg-[#FF6B00] hover:bg-[#ff3b2f] shrink-0"
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
                  className="px-4 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#FF6B00] hover:bg-[#ff3b2f]"
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
          <div className="bg-[#0a0e14] border border-[rgba(255,107,0,0.3)] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
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
                  className="px-5 py-2 rounded font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#FF6B00] hover:bg-[#ff3b2f]"
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
