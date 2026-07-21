import React, { useState, useEffect, useRef } from 'react';

// Initial pet listings with detailed compatibility traits & urgency flags
const INITIAL_PETS = [
  {
    id: 'PET-1024',
    name: 'Buddy',
    category: 'Dog',
    status: 'Available',
    description: 'Playful 2-year-old Golden Retriever. Loves outdoors, ball games, kids, and running in large yards.',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1000&q=90',
    dateAdded: '2026-07-20',
    apartmentFriendly: false,
    goodWithKids: true,
    goodWithPets: true,
    energyLevel: 'High',
    wfhFriendly: true,
    isUrgent: false
  },
  {
    id: 'PET-3091',
    name: 'Luna',
    category: 'Cat',
    status: 'Adopted',
    description: 'Calm 1-year-old Siamese cat. Prefers warm lap cuddles, quiet sunbeams, and small apartment spaces.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=90',
    dateAdded: '2026-07-19',
    apartmentFriendly: true,
    goodWithKids: true,
    goodWithPets: true,
    energyLevel: 'Calm',
    wfhFriendly: true,
    isUrgent: false
  },
  {
    id: 'PET-4482',
    name: 'Barnaby',
    category: 'Rabbit',
    status: 'Available',
    description: 'Gentle Holland Lop rabbit. Needs immediate loving home & special care! Fond of fresh greens and soft pets.',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=1000&q=90',
    dateAdded: '2026-07-21',
    apartmentFriendly: true,
    goodWithKids: true,
    goodWithPets: false,
    energyLevel: 'Calm',
    wfhFriendly: true,
    isUrgent: true // Urgent Adoption sample
  },
  {
    id: 'PET-7193',
    name: 'Pip',
    category: 'Bird',
    status: 'Available',
    description: 'Vibrant & cheerful Cockatiel. Whistles tunes, enjoys perch playtime, perfect for apartments and WFH home setups.',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1000&q=90',
    dateAdded: '2026-07-21',
    apartmentFriendly: true,
    goodWithKids: true,
    goodWithPets: true,
    energyLevel: 'Moderate',
    wfhFriendly: true,
    isUrgent: false
  }
];

function ConfettiOverlay({ active }) {
  if (!active) return null;
  const pieces = Array.from({ length: 50 });
  const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#3b82f6', '#8b5cf6', '#ef4444'];
  return (
    <div className="confetti-container" aria-hidden="true">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.8;
        const duration = 2 + Math.random() * 2.5;
        const bg = colors[i % colors.length];
        return (
          <div
            key={i}
            className="confetti-piece"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              backgroundColor: bg
            }}
          />
        );
      })}
    </div>
  );
}

export default function PetAdoptionManager({ isFormOpen: propsIsFormOpen, setIsFormOpen: propsSetIsFormOpen, onOpenForm }) {
  const [localIsFormOpen, setLocalIsFormOpen] = useState(false);
  const isFormOpen = propsIsFormOpen !== undefined ? propsIsFormOpen : localIsFormOpen;
  const setIsFormOpen = propsSetIsFormOpen || setLocalIsFormOpen;
  // -------------------------------------------------------------
  // 1. CUSTOMER POST PET FORM STATE
  // -------------------------------------------------------------
  const [petName, setPetName] = useState('');
  const [category, setCategory] = useState('Dog');
  const [status, setStatus] = useState('Available');
  const [description, setDescription] = useState('');

  // Compatibility Traits Checkboxes
  const [apartmentFriendly, setApartmentFriendly] = useState(true);
  const [goodWithKids, setGoodWithKids] = useState(true);
  const [goodWithPets, setGoodWithPets] = useState(true);
  const [energyLevel, setEnergyLevel] = useState('Moderate');

  // URGENCY STAMP CHECKBOX STATE
  const [isUrgent, setIsUrgent] = useState(false);

  // Image Upload thumbnail state via URL.createObjectURL
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const fileInputRef = useRef(null);

  // Form Visibility state (handled via props/local helper)
  const formRef = useRef(null);

  // Adoption Inquiry Modal State
  const [inquiryPet, setInquiryPet] = useState(null);

  // Validation Error State
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // -------------------------------------------------------------
  // 2. EXPANDED MULTI-OPTION COMPATIBILITY CALCULATOR STATE
  // -------------------------------------------------------------
  const [finderMode, setFinderMode] = useState('prompt'); // 'prompt' | 'manual'
  const [userHousing, setUserHousing] = useState('Apartment'); // 'Apartment' | 'House' | 'Rural'
  const [userKids, setUserKids] = useState('Toddlers'); // 'NoKids' | 'Toddlers' | 'OlderKids'
  const [userPets, setUserPets] = useState('HasPets'); // 'NoPets' | 'HasDogs' | 'HasCats' | 'HasPets'
  const [userActivity, setUserActivity] = useState('Calm'); // 'Calm' | 'Moderate' | 'HighEnergy'
  const [userSchedule, setUserSchedule] = useState('WFH'); // 'WFH' | 'Standard' | 'Travels'
  const [userExperience, setUserExperience] = useState('FirstTime'); // 'FirstTime' | 'Experienced'
  const [isMatchCalculated, setIsMatchCalculated] = useState(false); // Only reveal match score % when user interacts

  const [sortByMatch, setSortByMatch] = useState('match'); // 'match' | 'newest' | 'name'

  // -------------------------------------------------------------
  // 3. SMART PROMPT AUTO-CATEGORIZATION STATE
  // -------------------------------------------------------------
  const [userPrompt, setUserPrompt] = useState('');
  const [aiAnalysisResult, setAiAnalysisResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // -------------------------------------------------------------
  // 4. PET LIST & LOCALSTORAGE PERSISTENCE
  // -------------------------------------------------------------
  const [pets, setPets] = useState(() => {
    const saved = localStorage.getItem('pet_adoption_records');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse saved pets', err);
      }
    }
    return INITIAL_PETS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [activePrintPet, setActivePrintPet] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('pet_adoption_records', JSON.stringify(pets));
  }, [pets]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // -------------------------------------------------------------
  // 5. REAL-TIME FORM VALIDATION
  // -------------------------------------------------------------
  const validateForm = (name, desc) => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.petName = 'Pet Name is required';
    } else if (name.trim().length < 2) {
      newErrors.petName = 'Pet Name must be at least 2 characters';
    }

    if (!desc.trim()) {
      newErrors.description = 'Description is required';
    } else if (desc.trim().length < 5) {
      newErrors.description = 'Description must be at least 5 characters';
    }

    return newErrors;
  };

  useEffect(() => {
    const currentErrors = validateForm(petName, description);
    setErrors(currentErrors);
  }, [petName, description]);

  const isFormValid =
    petName.trim().length >= 2 &&
    description.trim().length >= 5 &&
    Object.keys(errors).length === 0;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // -------------------------------------------------------------
  // 6. MULTI-OPTION PAW-FECT COMPATIBILITY SCORE CALCULATOR
  // -------------------------------------------------------------
  const calculateMatchScore = (pet) => {
    let score = 30;

    // 0. Heavy Focus on Specific Requested Pet Category or Name
    if (userPrompt && userPrompt.trim()) {
      const text = userPrompt.toLowerCase();
      const petNameLower = pet.name.toLowerCase();
      const petCategoryLower = pet.category.toLowerCase();

      if (text.includes(petNameLower)) {
        score += 35; // Direct pet name match bonus
      }
      if (
        (text.includes('dog') || text.includes('puppy') || text.includes('canine') || text.includes('golden')) && pet.category === 'Dog' ||
        (text.includes('cat') || text.includes('kitten') || text.includes('feline') || text.includes('siamese')) && pet.category === 'Cat' ||
        (text.includes('rabbit') || text.includes('bunny') || text.includes('lop')) && pet.category === 'Rabbit' ||
        (text.includes('bird') || text.includes('parrot') || text.includes('cockatiel')) && pet.category === 'Bird'
      ) {
        score += 25; // Requested pet species focus bonus
      }
    }

    // 1. Housing Match (+20 max)
    if (userHousing === 'Apartment') {
      if (pet.apartmentFriendly || pet.category === 'Cat' || pet.category === 'Rabbit' || pet.category === 'Bird') {
        score += 20;
      } else {
        score += 5;
      }
    } else if (userHousing === 'House') {
      score += 20;
    } else if (userHousing === 'Rural') {
      if (pet.category === 'Dog' || pet.category === 'Rabbit') score += 20;
      else score += 15;
    }

    // 2. Kids Match (+15 max)
    if (userKids === 'Toddlers') {
      if (pet.goodWithKids) score += 15;
      else score += 5;
    } else if (userKids === 'OlderKids') {
      if (pet.goodWithKids) score += 15;
      else score += 10;
    } else {
      score += 15;
    }

    // 3. Other Pets Match (+10 max)
    if (userPets !== 'NoPets') {
      if (pet.goodWithPets) score += 10;
      else score += 3;
    } else {
      score += 10;
    }

    // 4. Activity Match (+15 max)
    if (userActivity === 'Calm') {
      if (pet.energyLevel === 'Calm' || pet.category === 'Cat' || pet.category === 'Rabbit') score += 15;
      else score += 5;
    } else if (userActivity === 'HighEnergy') {
      if (pet.energyLevel === 'High' || pet.category === 'Dog') score += 15;
      else score += 8;
    } else {
      score += 12;
    }

    // 5. Schedule WFH Match (+10 max)
    if (userSchedule === 'WFH') {
      if (pet.wfhFriendly !== false) score += 10;
      else score += 5;
    } else {
      score += 8;
    }

    return Math.min(100, Math.max(45, score));
  };

  // -------------------------------------------------------------
  // 7. SMART PROMPT AUTO-CATEGORIZATION ENGINE
  // -------------------------------------------------------------
  const handleSmartPromptSubmit = (promptText = userPrompt) => {
    if (!promptText.trim()) {
      showToast('Please type a prompt about your living situation.', 'error');
      return;
    }

    const text = promptText.toLowerCase();
    const detected = [];

    // Housing detection
    if (text.includes('apartment') || text.includes('flat') || text.includes('condo') || text.includes('small space')) {
      setUserHousing('Apartment');
      detected.push('🏢 Apartment Living');
    } else if (text.includes('house') || text.includes('yard') || text.includes('garden') || text.includes('backyard')) {
      setUserHousing('House');
      detected.push('🏡 House w/ Yard');
    } else if (text.includes('farm') || text.includes('rural') || text.includes('countryside')) {
      setUserHousing('Rural');
      detected.push('🌾 Rural / Farm');
    }

    // Kids detection
    if (text.includes('toddler') || text.includes('baby') || text.includes('infant') || text.includes('young kid')) {
      setUserKids('Toddlers');
      detected.push('👶 Toddler / Young Child');
    } else if (text.includes('kid') || text.includes('children') || text.includes('son') || text.includes('daughter')) {
      setUserKids('OlderKids');
      detected.push('👦 School-Age Kids');
    } else if (text.includes('no kids') || text.includes('adults only')) {
      setUserKids('NoKids');
      detected.push('🚫 No Kids');
    }

    // Pets detection
    if (text.includes('dog') && (text.includes('other') || text.includes('existing') || text.includes('already have'))) {
      setUserPets('HasDogs');
      detected.push('🐶 Existing Dogs');
    } else if (text.includes('cat') && (text.includes('other') || text.includes('existing') || text.includes('already have'))) {
      setUserPets('HasCats');
      detected.push('🐱 Existing Cats');
    }

    // Category auto-filtering
    if (text.includes('dog') || text.includes('puppy') || text.includes('canine')) {
      setFilterCategory('Dog');
      detected.push('Category: 🐶 Dogs');
    } else if (text.includes('cat') || text.includes('kitten') || text.includes('feline')) {
      setFilterCategory('Cat');
      detected.push('Category: 🐱 Cats');
    } else if (text.includes('rabbit') || text.includes('bunny')) {
      setFilterCategory('Rabbit');
      detected.push('Category: 🐰 Rabbits');
    } else if (text.includes('bird') || text.includes('parrot') || text.includes('cockatiel')) {
      setFilterCategory('Bird');
      detected.push('Category: 🐦 Birds');
    } else {
      setFilterCategory('All');
    }

    // Activity / Temperament
    if (text.includes('calm') || text.includes('quiet') || text.includes('cuddle') || text.includes('lap')) {
      setUserActivity('Calm');
      detected.push('☕ Calm Energy');
    } else if (text.includes('active') || text.includes('run') || text.includes('hike') || text.includes('playful')) {
      setUserActivity('HighEnergy');
      detected.push('⚡ High Energy');
    }

    // Schedule
    if (text.includes('work from home') || text.includes('wfh') || text.includes('home all day')) {
      setUserSchedule('WFH');
      detected.push('🏡 WFH / Home All Day');
    }

    setSortByMatch('match');
    setIsMatchCalculated(true); // Reveal live compatibility match score % on pet cards!

    // EXCLUDE ALREADY ADOPTED PETS & HEAVILY PRIORITIZE REQUESTED PET SPECIES
    const availablePets = pets.filter((pet) => pet.status === 'Available');
    let requestedCategory = 'All';
    if (text.includes('dog') || text.includes('puppy') || text.includes('canine') || text.includes('golden')) {
      requestedCategory = 'Dog';
    } else if (text.includes('cat') || text.includes('kitten') || text.includes('feline') || text.includes('siamese')) {
      requestedCategory = 'Cat';
    } else if (text.includes('rabbit') || text.includes('bunny') || text.includes('lop')) {
      requestedCategory = 'Rabbit';
    } else if (text.includes('bird') || text.includes('parrot') || text.includes('cockatiel')) {
      requestedCategory = 'Bird';
    }

    const matchingCategoryPets = requestedCategory !== 'All'
      ? availablePets.filter((pet) => pet.category === requestedCategory)
      : availablePets;

    const topMatch = matchingCategoryPets.length > 0 ? matchingCategoryPets[0] : availablePets[0] || null;

    setAiAnalysisResult({
      prompt: promptText,
      summary: detected.length > 0 ? detected.join(' • ') : 'Custom lifestyle analysis applied!',
      topMatch,
      timestamp: new Date().toLocaleTimeString()
    });

    // Trigger Confetti explosion for 4 seconds!
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);

    showToast('🎉 Congratulations! Found your top Paw-Fect Match!');
  };

  // -------------------------------------------------------------
  // 8. IMAGE UPLOAD HANDLER
  // -------------------------------------------------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  // -------------------------------------------------------------
  // 9. FORM SUBMISSION WITH URGENCY STAMP
  // -------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      showToast('Please complete all required fields.', 'error');
      return;
    }

    const autoAssignedId = `PET-${Math.floor(1000 + Math.random() * 9000)}`;

    let defaultAvatar = '';
    switch (category) {
      case 'Dog':
        defaultAvatar = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80';
        break;
      case 'Cat':
        defaultAvatar = 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=400&q=80';
        break;
      case 'Rabbit':
        defaultAvatar = 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=400&q=80';
        break;
      case 'Bird':
        defaultAvatar = 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=400&q=80';
        break;
      default:
        defaultAvatar = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80';
    }

    const finalImage = imageBase64 || imagePreview || defaultAvatar;

    const newPet = {
      id: autoAssignedId,
      name: petName.trim(),
      category,
      status,
      description: description.trim(),
      image: finalImage,
      dateAdded: new Date().toLocaleDateString(),
      apartmentFriendly,
      goodWithKids,
      goodWithPets,
      energyLevel,
      wfhFriendly: true,
      isUrgent, // Urgency Stamp flag
      isUserCreated: true // Flag indicating this pet card was posted by the current user
    };
    setPets((prevPets) => [newPet, ...prevPets]);
    showToast(`🎉 Posted "${petName}" on Paw-Fect Match! Auto-assigned ID: ${autoAssignedId}`);

    handleReset();
    setIsFormOpen(false); // Close form modal pop-up cleanly
  };

  const handleReset = () => {
    setPetName('');
    setCategory('Dog');
    setStatus('Available');
    setDescription('');
    setApartmentFriendly(true);
    setGoodWithKids(true);
    setGoodWithPets(true);
    setEnergyLevel('Moderate');
    setIsUrgent(false); // Reset Urgency Stamp
    setImagePreview(null);
    setImageBase64(null);
    setTouched({});
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // -------------------------------------------------------------
  // 10. CARD ACTIONS
  // -------------------------------------------------------------
  const handleAdoptInquiry = (pet) => {
    if (pet.status === 'Adopted') {
      showToast(`"${pet.name}" has already found a home!`, 'error');
      return;
    }
    setInquiryPet(pet);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove pet listing for "${name}"?`)) {
      setPets((prev) => prev.filter((pet) => pet.id !== id));
      showToast(`Removed listing for "${name}"`);
    }
  };

  const handlePrint = (pet) => {
    setActivePrintPet(pet);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handleShare = async (pet) => {
    const textToShare = `🐾 Paw-Fect Match Card\nPet Name: ${pet.name}\nPet ID: ${pet.id}\nCategory: ${pet.category}\nStatus: ${pet.status}${pet.isUrgent ? '\nURGENT: ❤️ Urgent Adoption Needed!' : ''}\nDescription: ${pet.description}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Paw-Fect Match - ${pet.name}`,
          text: textToShare,
          url: window.location.href
        });
        showToast('Shared successfully!');
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(textToShare);
        }
      }
    } else {
      copyToClipboard(textToShare);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast('Pet adoption details copied to clipboard!');
  };

  // -------------------------------------------------------------
  // 11. SEARCH, FILTER & PAW-FECT MATCH SORTING
  // -------------------------------------------------------------
  const processedPets = pets
    .filter((pet) => {
      const matchesSearch =
        pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = filterCategory === 'All' || pet.category === filterCategory;
      const matchesStatus = filterStatus === 'All' || pet.status === filterStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      if (sortByMatch === 'match') {
        return calculateMatchScore(b) - calculateMatchScore(a);
      } else if (sortByMatch === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

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
    <div className="single-page-layout">
      {/* Toast Notification Alert */}
      {toast && (
        <div className={`toast-notification toast-${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* ADOPTION INTEREST MODAL */}
      {inquiryPet && (
        <div className="modal-overlay" onClick={() => setInquiryPet(null)}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setInquiryPet(null)}>✕</button>
            <div className="modal-header">
              <span className="modal-emoji">{getCategoryIcon(inquiryPet.category)}</span>
              <h3>Adopt {inquiryPet.name}!</h3>
              <p className="modal-subtitle">Auto ID: <strong>{inquiryPet.id}</strong> • Paw-Fect Match Score: <strong>{calculateMatchScore(inquiryPet)}%</strong></p>
            </div>
            <div className="modal-body">
              {inquiryPet.isUrgent && (
                <div className="modal-urgent-notice">
                  ❤️ <strong>Urgent Adoption Priority:</strong> {inquiryPet.name} requires special care and immediate adoption!
                </div>
              )}
              <p>Thank you for your interest in giving <strong>{inquiryPet.name}</strong> a loving home! Our Paw-Fect Match team will contact you shortly.</p>
              <div className="modal-contact-info">
                <span>📧 Contact: adoption@{inquiryPet.name.toLowerCase()}pets.com</span>
                <span>📞 Hotline: +1 (800) 555-PAW-MATCH</span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-modal-confirm"
                onClick={() => {
                  showToast(`Paw-Fect Match adoption interest sent for ${inquiryPet.name}!`);
                  setInquiryPet(null);
                }}
              >
                ❤️ Confirm Adoption Interest
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFETTI BURST OVERLAY */}
      <ConfettiOverlay active={showConfetti} />

      {/* TOP SECTION: PAW-FECT MATCH CALCULATOR FEATURE & GALLERY */}
      <section className="top-gallery-section">
        <div className="gallery-action-bar">
          <div className="bar-title-group">
            <h2>🎯 Paw-Fect Match Compatibility Finder ({processedPets.length})</h2>
            <p className="bar-sub">Set multiple options or enter a natural prompt to auto-categorize & rank your best matches</p>
          </div>

          <button
            type="button"
            className="btn-open-form"
            onClick={toggleForm}
          >
            {isFormOpen ? '✕ Close Form' : '➕ List Your Pet for Adoption'}
          </button>
        </div>

        {/* UNIFIED PROFESSIONAL MASTER MATCH HUB */}
        <div id="match-meter" className="master-match-hub glass-card">
          {/* Hub Navigation Tabs */}
          <div className="match-hub-tabs">
            <button
              type="button"
              className={`hub-tab-btn ${finderMode === 'prompt' ? 'active' : ''}`}
              onClick={() => setFinderMode('prompt')}
            >
              ✨ AI Smart Prompt Match
            </button>
            <button
              type="button"
              className={`hub-tab-btn ${finderMode === 'manual' ? 'active' : ''}`}
              onClick={() => setFinderMode('manual')}
            >
              ⚙️ Detailed Compatibility Filters
            </button>
          </div>

          {/* MODE 1: AI SMART PROMPT FINDER */}
          {finderMode === 'prompt' && (
            <div className="hub-mode-container fade-in-mode tab-panel-animated">
              <div className="smart-prompt-header">
                <span className="smart-sparkle">✨</span>
                <div>
                  <h3>AI Smart Prompt Match Finder</h3>
                  <p>Describe your home, family, or ideal pet in plain English and we’ll auto-categorize and rank matches for you!</p>
                </div>
              </div>

              <div className="prompt-input-row">
                <input
                  type="text"
                  className="prompt-text-input"
                  placeholder="e.g., I live in a small apartment with a toddler and work from home, looking for a calm cat..."
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSmartPromptSubmit()}
                />
                <button
                  type="button"
                  className="btn-analyze-prompt"
                  onClick={() => handleSmartPromptSubmit()}
                >
                  ✨ Find Paw-Fect Match
                </button>
              </div>

              {/* AI Analysis Summary Banner & Congratulations Showcase Card */}
              {aiAnalysisResult && (
                <div className="congrats-showcase-box">
                  <div className="ai-analysis-banner">
                    <div className="congrats-header-row">
                      <span className="party-emoji">🎉</span>
                      <div className="congrats-text-group">
                        <span className="ai-badge">🤖 AI Paw-Fect Match Result</span>
                        <h4 className="congrats-title">Congratulations! We found your top companion!</h4>
                        <p className="ai-summary">Prompt: &quot;{aiAnalysisResult.prompt}&quot; • {aiAnalysisResult.summary}</p>
                      </div>
                      <button
                        type="button"
                        className="btn-clear-ai"
                        onClick={() => {
                          setAiAnalysisResult(null);
                          setUserPrompt('');
                          setFilterCategory('All');
                        }}
                      >
                        Reset Filter ✕
                      </button>
                    </div>
                  </div>

                  {/* Showcase Top Available Match Pet Card */}
                  {(() => {
                    const topAvailablePet = aiAnalysisResult.topMatch || processedPets.find((p) => p.status === 'Available');
                    if (!topAvailablePet) return null;
                    return (
                      <div className="top-pet-card-highlight">
                        <div className="top-match-badge-bar">
                          <span className="badge-top-match">🏆 #1 Paw-Fect Match ({topAvailablePet.matchScore}% Compatibility)</span>
                          <span className="badge-green">● Available for Adoption</span>
                        </div>

                        <div className="top-match-pet-content">
                          <img src={topAvailablePet.image} alt={topAvailablePet.name} className="top-match-avatar" />
                          <div className="top-match-pet-details">
                            <h4>🎉 Meet {topAvailablePet.name}!</h4>
                            <div className="pet-id-pill">Auto ID: {topAvailablePet.id} • {topAvailablePet.category}</div>
                            <p className="top-match-desc">{topAvailablePet.description}</p>
                            <button
                              type="button"
                              className="btn-adopt-main adopt-active"
                              onClick={() => handleAdoptInquiry(topAvailablePet)}
                            >
                              ❤️ Adopt {topAvailablePet.name} Now
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* MODE 2: MANUAL COMPATIBILITY PARAMETERS */}
          {finderMode === 'manual' && (
            <div className="hub-mode-container fade-in-mode tab-panel-animated">
              <div className="manual-filters-title">
                <h3>⚙️ Fine-Tune Lifestyle Compatibility Parameters</h3>
                <p>Select your home setup to calculate live compatibility scores across all pet listings</p>
              </div>

              <div className="manual-filters-grid">
                {/* 1. Housing Type */}
                <div className="manual-select-group">
                  <label htmlFor="userHousing">🏢 Housing Type</label>
                  <select
                    id="userHousing"
                    value={userHousing}
                    onChange={(e) => {
                      setUserHousing(e.target.value);
                      setIsMatchCalculated(true);
                    }}
                    className="select-control"
                  >
                    <option value="Apartment">🏢 Apartment / Condo</option>
                    <option value="House">🏡 House w/ Yard</option>
                    <option value="Rural">🌾 Rural / Farm</option>
                  </select>
                </div>

                {/* 2. Kids at Home */}
                <div className="manual-select-group">
                  <label htmlFor="userKids">👶 Children at Home</label>
                  <select
                    id="userKids"
                    value={userKids}
                    onChange={(e) => {
                      setUserKids(e.target.value);
                      setIsMatchCalculated(true);
                    }}
                    className="select-control"
                  >
                    <option value="NoKids">🚫 No Kids</option>
                    <option value="Toddlers">👶 Young Toddlers</option>
                    <option value="OlderKids">👦 Older Kids</option>
                  </select>
                </div>

                {/* 3. Existing Pets */}
                <div className="manual-select-group">
                  <label htmlFor="userPets">🐶 Other Pets in Home</label>
                  <select
                    id="userPets"
                    value={userPets}
                    onChange={(e) => {
                      setUserPets(e.target.value);
                      setIsMatchCalculated(true);
                    }}
                    className="select-control"
                  >
                    <option value="NoPets">🚫 No Other Pets</option>
                    <option value="HasDogs">🐶 Has Dogs</option>
                    <option value="HasCats">🐱 Has Cats</option>
                  </select>
                </div>

                {/* 4. Activity Level */}
                <div className="manual-select-group">
                  <label htmlFor="userActivity">☕ Preferred Activity Level</label>
                  <select
                    id="userActivity"
                    value={userActivity}
                    onChange={(e) => {
                      setUserActivity(e.target.value);
                      setIsMatchCalculated(true);
                    }}
                    className="select-control"
                  >
                    <option value="Calm">☕ Calm / Lap Cuddles</option>
                    <option value="Moderate">🚶 Moderate Walks</option>
                    <option value="HighEnergy">⚡ High Energy / Outdoor</option>
                  </select>
                </div>

                {/* 5. Daily Schedule */}
                <div className="manual-select-group">
                  <label htmlFor="userSchedule">🏡 Daily Schedule</label>
                  <select
                    id="userSchedule"
                    value={userSchedule}
                    onChange={(e) => {
                      setUserSchedule(e.target.value);
                      setIsMatchCalculated(true);
                    }}
                    className="select-control"
                  >
                    <option value="WFH">🏡 Work From Home</option>
                    <option value="Standard">⏰ Standard Office Hours</option>
                    <option value="Travels">✈️ Frequent Traveler</option>
                  </select>
                </div>

                {/* 6. Pet Owner Experience */}
                <div className="manual-select-group">
                  <label htmlFor="userExperience">🌱 Pet Owner Experience</label>
                  <select
                    id="userExperience"
                    value={userExperience}
                    onChange={(e) => {
                      setUserExperience(e.target.value);
                      setIsMatchCalculated(true);
                    }}
                    className="select-control"
                  >
                    <option value="FirstTime">🌱 First-Time Owner</option>
                    <option value="Experienced">🐾 Experienced Parent</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter & Search Bar with Match Ranking Selector */}
        <div className="glass-card filter-bar">
          <div className="filter-group search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by name, ID, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button type="button" className="clear-search" onClick={() => setSearchQuery('')}>
                ✕
              </button>
            )}
          </div>

          <div className="filter-dropdowns">
            <select
              value={sortByMatch}
              onChange={(e) => setSortByMatch(e.target.value)}
              className="filter-select sort-highlight"
            >
              <option value="match">🎯 Sort by Highest Paw-Fect Match</option>
              <option value="newest">📅 Default Order</option>
              <option value="name">🔤 Name (A-Z)</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Categories</option>
              <option value="Dog">🐶 Dogs</option>
              <option value="Cat">🐱 Cats</option>
              <option value="Rabbit">🐰 Rabbits</option>
              <option value="Bird">🐦 Birds</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Adopted">Adopted</option>
            </select>
          </div>
        </div>

        {/* Customer Pet Cards Grid */}
        <div id="gallery" className="gallery-container">
          {processedPets.length === 0 ? (
            <div className="empty-state-card glass-card">
              <div className="empty-emoji">🐾</div>
              <h3>No Pets Found</h3>
              <p>
                {pets.length === 0
                  ? 'No pets are currently listed. Click "List Your Pet for Adoption" to add one!'
                  : 'No pets match your search or filter. Try clearing the search query.'}
              </p>
              <button type="button" className="btn-open-form mt-3" onClick={toggleForm}>
                ➕ Post a Pet Card
              </button>
            </div>
          ) : (
            <div className="cards-grid">
              {processedPets.map((pet, index) => {
                const matchScore = calculateMatchScore(pet);
                return (
                  <div
                    key={pet.id}
                    className="pet-adoption-card glass-card scroll-stagger-item"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Top Bar with Category, Status & GLOWING URGENT BADGE */}
                    <div className="card-header-bar">
                      <span className="category-tag">
                        {getCategoryIcon(pet.category)} {pet.category}
                      </span>

                      <div className="header-badges-group">
                        {/* GLOWING URGENT ADOPTION BADGE */}
                        {pet.isUrgent && (
                          <span className="badge-urgent-glowing">
                            ❤️ Urgent Adoption
                          </span>
                        )}

                        <span className={`badge-status ${pet.status === 'Available' ? 'badge-green' : 'badge-red'}`}>
                          {pet.status === 'Available' ? '● Available' : '✓ Adopted'}
                        </span>
                      </div>
                    </div>

                    {/* Pet Image / Uploaded Thumbnail */}
                    <div className="card-image-wrapper">
                      {pet.image ? (
                        <img src={pet.image} alt={pet.name} className="card-pet-img" />
                      ) : (
                        <div className="card-img-placeholder">
                          <span>{getCategoryIcon(pet.category)}</span>
                        </div>
                      )}
                    </div>

                    {/* DYNAMIC PAW-FECT MATCH SCORE METER BAR - ONLY DISPLAYED WHEN USER ENTERS PROMPT OR SELECTS FILTER */}
                    {isMatchCalculated && (
                      <div className="match-meter-wrapper fade-in-mode">
                        <div className="match-meter-header">
                          <span className="match-label">🎯 Paw-Fect Match</span>
                          <span className={`match-score-badge ${matchScore >= 85 ? 'high-match' : matchScore >= 70 ? 'mid-match' : 'low-match'}`}>
                            {matchScore}% Match
                          </span>
                        </div>
                        <div className="match-progress-bar">
                          <div
                            className={`match-progress-fill ${matchScore >= 85 ? 'fill-high' : matchScore >= 70 ? 'fill-mid' : 'fill-low'}`}
                            style={{ width: `${matchScore}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Suitability Badges */}
                    <div className="suitability-badges">
                      {pet.apartmentFriendly && <span className="suit-badge">🏢 Apartment OK</span>}
                      {pet.goodWithKids && <span className="suit-badge">👶 Kid Friendly</span>}
                      {pet.goodWithPets && <span className="suit-badge">🐶 Pet Friendly</span>}
                      {pet.energyLevel && <span className="suit-badge">⚡ {pet.energyLevel} Energy</span>}
                    </div>

                    {/* Card Content Details & Auto-Assigned Pet ID */}
                    <div className="card-content">
                      <h3 className="pet-card-title">{pet.name}</h3>
                      <div className="pet-id-pill">Auto ID: {pet.id}</div>
                      <p className="pet-description">{pet.description}</p>
                    </div>

                    {/* Customer Primary Action: Adopt Me Button */}
                    <button
                      type="button"
                      className={`btn-adopt-main ${pet.status === 'Available' ? 'adopt-active' : 'adopt-disabled'}`}
                      onClick={() => handleAdoptInquiry(pet)}
                      disabled={pet.status === 'Adopted'}
                    >
                      {pet.status === 'Available' ? '❤️ Adopt Me' : '✓ Adopted'}
                    </button>

                    {/* Customer Actions: Share, Print, Delete */}
                    <div className="card-actions-bar">
                      <button
                        type="button"
                        className="action-btn btn-share"
                        onClick={() => handleShare(pet)}
                        title="Share Pet Card"
                      >
                        🔗 Share
                      </button>

                      <button
                        type="button"
                        className="action-btn btn-print"
                        onClick={() => handlePrint(pet)}
                        title="Print Card"
                      >
                        🖨️ Print
                      </button>

                      {/* Delete button available ONLY for user's own posted pet cards */}
                      {pet.isUserCreated && (
                        <button
                          type="button"
                          className="action-btn btn-delete"
                          onClick={() => handleDelete(pet.id, pet.name)}
                          title="Delete My Listing"
                        >
                          🗑️ Delete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CUSTOMER PET POSTING FORM MODAL POP-UP */}
      {isFormOpen && (
        <div className="modal-overlay form-modal-overlay" onClick={() => setIsFormOpen(false)}>
          <div className="modal-content glass-card form-modal-content" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setIsFormOpen(false)}>✕</button>

            <div className="form-header">
              <h2>📝 List a Pet on Paw-Fect Match</h2>
              <p className="form-subtitle">
                Fill in your pet details below. A unique Pet ID (e.g. PET-8392) will be automatically assigned!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="adoption-form-grid" noValidate>
              <div className="form-grid-2col">
                {/* 1. Pet Name (Text, required) */}
                <div className="form-field">
                  <label htmlFor="petName">
                    Pet Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="petName"
                    placeholder="e.g. Milo, Bella, Coco"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    onBlur={() => handleBlur('petName')}
                    className={touched.petName && errors.petName ? 'input-error' : ''}
                  />
                  {touched.petName && errors.petName && (
                    <span className="error-msg">⚠️ {errors.petName}</span>
                  )}
                </div>

                {/* 2. Auto-assigned Pet ID Notice */}
                <div className="form-field">
                  <label>Pet ID Status</label>
                  <div className="auto-id-box">
                    <span>⚡ Auto-assigned upon submission (PET-XXXX)</span>
                  </div>
                </div>

                {/* 3. Category Dropdown */}
                <div className="form-field">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="select-control"
                  >
                    <option value="Dog">🐶 Dog</option>
                    <option value="Cat">🐱 Cat</option>
                    <option value="Rabbit">🐰 Rabbit</option>
                    <option value="Bird">🐦 Bird</option>
                  </select>
                </div>

                {/* 4. Status Radio Buttons */}
                <div className="form-field">
                  <label>Status</label>
                  <div className="radio-options">
                    <label className={`radio-pill ${status === 'Available' ? 'selected-available' : ''}`}>
                      <input
                        type="radio"
                        name="status"
                        value="Available"
                        checked={status === 'Available'}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                      <span className="status-label status-green">● Available</span>
                    </label>

                    <label className={`radio-pill ${status === 'Adopted' ? 'selected-adopted' : ''}`}>
                      <input
                        type="radio"
                        name="status"
                        value="Adopted"
                        checked={status === 'Adopted'}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                      <span className="status-label status-red">✓ Adopted</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* URGENCY STAMP & SUITABILITY CHECKBOXES */}
              <div className="form-grid-2col">
                <div className="form-field">
                  <label>Living Situation Suitability (Drives Match Score)</label>
                  <div className="suitability-checkboxes">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={apartmentFriendly}
                        onChange={(e) => setApartmentFriendly(e.target.checked)}
                      />
                      🏢 Apartment Friendly
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={goodWithKids}
                        onChange={(e) => setGoodWithKids(e.target.checked)}
                      />
                      👶 Good with Kids
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={goodWithPets}
                        onChange={(e) => setGoodWithPets(e.target.checked)}
                      />
                      🐶🐱 Good with Other Pets
                    </label>
                  </div>
                </div>

                {/* URGENCY STAMP CHECKBOX */}
                <div className="form-field">
                  <label>Urgency & Special Care Priority</label>
                  <div className="urgent-checkbox-card">
                    <label className="checkbox-label urgent-checkbox-label">
                      <input
                        type="checkbox"
                        id="isUrgent"
                        checked={isUrgent}
                        onChange={(e) => setIsUrgent(e.target.checked)}
                      />
                      <span className="urgent-text-pulse">❤️ Urgent / Special Care Required</span>
                    </label>
                    <small className="urgent-hint-text">
                      Renders a glowing &quot;❤️ Urgent Adoption&quot; badge on the pet card to request priority attention.
                    </small>
                  </div>
                </div>
              </div>

              {/* 5. Image Upload */}
              <div className="form-field">
                <label htmlFor="imageUpload">Upload Pet Photo (Thumbnail Preview)</label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="file-input"
                />

                {imagePreview && (
                  <div className="image-preview-wrapper">
                    <img src={imagePreview} alt="Pet Preview" className="preview-thumbnail" />
                    <button
                      type="button"
                      className="btn-remove-img"
                      onClick={handleRemoveImage}
                    >
                      ✕ Remove Photo
                    </button>
                  </div>
                )}
              </div>

              {/* 6. Description */}
              <div className="form-field">
                <label htmlFor="description">
                  Pet Description & Story <span className="req">*</span>
                </label>
                <textarea
                  id="description"
                  rows="3"
                  placeholder="Tell potential adopters about personality, age, breed, habits, and why they need a home..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onBlur={() => handleBlur('description')}
                  className={touched.description && errors.description ? 'input-error' : ''}
                />
                {touched.description && errors.description && (
                  <span className="error-msg">⚠️ {errors.description}</span>
                )}
              </div>

              {/* Form Action Buttons */}
              <div className="form-button-group">
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={!isFormValid}
                >
                  🚀 Post Pet on Paw-Fect Match
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-reset"
                >
                  🔄 Reset Inputs
                </button>

                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="btn-close-form"
                >
                  ✕ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HIDDEN PRINT-ONLY TARGETED CONTAINER (@media print) */}
      {activePrintPet && (
        <div className="print-only-card-wrapper">
          <div className="printable-pet-card">
            <div className="print-header">
              <h1>Paw-Fect Match Information Sheet</h1>
              <p>Official Record • Printed on {new Date().toLocaleDateString()}</p>
            </div>

            <div className="print-body">
              {activePrintPet.image && (
                <img src={activePrintPet.image} alt={activePrintPet.name} className="print-img" />
              )}
              <div className="print-details">
                <h2>{activePrintPet.name}</h2>
                <div className="print-row"><strong>Auto Pet ID:</strong> {activePrintPet.id}</div>
                <div className="print-row"><strong>Category:</strong> {activePrintPet.category}</div>
                {activePrintPet.isUrgent && (
                  <div className="print-row"><strong>Urgency Priority:</strong> ❤️ URGENT SPECIAL CARE</div>
                )}
                <div className="print-row">
                  <strong>Status:</strong>{' '}
                  <span className={`print-badge ${activePrintPet.status === 'Available' ? 'print-green' : 'print-red'}`}>
                    {activePrintPet.status}
                  </span>
                </div>
                <div className="print-row"><strong>Description:</strong></div>
                <p className="print-desc">{activePrintPet.description}</p>
              </div>
            </div>

            <div className="print-footer">
              <p>Paw-Fect Match Portal • www.pawfect-match.example</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
