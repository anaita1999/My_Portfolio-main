import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import '@/App.css';

import useLenisScroll from '@/hooks/useLenisScroll';
import CustomCursor from '@/components/portfolio/CustomCursor';
import Preloader from '@/components/portfolio/Preloader';
import Navbar from '@/components/portfolio/Navbar';
import KageWorld from '@/components/portfolio/KageWorld';
import ChapterRail from '@/components/portfolio/ChapterRail';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Skills from '@/components/portfolio/Skills';
import Projects from '@/components/portfolio/Projects';
import Experience from '@/components/portfolio/Experience';
import Certifications from '@/components/portfolio/Certifications';
import Testimonials from '@/components/portfolio/Testimonials';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';
import HireMeWidget from '@/components/portfolio/HireMeWidget';
import ShareWidget from '@/components/portfolio/ShareWidget';
import CaseStudy from '@/pages/CaseStudy';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import useDynamicMeta from '@/hooks/useDynamicMeta';
import { track } from '@/lib/analytics';
import { PortfolioContentProvider } from '@/context/PortfolioContentContext';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import { ThemeProvider } from '@/context/ThemeContext';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}

function Portfolio() {
  useLenisScroll();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.body.classList.add('grain');
    track('page_view', { page: 'portfolio_sanctuary' });
    return () => document.body.classList.remove('grain');
  }, []);

  return (
    <div className="App">
      {/* Fixed 3D WebGL World Layer */}
      <KageWorld />

      {/* Lens Vignette Filter */}
      <div id="vignette-overlay" aria-hidden="true" />

      {/* Interactive Vertical Chapter Rail */}
      <ChapterRail />

      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <CustomCursor />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <HireMeWidget />
      <ShareWidget />
    </div>
  );
}

function CaseStudyPage() {
  useEffect(() => {
    track('page_view', { page: 'case_study' });
  }, []);
  return (
    <div className="min-h-screen bg-[#05070a] text-[#dfe7e0]">
      <CustomCursor />
      <CaseStudy />
      <ShareWidget />
    </div>
  );
}

function AppShell() {
  useDynamicMeta();
  return (
    <>
      <ScrollToTop />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(10, 14, 20, 0.95)',
            border: '1px solid rgba(0, 229, 255, 0.4)',
            color: '#dfe7e0',
            backdropFilter: 'blur(16px)',
          },
        }}
      />
      <Routes>
        {/* Direct Portfolio Landing */}
        <Route path="/" element={<Portfolio />} />
        <Route path="/portfolio" element={<Portfolio />} />

        {/* Detailed Case Studies */}
        <Route path="/work/:slug" element={<CaseStudyPage />} />

        {/* Admin 2FA Authentication & Sanctuary CMS / CRM */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <PortfolioContentProvider>
        <AdminAuthProvider>
          <BrowserRouter>
            <AppShell />
          </BrowserRouter>
        </AdminAuthProvider>
      </PortfolioContentProvider>
    </ThemeProvider>
  );
}

export default App;
