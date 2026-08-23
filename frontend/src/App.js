import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { track } from '@/lib/analytics';
import { PortfolioContentProvider } from '@/context/PortfolioContentContext';
import { AdminAuthProvider } from '@/context/AdminAuthContext';

function Portfolio() {
  useLenisScroll();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.body.classList.add('grain');
    track('page_view', { page: 'home' });
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
  return (
    <>
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(10, 14, 20, 0.95)',
            border: '1px solid rgba(224, 35, 28, 0.4)',
            color: '#dfe7e0',
            backdropFilter: 'blur(16px)',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/work/:slug" element={<CaseStudyPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <PortfolioContentProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </AdminAuthProvider>
    </PortfolioContentProvider>
  );
}

export default App;
