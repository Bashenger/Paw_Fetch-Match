# 🐾 Paw-Fect Match — Smart Pet Adoption & Compatibility Portal

> A modern, feature-rich React 19 web application for matching pets to prospective adopters based on living environment, health records, personality traits, and smart compatibility scoring.

---

## 🌟 Key Features

### 👤 Detailed Pet Profiles & Modals
- **Clickable Pet Profiles**: Click any pet photo or title to launch an interactive, glassmorphic **Pet Profile Modal**.
- **Quick Specs Ribbon**: Instant view of **Age**, **Gender** (♂️/♀️), **Breed**, and **Weight/Size**.
- **Medical & Health Pass**: Detailed records of Vaccination status, Spay/Neuter history, Microchip tracking, and vet notes.
- **Personality & Temperament Tags**: Visual badges for pet traits (*Playful, Lap Cuddler, Gentle, Kid-Friendly*).
- **Environment Compatibility**: Clear indicators for Apartment living, Children suitability, and Multi-pet compatibility.

### 🎯 Smart Compatibility Calculator ("Paw-Fect Match")
- **Multi-Criteria Matching**: Ranks pets dynamically based on housing type, family setup, work schedule, and activity level.
- **Smart AI Prompt Finder**: Type natural language prompts like *"I live in a small apartment and work remotely, looking for a quiet lap cat"* to auto-categorize and score matches.
- **Visual Score Meter**: Live percentage progress bars displaying match scores.

### 🚨 Priority & Urgency Handling
- **Glowing Urgent Adoption Badges**: Highlights animals needing special care or immediate adoption.

### 📝 Pet Listing Management
- **Interactive Posting Form**: Add new pets with auto-assigned IDs (`PET-XXXX`), image thumbnail uploads, health pass checks, and custom personality tags.
- **State Persistence**: Saves themes and user-created listings seamlessly via `localStorage`.

### 🖨️ Printable Pet Passports
- **Print & Export**: Export printable **Pet Adoption Passports & Official Profile Sheets** using dedicated print media queries (`@media print`).

### 🌓 Responsive UI & Theme Engine
- **Dark & Light Mode**: Smooth theme toggling with curated CSS design tokens.
- **Glassmorphism & Micro-animations**: Modern, polished aesthetic designed for maximal user engagement.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 8
- **Styling**: Vanilla CSS3 (Custom Design System, Glassmorphism, CSS Variables)
- **Icons & Fonts**: Google Fonts (*Fredoka*, *Plus Jakarta Sans*, *JetBrains Mono*)
- **State Management**: React `useState`, `useEffect`, `useRef` + `localStorage` API

---

## 📂 Project Structure

```
Pet Adoption Card/
├── public/                # Static assets & icons
├── src/
│   ├── assets/            # Hero & branding images
│   ├── components/
│   │   ├── Navbar.jsx               # Sticky header & theme toggle
│   │   ├── HeroCarousel.jsx         # Interactive banner carousel
│   │   ├── StatsSection.jsx         # Adoption impact numbers
│   │   ├── PetAdoptionManager.jsx   # Core application, gallery & modals
│   │   ├── PetAdoptionCard.jsx      # Standalone card component
│   │   ├── PetAdoptionForm.jsx      # Form component
│   │   ├── PetGallery.jsx           # Card gallery grid
│   │   ├── TestimonialsSection.jsx  # Adoption success stories
│   │   ├── FaqSection.jsx           # Adoption FAQs & information
│   │   └── CodeViewer.jsx           # Source inspector utility
│   ├── App.jsx            # Main app container & section layout
│   ├── App.css             # Comprehensive design system & styles
│   └── main.jsx           # React DOM root entry point
├── package.json           # Dependencies & scripts
└── vite.config.js         # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Bashenger/Paw_Fetch-Match.git
   cd Paw_Fetch-Match
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 📜 Available Scripts

- `npm run dev`: Starts the Vite development server with HMR.
- `npm run build`: Builds the production-ready bundle in the `dist` folder.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs ESLint to check code quality.

---

## 📄 License

This project is created as part of the **Full Stack Development (FSD)** coursework. Open for educational and non-commercial use.
