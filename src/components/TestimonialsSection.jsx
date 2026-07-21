import React, { useState, useRef } from 'react';

const STORIES = [
  {
    id: 1,
    petName: 'Buddy (Golden Retriever)',
    family: 'The Sharma Family',
    story: 'Adopting Buddy brought so much joy into our home! He loves playing fetch in the park and is the best friend our kids could ask for.',
    avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=85',
    tag: 'Adopted 3 months ago'
  },
  {
    id: 2,
    petName: 'Luna (Siamese Cat)',
    family: 'Ananya & Rohan',
    story: 'Luna immediately made our apartment feel like home. The adoption process was smooth, transparent, and hassle-free!',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=500&q=85',
    tag: 'Adopted 6 months ago'
  },
  {
    id: 3,
    petName: 'Barnaby (Holland Lop Rabbit)',
    family: 'Priya Verma',
    story: 'Barnaby is super gentle and intelligent. Watching him hop around in the morning is the favorite part of my day.',
    avatar: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=500&q=85',
    tag: 'Adopted 1 month ago'
  },
  {
    id: 4,
    petName: 'Pip (Cockatiel)',
    family: 'Vikram Mehta',
    story: 'Pip loves singing during my work-from-home calls! Paw-Fect Match matched us perfectly based on my WFH schedule.',
    avatar: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=500&q=85',
    tag: 'Adopted 2 weeks ago'
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Touch Swipe Gesture State
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % STORIES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + STORIES.length) % STORIES.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <section id="stories" className="stories-section">
      <div className="section-title-wrapper">
        <span className="section-badge">❤️ Heartwarming Stories</span>
        <h2>Success Adoption Stories</h2>
        <p>Real stories from loving families who adopted their pets through Paw-Fect Match</p>
      </div>

      {/* HORIZONTAL CAROUSEL CONTAINER WITH ACTIVE CARD SCALING */}
      <div
        className="carousel-slider-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carousel-slider-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {STORIES.map((story, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={story.id}
                className={`carousel-slide-card story-card glass-card ${isActive ? 'active-slide' : 'inactive-slide'}`}
                style={{ flex: '0 0 100%', maxWidth: '780px', margin: '0 auto' }}
              >
                <div className="story-image-box">
                  <img src={story.avatar} alt={story.petName} className="story-img" />
                </div>

                <div className="story-content">
                  <span className="story-tag">🐾 {story.tag}</span>
                  <blockquote className="story-quote">
                    "{story.story}"
                  </blockquote>
                  <div className="story-author">
                    <h4>{story.petName}</h4>
                    <p>Adopted by <strong>{story.family}</strong></p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          type="button"
          className="carousel-arrow prev-arrow"
          onClick={prevSlide}
          title="Previous Story"
        >
          ❮
        </button>
        <button
          type="button"
          className="carousel-arrow next-arrow"
          onClick={nextSlide}
          title="Next Story"
        >
          ❯
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="carousel-dots">
        {STORIES.map((story, index) => (
          <button
            key={story.id}
            type="button"
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            title={`Go to story ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
