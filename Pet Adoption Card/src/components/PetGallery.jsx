import React from 'react';

export default function PetGallery({ pets, onDeletePet, onToggleStatus }) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Dog': return '🐶';
      case 'Cat': return '🐱';
      case 'Rabbit': return '🐰';
      case 'Bird': return '🐦';
      default: return '🐾';
    }
  };

  if (!pets || pets.length === 0) {
    return (
      <div className="empty-gallery">
        <div className="empty-icon">🐾</div>
        <h3>No Pet Adoption Cards Created Yet</h3>
        <p>Use the form above to add your first pet card!</p>
      </div>
    );
  }

  return (
    <div className="gallery-section">
      <div className="gallery-header">
        <h2>Adoption Gallery ({pets.length})</h2>
        <p className="section-subtitle">Manage and inspect generated pet cards</p>
      </div>

      <div className="pets-grid">
        {pets.map((pet) => (
          <div key={pet.id} className={`pet-card category-${pet.category.toLowerCase()}`}>
            <div className="card-top-bar">
              <span className="pet-category-tag">
                {getCategoryIcon(pet.category)} {pet.category}
              </span>
              <button
                type="button"
                className={`status-pill clickable ${pet.status === 'Available' ? 'status-available' : 'status-adopted'}`}
                onClick={() => onToggleStatus && onToggleStatus(pet.id)}
                title="Click to toggle status"
              >
                {pet.status === 'Available' ? '● Available' : '✓ Adopted'}
              </button>
            </div>

            <div className="card-avatar">
              <span>{getCategoryIcon(pet.category)}</span>
            </div>

            <div className="card-body">
              <h3 className="card-title">{pet.name}</h3>
              <div className="card-id-badge">ID: {pet.id}</div>
              <p className="card-desc">{pet.description || 'No description provided.'}</p>
            </div>

            <div className="card-actions">
              <button
                type="button"
                className="btn-toggle-status"
                onClick={() => onToggleStatus && onToggleStatus(pet.id)}
              >
                Mark as {pet.status === 'Available' ? 'Adopted' : 'Available'}
              </button>
              <button
                type="button"
                className="btn-delete"
                onClick={() => onDeletePet && onDeletePet(pet.id)}
                title="Delete Card"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
