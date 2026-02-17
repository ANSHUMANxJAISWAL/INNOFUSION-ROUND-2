# 🌿 EcoRoute: Sustainable Urban Journey Planner

**EcoRoute** is a modern, intelligently-orchestrated journey planner designed specifically for the complex mobility landscape of Indian cities. It prioritizes sustainability, safety, and cost-efficiency by seamlessly integrating multi-modal transport options—from Metro and Buses to Shared Autos and Electric Scooters.

---

## 🚀 Key Features

### 1. 📂 Persona-Based Route Reordering
Recognizing that everyone has different priorities, EcoRoute reorders search results based on user personas:
- **Student Profile**: Prioritizes the most cost-effective routes first.
- **Senior Citizen Profile**: Prioritizes safety, low-walking distances, and well-lit "Safe Routes."
- **Daily Commuter**: Balances carbon footprint, speed, and reliability.

### 2. 🔮 ML-Powered Delay Prediction
EcoRoute features a time-slot sensitive delay forecasting system.
- **Dynamic Adjustments**: Delays for Bus, Metro, and Auto are automatically recalculated based on the system's current time (Morning Peak, Afternoon, Evening Peak).
- **ML Confidence & Reasons**: For every predicted delay, the app provides a confidence level and the likely cause (e.g., "Heavy traffic near Silk Board junction").
- **Predicted Arrival Time**: Automatically calculates the updated arrival time including all transfer delays.

### 3. 🎫 Integrated Booking & Reservation
Seamlessly transition from planning to booking within a single interface.
- **Dynamic Mode Detection**: The app scans your journey steps for bookable modes (Yulu Scooters, Zoomcar EVs, Shared Autos).
- **One-Tap Reservation**: Slide-up modal for quick confirmation with "How it Works" instructions.
- **Success State with QR code**: Instantly generates a unique Booking ID and a 6x6 pixel-art QR code for pickup verification.
- **My Bookings Dashboard**: A persistent record of all confirmed reservations accessible from the Carbon Dashboard.

### 4. 🌍 Sustainability & Impact Tracking
- **Carbon Counter**: A live, incrementing city-wide CO₂ counter on the dashboard to foster a sense of collective green action.
- **Personal Milestones**: Track total CO₂ saved, kilometers traveled greenly, and earn achievements (e.g., "5-day green streak").
- **Behavioral Nudges**: Uses psychological cues like "Loss Framing" (e.g., "Cabbing daily costs ₹8,400 more per year") to encourage greener choices.

### 5. 🌐 Bilingual & Inclusive Design
- **Instant Language Switching**: Full support for English and Hindi (हिन्दी) across all labels, data descriptions, and booking steps.
- **Safe Mode**: Manually or automatically (for seniors) toggles "Safe Route" prioritization for late-night or solitary travels.

---

## 🛠️ Technical Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) (for ultra-fast HMR and performance)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom design system with Forest Green `#1B4332` palette)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: Global React Hooks (`useState`, `useEffect`) for lightweight, predictable data flow.
- **Deployment-Ready**: Optimized structure for instant local development and production builds.

---

## 📂 Project Structure

```bash
ecoroute/
├── src/
│   ├── components/
│   │   ├── OnboardingScreen.jsx    # Persona & setup
│   │   ├── PlannerScreen.jsx       # Journey parameters
│   │   ├── ResultsScreen.jsx       # Multi-modal route cards
│   │   ├── DetailScreen.jsx        # Journey timeline & booking triggers
│   │   ├── BookingModal.jsx        # Confirmation & QR generation
│   │   ├── DashboardScreen.jsx     # Carbon tracking & bookings log
│   │   └── BottomNav.jsx           # Unified navigation
│   ├── data/
│   │   ├── appData.js              # 🆕 Delay & Booking data structures
│   │   ├── translations.js         # Core EN/HI translation object
│   │   └── routes.js               # Sample journey data
│   ├── App.jsx                     # Global state & routing logic
│   └── index.css                   # Tailwind theme & animations
└── tailwind.config.js              # Theme color specifications
```

---

## 🏁 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
cd ecoroute
npm install
```

### 2. Development
Run the app in development mode at `http://localhost:5173`:
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 💡 Vision
EcoRoute aims to solve the **"First and Last Mile"** problem in Indian cities by making public transport and green micro-mobility the most convenient, safe, and transparent choice for every citizen.
