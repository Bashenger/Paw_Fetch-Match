import React, { useState } from 'react';

/**
 * PetAdoptionCard.jsx
 * A complete, standalone, single-file React component for a Pet Adoption Information Card.
 * 
 * Features:
 * - Uses multiple useState() hooks for form inputs (petName, petId, category, status, description).
 * - Submit handler prevents page reload (e.preventDefault()) and reveals Information Card.
 * - Card remains hidden until form submission.
 * - Reset button clears all inputs and hides the Information Card.
 * - Conditional styling: 'Available' highlighted in Green, 'Adopted' highlighted in Red.
 * - Modern, clean UI styling using inline CSS objects (zero external CSS file dependencies).
 */
export default function PetAdoptionCard() {
  // 1. Multiple useState hooks for individual form controls
  const [petName, setPetName] = useState('');
  const [petId, setPetId] = useState('');
  const [category, setCategory] = useState('Dog');
  const [status, setStatus] = useState('Available');
  const [description, setDescription] = useState('');

  // 2. useState hook to control Information Card visibility and data
  const [submittedCard, setSubmittedCard] = useState(null);

  // 3. Form Submission Handler
  const handleSubmit = (e) => {
    // Prevent default browser page reload
    e.preventDefault();

    if (!petName.trim() || !petId.trim()) {
      alert('Please fill in both Pet Name and Pet ID.');
      return;
    }

    // Save current form inputs into state to display the Information Card
    setSubmittedCard({
      petName,
      petId,
      category,
      status,
      description,
      submittedAt: new Date().toLocaleTimeString()
    });
  };

  // 4. Reset Button Handler: clears form inputs and hides the Information Card
  const handleReset = () => {
    setPetName('');
    setPetId('');
    setCategory('Dog');
    setStatus('Available');
    setDescription('');
    setSubmittedCard(null); // Hides the card
  };

  // Inline CSS Styles Object for clean modern UI
  const styles = {
    container: {
      maxWidth: '650px',
      margin: '40px auto',
      padding: '32px',
      borderRadius: '20px',
      backgroundColor: '#ffffff',
      boxShadow: '0 20px 45px rgba(15, 23, 42, 0.12)',
      border: '1px solid #e2e8f0',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      color: '#1e293b'
    },
    header: {
      textAlign: 'center',
      marginBottom: '28px'
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: '800',
      color: '#0f172a',
      margin: '0 0 6px 0'
    },
    subtitle: {
      fontSize: '0.95rem',
      color: '#64748b',
      margin: 0
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '18px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    },
    label: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#334155'
    },
    input: {
      padding: '11px 14px',
      fontSize: '0.95rem',
      borderRadius: '10px',
      border: '1px solid #cbd5e1',
      backgroundColor: '#f8fafc',
      outline: 'none',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
    },
    select: {
      padding: '11px 14px',
      fontSize: '0.95rem',
      borderRadius: '10px',
      border: '1px solid #cbd5e1',
      backgroundColor: '#f8fafc',
      cursor: 'pointer'
    },
    radioGroup: {
      display: 'flex',
      gap: '20px',
      marginTop: '4px'
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '0.95rem',
      fontWeight: '600',
      cursor: 'pointer',
      padding: '8px 16px',
      borderRadius: '10px',
      border: '1px solid #e2e8f0',
      backgroundColor: '#f8fafc',
      userSelect: 'none'
    },
    textarea: {
      padding: '11px 14px',
      fontSize: '0.95rem',
      borderRadius: '10px',
      border: '1px solid #cbd5e1',
      backgroundColor: '#f8fafc',
      resize: 'vertical',
      minHeight: '80px',
      fontFamily: 'inherit'
    },
    buttonRow: {
      display: 'flex',
      gap: '12px',
      marginTop: '10px'
    },
    submitBtn: {
      flex: 2,
      padding: '13px 20px',
      fontSize: '1rem',
      fontWeight: '700',
      color: '#ffffff',
      backgroundColor: '#4f46e5',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)',
      transition: 'transform 0.15s ease, background-color 0.2s ease'
    },
    resetBtn: {
      flex: 1,
      padding: '13px 20px',
      fontSize: '1rem',
      fontWeight: '600',
      color: '#475569',
      backgroundColor: '#f1f5f9',
      border: '1px solid #cbd5e1',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease, color 0.2s ease'
    },
    card: {
      marginTop: '32px',
      padding: '24px',
      borderRadius: '16px',
      backgroundColor: '#f8fafc',
      border: '2px solid #4f46e5',
      boxShadow: '0 10px 25px rgba(79, 70, 229, 0.12)',
      animation: 'fadeIn 0.3s ease-in'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px dashed #cbd5e1',
      paddingBottom: '12px',
      marginBottom: '16px'
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#0f172a',
      margin: 0
    },
    cardMeta: {
      fontSize: '0.8rem',
      color: '#64748b'
    },
    cardRow: {
      marginBottom: '12px',
      fontSize: '0.95rem',
      color: '#334155'
    },
    statusBadge: (currentStatus) => ({
      display: 'inline-block',
      padding: '4px 14px',
      borderRadius: '9999px',
      fontSize: '0.85rem',
      fontWeight: '700',
      letterSpacing: '0.02em',
      backgroundColor: currentStatus === 'Available' ? '#dcfce7' : '#fee2e2',
      color: currentStatus === 'Available' ? '#15803d' : '#b91c1c',
      border: currentStatus === 'Available' ? '1px solid #86efac' : '1px solid #fca5a5'
    })
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🐾 Pet Adoption Card Registration</h2>
        <p style={styles.subtitle}>Fill in the details below to generate a Pet Adoption Information Card</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* 1. Pet Name Input (Text) */}
        <div style={styles.formGroup}>
          <label htmlFor="petName" style={styles.label}>
            Pet Name <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            id="petName"
            placeholder="e.g. Buddy, Whiskers"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {/* 2. Pet ID Input (Text/Number) */}
        <div style={styles.formGroup}>
          <label htmlFor="petId" style={styles.label}>
            Pet ID <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            id="petId"
            placeholder="e.g. PET-101 or 4092"
            value={petId}
            onChange={(e) => setPetId(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {/* 3. Category Select Dropdown (Dog, Cat, Rabbit, Bird) */}
        <div style={styles.formGroup}>
          <label htmlFor="category" style={styles.label}>
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.select}
          >
            <option value="Dog">🐶 Dog</option>
            <option value="Cat">🐱 Cat</option>
            <option value="Rabbit">🐰 Rabbit</option>
            <option value="Bird">🐦 Bird</option>
          </select>
        </div>

        {/* 4. Status Radio Buttons (Available, Adopted) */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Status</label>
          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="status"
                value="Available"
                checked={status === 'Available'}
                onChange={(e) => setStatus(e.target.value)}
              />
              <span style={{ color: '#15803d' }}>● Available</span>
            </label>

            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="status"
                value="Adopted"
                checked={status === 'Adopted'}
                onChange={(e) => setStatus(e.target.value)}
              />
              <span style={{ color: '#b91c1c' }}>✓ Adopted</span>
            </label>
          </div>
        </div>

        {/* 5. Description Textarea */}
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            rows="3"
            placeholder="Provide details about age, breed, temperament..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />
        </div>

        {/* Action Buttons: Submit & Reset */}
        <div style={styles.buttonRow}>
          <button type="submit" style={styles.submitBtn}>
            Submit Form
          </button>
          
          <button type="button" onClick={handleReset} style={styles.resetBtn}>
            Reset Form
          </button>
        </div>
      </form>

      {/* Information Card - Hidden until Submit button is clicked, hidden on Reset */}
      {submittedCard && (
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>📋 Pet Adoption Information Card</h3>
            <span style={styles.cardMeta}>{submittedCard.submittedAt}</span>
          </div>

          <div style={styles.cardRow}>
            <strong>Pet Name:</strong> {submittedCard.petName}
          </div>

          <div style={styles.cardRow}>
            <strong>Pet ID:</strong> {submittedCard.petId}
          </div>

          <div style={styles.cardRow}>
            <strong>Category:</strong> {submittedCard.category}
          </div>

          {/* Status Badge: Green background for 'Available', Red for 'Adopted' */}
          <div style={styles.cardRow}>
            <strong>Status:</strong>{' '}
            <span style={styles.statusBadge(submittedCard.status)}>
              {submittedCard.status === 'Available' ? '● Available' : '✓ Adopted'}
            </span>
          </div>

          <div style={styles.cardRow}>
            <strong>Description:</strong>
            <p style={{ margin: '6px 0 0 0', lineHeight: '1.5', color: '#475569' }}>
              {submittedCard.description || 'No description provided.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
