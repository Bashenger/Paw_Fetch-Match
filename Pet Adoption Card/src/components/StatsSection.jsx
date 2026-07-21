import React from 'react';

const STATS = [
  { id: 1, icon: '🐾', value: '1,250+', label: 'Pets Rescued & Housed' },
  { id: 2, icon: '🏠', value: '98%', label: 'Successful Adoption Rate' },
  { id: 3, icon: '🏥', value: '45+', label: 'Verified Partner Shelters' },
  { id: 4, icon: '❤️', value: '2,400+', label: 'Happy Pet Parents' }
];

export default function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stats-grid">
        {STATS.map((stat) => (
          <div key={stat.id} className="stat-card glass-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
