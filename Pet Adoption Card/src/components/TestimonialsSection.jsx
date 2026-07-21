import React, { useState } from 'react';

const STORIES = [
  {
    id: 1,
    petName: 'Buddy (Golden Retriever)',
    family: 'The Sharma Family',
    story: 'Adopting Buddy brought so much joy into our home! He loves playing fetch in the park and is the best friend our kids could ask for.',
    avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&q=80',
    tag: 'Adopted 3 months ago'
  },
  {
    id: 2,
    petName: 'Luna (Persian Cat)',
    family: 'Ananya & Rohan',
    story: 'Luna immediately made our apartment feel like home. The adoption process was smooth, transparent, and hassle-free!',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80',
    tag: 'Adopted 6 months ago'
  },
  {
    id: 3,
    petName: 'Barnaby (Lop Rabbit)',
    family: 'Priya Verma',
    story: 'Barnaby is super gentle and intelligent. Watching him hop around in the morning is the favorite part of my day.',
    avatar: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=300&q=80',
    tag: 'Adopted 1 month ago'
  }
];

export default function TestimonialsSection() {
  const [activeStory, setActiveStory] = useState(0);

  return (
    <section id="stories" className="stories-section">
      <div className="section-title-wrapper">
        <span className="section-badge">❤️ Heartwarming Stories</span>
        <h2>Success Adoption Stories</h2>
        <p>Real stories from loving families who adopted their pets through PetPals</p>
      </div>

      <div className="stories-carousel-container">
        <div className="story-card glass-card">
          <div className="story-image-box">
            <img src={STORIES[activeStory].avatar} alt={STORIES[activeStory].petName} className="story-img" />
          </div>

          <div className="story-content">
            <span className="story-tag">{STORIES[activeStory].tag}</span>
            <blockquote className="story-quote">
              "{STORIES[activeStory].story}"
            </blockquote>
            <div className="story-author">
              <h4>{STORIES[activeStory].petName}</h4>
              <p>Adopted by <strong>{STORIES[activeStory].family}</strong></p>
            </div>
          </div>
        </div>

        <div className="story-controls">
          {STORIES.map((story, index) => (
            <button
              key={story.id}
              type="button"
              className={`story-dot ${index === activeStory ? 'active' : ''}`}
              onClick={() => setActiveStory(index)}
            >
              Story #{index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
