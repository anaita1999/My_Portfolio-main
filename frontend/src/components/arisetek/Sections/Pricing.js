import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "../Magnetic";
import { usePortfolioContent } from "../../../context/PortfolioContentContext";
import { useTheme } from "../../../context/ThemeContext";
import { LiveBadge, LiveShimmerText, LiveScrambleText } from "../../ui/LiveTypography";

const FALLBACK_PRICING_DATA = {
  "Website Development": [
    {
      name: "Starter Web",
      price: "From ₹14,999",
      desc: "Professional landing page / portfolio presence.",
      features: ["Single-page application", "Responsive design", "Contact forms", "Basic SEO", "Analytics setup", "Performance optimized"],
      highlight: false
    },
    {
      name: "Growth Web",
      price: "From ₹39,999",
      desc: "Multi-page growth website with CMS and integrations.",
      features: ["Up to 5–8 pages", "Custom UI/UX", "CMS", "Standard animations", "On-page SEO", "Analytics & Search Console"],
      highlight: false
    },
    {
      name: "Corporate Portal",
      price: "From ₹79,999",
      desc: "Custom corporate platform engineered around business requirements.",
      features: ["Custom React/Next.js", "Advanced interactive animations", "CMS", "Backend/API integrations", "Advanced SEO", "Performance optimization"],
      highlight: true
    },
    {
      name: "3D WebGL Experience",
      price: "From ₹1,49,999",
      desc: "Premium immersive web experiences.",
      features: ["Three.js / WebGL / R3F", "Interactive 3D environments", "GSAP animation", "Custom shaders", "GLB/GLTF integration", "Performance optimization"],
      highlight: false
    }
  ],
  "App Development": [
    {
      name: "MVP Launchpad",
      price: "From ₹74,999",
      desc: "Launch-ready mobile MVP for validating your product.",
      features: ["Android or iOS", "Core Features", "Custom UI/UX", "Authentication", "Cloud Backend", "Push Notifications", "Store Deployment"],
      highlight: false
    },
    {
      name: "Growth App",
      price: "From ₹1,49,999",
      desc: "Cross-platform application built for growing businesses.",
      features: ["Android + iOS", "Flutter / React Native", "Custom UI/UX", "Admin Dashboard", "API Integrations", "Push Notifications", "Analytics & Monitoring"],
      highlight: false
    },
    {
      name: "Scaling Business",
      price: "From ₹2,99,999",
      desc: "Advanced mobile platform engineered for growing operations.",
      features: ["Advanced UI/UX", "Multi-Role Architecture", "Custom Backend", "Payment Integration", "Real-Time Features", "Advanced Analytics", "Performance Optimized"],
      highlight: true
    },
    {
      name: "Enterprise App",
      price: "From ₹5,99,999",
      desc: "Enterprise-grade native applications for mission-critical operations.",
      features: ["Native iOS + Android", "Enterprise Architecture", "Advanced Security", "Complex API Integrations", "Real-Time Systems", "Advanced Analytics", "SLA Options"],
      highlight: false
    }
  ],
  "AI Automation": [
    {
      name: "Basic AI Chatbot",
      price: "From ₹24,999",
      desc: "AI customer assistant trained on your business knowledge.",
      features: ["FAQ Automation", "Custom Knowledge Base", "Website Integration", "Lead Capture", "Human Handoff", "Basic Analytics"],
      highlight: false
    },
    {
      name: "Workflow Copilot",
      price: "From ₹59,999",
      desc: "AI-powered automation connecting your everyday business tools.",
      features: ["2–3 Automated Workflows", "n8n / Make Integrations", "CRM Integration", "Lead Qualification", "API Integration", "Human Approvals"],
      highlight: false
    },
    {
      name: "Agentic Workflows",
      price: "From ₹1,49,999",
      desc: "AI agents that execute and coordinate real business workflows.",
      features: ["Multi-Agent Setup", "CRM & Tool Integration", "Agent Memory", "Automated Actions", "Knowledge / RAG", "Monitoring & Evaluation"],
      highlight: true
    },
    {
      name: "Enterprise AI",
      price: "From ₹2,99,999",
      desc: "Custom AI automation architecture for complex business operations.",
      features: ["Multi-Agent Architecture", "CRM / ERP Integration", "Advanced RAG", "Security & Permissions", "Analytics & Audit Logs", "SLA Options"],
      highlight: false
    }
  ],
  "Enterprise Swarm": [
    {
      name: "Process Audit",
      price: "From ₹39,999",
      desc: "Strategic assessment and architecture roadmap for intelligent automation.",
      features: ["Workflow Analysis", "Tech Stack Review", "AI Readiness Assessment", "Automation Opportunities", "Architecture Blueprint", "Implementation Roadmap"],
      highlight: false
    },
    {
      name: "Foundation Build",
      price: "From ₹1,49,999",
      desc: "Production-ready foundation for scalable AI operations.",
      features: ["Core AI Agent", "Automation Infrastructure", "Knowledge / RAG", "Business Integrations", "Monitoring & Logging", "Cloud Deployment"],
      highlight: false
    },
    {
      name: "Swarm Deployment",
      price: "From ₹3,49,999",
      desc: "Coordinated AI agents engineered to automate connected business operations.",
      features: ["Multi-Agent Architecture", "Agent Orchestration", "Business Integrations", "Human Approval Controls", "Automated Reporting", "Monitoring & Evaluation"],
      highlight: true
    },
    {
      name: "Full Autonomy",
      price: "From ₹7,99,999",
      desc: "Enterprise-scale agentic infrastructure for complex business operations.",
      features: ["Cross-Department Agents", "CRM / ERP Integration", "Advanced RAG", "Enterprise Security", "Governance & Audit", "SLA & Monitoring"],
      highlight: false
    }
  ]
};

const CATEGORIES = ["Website Development", "App Development", "AI Automation", "Enterprise Swarm"];

const FALLBACK_CATEGORY_ADD_ONS = {
  "Website Development": [
    { label: "Additional standard page", price: "₹3,000–₹7,500", min: 3000 },
    { label: "Advanced custom page", price: "₹7,500–₹20,000+", min: 7500 },
    { label: "Blog/CMS", price: "₹10,000–₹25,000", min: 10000 },
    { label: "Admin dashboard", price: "₹25,000–₹75,000+", min: 25000 },
    { label: "Authentication", price: "₹15,000–₹35,000", min: 15000 },
    { label: "Payment gateway", price: "₹15,000–₹35,000", min: 15000 },
    { label: "Booking system", price: "₹15,000–₹40,000", min: 15000 },
    { label: "Third-party API integration", price: "₹10,000–₹30,000+", min: 10000 },
    { label: "Custom 3D model", price: "₹15,000–₹75,000+", min: 15000 },
    { label: "Advanced WebGL scene", price: "₹30,000–₹1L+", min: 30000 },
    { label: "Copywriting/content", price: "Quote separately", min: 0 },
    { label: "Advanced SEO", price: "₹10,000–₹30,000+/month", min: 0 },
    { label: "Maintenance", price: "₹2,500–₹15,000+/month", min: 0 }
  ],
  "App Development": [
    { label: "Additional standard screen", price: "₹4,000–₹8,000", min: 4000 },
    { label: "Complex custom screen", price: "₹8,000–₹20,000+", min: 8000 },
    { label: "Admin dashboard", price: "₹25,000–₹75,000+", min: 25000 },
    { label: "Authentication", price: "₹10,000–₹25,000", min: 10000 },
    { label: "OTP authentication", price: "₹8,000–₹20,000", min: 8000 },
    { label: "Google/Apple social login", price: "₹5,000–₹15,000", min: 5000 },
    { label: "Role-based access", price: "₹15,000–₹40,000", min: 15000 },
    { label: "Payment gateway", price: "₹15,000–₹35,000", min: 15000 },
    { label: "Subscription system", price: "₹20,000–₹50,000", min: 20000 },
    { label: "Push notifications", price: "₹8,000–₹20,000", min: 8000 },
    { label: "Chat/messaging", price: "₹25,000–₹75,000+", min: 25000 },
    { label: "Maps/GPS", price: "₹15,000–₹40,000", min: 15000 },
    { label: "Live location tracking", price: "₹25,000–₹60,000+", min: 25000 },
    { label: "Booking system", price: "₹20,000–₹50,000", min: 20000 },
    { label: "REST API integration", price: "₹8,000–₹25,000/API", min: 8000 },
    { label: "Complex third-party integration", price: "₹20,000–₹60,000+", min: 20000 },
    { label: "Custom backend/API", price: "₹30,000–₹1L+", min: 30000 },
    { label: "Advanced analytics", price: "₹10,000–₹30,000", min: 10000 },
    { label: "Offline synchronization", price: "₹20,000–₹60,000", min: 20000 },
    { label: "Multi-language support", price: "₹10,000–₹30,000", min: 10000 },
    { label: "Biometric authentication", price: "₹10,000–₹25,000", min: 10000 },
    { label: "AI chatbot", price: "₹25,000–₹75,000+", min: 25000 },
    { label: "AI/LLM integration", price: "₹30,000–₹1L+", min: 30000 },
    { label: "App Store/Play Store submission", price: "₹5,000–₹15,000", min: 5000 }
  ],
  "AI Automation": [
    { label: "Simple automation workflow", price: "₹7,500–₹15,000", min: 7500 },
    { label: "Advanced workflow", price: "₹15,000–₹35,000+", min: 15000 },
    { label: "Additional AI agent", price: "₹20,000–₹50,000+", min: 20000 },
    { label: "Website chatbot", price: "₹15,000–₹30,000", min: 15000 },
    { label: "WhatsApp AI integration", price: "₹15,000–₹35,000", min: 15000 },
    { label: "Voice AI agent", price: "₹30,000–₹75,000+", min: 30000 },
    { label: "Email automation agent", price: "₹10,000–₹25,000", min: 10000 },
    { label: "Lead qualification agent", price: "₹15,000–₹35,000", min: 15000 },
    { label: "Appointment booking agent", price: "₹15,000–₹30,000", min: 15000 },
    { label: "Customer-support agent", price: "₹20,000–₹50,000", min: 20000 },
    { label: "RAG knowledge base", price: "₹15,000–₹40,000", min: 15000 },
    { label: "CRM integration", price: "₹10,000–₹25,000", min: 10000 },
    { label: "ERP integration", price: "₹30,000–₹75,000+", min: 30000 },
    { label: "Standard API integration", price: "₹7,500–₹15,000/API", min: 7500 },
    { label: "Complex API integration", price: "₹15,000–₹40,000+", min: 15000 },
    { label: "AI operations dashboard", price: "₹20,000–₹50,000+", min: 20000 },
    { label: "Agent memory", price: "₹15,000–₹35,000", min: 15000 },
    { label: "Human approval workflow", price: "₹10,000–₹25,000", min: 10000 },
    { label: "Analytics/evaluation", price: "₹15,000–₹35,000", min: 15000 },
    { label: "Audit logging", price: "₹10,000–₹25,000", min: 10000 },
    { label: "Model routing", price: "₹15,000–₹35,000", min: 15000 },
    { label: "AI Care (Maintenance)", price: "₹4,999/month", min: 0 },
    { label: "Automation Care (Maintenance)", price: "₹9,999/month", min: 0 },
    { label: "Agent Operations (Maintenance)", price: "₹19,999/month", min: 0 },
    { label: "Enterprise AI Ops (Maintenance)", price: "From ₹39,999/month", min: 0 }
  ],
  "Enterprise Swarm": [
    { label: "Simple workflow", price: "₹10,000–₹20,000", min: 10000 },
    { label: "Advanced workflow", price: "₹20,000–₹50,000", min: 20000 },
    { label: "Additional standard agent", price: "₹30,000–₹60,000", min: 30000 },
    { label: "Advanced specialized agent", price: "₹60,000–₹1.5L+", min: 60000 },
    { label: "Additional department", price: "₹50,000–₹1.5L+", min: 50000 },
    { label: "CRM integration", price: "₹20,000–₹40,000", min: 20000 },
    { label: "ERP integration", price: "₹50,000–₹1.5L+", min: 50000 },
    { label: "HRMS/accounting integration", price: "₹25,000–₹60,000", min: 25000 },
    { label: "Standard API", price: "₹10,000–₹20,000", min: 10000 },
    { label: "Complex/custom API", price: "₹25,000–₹75,000+", min: 25000 },
    { label: "RAG knowledge layer", price: "₹25,000–₹60,000", min: 25000 },
    { label: "Advanced memory system", price: "₹25,000–₹60,000", min: 25000 },
    { label: "Operations dashboard", price: "₹35,000–₹1L+", min: 35000 },
    { label: "Human approval architecture", price: "₹20,000–₹50,000", min: 20000 },
    { label: "Evaluation framework", price: "₹30,000–₹75,000", min: 30000 },
    { label: "Audit/traceability layer", price: "₹20,000–₹50,000", min: 20000 },
    { label: "SSO / RBAC", price: "₹30,000–₹75,000+", min: 30000 },
    { label: "Model routing", price: "₹20,000–₹50,000", min: 20000 },
    { label: "Private VPC deployment", price: "₹75,000–₹2L+", min: 75000 },
    { label: "High availability setup", price: "₹75,000–₹2L+", min: 75000 },
    { label: "On-premise deployment", price: "Custom quote", min: 0 },
    { label: "Foundation Care (Maintenance)", price: "₹14,999/month", min: 0 },
    { label: "Swarm Operations (Maintenance)", price: "₹29,999/month", min: 0 },
    { label: "Advanced Agent Ops (Maintenance)", price: "₹49,999/month", min: 0 },
    { label: "Enterprise SLA (Maintenance)", price: "From ₹99,999/month", min: 0 }
  ]
};

const FALLBACK_SPECIALIZED_ADD_ONS = {
  "App Development": [
    { label: "E-commerce module", price: "₹40,000+", min: 40000 },
    { label: "Marketplace", price: "₹75,000+", min: 75000 },
    { label: "Delivery/tracking system", price: "₹60,000+", min: 60000 },
    { label: "Vendor panel", price: "₹30,000+", min: 30000 },
    { label: "CRM integration", price: "₹25,000+", min: 25000 },
    { label: "ERP integration", price: "₹50,000+", min: 50000 },
    { label: "Video calling", price: "₹40,000+", min: 40000 },
    { label: "Live streaming", price: "₹60,000+", min: 60000 },
    { label: "Real-time chat", price: "₹30,000+", min: 30000 },
    { label: "AI recommendation engine", price: "₹50,000+", min: 50000 },
    { label: "Computer vision", price: "₹75,000+", min: 75000 },
    { label: "IoT/hardware integration", price: "₹75,000+", min: 75000 },
    { label: "Enterprise SSO", price: "₹30,000+", min: 30000 },
    { label: "Advanced encryption/security", price: "₹30,000+", min: 30000 }
  ]
};

export default function Pricing() {
  const { isDark } = useTheme();
  const { arisetekContent } = usePortfolioContent();
  const pricingData = arisetekContent?.pricing || FALLBACK_PRICING_DATA;
  const categoryAddOns = arisetekContent?.category_addons || FALLBACK_CATEGORY_ADD_ONS;
  const specializedAddOns = arisetekContent?.specialized_addons || FALLBACK_SPECIALIZED_ADD_ONS;

  const [activeTab, setActiveTab] = useState("Website Development");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showAddonModal, setShowAddonModal] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  useEffect(() => {
    const handleSetPricingTab = (event) => {
      if (event.detail && CATEGORIES.includes(event.detail.category)) {
        setActiveTab(event.detail.category);
      }
    };
    window.addEventListener("arisetek-set-pricing-tab", handleSetPricingTab);
    return () => window.removeEventListener("arisetek-set-pricing-tab", handleSetPricingTab);
  }, []);

  const handleInitiateRequest = (tier) => {
    if (categoryAddOns[activeTab]) {
      setSelectedPlan(tier);
      setSelectedAddOns([]);
      setShowAddonModal(true);
    } else {
      triggerFinalRequest(tier, []);
    }
  };

  const toggleAddon = (label) => {
    setSelectedAddOns(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  const triggerFinalRequest = (plan, addons) => {
    let basePriceNum = parseInt(plan.price.replace(/\D/g, ""), 10);
    let addOnsTotal = addons.reduce((acc, addonLabel) => {
      let standardList = categoryAddOns[activeTab] || [];
      let specializedList = specializedAddOns[activeTab] || [];
      let addonList = [...standardList, ...specializedList];
      let addon = addonList.find(a => a.label === addonLabel);
      return acc + (addon ? addon.min : 0);
    }, 0);
    let total = basePriceNum + addOnsTotal;

    let budgetTier = "< ₹1L (< $1.2k)";
    if (total >= 100000 && total < 300000) budgetTier = "₹1L – ₹3L ($1.5k – $3.5k)";
    else if (total >= 300000 && total < 600000) budgetTier = "₹3L – ₹6L ($3.5k – $7k)";
    else if (total >= 600000) budgetTier = "₹6L+ ($7k+ Enterprise)";

    let serviceMapping = {
      "Website Development": "App & Web Development",
      "App Development": "App & Web Development",
      "AI Automation": "AI Automations & Agentic Swarm",
      "Enterprise Swarm": "Enterprise Architecture & Custom CRM"
    };
    
    let service = serviceMapping[activeTab] || "App & Web Development";
    if (plan.name.includes("3D")) service = "3D WebGL / Interactive Portal";

    let briefTemplate = `Project Type: ${plan.name}
Base Price: ${plan.price}
Selected Add-ons:
${addons.length > 0 ? addons.map(a => `- ${a}`).join('\n') : 'None'}

Please describe your project vision, timeline, and any specific requirements:
`;

    const event = new CustomEvent('arisetek-pricing-select', {
      detail: { service, budget: budgetTier, brief: briefTemplate }
    });
    window.dispatchEvent(event);
    
    setShowAddonModal(false);
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" style={{ padding: "112px 24px", position: "relative", width: "100%", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", textAlign: "center" }}>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "48px" }}
        >
          <LiveBadge theme="flame" className="mb-4">
            ✦ <LiveScrambleText text="Transparent Pricing" speed={45} />
          </LiveBadge>
          
          <h2
            className="live-glow-flame"
            style={{
              fontSize: "clamp(34px, 4.2vw, 64px)",
              fontWeight: 900,
              letterSpacing: "-.04em",
              lineHeight: 1.1,
              margin: "0 0 24px",
              fontFamily: "'Unbounded', sans-serif",
              color: isDark ? "#fff" : "#090d16"
            }}
          >
            Invest in <br />
            <LiveShimmerText theme="flame">
              engineering excellence.
            </LiveShimmerText>
          </h2>
          <p style={{ color: isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.7)", fontSize: "18px", fontWeight: 300, maxWidth: "600px", margin: "0 auto" }}>
            Select a service pillar below to view our straightforward, value-driven pricing tiers.
          </p>
        </motion.div>

        {/* Tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginBottom: "64px" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                padding: "12px 24px",
                borderRadius: "999px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: ".1em",
                fontWeight: 700,
                border: activeTab === cat
                  ? "1px solid #FF6B00"
                  : (isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.1)"),
                background: activeTab === cat
                  ? "rgba(255,107,0,.1)"
                  : (isDark ? "rgba(8,9,12,.6)" : "#ffffff"),
                color: activeTab === cat ? "#FF6B00" : (isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.6)"),
                boxShadow: isDark ? "none" : "0 2px 8px rgba(0,0,0,0.03)",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
              className="hover:border-[#FF6B00] hover:text-[#FF6B00]"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
          >
            {pricingData[activeTab].map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                style={{
                  background: tier.highlight
                    ? (isDark ? "rgba(255,107,0,.05)" : "rgba(255,107,0,.03)")
                    : (isDark ? "rgba(8,9,12,.7)" : "#ffffff"),
                  backdropFilter: "blur(12px)",
                  border: tier.highlight
                    ? "1px solid rgba(255,107,0,.5)"
                    : (isDark ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(15,23,42,.1)"),
                  borderRadius: "24px",
                  padding: "40px 24px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: tier.highlight
                    ? "0 20px 40px rgba(255,107,0,.15)"
                    : (isDark ? "0 20px 40px rgba(0,0,0,.4)" : "0 4px 25px rgba(0,0,0,.04)"),
                  transform: tier.highlight ? "scale(1.02)" : "scale(1)",
                  zIndex: tier.highlight ? 10 : 1
                }}
                className="hover:border-[#FF6B00]/50 transition-all duration-300 group"
              >
                {tier.highlight && (
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, background: "linear-gradient(90deg, #FF6B00, #FF8500)", color: "#000", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".2em", textAlign: "center", padding: "6px 0" }}>
                    Most Recommended
                  </div>
                )}
                
                <div style={{ marginTop: tier.highlight ? "16px" : "0", marginBottom: "32px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 12px", color: tier.highlight ? "#FF6B00" : (isDark ? "#fff" : "#090d16") }}>
                    {tier.name}
                  </h3>
                  <div style={{ fontSize: "28px", fontWeight: 900, fontFamily: "'Unbounded', sans-serif", letterSpacing: "-.02em", marginBottom: "12px", color: isDark ? "#fff" : "#090d16" }}>
                    {tier.price}
                  </div>
                  <p style={{ color: isDark ? "rgba(255,255,255,.5)" : "rgba(15,23,42,.6)", fontSize: "13px", lineHeight: 1.5, margin: 0, minHeight: "40px" }}>
                    {tier.desc}
                  </p>
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", flexGrow: 1 }}>
                  {tier.features.map((feat, idx) => (
                    <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "14px", fontSize: "13px", color: isDark ? "rgba(255,255,255,.8)" : "#334155", lineHeight: 1.4 }}>
                      <span style={{ color: "#FF6B00", flexShrink: 0, marginTop: "2px" }}>✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <Magnetic className="w-full">
                  <button
                    onClick={() => handleInitiateRequest(tier)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "center",
                      padding: "14px",
                      borderRadius: "12px",
                      background: tier.highlight
                        ? "linear-gradient(90deg, #FF6B00, #FF8500)"
                        : (isDark ? "rgba(255,255,255,.05)" : "rgba(15,23,42,.04)"),
                      border: tier.highlight ? "none" : (isDark ? "1px solid rgba(255,255,255,.2)" : "1px solid rgba(15,23,42,.12)"),
                      color: tier.highlight ? "#000" : (isDark ? "#fff" : "#090d16"),
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: ".15em",
                      textDecoration: "none",
                      transition: "all 0.3s",
                      boxSizing: "border-box",
                      cursor: "pointer"
                    }}
                    className={`magnetic-glow ${tier.highlight ? "hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,107,0,.4)]" : "hover:border-[#FF6B00] hover:text-[#FF6B00]"}`}
                  >
                    Initiate Request
                  </button>
                </Magnetic>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <p style={{
          marginTop: "48px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          color: isDark ? "rgba(255,255,255,0.4)" : "rgba(15,23,42,0.5)",
          lineHeight: 1.6,
          maxWidth: "800px",
          margin: "48px auto 0"
        }}>
          *Not included unless specifically quoted: Apple/Google Developer accounts, Cloud hosting, Firebase/Supabase paid usage, AWS/GCP/Azure services, SMS/OTP charges, Maps API charges, Payment gateway transaction fees, Premium third-party SDKs, Domain names, or external licenses.
        </p>
      </div>

      {/* Add-on Modal */}
      <AnimatePresence>
        {showAddonModal && selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(10px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px"
            }}
            onClick={() => setShowAddonModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: isDark ? "rgba(8,9,12,0.95)" : "#ffffff",
                border: isDark ? "1px solid rgba(255,107,0,0.3)" : "1px solid rgba(15,23,42,0.1)",
                borderRadius: "24px",
                padding: "32px",
                width: "100%",
                maxWidth: "600px",
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                textAlign: "left"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h3 style={{ margin: 0, fontSize: "24px", fontWeight: 700, color: isDark ? "#fff" : "#090d16", fontFamily: "'Unbounded', sans-serif" }}>
                  Customize <span style={{ color: "#FF6B00" }}>{selectedPlan.name}</span>
                </h3>
                <button 
                  onClick={() => setShowAddonModal(false)}
                  style={{ background: "transparent", border: "none", color: isDark ? "rgba(255,255,255,0.5)" : "rgba(15,23,42,0.5)", fontSize: "24px", cursor: "pointer" }}
                  className="hover:text-[#FF6B00]"
                >
                  &times;
                </button>
              </div>
              
              <div style={{ marginBottom: "24px", padding: "16px", background: isDark ? "rgba(255,255,255,.03)" : "rgba(15,23,42,.03)", borderRadius: "12px", border: isDark ? "1px solid rgba(255,255,255,.05)" : "1px solid rgba(15,23,42,.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ color: isDark ? "#fff" : "#090d16", fontWeight: 600 }}>{selectedPlan.name}</span>
                  <span style={{ color: "#FF6B00", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{selectedPlan.price}</span>
                </div>
                <p style={{ color: isDark ? "rgba(255,255,255,.6)" : "rgba(15,23,42,.7)", fontSize: "14px", margin: 0 }}>{selectedPlan.desc}</p>
              </div>

              <div className="grid grid-cols-1 gap-6 max-h-[50vh] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: isDark ? 'rgba(255,255,255,0.1) transparent' : 'rgba(15,23,42,0.1) transparent' }}>
                {categoryAddOns[activeTab] && categoryAddOns[activeTab].length > 0 && (
                  <div>
                    <h4 style={{ color: isDark ? "rgba(255,255,255,.4)" : "rgba(15,23,42,.5)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px", fontFamily: "'JetBrains Mono', monospace" }}>
                      Standard Enhancements
                    </h4>
                    <div className="space-y-2">
                      {categoryAddOns[activeTab].map((addon, i) => (
                        <div 
                          key={i}
                          onClick={() => toggleAddon(addon.label)}
                          className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedAddOns.includes(addon.label) 
                              ? 'border-[#FF6B00] bg-[rgba(255,107,0,0.1)]' 
                              : isDark ? 'border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.2)]' : 'border-[rgba(15,23,42,0.08)] bg-slate-50 hover:border-[#FF6B00]/40'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                              selectedAddOns.includes(addon.label)
                                ? 'border-[#FF6B00] bg-[#FF6B00]'
                                : (isDark ? 'border-[rgba(255,255,255,0.3)]' : 'border-[rgba(15,23,42,0.3)]')
                            }`}>
                              {selectedAddOns.includes(addon.label) && (
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </div>
                            <span style={{ color: selectedAddOns.includes(addon.label) ? '#FF6B00' : (isDark ? 'rgba(255,255,255,.8)' : '#090d16'), fontSize: "14px" }}>
                              {addon.label}
                            </span>
                          </div>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: selectedAddOns.includes(addon.label) ? '#FF6B00' : (isDark ? 'rgba(255,255,255,.5)' : 'rgba(15,23,42,.6)') }}>
                            {addon.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {specializedAddOns[activeTab] && specializedAddOns[activeTab].length > 0 && (
                  <div>
                    <h4 style={{ color: isDark ? "rgba(255,255,255,.4)" : "rgba(15,23,42,.5)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px", fontFamily: "'JetBrains Mono', monospace" }}>
                      Specialized App Add-ons
                    </h4>
                    <div className="space-y-2">
                      {specializedAddOns[activeTab].map((addon, i) => (
                        <div 
                          key={`spec-${i}`}
                          onClick={() => toggleAddon(addon.label)}
                          className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedAddOns.includes(addon.label) 
                              ? 'border-[#FF6B00] bg-[rgba(255,107,0,0.1)]' 
                              : isDark ? 'border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.2)]' : 'border-[rgba(15,23,42,0.08)] bg-slate-50 hover:border-[#FF6B00]/40'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                              selectedAddOns.includes(addon.label)
                                ? 'border-[#FF6B00] bg-[#FF6B00]'
                                : (isDark ? 'border-[rgba(255,255,255,0.3)]' : 'border-[rgba(15,23,42,0.3)]')
                            }`}>
                              {selectedAddOns.includes(addon.label) && (
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </div>
                            <span style={{ color: selectedAddOns.includes(addon.label) ? '#FF6B00' : (isDark ? 'rgba(255,255,255,.8)' : '#090d16'), fontSize: "14px" }}>
                              {addon.label}
                            </span>
                          </div>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: selectedAddOns.includes(addon.label) ? '#FF6B00' : (isDark ? 'rgba(255,255,255,.5)' : 'rgba(15,23,42,.6)') }}>
                            {addon.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <p style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(15,23,42,0.7)", fontSize: "14px", marginTop: "32px", marginBottom: "32px", lineHeight: 1.5 }}>
                Select any optional add-ons to enhance your project. This helps our AI accurately estimate your budget bracket before we speak.
              </p>

              <Magnetic className="w-full">
                <button
                  onClick={() => triggerFinalRequest(selectedPlan, selectedAddOns)}
                  style={{
                    width: "100%", padding: "16px", borderRadius: "12px",
                    background: "linear-gradient(90deg, #FF6B00, #FF8500)", color: "#000",
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: ".15em", border: "none",
                    cursor: "pointer", transition: "all 0.2s"
                  }}
                  className="magnetic-glow hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,107,0,0.4)]"
                >
                  Initiate Final Request →
                </button>
              </Magnetic>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
