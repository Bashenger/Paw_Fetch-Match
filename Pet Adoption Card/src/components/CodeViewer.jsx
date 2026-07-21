import React, { useState } from 'react';

export default function CodeViewer() {
  const [copied, setCopied] = useState(false);

  const codeString = `import React, { useState, useEffect, useRef } from 'react';

export default function PetAdoptionManager() {
  // 1. Form State Management (useState)
  const [petName, setPetName] = useState('');
  const [petId, setPetId] = useState('');
  const [category, setCategory] = useState('Dog');
  const [status, setStatus] = useState('Available');
  const [description, setDescription] = useState('');
  
  // Image Upload with dynamic URL.createObjectURL preview thumbnail
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const fileInputRef = useRef(null);

  // Edit Mode state & Errors state
  const [editingPetId, setEditingPetId] = useState(null);
  const [errors, setErrors] = useState({});

  // 2. LocalStorage Persistence (useEffect)
  const [pets, setPets] = useState(() => {
    const saved = localStorage.getItem('pet_adoption_records');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('pet_adoption_records', JSON.stringify(pets));
  }, [pets]);

  // 3. Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // 4. Real-time Field Validation (Disabled Submit when invalid)
  useEffect(() => {
    const newErrors = {};
    if (!petName.trim() || petName.trim().length < 2) {
      newErrors.petName = 'Pet Name must be at least 2 characters';
    }
    if (!/^PET-\d{4}$/.test(petId.trim().toUpperCase())) {
      newErrors.petId = 'Pet ID must match format PET-XXXX';
    }
    if (!description.trim() || description.trim().length < 5) {
      newErrors.description = 'Description must be at least 5 characters';
    }
    setErrors(newErrors);
  }, [petName, petId, description]);

  const isFormValid = Object.keys(errors).length === 0;

  // Image File Change Handler (URL.createObjectURL thumbnail)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => setImageBase64(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Form Submit Handler (Add / Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const petData = {
      id: petId.trim().toUpperCase(),
      name: petName.trim(),
      category,
      status,
      description: description.trim(),
      image: imageBase64 || imagePreview || ''
    };

    if (editingPetId) {
      setPets(pets.map(p => p.id === editingPetId ? petData : p));
    } else {
      setPets([petData, ...pets]);
    }
    handleReset();
  };

  // Reset Handler
  const handleReset = () => {
    setPetName('');
    setPetId('');
    setCategory('Dog');
    setStatus('Available');
    setDescription('');
    setImagePreview(null);
    setImageBase64(null);
    setEditingPetId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Card Actions: Edit, Delete, Print, Share
  const handleEdit = (pet) => {
    setEditingPetId(pet.id);
    setPetName(pet.name);
    setPetId(pet.id);
    setCategory(pet.category);
    setStatus(pet.status);
    setDescription(pet.description);
    setImagePreview(pet.image);
    setImageBase64(pet.image);
  };

  const handleDelete = (id) => {
    setPets(pets.filter(p => p.id !== id));
  };

  const handlePrint = (pet) => {
    window.print();
  };

  const handleShare = async (pet) => {
    const text = \`Pet Name: \${pet.name} (ID: \${pet.id})\nStatus: \${pet.status}\nDescription: \${pet.description}\`;
    if (navigator.share) {
      await navigator.share({ title: pet.name, text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Pet details copied to clipboard!');
    }
  };

  // Filter Computation
  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pet.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || pet.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="adoption-manager">
      <h2>Pet Adoption System</h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pet Name"
          value={petName}
          onChange={e => setPetName(e.target.value)}
        />
        {errors.petName && <span className="error">{errors.petName}</span>}

        <input
          type="text"
          placeholder="Pet ID (PET-XXXX)"
          value={petId}
          onChange={e => setPetId(e.target.value)}
          disabled={!!editingPetId}
        />
        {errors.petId && <span className="error">{errors.petId}</span>}

        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Bird">Bird</option>
        </select>

        <div>
          <label>
            <input
              type="radio"
              name="status"
              value="Available"
              checked={status === 'Available'}
              onChange={e => setStatus(e.target.value)}
            />
            Available
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="Adopted"
              checked={status === 'Adopted'}
              onChange={e => setStatus(e.target.value)}
            />
            Adopted
          </label>
        </div>

        {/* File Input for Dynamic Thumbnail */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        {imagePreview && <img src={imagePreview} alt="Preview" width="80" />}

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        {errors.description && <span className="error">{errors.description}</span>}

        <button type="submit" disabled={!isFormValid}>
          {editingPetId ? 'Update Card' : 'Save Card'}
        </button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>

      {/* Search & Filter Bar */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search pets..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Bird">Bird</option>
        </select>
      </div>

      {/* Grid of Cards */}
      <div className="cards-grid">
        {filteredPets.map(pet => (
          <div key={pet.id} className="card">
            {pet.image && <img src={pet.image} alt={pet.name} width="100%" />}
            <h3>{pet.name}</h3>
            <p>ID: {pet.id}</p>
            <span className={pet.status === 'Available' ? 'badge-green' : 'badge-red'}>
              {pet.status}
            </span>
            <p>{pet.description}</p>

            {/* Action Buttons */}
            <button onClick={() => handleEdit(pet)}>Edit</button>
            <button onClick={() => handleShare(pet)}>Share</button>
            <button onClick={() => handlePrint(pet)}>Print</button>
            <button onClick={() => handleDelete(pet.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-viewer-container">
      <div className="code-viewer-header">
        <div>
          <h3>Full Advanced Assignment Solution Code</h3>
          <p className="code-sub">Complete implementation with validation, localStorage, URL.createObjectURL image preview, search/filtering, and print/share actions</p>
        </div>
        <button type="button" onClick={copyToClipboard} className="btn-copy">
          {copied ? '✓ Copied!' : '📋 Copy Code'}
        </button>
      </div>
      <pre className="code-block">
        <code>{codeString}</code>
      </pre>
    </div>
  );
}
