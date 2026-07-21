import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import StatsSection from './components/StatsSection';
import PetAdoptionManager from './components/PetAdoptionManager';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import './App.css';

export default function App() {
  // Theme state: defaults to 'light', persists to localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('pet_app_theme') || 'light';
  });

  const [activeSection, setActiveSection] = useState('hero');

  // Form Modal Pop-up State
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Sync data-theme attribute on <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pet_app_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  return (
    <div className="app-main-wrapper">
      {/* 1. STICKY TOP NAVBAR */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenForm={handleOpenForm}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* 2. HERO CAROUSEL SLIDER */}
      <HeroCarousel onOpenForm={handleOpenForm} />

      {/* 3. IMPACT STATS SECTION */}
      <StatsSection />

      {/* 4. MAIN PAW-FECT MATCH CALCULATOR & GALLERY */}
      <main className="main-content-section">
        <PetAdoptionManager
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
          onOpenForm={handleOpenForm}
        />
      </main>

      {/* 5. SUCCESS STORIES / TESTIMONIALS SECTION */}
      <TestimonialsSection />

      {/* 6. WHY ADOPT & FAQS SECTION */}
      <FaqSection />

      {/* 7. FOOTER */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="brand-icon">🐾</span>
            <h3>Paw-Fect Match Platform</h3>
            <p>Smart Compatibility Adoption Portal • Matching pets to loving homes based on living situations.</p>
          </div>
          <div className="footer-links">
            <a href="#hero">Featured</a>
            <a href="#match-meter">Match Calculator</a>
            <a href="#gallery">Pet Gallery</a>
            <a href="#stories">Stories</a>
            <a href="#why-adopt">FAQs</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Paw-Fect Match Portal • Built with React 19, <code>useState</code> & <code>localStorage</code></p>
        </div>
      </footer>
    </div>
  );
}
