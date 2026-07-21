import React, { useState, useEffect } from 'react';

const HERO_SLIDES = [
  {
    id: 1,
    badge: '🐾 Why Buy? Adopt',
    title: 'Why Buy? Adopt. Lots of Pets Need Your Attention',
    subtitle: 'Give a loving home to rescued pets. Calculate your personalized compatibility score (%) instantly.',
    ctaText: 'Adopt a Pet',
    secondaryCta: 'List Pet for Adoption',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1920&h=1080&crop=entropy&q=95',
    stats: '1,200+ Happy Rescued Pets'
  },
  {
    id: 2,
    badge: '🐶 Personalized Compatibility',
    title: 'Match Pets to Apartments, Houses, Kids & Other Pets',
    subtitle: 'Every pet is evaluated for temperament and living suitability so you get a seamless home adoption fit.',
    ctaText: 'Explore Match Scores',
    secondaryCta: 'Share Pet Cards',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1920&h=1080&crop=entropy&q=95',
    stats: '98% Happy Home Matches'
  },
  {
    id: 3,
    badge: '🐰 Smart Adoption Platform',
    title: 'Give a Loving Home to Your Paw-Fect Companion',
    subtitle: 'Browse health-checked, vaccinated pets and see instantly who fits your daily routine.',
    ctaText: 'View Ranked Gallery',
    secondaryCta: 'Learn Compatibility Criteria',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=1920&h=1080&crop=entropy&q=95',
    stats: '100% Verified Shelter Rescues'
  }
];

export default function HeroCarousel({ onOpenForm }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const scrollToMatchMeter = () => {
    const element = document.getElementById('match-meter');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      const gallery = document.getElementById('gallery');
      if (gallery) gallery.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section id="hero" className="hero-carousel-section">
      <div className="carousel-container">
        {/* Background Image Slide with Perfect Framing */}
        <div
          className="carousel-slide-bg"
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="carousel-overlay" />
        </div>

        {/* Content Box */}
        <div className="carousel-content glass-card">
          <span className="hero-badge">{slide.badge}</span>
          <h1 className="hero-title">{slide.title}</h1>
          <p className="hero-subtitle">{slide.subtitle}</p>

          <div className="hero-actions">
            <button
              type="button"
              className="btn-hero-primary"
              onClick={scrollToMatchMeter}
            >
              🎯 {slide.ctaText} ↓
            </button>
            <button
              type="button"
              className="btn-hero-secondary"
              onClick={onOpenForm}
            >
              ➕ {slide.secondaryCta}
            </button>
          </div>

          <div className="hero-meta-stat">
            <span className="star-icon">⭐</span> {slide.stats}
          </div>
        </div>

        {/* Carousel Prev / Next Controls */}
        <button type="button" className="carousel-arrow prev-arrow" onClick={prevSlide}>
          ❮
        </button>
        <button type="button" className="carousel-arrow next-arrow" onClick={nextSlide}>
          ❯
        </button>

        {/* Slide Indicators / Dots */}
        <div className="carousel-dots">
          {HERO_SLIDES.map((s, index) => (
            <button
              key={s.id}
              type="button"
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              title={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
