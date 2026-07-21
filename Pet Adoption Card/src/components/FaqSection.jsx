import React, { useState } from 'react';

const FAQS = [
  {
    id: 1,
    question: 'How does the Paw-Fect Match Compatibility Score work?',
    answer: 'Our Paw-Fect Match engine evaluates each pet’s suitability against your living environment (Apartments vs Houses with yards, Kids, and Other Pets) to calculate a personalized Compatibility Score (%).'
  },
  {
    id: 2,
    question: 'Why should I adopt through Paw-Fect Match?',
    answer: 'Adopting through Paw-Fect Match ensures a seamless fit for your family and home, while saving innocent lives and giving rescued animals a second chance.'
  },
  {
    id: 3,
    question: 'Are the pets listed on Paw-Fect Match health-checked?',
    answer: 'Yes! All pets undergo thorough veterinary checkups, receive necessary vaccinations, and are evaluated for behavioral temperament before listing.'
  },
  {
    id: 4,
    question: 'How do I post a pet for adoption on Paw-Fect Match?',
    answer: 'Simply click "➕ Post Pet" in the top navigation bar, enter your pet’s details with photo upload, and a unique Pet ID (e.g. PET-8392) will be automatically assigned!'
  }
];

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState(1);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section id="why-adopt" className="faq-section">
      <div className="section-title-wrapper">
        <span className="section-badge">❓ FAQs & Benefits</span>
        <h2>Why Choose Paw-Fect Match?</h2>
        <p>Learn how our compatibility finder connects pets with the right homes</p>
      </div>

      <div className="faq-accordion-container">
        {FAQS.map((faq) => (
          <div
            key={faq.id}
            className={`faq-item glass-card ${openFaq === faq.id ? 'open' : ''}`}
            onClick={() => toggleFaq(faq.id)}
          >
            <div className="faq-question-bar">
              <h3 className="faq-question">{faq.question}</h3>
              <span className="faq-toggle-icon">{openFaq === faq.id ? '−' : '+'}</span>
            </div>
            {openFaq === faq.id && (
              <div className="faq-answer-box">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
