import React, { useState, useEffect, useRef } from 'react';

const STATS = [
  { id: 1, icon: '🐾', value: '1,250+', label: 'Pets Rescued & Housed' },
  { id: 2, icon: '🏠', value: '98%', label: 'Successful Adoption Rate' },
  { id: 3, icon: '🏥', value: '45+', label: 'Verified Partner Shelters' },
  { id: 4, icon: '❤️', value: '2,400+', label: 'Happy Pet Parents' }
];

function AnimatedCounter({ endValue, duration = 2200 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const nodeRef = useRef(null);

  // Parse numeric portion (e.g. "1,250+" -> 1250) and suffix (e.g. "+", "%")
  const numericMatch = endValue.replace(/,/g, '').match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = endValue.replace(/[\d,]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated || targetNumber === 0) return;

    let startTime = null;
    let animationFrameId;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // EaseOutQuart easing for smooth decelerating count-up
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * targetNumber));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasAnimated, targetNumber, duration]);

  const formattedCount = count.toLocaleString();

  return (
    <span ref={nodeRef}>
      {hasAnimated ? `${formattedCount}${suffix}` : `0${suffix}`}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stats-grid">
        {STATS.map((stat, index) => (
          <div
            key={stat.id}
            className="stat-card glass-card scroll-stagger-item"
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">
              <AnimatedCounter endValue={stat.value} />
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
