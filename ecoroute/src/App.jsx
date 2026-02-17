import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import { T } from './data/translations';

// Existing screens
import OnboardingScreen from './components/OnboardingScreen';
import PlannerScreen from './components/PlannerScreen';
import ResultsScreen from './components/ResultsScreen';
import DetailScreen from './components/DetailScreen';
import DashboardScreen from './components/DashboardScreen';

// New screens
import HomeScreen from './components/HomeScreen';
import MapScreen from './components/MapScreen';
import JourneyTimelineScreen from './components/JourneyTimelineScreen';
import EnergyModeScreen from './components/EnergyModeScreen';
import SafetyModeScreen from './components/SafetyModeScreen';
import SOSScreen from './components/SOSScreen';
import VoiceAssistantScreen from './components/VoiceAssistantScreen';
import SettingsScreen from './components/SettingsScreen';
import LanguageAccessibilityScreen from './components/LanguageAccessibilityScreen';

function AppContent() {
  // Screen routing state
  const [screen, setScreen] = useState('home');

  // Legacy state for existing screens
  const [persona, setPersona] = useState('adult');
  const [lang, setLang] = useState('EN');
  const [safeMode, setSafeMode] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [fromLocation, setFromLocation] = useState('Silk Board');
  const [toLocation, setToLocation] = useState('Whitefield');
  const [selectedModes, setSelectedModes] = useState(['walk', 'transit', 'auto', 'scooter']);
  const [bookingScreen, setBookingScreen] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [bookings, setBookings] = useState([]);

  // Screen routing
  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return <HomeScreen setScreen={setScreen} />;

      case 'onboard':
        return (
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
        );

      case 'planner':
        return (
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
        );

      case 'results':
        return (
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
        );

      case 'detail':
        return (
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
        );

      case 'dashboard':
        return (
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
        );

      case 'map':
        return <MapScreen setScreen={setScreen} />;

      case 'journey-timeline':
        return <JourneyTimelineScreen setScreen={setScreen} />;

      case 'energy':
        return <EnergyModeScreen setScreen={setScreen} />;

      case 'safety':
        return <SafetyModeScreen setScreen={setScreen} />;

      case 'sos':
        return <SOSScreen setScreen={setScreen} />;

      case 'voice-assistant':
        return <VoiceAssistantScreen setScreen={setScreen} />;

      case 'settings':
        return <SettingsScreen setScreen={setScreen} />;

      case 'language-accessibility':
        return <LanguageAccessibilityScreen setScreen={setScreen} />;

      default:
        return <HomeScreen setScreen={setScreen} />;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
      <Toaster
        position="top-center"
        containerStyle={{
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '448px',
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1E293B',
            color: '#F1F5F9',
            border: '1px solid #334155',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#F1F5F9',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#F1F5F9',
            },
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
