import React, { useState } from 'react';

/**
 * PetAdoptionForm Component
 * Features:
 * - Form handling with useState for 5 inputs (petName, petId, category, status, description)
 * - Submit handler with e.preventDefault()
 * - Information Card displayed below form upon submission
 * - Reset button that clears all form inputs and hides the card
 * - Conditional styling for status badge: Green for Available, Red for Adopted
 */
export default function PetAdoptionForm({ onAddPet }) {
  // 1. Declare state variables for form inputs
  const [petName, setPetName] = useState('');
  const [petId, setPetId] = useState('');
  const [category, setCategory] = useState('Dog');
  const [status, setStatus] = useState('Available');
  const [description, setDescription] = useState('');

  // 2. Declare state variable for submitted card details (hidden initially)
  const [submittedCard, setSubmittedCard] = useState(null);

  // Feedback message state
  const [submitMessage, setSubmitMessage] = useState('');

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!petName.trim() || !petId.trim()) {
      setSubmitMessage('Please fill in both Pet Name and Pet ID.');
      return;
    }

    const cardData = {
      id: petId,
      name: petName,
      category: category,
      status: status,
      description: description,
      timestamp: new Date().toLocaleTimeString()
    };

    // Set submitted card data (displays Information Card below form)
    setSubmittedCard(cardData);

    if (onAddPet) {
      onAddPet({ ...cardData, dateAdded: new Date().toLocaleDateString() });
    }

    setSubmitMessage(`Success! Pet card for "${petName}" generated below.`);

    setTimeout(() => {
      setSubmitMessage('');
    }, 3000);
  };

  // Handle Reset Action: clears all inputs and hides the displayed card
  const handleReset = () => {
    setPetName('');
    setPetId('');
    setCategory('Dog');
    setStatus('Available');
    setDescription('');
    setSubmittedCard(null); // Hides the displayed card

    setSubmitMessage('Form reset successfully.');
    setTimeout(() => {
      setSubmitMessage('');
    }, 2500);
  };

  // Helper for Category Icons
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Dog': return '🐶';
      case 'Cat': return '🐱';
      case 'Rabbit': return '🐰';
      case 'Bird': return '🐦';
      default: return '🐾';
    }
  };

  return (
    <div className="pet-adoption-container">
      <div className="form-card-grid">
        {/* Left Side: Interactive Form */}
        <div className="form-section">
          <div className="section-header">
            <h2>Pet Adoption Form</h2>
            <p className="section-subtitle">Fill in details and click submit to generate the Information Card below</p>
          </div>

          {submitMessage && (
            <div className={`alert-banner ${submitMessage.includes('Success') || submitMessage.includes('reset') ? 'alert-success' : 'alert-warning'}`}>
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="pet-form">
            {/* Input 1: Pet Name (Text) */}
            <div className="form-group">
              <label htmlFor="petName" className="form-label">
                Pet Name <span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="petName"
                name="petName"
                className="form-control"
                placeholder="e.g. Max, Whiskers, Barnaby"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                required
              />
              <span className="state-debug">useState: <code>"{petName}"</code></span>
            </div>

            {/* Input 2: Pet ID (Text/Number) */}
            <div className="form-group">
              <label htmlFor="petId" className="form-label">
                Pet ID <span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="petId"
                name="petId"
                className="form-control"
                placeholder="e.g. PET-102 or 4092"
                value={petId}
                onChange={(e) => setPetId(e.target.value)}
                required
              />
              <span className="state-debug">useState: <code>"{petId}"</code></span>
            </div>

            {/* Input 3: Category (Select Dropdown) */}
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="form-control form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Dog">🐶 Dog</option>
                <option value="Cat">🐱 Cat</option>
                <option value="Rabbit">🐰 Rabbit</option>
                <option value="Bird">🐦 Bird</option>
              </select>
              <span className="state-debug">useState: <code>"{category}"</code></span>
            </div>

            {/* Input 4: Status (Radio Buttons) */}
            <div className="form-group">
              <label className="form-label">Status</label>
              <div className="radio-group">
                <label className={`radio-card ${status === 'Available' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    id="statusAvailable"
                    name="status"
                    value="Available"
                    checked={status === 'Available'}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <span className="radio-badge badge-available">● Available</span>
                </label>

                <label className={`radio-card ${status === 'Adopted' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    id="statusAdopted"
                    name="status"
                    value="Adopted"
                    checked={status === 'Adopted'}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <span className="radio-badge badge-adopted">✓ Adopted</span>
                </label>
              </div>
              <span className="state-debug">useState: <code>"{status}"</code></span>
            </div>

            {/* Input 5: Description (Textarea) */}
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                className="form-control textarea-control"
                placeholder="Provide details about personality, age, breed..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <span className="state-debug">useState: <code>"{description}"</code></span>
            </div>

            {/* Action Buttons: Submit & Reset */}
            <div className="form-action-buttons">
              <button type="submit" className="submit-btn">
                Submit Form
              </button>
              <button type="button" onClick={handleReset} className="reset-btn">
                Reset Form
              </button>
            </div>
          </form>

          {/* Submitted Information Card - Hidden until Submit is clicked, hidden when Reset is clicked */}
          {submittedCard && (
            <div className="submitted-info-card">
              <div className="info-card-header">
                <span className="badge-submitted">✓ Submitted Pet Information Card</span>
                <span className="timestamp">{submittedCard.timestamp}</span>
              </div>

              <div className="info-card-content">
                <div className="info-avatar">
                  {getCategoryIcon(submittedCard.category)}
                </div>

                <div className="info-details">
                  <h3 className="info-name">{submittedCard.name}</h3>
                  
                  <div className="info-meta-row">
                    <span className="info-item">
                      <strong>Pet ID:</strong> {submittedCard.id}
                    </span>
                    <span className="info-item">
                      <strong>Category:</strong> {getCategoryIcon(submittedCard.category)} {submittedCard.category}
                    </span>
                    <span className="info-item">
                      <strong>Status:</strong>{' '}
                      {/* Conditional styling: Green background/text if 'Available' and Red if 'Adopted' */}
                      <span className={`status-pill ${submittedCard.status === 'Available' ? 'status-available' : 'status-adopted'}`}>
                        {submittedCard.status === 'Available' ? '● Available' : '✓ Adopted'}
                      </span>
                    </span>
                  </div>

                  <div className="info-desc-box">
                    <strong>Description:</strong>
                    <p>{submittedCard.description || 'No description provided.'}</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn-dismiss"
                onClick={handleReset}
              >
                Reset & Hide Card
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Live Input State Inspector */}
        <div className="preview-section">
          <div className="preview-sticky">
            <div className="preview-badge-header">
              <span className="pulse-dot"></span> Live Input Inspector
            </div>

            <div className={`preview-card category-${category.toLowerCase()}`}>
              <div className="card-top-bar">
                <span className="pet-category-tag">
                  {getCategoryIcon(category)} {category}
                </span>
                {/* Conditional status badge styling: Green for Available, Red for Adopted */}
                <span className={`status-pill ${status === 'Available' ? 'status-available' : 'status-adopted'}`}>
                  {status === 'Available' ? '● Available' : '✓ Adopted'}
                </span>
              </div>

              <div className="card-avatar">
                <span>{getCategoryIcon(category)}</span>
              </div>

              <div className="card-body">
                <h3 className="card-title">{petName || 'Pet Name'}</h3>
                <div className="card-id-badge">ID: {petId || 'N/A'}</div>

                <p className="card-desc">
                  {description || 'Type in form fields to see live state.'}
                </p>
              </div>

              <div className="card-footer">
                <span className="live-indicator">
                  {submittedCard ? '✓ Form Submitted' : 'Waiting for Submit click...'}
                </span>
              </div>
            </div>

            {/* State Table Inspection Box */}
            <div className="state-inspector">
              <h4>React State Values</h4>
              <div className="state-grid">
                <div className="state-row">
                  <span className="state-key">petName:</span>
                  <span className="state-val">{JSON.stringify(petName)}</span>
                </div>
                <div className="state-row">
                  <span className="state-key">petId:</span>
                  <span className="state-val">{JSON.stringify(petId)}</span>
                </div>
                <div className="state-row">
                  <span className="state-key">category:</span>
                  <span className="state-val">{JSON.stringify(category)}</span>
                </div>
                <div className="state-row">
                  <span className="state-key">status:</span>
                  <span className="state-val">{JSON.stringify(status)}</span>
                </div>
                <div className="state-row">
                  <span className="state-key">description:</span>
                  <span className="state-val">{JSON.stringify(description)}</span>
                </div>
                <div className="state-row">
                  <span className="state-key">submittedCard:</span>
                  <span className="state-val">{submittedCard ? 'Active Object' : 'null'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
