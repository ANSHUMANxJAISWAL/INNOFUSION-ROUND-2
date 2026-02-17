import React, { useState } from 'react';
import { T } from './data/translations';
import OnboardingScreen from './components/OnboardingScreen';
import PlannerScreen from './components/PlannerScreen';
import ResultsScreen from './components/ResultsScreen';
import DetailScreen from './components/DetailScreen';
import DashboardScreen from './components/DashboardScreen';

function App() {
  // Global State
  const [screen, setScreen] = useState('onboard');
  const [persona, setPersona] = useState('adult');
  const [lang, setLang] = useState('EN');
  const [safeMode, setSafeMode] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Planner State
  const [fromLocation, setFromLocation] = useState('Silk Board');
  const [toLocation, setToLocation] = useState('Whitefield');
  const [selectedModes, setSelectedModes] = useState(['walk', 'transit', 'auto', 'scooter']);

  // Booking State
  const [bookingScreen, setBookingScreen] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [bookings, setBookings] = useState([]);

  return (
    <div className="App">
      {screen === 'onboard' && (
        <OnboardingScreen
          lang={lang}
          setLang={setLang}
          persona={persona}
          setPersona={setPersona}
          safeMode={safeMode}
          setSafeMode={setSafeMode}
          setScreen={setScreen}
          T={T}
        />
      )}

      {screen === 'planner' && (
        <PlannerScreen
          lang={lang}
          setLang={setLang}
          persona={persona}
          safeMode={safeMode}
          setSafeMode={setSafeMode}
          setScreen={setScreen}
          T={T}
          fromLocation={fromLocation}
          setFromLocation={setFromLocation}
          toLocation={toLocation}
          setToLocation={setToLocation}
          selectedModes={selectedModes}
          setSelectedModes={setSelectedModes}
        />
      )}

      {screen === 'results' && (
        <ResultsScreen
          lang={lang}
          setLang={setLang}
          persona={persona}
          safeMode={safeMode}
          setScreen={setScreen}
          setSelectedRoute={setSelectedRoute}
          T={T}
          fromLocation={fromLocation}
          toLocation={toLocation}
        />
      )}

      {screen === 'detail' && (
        <DetailScreen
          lang={lang}
          setScreen={setScreen}
          selectedRoute={selectedRoute}
          T={T}
          toLocation={toLocation}
          bookingScreen={bookingScreen}
          setBookingScreen={setBookingScreen}
          bookingData={bookingData}
          setBookingData={setBookingData}
          bookings={bookings}
          setBookings={setBookings}
        />
      )}

      {screen === 'dashboard' && (
        <DashboardScreen
          lang={lang}
          setLang={setLang}
          persona={persona}
          safeMode={safeMode}
          setSafeMode={setSafeMode}
          setScreen={setScreen}
          T={T}
          bookings={bookings}
        />
      )}
    </div>
  );
}

export default App;
