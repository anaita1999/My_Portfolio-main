import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { sites } from "../../lib/arisetek/sites";
import axios from "axios";
import { toast } from "sonner";
import { ArrowLeft, Send } from "lucide-react";
import ArisetekCursor from "../../components/arisetek/ArisetekCursor";
import API_BASE from "../../apiConfig";

export default function DemoSitePage() {
  const { site: slug } = useParams();
  const navigate = useNavigate();
  const site = sites.find((item) => item.slug === slug) || sites[0];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!site) {
    return (
      <div className="min-h-screen bg-[#030509] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Demo Not Found</h1>
        <p className="text-white/60 mb-6">The requested vertical showcase template could not be loaded.</p>
        <Link to="/" className="px-6 py-3 bg-[#00E5FF] text-black font-bold rounded-full">
          Return to Arisetek Home
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in name and email.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/api/contact`, {
        name: formData.name,
        email: formData.email,
        message: formData.message || `Inquiry from ${site.name} showcase`,
        source: `Demo Site: ${site.name}`,
      });
      toast.success("Enquiry sent successfully! We'll reply within 1 business day.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send enquiry. Please contact contact@arisetek.in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen font-sans text-[#181a1b] selection:bg-[var(--brand)] selection:text-white"
      style={{
        "--brand": site.brand,
        "--accent": site.accent,
        "--ink": site.ink,
        backgroundColor: site.accent || "#f4f6f8"
      }}
    >
      <ArisetekCursor />
      {/* Top Banner with Return Links */}
      <div className="bg-black/90 text-white text-xs py-2.5 px-6 flex items-center justify-between font-mono">
        <Link to="/" className="flex items-center gap-2 hover:text-[#00E5FF] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Arisetek IT Solutions</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block text-white/50">Industry Showcase · {site.type}</span>
          <Link to="/portfolio" className="text-[#ffd15c] hover:underline">
            Founder Sanctuary ⛩️
          </Link>
        </div>
      </div>

      {/* Template Header */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 text-2xl font-black text-[var(--ink)] tracking-tight">
          <span className="text-[var(--brand)]">{site.icon}</span>
          <span>{site.name}</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-[var(--ink)]/80">
          <a href="#about" className="hover:text-[var(--brand)] transition-colors">About</a>
          <a href="#services" className="hover:text-[var(--brand)] transition-colors">Services</a>
          <a href="#gallery" className="hover:text-[var(--brand)] transition-colors">Gallery</a>
          <a href="#contact" className="hover:text-[var(--brand)] transition-colors">Contact</a>
        </nav>
        <a 
          href="#contact" 
          className="px-5 py-2.5 rounded-full text-white font-bold text-xs uppercase tracking-wider shadow-md hover:opacity-90 transition-opacity"
          style={{ backgroundColor: site.brand }}
        >
          {site.cta}
        </a>
      </header>

      {/* Hero Section */}
      <section id="home" className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest font-bold mb-3" style={{ color: site.brand }}>
            {site.tagline}
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-[var(--ink)] tracking-tight leading-tight mb-6">
            {site.hero}
          </h1>
          <p className="text-lg text-[var(--ink)]/75 leading-relaxed mb-8">
            {site.description}
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <a 
              href="#contact" 
              className="px-8 py-4 rounded-full text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: site.brand }}
            >
              {site.cta} →
            </a>
            <a 
              href="#services" 
              className="px-6 py-4 rounded-full bg-black/5 hover:bg-black/10 text-[var(--ink)] font-bold text-sm transition-colors"
            >
              Explore Services
            </a>
          </div>
          <div className="flex items-center gap-3 pt-4 border-t border-black/10">
            <span className="text-2xl font-black text-[var(--brand)]">{site.stat}</span>
            <span className="text-xs text-[var(--ink)]/70 font-medium uppercase tracking-wider">{site.statLabel}</span>
          </div>
        </div>
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
          <img 
            src={site.images[0]} 
            alt={site.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/60 backdrop-blur-md text-white text-xs font-mono flex items-center gap-2">
            <span>✦</span>
            <span>{site.photoCaption}</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white/70">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-widest font-bold mb-2" style={{ color: site.brand }}>
              What We Offer
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-[var(--ink)] tracking-tight">
              Everything you need, all in one place.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {site.services.map((service, index) => (
              <div 
                key={service.title} 
                className="p-8 rounded-3xl bg-white shadow-lg border border-black/5 hover:-translate-y-1 transition-transform"
              >
                <span className="text-2xl font-mono font-bold mb-4 block" style={{ color: site.brand }}>
                  0{index + 1}
                </span>
                <h3 className="text-xl font-bold text-[var(--ink)] mb-3">{service.title}</h3>
                <p className="text-sm text-[var(--ink)]/70 leading-relaxed mb-6">{service.text}</p>
                <a href="#contact" className="font-bold text-xs uppercase tracking-wider hover:underline" style={{ color: site.brand }}>
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest font-bold mb-2" style={{ color: site.brand }}>
              Let’s Connect
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-[var(--ink)] tracking-tight mb-4">
              {site.contactTitle}
            </h2>
            <p className="text-sm text-[var(--ink)]/75 mb-6 leading-relaxed">
              {site.address}<br />
              {site.hours}
            </p>
            <div className="space-y-2 font-mono text-sm mb-8">
              <p><a href={`tel:${site.phone}`} className="hover:underline">{site.phone}</a></p>
              <p><a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a></p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-black/5 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)]/70 mb-1">Your Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)]/70 mb-1">Email Address</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)]/70 mb-1">How can we help?</label>
              <textarea 
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
                placeholder={site.formPlaceholder}
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white font-bold text-sm tracking-wide shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              style={{ backgroundColor: site.brand }}
            >
              <Send className="w-4 h-4" />
              <span>{loading ? "Sending..." : "Send Enquiry"}</span>
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-black/10 text-center text-xs text-[var(--ink)]/60 font-mono">
        <p>© 2026 {site.name} · Powered by Arisetek IT Solutions</p>
      </footer>
    </div>
  );
}
