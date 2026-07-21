import React, { useState } from 'react';

export default function Navbar({ theme, onToggleTheme, onOpenForm, activeSection, setActiveSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky-navbar-header">
      <div className="navbar-container template-header-layout">
        {/* Left Nav Links */}
        <nav className="desktop-nav-links left-nav">
          <button
            type="button"
            className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
            onClick={() => scrollToSection('hero')}
          >
            🐾 Home
          </button>
          <button
            type="button"
            className={`nav-link ${activeSection === 'match-meter' ? 'active' : ''}`}
            onClick={() => scrollToSection('match-meter')}
          >
            🐾 Match Finder
          </button>
          <button
            type="button"
            className={`nav-link ${activeSection === 'why-adopt' ? 'active' : ''}`}
            onClick={() => scrollToSection('why-adopt')}
          >
            🐾 Why Adopt?
          </button>
        </nav>

        {/* Center Brand Logo (Template Design) */}
        <div className="navbar-brand center-logo" onClick={() => scrollToSection('hero')}>
          <div className="heart-paw-badge">🐾</div>
          <span className="brand-text">Paw-Fect <span className="brand-accent">Pets</span></span>
        </div>

        {/* Right Nav Links & Actions */}
        <div className="navbar-actions right-nav">
          <button
            type="button"
            className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`}
            onClick={() => scrollToSection('gallery')}
          >
            🐾 Pet Gallery
          </button>
          <button
            type="button"
            className={`nav-link ${activeSection === 'stories' ? 'active' : ''}`}
            onClick={() => scrollToSection('stories')}
          >
            🐾 Stories
          </button>

          {/* Theme Switcher Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>

          {/* Post Pet CTA Button */}
          <button
            type="button"
            className="navbar-cta-btn template-adopt-btn"
            onClick={onOpenForm}
          >
            ➕ Post Pet
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <button type="button" onClick={() => scrollToSection('hero')}>🐾 Home</button>
          <button type="button" onClick={() => scrollToSection('match-meter')}>🐾 Match Finder</button>
          <button type="button" onClick={() => scrollToSection('gallery')}>🐾 Pet Gallery</button>
          <button type="button" onClick={() => scrollToSection('stories')}>🐾 Stories</button>
          <button type="button" onClick={() => scrollToSection('why-adopt')}>🐾 Why Adopt?</button>
          <button type="button" onClick={onOpenForm} className="mobile-cta">➕ Post Pet</button>
        </div>
      )}
    </header>
  );
}
